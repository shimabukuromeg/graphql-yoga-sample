import { graphql } from '@/src/gql'
import { VariablesOf } from '@graphql-typed-document-node/core'
import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'
import Image from 'next/image'

export default async function Home() {

  return (
    <div className='flex flex-col md:gap-8 gap-4 md:p-20 p-2'>
      <h1 className="text-3xl font-bold">那覇</h1>
      <div className='px-1 md:px-4'>
        <p>10件</p>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {
          [...Array(9)].map((_, i) => (
            <div key={i}>
              <Image className="h-auto max-w-full rounded-lg"
                width={300}
                height={300}
                src="https://data.otv.co.jp/okitive/wp-content/uploads/2023/03/ageagemeshi_20230303_tenten_01.jpg"
                alt="" />
            </div>
          ))
        }
        <div>
          <Image className="h-auto max-w-full rounded-lg"
            width={300}
            height={300}
            src="https://data.otv.co.jp/okitive/wp-content/uploads/2023/03/ageagemeshi_20230303_tenten_01.jpg"
            alt="" />
        </div>
      </div>
    </div>
  )
}
