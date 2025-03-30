/**
 * アゲアゲスクレイピングスクリプト エントリーポイント
 */
import { scrapeAgeagePage } from './scraper';

async function main() {
  try {
    console.log('アゲアゲスクレイピングを開始します...');
    
    // コマンドライン引数からページ番号またはキーワードを取得
    const pageArg = process.argv[2];
    
    // 結果を格納する配列
    let allResults: Awaited<ReturnType<typeof scrapeAgeagePage>> = [];
    
    if (!pageArg) {
      // 引数なしの場合は1ページ目のみ取得
      console.log('1ページ目のみ取得します...');
      allResults = await scrapeAgeagePage(1);
    } else if (pageArg.toLowerCase() === 'all') {
      // 'all'の場合はデータがなくなるまですべてのページを取得
      console.log('すべてのページを取得します...');
      let currentPage = 1;
      let hasMoreData = true;
      
      while (hasMoreData) {
        console.log(`ページ ${currentPage} のデータを取得中...`);
        const pageResults = await scrapeAgeagePage(currentPage);
        
        if (pageResults.length === 0) {
          // データがなければ終了
          hasMoreData = false;
          console.log(`ページ ${currentPage} にデータがありませんでした。スクレイピングを終了します。`);
        } else {
          // 結果を追加
          allResults = [...allResults, ...pageResults];
          currentPage++;
        }
      }
    } else {
      // 数値の場合は1ページ目から指定ページまで取得
      const maxPage = Number.parseInt(pageArg, 10);
      
      if (Number.isNaN(maxPage) || maxPage < 1) {
        console.error('無効なページ番号です。正の整数またはallを指定してください。');
        process.exit(1);
      }
      
      console.log(`1ページ目から${maxPage}ページ目まで取得します...`);
      
      let currentPage = 1;
      let hasMoreData = true;
      
      while (currentPage <= maxPage && hasMoreData) {
        console.log(`ページ ${currentPage} のデータを取得中...`);
        const pageResults = await scrapeAgeagePage(currentPage);
        
        if (pageResults.length === 0) {
          // データがなければ終了
          hasMoreData = false;
          console.log(`ページ ${currentPage} にデータがありませんでした。スクレイピングを終了します。`);
        } else {
          // 結果を追加
          allResults = [...allResults, ...pageResults];
          currentPage++;
        }
      }
    }
    
    console.log('スクレイピング結果:');
    console.log(`合計 ${allResults.length} 件のデータを取得しました`);
    console.log(allResults);
    
    console.log('スクレイピングが完了しました');
  } catch (error) {
    console.error('スクレイピング中にエラーが発生しました:', error);
    process.exit(1);
  }
}

main(); 