/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  link?: Maybe<Link>;
  postedBy?: Maybe<User>;
};

export type Link = {
  __typename?: 'Link';
  comments: Array<Comment>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  postedBy?: Maybe<User>;
  url: Scalars['String']['output'];
};

export type Meshi = {
  __typename?: 'Meshi';
  address: Scalars['String']['output'];
  articleId: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  municipality?: Maybe<Municipality>;
  publishedDate: Scalars['Date']['output'];
  siteUrl: Scalars['String']['output'];
  storeName: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Municipality = {
  __typename?: 'Municipality';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  meshis: Array<Maybe<Meshi>>;
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  postCommentOnLink: Comment;
  postLink: Link;
};


export type MutationPostCommentOnLinkArgs = {
  body: Scalars['String']['input'];
  linkId: Scalars['ID']['input'];
};


export type MutationPostLinkArgs = {
  description: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  comment?: Maybe<Comment>;
  feed: Array<Link>;
  info: Scalars['String']['output'];
  link?: Maybe<Link>;
  meshi?: Maybe<Meshi>;
  meshis: Array<Meshi>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFeedArgs = {
  filterNeedle?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLinkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMeshiArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  comments?: Maybe<Array<Comment>>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  iconImageURL?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  links?: Maybe<Array<Link>>;
  name: Scalars['String']['output'];
  twitterProfileUrl?: Maybe<Scalars['String']['output']>;
};

export type UserFragment = { __typename?: 'User', id: string, name: string, iconImageURL?: string | null, description?: string | null, twitterProfileUrl?: string | null, displayName: string } & { ' $fragmentName'?: 'UserFragment' };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<(
    { __typename?: 'User', id: string }
    & { ' $fragmentRefs'?: { 'UserFragment': UserFragment } }
  )> };

export type MeshiQueryVariables = Exact<{ [key: string]: never; }>;


export type MeshiQuery = { __typename?: 'Query', meshis: Array<{ __typename?: 'Meshi', id: string, imageUrl: string, siteUrl: string, title: string, storeName: string, publishedDate: any, createdAt: any }> };

export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"twitterProfileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"twitterProfileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const MeshiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Meshi"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meshis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"siteUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"storeName"}},{"kind":"Field","name":{"kind":"Name","value":"publishedDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<MeshiQuery, MeshiQueryVariables>;