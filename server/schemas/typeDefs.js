const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    events: [Event]!
  }

  type Event {
    _id: ID
    start: String
    end: String
    title: String
    eventAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    events(username: String): [Event]
    event(eventId: ID!): Event
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addEvent(eventTitle: String!): Event
    removeEvent(eventId: ID!): Event
  }
`;

module.exports = typeDefs;
