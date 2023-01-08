const { AuthenticationError } = require("apollo-server-express");
const { User, Event } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("events");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("events");
    },
    events: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Event.find(params).sort({ createdAt: -1 });
    },
    event: async (parent, { eventId }) => {
      return Event.findOne({ _id: eventId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, args, ctx) => {
      console.log("login parent", parent);
      console.log("login args", args);
      console.log("login context", ctx);

      const { email, password, username, ...rest } = args;

      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const name = User.findOne({ username });

      if (!name) {
        throw new AuthenticationError("No user found with that username");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addEvent: async (parent, { eventTitle, eventAuthor }) => {
      const event = await Event.create({ eventTitle, eventAuthor });

      await User.findOneAndUpdate(
        { username: eventAuthor },
        { $addToSet: { events: event._id } }
      );

      return event;
    },
    removeEvent: async (parent, { eventId }) => {
      return Event.findOneAndDelete({ _id: eventId });
    },
  },
};

module.exports = resolvers;
