# アゲアゲスクレイピングスクリプト

## 使い方

スクリプトは以下のコマンドで実行できます：

```bash
# TypeScriptで直接実行する場合
npx ts-node apps/backend/src/scripts/ageage-collector/index.ts [オプション]

# コンパイル後のJavaScriptを実行する場合
node apps/backend/dist/scripts/ageage-collector/index.js [オプション]
```

### オプション

スクリプトは以下のコマンドライン引数を受け付けます：

1. **引数なし**: 1ページ目のみスクレイピングします
   ```bash
   npx ts-node apps/backend/src/scripts/ageage-collector/index.ts
   ```

2. **ページ番号（数値）**: 1ページ目から指定したページまでスクレイピングします。データがなくなった時点で終了します
   ```bash
   npx ts-node apps/backend/src/scripts/ageage-collector/index.ts 5
   ```
   上記の例では1〜5ページ目までのデータを収集します（ただし5ページ目より前にデータがなくなれば、その時点で終了します）

3. **all**: すべてのページをスクレイピングします（データがなくなるまで）
   ```bash
   npx ts-node apps/backend/src/scripts/ageage-collector/index.ts all
   ```

## 出力

スクリプトは取得したデータを標準出力に表示します。取得されるデータは以下の情報を含みます：

- 記事ID
- タイトル
- 画像URL
- 店舗名
- 郵便番号
- 住所
- 市町村
- サイトURL
- 公開日
- 緯度・経度

## 注意事項

- サイトへの負荷を考慮し、連続的なリクエストには適切な間隔を設けることをおすすめします
- スクレイピングはサイトの構造変更に影響を受ける可能性があります
- 取得したデータの利用にあたっては著作権や利用規約を遵守してください 