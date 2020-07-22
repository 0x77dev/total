import { gql } from "apollo-server-cloud-functions";

export const typeDefs = gql`
  scalar ISODate

  enum AddedBy {
    user
    automated
  }

  type User {
    uid: ID!
    displayName: String
    email: String
    phoneNumber: String
    emailVerified: Boolean
    photoURL: String
    disabled: Boolean
  }

  type Transaction {
    id: ID!
    title: String!
    description: String
    amount: Float!
    currency: String!
    addedBy: AddedBy
    timestamp: ISODate
  }

  input CreateTransaction {
    title: String!
    description: String
    amount: Float!
    currency: String!
  }

  type Query {
    iam: User
    transactions: [Transaction]!
  }

  type Mutation {
    createTransaction(transaction: CreateTransaction): [Transaction!]!
  }
`;

export default typeDefs;
