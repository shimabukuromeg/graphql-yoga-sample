/**
 * アゲアゲスクレイピングユーティリティ関数
 */

/**
 * 指定した時間（ミリ秒）スリープする
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}; 