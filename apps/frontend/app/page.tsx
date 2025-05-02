import { MeshiCard } from '@/components/meshi-card'
import { graphql } from '@/src/gql'
import type { VariablesOf } from '@graphql-typed-document-node/core'
import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'

export default async function Home() {
  const data = await fetchMeshis({})

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2 md:p-20 px-2 pt-6 max-w-[900px]">
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-primary">🍚 飯ぴよ 🐤</h1>
          <p className="text-gray-600">美味しいごはんを探そう！</p>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.meshis.map((meshi) => (
              <MeshiCard
                meshi={meshi}
                key={meshi.id}
                isEager={data.meshis.indexOf(meshi) <= 10}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const fetchMeshis = async (input: VariablesOf<typeof MeshisQuery>) => {
  const backendEndpoint =
    process.env.BACKEND_ENDPOINT ?? 'http://localhost:4000/graphql'

  const client = new GraphQLClient(backendEndpoint, {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    fetch: cache(async (url: any, params: any) =>
      fetch(url, { ...params, next: { revalidate: 60 } }),
    ),
  })
  const data = await client.request(MeshisQuery, input)
  return data
}

const MeshisQuery = graphql(/* GraphQL */ `
  query Meshi {
    meshis {
      id
      ...MeshiCard
    }
  }
`)
