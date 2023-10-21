import { graphql } from '@/src/gql'
import { VariablesOf } from '@graphql-typed-document-node/core'
import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'


export default async function Home() {
  const data = await fetchUser({})

  console.log(data)
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

const fetchUser = async (
  input: VariablesOf<typeof UsersQuery>
) => {
  const backendEndpoint = process.env.BACKEND_ENDPOINT ?? 'http://localhost:4000/graphql'

  const client = new GraphQLClient(backendEndpoint, {
    fetch: cache(async (url: any, params: any) =>
      fetch(url, { ...params, next: { revalidate: 30 } })
    ),
  });
  const data = await client.request(UsersQuery, input)
  return data
}


const UsersQuery = graphql(/* GraphQL */ `
  query Users {
    users {
      id
      name
    }
  }
`)