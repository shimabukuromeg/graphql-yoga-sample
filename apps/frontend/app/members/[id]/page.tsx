import { graphql } from '@/src/gql'
import { VariablesOf } from '@graphql-typed-document-node/core'
import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'
import { UserCard } from '../components/user-card'

type Props = {
    params: {
        id: string
    }
}
export default async function Page({ params }: Props) {
    const { user } = await fetchUser({ id: params.id })

    return (
        <div className='flex flex-col p-8 md:p-20 gap-8'>
            <h1 className="text-3xl font-bold">Members</h1>
            <div className='flex flex-row gap-8 flex-wrap justify-center md:justify-start'>
                <UserCard user={user} />
            </div>
        </div>
    )
}

const UserQuery = graphql(/* GraphQL */ `
    query User($id: ID!) {
      user(id: $id) {
        ...User
      }
    }
  `)

const fetchUser = async (
    input: VariablesOf<typeof UserQuery>
) => {
    const backendEndpoint = process.env.BACKEND_ENDPOINT ?? 'http://localhost:4000/graphql'

    const client = new GraphQLClient(backendEndpoint, {
        fetch: cache(async (url: any, params: any) =>
            fetch(url, { ...params, next: { revalidate: 60 } })
        ),
    });
    const data = await client.request(UserQuery, input)
    return data
}

const fetchUsers = async (
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
        ...User
      }
    }
  `)

export async function generateStaticParams() {
    const data = await fetchUsers({})

    return data.users.map((user) => ({
        id: user.id,
    }))
}

