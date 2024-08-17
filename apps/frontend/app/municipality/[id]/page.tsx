import { graphql } from "@/src/gql";
import { VariablesOf } from "@graphql-typed-document-node/core";
import { GraphQLClient } from "graphql-request";
import { cache } from "react";
import { MeshiCard } from "@/components/meshi-card";

type Props = {
  params: {
    id: string;
  };
};

export default async function MunicipalityPage(props: Props) {
  const data = await fetchMunicipality({
    id: props.params.id,
  });

  return (
    <div className="flex flex-col md:gap-8 gap-2 md:p-20 p-2">
      <h1 className="text-2xl md:text-3xl font-bold text-textBlack">
        {data.municipality?.name}
      </h1>
      <div className="md:px-4 px-1">
        <p className="font-bold text-textBlack">
          {data.municipality?.meshis.length}件
        </p>
      </div>
      <div className="flex justify-center">
        {data.municipality != null && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {data.municipality?.meshis.map((meshi, i) => {
              if (meshi == null) {
                throw new Error("meshi is null");
              }
              return <MeshiCard meshi={meshi} key={i} isEager={i <= 10} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const fetchMunicipality = async (
  input: VariablesOf<typeof MunicipalityQuery>
) => {
  const backendEndpoint =
    process.env.BACKEND_ENDPOINT ?? "http://localhost:4000/graphql";

  const client = new GraphQLClient(backendEndpoint, {
    fetch: cache(async (url: any, params: any) =>
      fetch(url, { ...params, next: { revalidate: 60 } })
    ),
  });
  const data = await client.request(MunicipalityQuery, input);
  return data;
};

const MunicipalityQuery = graphql(/* GraphQL */ `
  query Municipality($id: ID!) {
    municipality(id: $id) {
      createdAt
      name
      id
      meshis {
        id
        ...MeshiCard
      }
    }
  }
`);
