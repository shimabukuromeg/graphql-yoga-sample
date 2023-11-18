import { graphql } from '@/src/gql'
import { VariablesOf } from '@graphql-typed-document-node/core'
import { GraphQLClient } from 'graphql-request'
import Link from 'next/link'
import { cache } from 'react'


export default async function Home() {
  const data = await fetchFeed({})

  return (
    <div>
      <div>
        <h1>Topページ</h1>
        <ul>
          {/* backendのGraphqlから取得したデータの表示テ */}
          {data.feed.map((link) => (
            <li key={link.id}>{link.url}</li>
          ))}
        </ul>
        <Link href={"/mypage"}>マイページへ移動</Link>
      </div>
    </div>
  )
}

const fetchFeed = async (
  input: VariablesOf<typeof FeedQuery>
) => {
  const backendEndpoint = process.env.BACKEND_ENDPOINT ?? 'http://localhost:4000/graphql'

  const client = new GraphQLClient(backendEndpoint, {
    fetch: cache(async (url: any, params: any) =>
      fetch(url, { ...params, next: { revalidate: 60 } })
    ),
  });
  const data = await client.request(FeedQuery, input)
  return data
}


const FeedQuery = graphql(/* GraphQL */ `
  query MyQuery {
    feed {
      id
      url
      comments {
        body
        id
      }
    }
}
`)