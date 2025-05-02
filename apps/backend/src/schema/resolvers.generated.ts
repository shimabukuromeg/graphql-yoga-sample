/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { meshi as Query_meshi } from './meshi/resolvers/Query/meshi';
import    { meshis as Query_meshis } from './meshi/resolvers/Query/meshis';
import    { municipalities as Query_municipalities } from './municipality/resolvers/Query/municipalities';
import    { municipality as Query_municipality } from './municipality/resolvers/Query/municipality';
import    { user as Query_user } from './user/resolvers/Query/user';
import    { users as Query_users } from './user/resolvers/Query/users';
import    { Meshi } from './meshi/resolvers/Meshi';
import    { MicroCmsImage } from './base/resolvers/MicroCmsImage';
import    { Municipality } from './municipality/resolvers/Municipality';
import    { User } from './user/resolvers/User';
import    { DateResolver,DateTimeResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { meshi: Query_meshi,meshis: Query_meshis,municipalities: Query_municipalities,municipality: Query_municipality,user: Query_user,users: Query_users },
      
      
      Meshi: Meshi,
MicroCmsImage: MicroCmsImage,
Municipality: Municipality,
User: User,
Date: DateResolver,
DateTime: DateTimeResolver
    }