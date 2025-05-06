import type { QueryResolvers, QuerymeshisArgs } from './../../../types.generated'
import { encodeCursor, decodeCursor } from '../../../../lib/cursor'
import { Prisma } from '@prisma/client'

export const meshis: NonNullable<QueryResolvers['meshis']> = async (
  _parent,
  args: QuerymeshisArgs,
  ctx,
) => {
  // nullの場合はデフォルト値を使用
  const { query, after } = args
  const first = args.first ?? 20
  const limit = Math.min(first, 1000) // 最大1000件に制限

  // カーソルがある場合はデコード
  let cursor: number | undefined
  if (after) {
    try {
      cursor = decodeCursor(after)
    } catch (error) {
      throw new Error('Invalid cursor format')
    }
  }

  // クエリの有無に応じて検索条件を分岐
  let items: any[] = []
  let totalCount = 0

  if (query) {
    // 全文検索（PGroongaを使用）
    const countResult = await ctx.prisma.$queryRaw<[{ count: bigint }]>`
      SELECT COUNT(*) as count
      FROM meshis
      WHERE (title || ' ' || store_name) &@~ ${query}
    `
    totalCount = Number(countResult[0].count)

    // 検索結果の取得
    const results = await ctx.prisma.$queryRaw<any[]>`
      SELECT *
      FROM meshis
      WHERE (title || ' ' || store_name) &@~ ${query}
        ${cursor ? Prisma.sql`AND id > ${cursor}` : Prisma.sql``}
      ORDER BY id
      LIMIT ${limit}
    `

    items = results.map((item: any) => ({
      id: item.id,
      articleId: item.article_id,
      title: item.title,
      imageUrl: item.image_url,
      storeName: item.store_name,
      address: item.address,
      siteUrl: item.site_url,
      publishedDate: item.published_date,
      latitude: item.latitude,
      longitude: item.longitude,
      createdAt: item.created_at,
      municipalityMeshis: item.municipality_meshis,
    }))
  } else {
    // 通常のクエリ（全文検索なし）
    const whereCondition = cursor
      ? { id: { gt: cursor } }
      : {}

    // 総件数を取得
    totalCount = await ctx.prisma.meshi.count()

    // データ取得
    items = await ctx.prisma.meshi.findMany({
      where: whereCondition,
      orderBy: { id: 'asc' },
      take: limit,
    })
  }

  // 次のページがあるかの判定
  const hasNextPage = items.length === limit

  // ページ情報の作成
  const edges = items.map((item: any) => ({
    cursor: encodeCursor(item.id),
    node: item,
  }))

  return {
    edges,
    pageInfo: {
      hasNextPage,
      hasPreviousPage: Boolean(cursor),
      startCursor: edges.length > 0 ? edges[0].cursor : undefined,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : undefined,
    },
    totalCount,
  }
}
