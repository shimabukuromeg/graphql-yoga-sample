import { MeshiCard } from '@/components/meshi-card'
import RestaurantDetail from '@/components/restaurant-detail'
import { graphql } from '@/src/gql'
import { VariablesOf } from '@graphql-typed-document-node/core'
import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function MunicipalityPage({ params }: Props) {
  const { id } = await params
  return <RestaurantDetail id={id} />
}
