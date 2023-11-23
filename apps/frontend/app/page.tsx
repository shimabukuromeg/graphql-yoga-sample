import { graphql } from '@/src/gql'
import { VariablesOf } from '@graphql-typed-document-node/core'
import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'

export default async function Home() {

  return (
    <div className='flex flex-col gap-8 p-20'>
      <h1 className="text-3xl font-bold">Top</h1>
      <div className='px-4'>
        <p>this is top peage</p>
      </div>
    </div>
  )
}
