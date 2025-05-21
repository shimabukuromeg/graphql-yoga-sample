import type { SearchItem } from '../types/global-search'

const GRAPHQL_ENDPOINT =
  process.env.BACKEND_ENDPOINT ?? 'http://localhost:44000/graphql'

const MESHI_QUERY = `
  query Meshi($first: Int = 1000, $query: String) {
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
`

interface MeshiResponse {
  data: {
    meshis: {
      edges: Array<{ node: SearchItem }>
      pageInfo: {
        hasNextPage: boolean
        endCursor: string | null
      }
      totalCount: number
    }
  }
  errors?: Array<{ message: string }>
}

export async function fetchMeshiData(
  first = 1000,
  query?: string,
): Promise<SearchItem[]> {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: MESHI_QUERY,
        variables: { first, query },
      }),
    })

    if (!response.ok) {
      throw new Error(`GraphQL request failed with status ${response.status}`)
    }

    const result: MeshiResponse = await response.json()

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors)
      throw new Error('GraphQL query returned errors.')
    }

    return result.data.meshis.edges.map((edge) => edge.node)
  } catch (error) {
    console.error('Error fetching Meshi data:', error)
    throw error
  }
}
