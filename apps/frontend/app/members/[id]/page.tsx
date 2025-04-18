import { FragmentType, graphql, useFragment } from '@/src/gql'
import { VariablesOf } from '@graphql-typed-document-node/core'
import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'
import { UserCard, UserCardFragment } from '../components/user-card'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import Link from 'next/link'
import { UserDetail } from './components/user-detail'

type Props = {
  params: {
    id: string
  }
  searchParams?: {
    [key: string]: string | string[] | undefined
  }
}
export default async function Page({ params, searchParams }: Props) {
  // 動作確認用
  const x =
    searchParams != null && typeof searchParams['createdAt'] === 'string'
      ? 'a'
      : 'b'
  console.log('x', x)

  const { user } = await fetchUser({ id: params.id })

  return (
    <div className="flex flex-col p-8 md:p-20 gap-8">
      <h1 className="text-3xl font-bold">詳細ページ</h1>
      <UserDetail user={user} />
      {/* 戻る */}
      <Link href={`/members`}>
        <Button>戻る</Button>
      </Link>
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

const fetchUser = async (input: VariablesOf<typeof UserQuery>) => {
  const backendEndpoint =
    process.env.BACKEND_ENDPOINT ?? 'http://localhost:4000/graphql'

  const client = new GraphQLClient(backendEndpoint, {
    fetch: cache(async (url: any, params: any) =>
      fetch(url, { ...params, next: { revalidate: 60 } }),
    ),
  })
  const data = await client.request(UserQuery, input)
  return data
}

const fetchUsers = async (input: VariablesOf<typeof UsersQuery>) => {
  const backendEndpoint =
    process.env.BACKEND_ENDPOINT ?? 'http://localhost:4000/graphql'

  const client = new GraphQLClient(backendEndpoint, {
    fetch: cache(async (url: any, params: any) =>
      fetch(url, { ...params, next: { revalidate: 60 } }),
    ),
  })
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
