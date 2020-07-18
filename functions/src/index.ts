import * as functions from "firebase-functions";
import { api } from "./api/api";

export const graphql = functions.https.onRequest(api);
