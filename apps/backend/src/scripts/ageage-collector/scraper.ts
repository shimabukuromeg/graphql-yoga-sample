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
 * 指定したURLのページをスクレイピングする
 */
export const scrapeAgeagePage = async (pageNumber: number) => {
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
    
    // h1要素の取得
    const h1Text = $('h1').text().trim();
    
    return {
      url,
      h1Text
    };
  } catch (error) {
    console.error('スクレイピング処理中にエラーが発生しました:', error);
    throw error;
  }
}; 