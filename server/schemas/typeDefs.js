const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Genre {
  _id: ID
  name: String
}

type Record {
  _id: ID
  title: String
  image: String
  year: Int
  condition: String
  description: String
  price: Float
  genre: Genre
  quantity: Int
}

type Order {
  _id: ID
  purchaseDate: String
  records: [Record]
}

type User {
    _id: ID
    username: String
    email: String
    RecordCount: Int
    orders: [Order]
  }

  type Query {
    me: User
    genres: [Genre]
    records(genre:ID, title:String):[Record]
    record(_id:ID!):Record
    order(_id:ID!):Order
    checkout(records: [ID]!): Checkout
  }

type Auth {
    token: ID!
    user: User
  }

type Checkout {
    session: ID
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
    updateUser(username: String, email: String, password: String): User
    updateRecord(_id: ID!, quantity: Int!): Record
    addOrder(records:[ID]!): Order
  }
`;

module.exports = typeDefs;
