import { ApolloServer, gql } from "apollo-server-cloud-functions";
import admin from "../utils/admin";
import { Context } from "./interfaces/api.interface";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      hello: () => "Hello world!",
    },
  },
  playground: true,
  introspection: true,
  context: async ({ req }): Promise<Context> => {
    let ctx: Context = { currentUser: null };
    const token = req.headers.token;
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
