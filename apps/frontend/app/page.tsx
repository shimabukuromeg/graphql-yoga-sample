import { graphql } from '@/src/gql'
import { VariablesOf } from '@graphql-typed-document-node/core'
import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'
import { MeshiCard } from '@/components/meshi-card'

export default async function Home() {
  const data = await fetchMeshis({})

  return (
    <div className='flex flex-col md:gap-8 gap-4 md:p-20 p-2'>
      <h1 className="text-3xl font-bold">全て</h1>
      <div className='px-1 md:px-4'>
        <p>{data.meshis.length}件</p>
      </div>
      <div className='flex justify-center'>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 max-w-[900px]">
          {
            data.meshis.map((meshi, i) => (
              <MeshiCard meshi={meshi} key={i} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

const fetchMeshis = async (
  input: VariablesOf<typeof MeshisQuery>
) => {
  const backendEndpoint = process.env.BACKEND_ENDPOINT ?? 'http://localhost:4000/graphql'

  const client = new GraphQLClient(backendEndpoint, {
    fetch: cache(async (url: any, params: any) =>
      fetch(url, { ...params, next: { revalidate: 60 } })
    ),
  });
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
