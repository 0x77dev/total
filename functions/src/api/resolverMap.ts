import { IResolvers } from "apollo-server-cloud-functions";
import { Context } from "./interfaces/api.interface";
import { isAuthenticated } from "./tools/requiresAuth";
import { UserRecord } from "firebase-functions/lib/providers/auth";
import admin from "firebase-admin";
import Transaction from "./interfaces/transaction.interface";
import ISODate from "./scalars/ISODate";

export const resolverMap: IResolvers<any, Context> = {
  ISODate,

  Query: {
    iam(_, __, ctx): UserRecord | null | undefined {
      isAuthenticated(ctx);

      return ctx.currentUser;
    },
    async transactions(_, __, ctx): Promise<Transaction[] | undefined> {
      isAuthenticated(ctx);

      const snapshot = await admin
        .firestore()
        .collection(`/user/${ctx.currentUser?.uid}/transactions`)
        .get();

      //@ts-ignore
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.createTime.toDate(),
      }));
    },
  },
  Mutation: {
    async createTransaction(
      _,
      { transaction }: { transaction: Transaction },
      ctx
    ): Promise<Transaction[] | undefined> {
      isAuthenticated(ctx);

      transaction.addedBy = "user";

      await admin
        .firestore()
        .collection(`/user/${ctx.currentUser?.uid}/transactions`)
        .doc()
        .set(transaction);

      const snapshot = await admin
        .firestore()
        .collection(`/user/${ctx.currentUser?.uid}/transactions`)
        .get();

      //@ts-ignore
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.createTime.toDate(),
      }));
    },
  },
};

export default resolverMap;
