const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Record {
  _id: ID
  title: String
  image: String
  year: Int
  condition: String
  description: String
  price: Float
}

type User {
    _id: ID
    username: String
    email: String
    RecordCount: Int
    savedRecords: [Record]
  }

  type Query {
    me: User
  }

type Auth {
    token: ID!
    user: User
  }

input recordInfo {
    recordId: String
    title: String
    year: Int
    condition: String
    description: String
    price: Float
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveRecord(input: recordInfo): User
    removeRecord(recordId: String!): User
  }
`;

module.exports = typeDefs;
