import * as functions from "firebase-functions";
import { api } from "./api/api";
import admin from "./utils/admin";

export const graphql = functions.https.onRequest(api);

export const bootstapFirestoreForUser = functions.auth
  .user()
  .onCreate((user) => {
    admin.firestore().collection(`/${user.uid}/transactions`);
  });
