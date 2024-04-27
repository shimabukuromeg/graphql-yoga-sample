import { graphql } from '@/src/gql'
import { VariablesOf } from '@graphql-typed-document-node/core'
import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'
import { MeshiCard } from '@/components/meshi-card'
import Image from 'next/image'

export default async function Home() {
  const data = await fetchMeshis({})

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col md:gap-8 gap-2 md:p-20 px-2 pt-4 max-w-[900px]'>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-textBlack pb-3">全域</h1>
          <p className='font-bold text-textBlack'>{data.meshis.length}件</p>
        </div>
        <div className='flex justify-center'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {
              data.meshis.map((meshi, i) => (
                <MeshiCard meshi={meshi} key={i} isEager={i <= 10} />
              ))
            }
          </div>
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
