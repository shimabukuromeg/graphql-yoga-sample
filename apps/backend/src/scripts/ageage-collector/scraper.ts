/**
 * アゲアゲサイトスクレイピングロジック
 */
import * as cheerio from 'cheerio';

/**
 * ページURLを生成する
 */
export const generatePageUrl = (pageNumber: number): string => {
  return `https://www.otv.co.jp/okitive/collaborator/ageage/page/${pageNumber}`;
};

/**
 * Meshiモデルの型定義（Prismaスキーマに基づく）
 */
export type MeshiData = {
  articleId: string;
  title: string;
  imageUrl: string;
  storeName: string;
  address: string;
  siteUrl: string;
  publishedDate: Date;
  latitude: number;
  longitude: number;
};

/**
 * 店舗名と住所を記事の詳細ページから取得する
 */
export const findStoreAndAddress = async (siteUrl: string): Promise<{ storeName: string, address: string }> => {
  try {
    // 詳細ページの取得
    const response = await fetch(siteUrl);
    
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }

    const html = await response.text();
    
    // Cheerioでパース
    const $ = cheerio.load(html);
    
    // 最初のdt要素から店舗名を取得
    const storeName = $('dt').first().text().trim() || 'unknown';
    
    // 「住所」というラベルを持つdt要素の次のdd要素から住所を取得
    let address = 'unknown';
    $('dt').each((_, element) => {
      if ($(element).text().trim() === '住所') {
        // dtの次のdd要素を取得
        address = $(element).next('dd').text().trim() || 'unknown';
      }
    });
    
    return {
      storeName,
      address
    };
  } catch (error) {
    console.error('店舗情報取得中にエラーが発生しました:', error);
    throw error;
  }
};

/**
 * 指定したURLのページから記事一覧をスクレイピングする
 */
export const scrapeAgeagePage = async (pageNumber: number): Promise<MeshiData[]> => {
  try {
    const url = generatePageUrl(pageNumber);
    console.log(`URL: ${url} にアクセスします...`);

    // ページの取得
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }

    const html = await response.text();
    
    // Cheerioでパース
    const $ = cheerio.load(html);
    
    // 記事の一覧を取得
    const articlePattern = /.*\/okitive\/article\/([0-9]+)\//;
    const articles: MeshiData[] = [];
    
    // 記事要素を収集して処理
    const articlePromises = $('ul li article a').map(async (_, element) => {
      const href = $(element).attr('href') || '';
      const matches = articlePattern.exec(href);
      
      if (!matches || matches.length < 2) {
        return null;
      }
      
      const articleId = matches[1];
      const title = $(element).find('p').text().trim() || 'unknown';
      const publishedDateStr = $(element).find('time').text().trim();
      const publishedDate = new Date(publishedDateStr);
      const imageUrl = $(element).find('img').attr('src') || 'unknown';
      const siteUrl = href;
      
      try {
        // 店舗名と住所を取得
        const { storeName, address } = await findStoreAndAddress(siteUrl);
        
        // 仮の緯度経度（実際には住所から取得する処理が必要）
        const latitude = 0;
        const longitude = 0;
        
        return {
          articleId,
          title,
          imageUrl,
          storeName,
          address,
          siteUrl,
          publishedDate,
          latitude,
          longitude
        } as MeshiData;
      } catch (error) {
        console.error(`記事ID: ${articleId} の詳細情報取得中にエラーが発生しました:`, error);
        return null;
      }
    }).get();
    
    // すべてのPromiseを解決し、nullでない結果だけを返す
    const results = await Promise.all(articlePromises);
    const validResults = results.filter((item): item is MeshiData => item !== null);
    
    return validResults;
  } catch (error) {
    console.error('スクレイピング処理中にエラーが発生しました:', error);
    throw error;
  }
}; 