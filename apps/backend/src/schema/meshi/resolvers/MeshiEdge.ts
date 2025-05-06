import type   { MeshiEdgeResolvers } from './../../types.generated';
    export const MeshiEdge: MeshiEdgeResolvers = {
    /* Implement MeshiEdge resolver logic here */
    cursor: (parent) => parent.cursor,
    node: (parent) => parent.node,
    __isTypeOf: (parent) => parent.__typename === 'MeshiEdge'
  };
