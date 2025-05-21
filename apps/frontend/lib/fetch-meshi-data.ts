import { graphql } from '@/src/gql'
import type {
  MeshiSearchQuery,
  MeshiSearchQueryVariables,
} from '@/src/gql/graphql'
import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'
import type { SearchItem } from '../types/global-search'

export async function fetchMeshiData(
  first = 1000,
  query?: string,
): Promise<SearchItem[]> {
  const backendEndpoint =
    process.env.BACKEND_ENDPOINT ?? 'http://localhost:44000/graphql'

  const client = new GraphQLClient(backendEndpoint, {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    fetch: cache(async (url: any, params: any) =>
      fetch(url, { ...params, next: { revalidate: 60, tags: ['meshi-data'] } }),
    ),
  })

  // 変数オブジェクトを明示的に型付け
  const variables: MeshiSearchQueryVariables = { first, query }

  const data = await client.request<MeshiSearchQuery>(
    MeshiSearchQueryDocument,
    variables,
  )
  return data.meshis.edges.map((edge) => edge.node as SearchItem)
}

const MeshiSearchQueryDocument = graphql(/* GraphQL */ `
  query MeshiSearch($first: Int = 1000, $query: String) {
    meshis(first: $first, query: $query) {
      edges {
        node {
          id
          imageUrl
          siteUrl
          title
          storeName
          publishedDate
          createdAt
          municipality {
            id
            name
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`)
