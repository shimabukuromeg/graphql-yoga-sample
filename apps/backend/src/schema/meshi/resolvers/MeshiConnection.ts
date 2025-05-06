import type   { MeshiConnectionResolvers } from './../../types.generated';
    export const MeshiConnection: MeshiConnectionResolvers = {
    /* Implement MeshiConnection resolver logic here */
    edges: (parent) => parent.edges,
    pageInfo: (parent) => parent.pageInfo,
    totalCount: (parent) => parent.totalCount,
    __isTypeOf: (parent) => parent.__typename === 'MeshiConnection'
  };
