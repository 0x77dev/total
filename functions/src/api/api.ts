import { ApolloServer } from "apollo-server-cloud-functions";
import admin from "../utils/admin";
import { Context } from "./interfaces/api.interface";
import { resolverMap } from "./resolverMap";
import { typeDefs } from "./typeDefs";

const server = new ApolloServer({
  typeDefs,
  resolvers: resolverMap,
  playground: true,
  introspection: true,
  context: async ({ req }): Promise<Context> => {
    let ctx: Context = { currentUser: null };
    const token = req.headers.token || req.headers.Authorization;
    if (token) {
      const idToken = await admin.auth().verifyIdToken(token);
      const currentUser = await admin.auth().getUser(idToken.uid);
      ctx = { ...ctx, currentUser };
    }
    return ctx;
  },
});

const api = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});

export { api };
export default api;
