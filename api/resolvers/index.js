const { sendMagicLinkEmail } = require('../utils/email');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const mongoose = require('mongoose');
const format = require('date-fns/format');
const subDays = require('date-fns/subDays');

const resolvers = {
  Query: {
    currentUser: (parent, args, { currentUser }) => {
      return currentUser;
    },
    users: async (parent, args, { models: { User } }) => {
      return User.find();
    },
    user: async (parent, { username }, { models: { User } }) => {
      return User.findOne({ username });
    },
    tribeWords: async (parent, args, { currentUser, models: { Words } }) => {
      if (!currentUser) throw new Error('You need to be logged in.');

      return Words.find({
        createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      }).sort({ createdAt: -1 });
    }
  },
  Mutation: {
    sendMagicLink: async (
      parent,
      { email: inputEmail },
      { models: { User } }
    ) => {
      const email = inputEmail.toLowerCase();
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!emailRegex.test(email)) throw new Error('Not a valid email address');

      let user = await User.findOne({ 'emails.address': email });

      if (!user) {
        throw new Error('No user found');
        // user = await new User({
        //   emails: [{ address: email, verified: false }]
        // }).save();
      }

      return await sendMagicLinkEmail(user);
    },
    updateProfile: async (
      parent,
      { name },
      { currentUser, models: { User } }
    ) => {
      if (!currentUser) throw new Error('You need to be logged in..');

      const user = await User.findOne({ _id: currentUser._id });

      // first time a user signs in
      if (!user.name) {
        user.verifiedEmail = true;
      }

      if (name) user.name = name;

      return user.save();
    },
    letGo: async (
      parent,
      { number_of_words, elapsed_time, date },
      { currentUser, models: { Words, User } }
    ) => {
      if (!currentUser) throw new Error('You need to be logged in..');

      // add achievements

      // calculate streak data

      const words = await new Words({
        _id: mongoose.Types.ObjectId().valueOf(),
        number_of_words,
        elapsed_time,
        date,
        owner: currentUser._id
      });
      return words.save();
    }
  },
  User: {
    words: async (user, args, { models: { Words } }) => {
      return Words.find({ owner: user._id }).sort({ createdAt: -1 });
    },
    achievements: async (user, args, { models: { Achievements } }) => {
      return Achievements.find({ owner: user._id });
    },
    name: user => user.profile.name,
    dailygoal: user => user.profile.dailygoal,
    avatar: user => user.profile.avatar,
    currentStreak: user => {
      // user.lastCompletedDay,
      const today = format(new Date(), 'yyyy-MM-dd');

      const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');

      if (
        user.lastCompletedDay === yesterday ||
        user.lastCompletedDay === today
      ) {
        return user.streak;
      } else {
        return 0;
      }
    },
    wordsToday: async (user, args, { models: { Words } }) => {
      // this will be in servers timezone.. hmm.
      const today = format(new Date(), 'yyyy-MM-dd');
      const [{ wordsToday } = { wordsToday: 0 }] = await Words.aggregate([
        { $match: { date: today, owner: user._id } },
        { $group: { _id: null, wordsToday: { $sum: '$number_of_words' } } }
      ]);
      return wordsToday;
    },
    wordsPerDay: async (user, args, { models: { Words } }) => {
      const aggregate = await Words.aggregate([
        {
          $match: {
            owner: user._id
          }
        },
        {
          $group: {
            _id: '$date',
            number_of_words: { $sum: '$number_of_words' }
          }
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            number_of_words: 1
          }
        },
        {
          $sort: {
            date: 1
          }
        }
      ]);
      return aggregate;
    },
    wordsTotal: async (user, args, { models: { Words } }) => {
      const [{ wordsTotal } = { wordsTotal: 0 }] = await Words.aggregate([
        { $match: { owner: user._id } },
        { $group: { _id: null, wordsTotal: { $sum: '$number_of_words' } } }
      ]);
      return wordsTotal;
    }
  },
  Words: {
    owner: async (words, args, { models: { User } }) => {
      return User.findOne({ _id: words.owner });
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  })
};

module.exports = resolvers;
