import { gql } from "apollo-server-cloud-functions";

export const typeDefs = gql`
  """
  \`ISODate\` - custom graphql scalar, returns date in ISO8601 format.
  """
  scalar ISODate

  """
  \`AddedBy\` - Tells who acted on something, user or automation.
  """
  enum AddedBy {
    user
    automated
  }

  """
  \`User\` - Firebase User Type
  """
  type User {
    uid: ID!
    displayName: String
    email: String
    phoneNumber: String
    emailVerified: Boolean
    photoURL: String
    disabled: Boolean
  }

  """
  \`Transaction\` - Money Transaction Type
  """
  type Transaction {
    id: ID!
    title: String!
    description: String
    amount: Float!
    currency: String!
    addedBy: AddedBy
    timestamp: ISODate
  }

  """
  \`CreateTransaction\` - Money Transaction Creation Input
  """
  input CreateTransaction {
    title: String!
    description: String
    amount: Float!
    currency: String!
  }

  type Query {
    "Tells User information By Token Providen in headers"
    iam: User

    """
    User Money Transactions
    """
    transactions: [Transaction]!
  }

  type Mutation {
    """
    Create User Money Transaction
    """
    createTransaction(transaction: CreateTransaction): [Transaction!]!
  }
`;

export default typeDefs;
