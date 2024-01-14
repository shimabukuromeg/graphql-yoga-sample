/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { Comment } from './comment/resolvers/Comment';
import    { Link } from './feed/resolvers/Link';
import    { Meshi } from './meshi/resolvers/Meshi';
import    { Municipality } from './municipality/resolvers/Municipality';
import    { postCommentOnLink as Mutation_postCommentOnLink } from './comment/resolvers/Mutation/postCommentOnLink';
import    { postLink as Mutation_postLink } from './feed/resolvers/Mutation/postLink';
import    { comment as Query_comment } from './comment/resolvers/Query/comment';
import    { feed as Query_feed } from './feed/resolvers/Query/feed';
import    { info as Query_info } from './info/resolvers/Query/info';
import    { link as Query_link } from './feed/resolvers/Query/link';
import    { meshi as Query_meshi } from './meshi/resolvers/Query/meshi';
import    { meshis as Query_meshis } from './meshi/resolvers/Query/meshis';
import    { municipalities as Query_municipalities } from './municipality/resolvers/Query/municipalities';
import    { municipality as Query_municipality } from './municipality/resolvers/Query/municipality';
import    { user as Query_user } from './user/resolvers/Query/user';
import    { users as Query_users } from './user/resolvers/Query/users';
import    { User } from './user/resolvers/User';
import    { DateResolver,DateTimeResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { comment: Query_comment,feed: Query_feed,info: Query_info,link: Query_link,meshi: Query_meshi,meshis: Query_meshis,municipalities: Query_municipalities,municipality: Query_municipality,user: Query_user,users: Query_users },
      Mutation: { postCommentOnLink: Mutation_postCommentOnLink,postLink: Mutation_postLink },
      
      Comment: Comment,
Link: Link,
Meshi: Meshi,
Municipality: Municipality,
User: User,
Date: DateResolver,
DateTime: DateTimeResolver
    }