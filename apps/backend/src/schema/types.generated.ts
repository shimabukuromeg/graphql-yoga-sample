import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Author_Mapper } from './author/schema.mappers';
import { Blog_Mapper } from './blog/schema.mappers';
import { Category_Mapper } from './category/schema.mappers';
import { Comment_Mapper } from './comment/schema.mappers';
import { Link_Mapper } from './feed/schema.mappers';
import { Meshi_Mapper } from './meshi/schema.mappers';
import { Municipality_Mapper } from './municipality/schema.mappers';
import { User_Mapper } from './user/schema.mappers';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date | string; output: Date | string; }
  DateTime: { input: Date | string; output: Date | string; }
};

/** ブログ記事の著者 */
export type Author = {
  __typename?: 'Author';
  blogs?: Maybe<Array<Blog>>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<MicroCmsImage>;
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  revisedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

/** ブログ記事 */
export type Blog = {
  __typename?: 'Blog';
  author: Author;
  body: Scalars['String']['output'];
  category: Category;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<MicroCmsImage>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  revisedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** ブログ記事のカテゴリー */
export type Category = {
  __typename?: 'Category';
  blogs: Array<Blog>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  revisedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
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

/** MicroCMSの画像 */
export type MicroCmsImage = {
  __typename?: 'MicroCmsImage';
  height?: Maybe<Scalars['Int']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
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


export type MutationpostCommentOnLinkArgs = {
  body: Scalars['String']['input'];
  linkId: Scalars['ID']['input'];
};


export type MutationpostLinkArgs = {
  description: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  blog: Blog;
  blogs: Array<Blog>;
  categories: Array<Category>;
  comment?: Maybe<Comment>;
  feed: Array<Link>;
  info: Scalars['String']['output'];
  link?: Maybe<Link>;
  meshi?: Maybe<Meshi>;
  meshis: Array<Meshi>;
  municipalities: Array<Municipality>;
  municipality?: Maybe<Municipality>;
  user: User;
  users: Array<User>;
};


export type QueryblogArgs = {
  id: Scalars['ID']['input'];
};


export type QuerycommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryfeedArgs = {
  filterNeedle?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerylinkArgs = {
  id: Scalars['ID']['input'];
};


export type QuerymeshiArgs = {
  id: Scalars['ID']['input'];
};


export type QuerymunicipalityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryuserArgs = {
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Author: ResolverTypeWrapper<Author_Mapper>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Blog: ResolverTypeWrapper<Blog_Mapper>;
  Category: ResolverTypeWrapper<Category_Mapper>;
  Comment: ResolverTypeWrapper<Comment_Mapper>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Link: ResolverTypeWrapper<Link_Mapper>;
  Meshi: ResolverTypeWrapper<Meshi_Mapper>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  MicroCmsImage: ResolverTypeWrapper<MicroCmsImage>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Municipality: ResolverTypeWrapper<Municipality_Mapper>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User_Mapper>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: Author_Mapper;
  ID: Scalars['ID']['output'];
  String: Scalars['String']['output'];
  Blog: Blog_Mapper;
  Category: Category_Mapper;
  Comment: Comment_Mapper;
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  Link: Link_Mapper;
  Meshi: Meshi_Mapper;
  Float: Scalars['Float']['output'];
  MicroCmsImage: MicroCmsImage;
  Int: Scalars['Int']['output'];
  Municipality: Municipality_Mapper;
  Mutation: {};
  Query: {};
  User: User_Mapper;
  Boolean: Scalars['Boolean']['output'];
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  blogs?: Resolver<Maybe<Array<ResolversTypes['Blog']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['MicroCmsImage']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  revisedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlogResolvers<ContextType = any, ParentType extends ResolversParentTypes['Blog'] = ResolversParentTypes['Blog']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['MicroCmsImage']>, ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  revisedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  blogs?: Resolver<Array<ResolversTypes['Blog']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  revisedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType>;
  postedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type LinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = {
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeshiResolvers<ContextType = any, ParentType extends ResolversParentTypes['Meshi'] = ResolversParentTypes['Meshi']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  articleId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  municipality?: Resolver<Maybe<ResolversTypes['Municipality']>, ParentType, ContextType>;
  publishedDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  siteUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MicroCmsImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['MicroCmsImage'] = ResolversParentTypes['MicroCmsImage']> = {
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MunicipalityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Municipality'] = ResolversParentTypes['Municipality']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  meshis?: Resolver<Array<Maybe<ResolversTypes['Meshi']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  postCommentOnLink?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationpostCommentOnLinkArgs, 'body' | 'linkId'>>;
  postLink?: Resolver<ResolversTypes['Link'], ParentType, ContextType, RequireFields<MutationpostLinkArgs, 'description' | 'url'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  blog?: Resolver<ResolversTypes['Blog'], ParentType, ContextType, RequireFields<QueryblogArgs, 'id'>>;
  blogs?: Resolver<Array<ResolversTypes['Blog']>, ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QuerycommentArgs, 'id'>>;
  feed?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType, Partial<QueryfeedArgs>>;
  info?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType, RequireFields<QuerylinkArgs, 'id'>>;
  meshi?: Resolver<Maybe<ResolversTypes['Meshi']>, ParentType, ContextType, RequireFields<QuerymeshiArgs, 'id'>>;
  meshis?: Resolver<Array<ResolversTypes['Meshi']>, ParentType, ContextType>;
  municipalities?: Resolver<Array<ResolversTypes['Municipality']>, ParentType, ContextType>;
  municipality?: Resolver<Maybe<ResolversTypes['Municipality']>, ParentType, ContextType, RequireFields<QuerymunicipalityArgs, 'id'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryuserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iconImageURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  links?: Resolver<Maybe<Array<ResolversTypes['Link']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  twitterProfileUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>;
  Blog?: BlogResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Link?: LinkResolvers<ContextType>;
  Meshi?: MeshiResolvers<ContextType>;
  MicroCmsImage?: MicroCmsImageResolvers<ContextType>;
  Municipality?: MunicipalityResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

