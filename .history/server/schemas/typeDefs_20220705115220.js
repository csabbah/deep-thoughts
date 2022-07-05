// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// 'type Thought' is what we want to return per thought data
const typeDefs = gql`
  me: async (parent, args) => {
    const userData = await User.findOne({})
      .select('-__v -password')
      .populate('thoughts')
      .populate('friends');

    return userData;
  },
  
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Query {
    me: User
    thoughts(username: String): [Thought]
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  type Auth {
    token: ID!
    user: User
  }
`;
// Note the ID! - '!' - indicates that the username MUST exist

module.exports = typeDefs;
