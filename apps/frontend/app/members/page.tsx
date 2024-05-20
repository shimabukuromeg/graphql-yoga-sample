import { graphql } from "@/src/gql"
import { VariablesOf } from "@graphql-typed-document-node/core"
import { GraphQLClient } from "graphql-request"
import { cache } from "react"
import { UserCard } from "./components/user-card"
import { Link } from "lucide-react"

export default async function Members() {
  const data = await fetchUsers({})

  console.log(data)
  return (
    <div className="flex flex-col p-8 md:p-20 gap-8">
      <h1 className="text-3xl font-bold">Members</h1>
      <div className="flex flex-row gap-8 flex-wrap justify-center md:justify-start">
        {data.users.map((user) => (
          <UserCard user={user} />
        ))}
      </div>
    </div>
  )
}

const fetchUsers = async (input: VariablesOf<typeof UsersQuery>) => {
  const backendEndpoint =
    process.env.BACKEND_ENDPOINT ?? "http://localhost:4000/graphql"

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
