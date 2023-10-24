import { graphql } from '@/src/gql'
import { VariablesOf } from '@graphql-typed-document-node/core'
import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'
import ClientComponent from './components/ClientComponent'
import ServerComponent from './components/ServerComponent'


export default async function Home() {
  const data = await fetchUser({})

  console.log(data)
  return (
    <div>
      <div>
        <h1>Users</h1>
        <ul>
          {/* backendのGraphqlから取得したデータの表示テ */}
          {data.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
      <div>
        {/* Firebase authのユーザーを NextAuth の useSession を使って取得したデータを表示 */}
        <ClientComponent />
        {/* Firebase authのユーザーを NextAuth の getServerSession を使って取得したデータを表示 */}
        {/* @ts-ignore */}
        <ServerComponent />
      </div>
    </div>
  )
}

const fetchUser = async (
  input: VariablesOf<typeof UsersQuery>
) => {
  const backendEndpoint = process.env.BACKEND_ENDPOINT ?? 'http://localhost:4000/graphql'

  const client = new GraphQLClient(backendEndpoint, {
    fetch: cache(async (url: any, params: any) =>
      fetch(url, { ...params, next: { revalidate: 60 } })
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