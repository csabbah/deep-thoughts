const { User, Thought } = require('../models');

const resolvers = {
  Query: {
    // We need to also update the resolver to accept this new 'username' parameter
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
  },
};

module.exports = resolvers;
