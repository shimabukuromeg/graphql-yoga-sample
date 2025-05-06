/**
 * Relay形式のカーソルベースページネーションのためのユーティリティ
 */

/**
 * IDからカーソル文字列を生成する
 * @param id 数値ID
 * @returns Base64エンコードされたカーソル文字列
 */
export function encodeCursor(id: number): string {
  return Buffer.from(`meshi:${id}`).toString('base64');
}

/**
 * カーソル文字列からIDを復元する
 * @param cursor Base64エンコードされたカーソル文字列
 * @returns 数値ID
 */
export function decodeCursor(cursor: string): number {
  const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
  const parts = decoded.split(':');
  if (parts.length !== 2 || parts[0] !== 'meshi') {
    throw new Error('Invalid cursor format');
  }
  return parseInt(parts[1], 10);
} 