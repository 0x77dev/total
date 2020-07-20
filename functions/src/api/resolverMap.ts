import { IResolvers } from "apollo-server-cloud-functions";
import { Context } from "./interfaces/api.interface";
import { isAuthenticated } from "./tools/requiresAuth";
import { UserRecord } from "firebase-functions/lib/providers/auth";

export const resolverMap: IResolvers<any, Context> = {
  Query: {
    iam(_, __, ctx): UserRecord | null | undefined {
      isAuthenticated(ctx);

      return ctx.currentUser;
    },
  },
};

export default resolverMap;
