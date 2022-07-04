// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// 'type Thought' is what we want to return per thought data
const typeDefs = gql`
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

  type Query {
    thoughts(username: String): [Thought]
  }
`;
// Our thoughts query can now 'accept' a new username parameter (not required)

// export the typeDefs
module.exports = typeDefs;
