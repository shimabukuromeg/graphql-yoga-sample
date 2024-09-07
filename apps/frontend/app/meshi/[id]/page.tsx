import { graphql } from "@/src/gql";
import { VariablesOf } from "@graphql-typed-document-node/core";
import { GraphQLClient } from "graphql-request";
import { cache } from "react";
import { MeshiCard } from "@/components/meshi-card";
import RestaurantDetail from "@/components/restaurant-detail";

type Props = {
  params: {
    id: string;
  };
};

export default async function MunicipalityPage(props: Props) {
  return <RestaurantDetail id={props.params.id} />;
}
