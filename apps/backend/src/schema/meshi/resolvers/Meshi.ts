import type { MeshiResolvers } from './../../types.generated';
export const Meshi: MeshiResolvers = {
  municipality: () => {
    // TODO: Implement resolver logic here
    return {
      id: "1",
      name: "那覇",
      createdAt: "2021-01-01T00:00:00.000Z",
      meshis: []
    }
  }
};