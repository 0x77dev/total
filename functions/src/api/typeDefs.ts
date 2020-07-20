import { gql } from "apollo-server-cloud-functions";

export const typeDefs = gql`
  type User {
    uid: ID!
    displayName: String
    email: String
    phoneNumber: String
    emailVerified: Boolean
    photoURL: String
    disabled: Boolean
  }

  type Query {
    iam: User
  }
`;

export default typeDefs;
