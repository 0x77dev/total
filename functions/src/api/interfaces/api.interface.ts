import admin from "firebase-admin";

export interface Context {
  currentUser: admin.auth.UserRecord | null | undefined;
}
