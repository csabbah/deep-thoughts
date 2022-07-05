const { User, Thought } = require('../models');

const resolvers = {
  Query: {
    // We need to also update the resolver to accept this new 'username' parameter
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    // place this inside of the `Query` nested object right after `thoughts`
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    // get all users
    users: async () => {
      return (
        User.find()
          // .select() will not include the -__v value and the -password
          .select('-__v -password')
          .populate('friends')
          .populate('thoughts')
      );
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
  },
  Mutation: {
    addUser: async () => {},
    login: async () => {},
  },
};

module.exports = resolvers;
