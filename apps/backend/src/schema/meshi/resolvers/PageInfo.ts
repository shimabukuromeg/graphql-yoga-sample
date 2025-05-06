import type   { PageInfoResolvers } from './../../types.generated';
    export const PageInfo: PageInfoResolvers = {
    /* Implement PageInfo resolver logic here */
    hasNextPage: (parent) => parent.hasNextPage,
    hasPreviousPage: (parent) => parent.hasPreviousPage,
    startCursor: (parent) => parent.startCursor,
    endCursor: (parent) => parent.endCursor,
    __isTypeOf: (parent) => parent.__typename === 'PageInfo'
  };
