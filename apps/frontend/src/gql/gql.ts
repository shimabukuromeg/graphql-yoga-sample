/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query Municipalities {\n      municipalities {\n      name\n      id\n    }\n    }\n  ": types.MunicipalitiesDocument,
    "\n  fragment User on User {\n    id\n    name\n    iconImageURL\n    description\n    twitterProfileUrl\n    displayName\n  }\n": types.UserFragmentDoc,
    "\n    query User($id: ID!) {\n      user(id: $id) {\n        ...User\n      }\n    }\n  ": types.UserDocument,
    "\n    query Users {\n      users {\n        id\n        ...User\n      }\n    }\n  ": types.UsersDocument,
    "\n  query Users {\n    users {\n      id\n      ...User\n    }\n  }\n": types.UsersDocument,
    "\n  query Municipality($id: ID!) {\n    municipality(id: $id) {\n    createdAt\n    name\n    id\n    meshis {\n      id\n      title\n      address\n      articleId\n      createdAt\n      imageUrl\n      latitude\n      longitude\n      publishedDate\n      siteUrl\n      storeName\n    }\n  }\n  }\n": types.MunicipalityDocument,
    "\n  query Meshi {\n    meshis {\n      id\n      ...MeshiCard\n    }\n  }\n": types.MeshiDocument,
    "\n  fragment MeshiCard on Meshi {\n    id\n    imageUrl\n    siteUrl\n    title\n    storeName\n    publishedDate\n    createdAt\n    municipality {\n        id\n        name\n    }\n  }\n": types.MeshiCardFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Municipalities {\n      municipalities {\n      name\n      id\n    }\n    }\n  "): (typeof documents)["\n    query Municipalities {\n      municipalities {\n      name\n      id\n    }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment User on User {\n    id\n    name\n    iconImageURL\n    description\n    twitterProfileUrl\n    displayName\n  }\n"): (typeof documents)["\n  fragment User on User {\n    id\n    name\n    iconImageURL\n    description\n    twitterProfileUrl\n    displayName\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query User($id: ID!) {\n      user(id: $id) {\n        ...User\n      }\n    }\n  "): (typeof documents)["\n    query User($id: ID!) {\n      user(id: $id) {\n        ...User\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Users {\n      users {\n        id\n        ...User\n      }\n    }\n  "): (typeof documents)["\n    query Users {\n      users {\n        id\n        ...User\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Users {\n    users {\n      id\n      ...User\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      id\n      ...User\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Municipality($id: ID!) {\n    municipality(id: $id) {\n    createdAt\n    name\n    id\n    meshis {\n      id\n      title\n      address\n      articleId\n      createdAt\n      imageUrl\n      latitude\n      longitude\n      publishedDate\n      siteUrl\n      storeName\n    }\n  }\n  }\n"): (typeof documents)["\n  query Municipality($id: ID!) {\n    municipality(id: $id) {\n    createdAt\n    name\n    id\n    meshis {\n      id\n      title\n      address\n      articleId\n      createdAt\n      imageUrl\n      latitude\n      longitude\n      publishedDate\n      siteUrl\n      storeName\n    }\n  }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Meshi {\n    meshis {\n      id\n      ...MeshiCard\n    }\n  }\n"): (typeof documents)["\n  query Meshi {\n    meshis {\n      id\n      ...MeshiCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MeshiCard on Meshi {\n    id\n    imageUrl\n    siteUrl\n    title\n    storeName\n    publishedDate\n    createdAt\n    municipality {\n        id\n        name\n    }\n  }\n"): (typeof documents)["\n  fragment MeshiCard on Meshi {\n    id\n    imageUrl\n    siteUrl\n    title\n    storeName\n    publishedDate\n    createdAt\n    municipality {\n        id\n        name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;