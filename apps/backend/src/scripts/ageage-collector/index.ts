/**
 * アゲアゲスクレイピングスクリプト エントリーポイント
 */
import { scrapeAgeagePage } from './scraper.js';

async function main() {
  try {
    console.log('アゲアゲスクレイピングを開始します...');
    
    // コマンドライン引数からページ番号を取得（デフォルトは1）
    const pageNumber = process.argv[2] ? Number.parseInt(process.argv[2], 10) : 1;
    
    // スクレイピングを実行
    const result = await scrapeAgeagePage(pageNumber);
    
    console.log('スクレイピング結果:');
    console.log(result);
    
    console.log('スクレイピングが完了しました');
  } catch (error) {
    console.error('スクレイピング中にエラーが発生しました:', error);
    process.exit(1);
  }
}

main(); 