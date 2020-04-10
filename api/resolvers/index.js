const { sendMagicLinkEmail } = require('../utils/email');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const mongoose = require('mongoose');
const dayjs = require('dayjs');

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
      { currentUser, models: { Words, Achievements } }
    ) => {
      if (!currentUser) throw new Error('You need to be logged in..');

      let new_streak = 0;

      const unlocks = [];

      const [{ wordsToday } = { wordsToday: 0 }] = await Words.aggregate([
        { $match: { date, owner: currentUser._id } },
        { $group: { _id: null, wordsToday: { $sum: '$number_of_words' } } }
      ]);

      const totalWordsToday = number_of_words + wordsToday;

      const [{ wordsTotal } = { wordsTotal: 0 }] = await Words.aggregate([
        { $match: { owner: currentUser._id } },
        { $group: { _id: null, wordsTotal: { $sum: '$number_of_words' } } }
      ]);

      const totalWords = number_of_words + wordsTotal;
      const today = date;
      const yesterday = dayjs(date)
        .subtract(1, 'day')
        .format('YYYY-MM-DD');
      const lastdayofmonth = dayjs(date)
        .endOf('month')
        .format('YYYY-MM-DD');
      const daysinmonth = dayjs(date).daysInMonth();
      const month = Number(dayjs(date).format('YYMM'));

      if (currentUser.lastCompletedDay === yesterday) {
        if (totalWordsToday >= currentUser.profile.dailygoal) {
          new_streak = currentUser.streak + 1;
          currentUser.streak = new_streak;
          currentUser.lastCompletedDay = today;
        }
      } else if (currentUser.lastCompletedDay === today) {
        // dont do anything right?
      } else {
        if (totalWordsToday >= currentUser.profile.dailygoal) {
          new_streak = 1;
          currentUser.lastCompletedDay = today;
          currentUser.streak = new_streak;
        } else {
          currentUser.streak = new_streak; // = 0
        }
      }

      // SET LONGEST STREAK
      if (
        !currentUser.longestStreak ||
        new_streak > currentUser.longestStreak
      ) {
        currentUser.longestStreak = new_streak;
      }

      // DAILY STREAK ACHIEVEMENTS
      var achievementsObj = await Achievements.find({ owner: currentUser._id });
      var currentAchievements = achievementsObj.map(function(a) {
        return a.type;
      });
      var dailyStreakAchievements = [1, 3, 7, 14, 30, 50, 100, 365, 500, 1000];

      if (
        new_streak &&
        dailyStreakAchievements.includes(new_streak) &&
        !currentAchievements.includes(new_streak)
      ) {
        await new Achievements({
          _id: mongoose.Types.ObjectId.valueOf(),
          type: new_streak,
          owner: currentUser._id
        }).save();

        unlocks.push(new_streak);
      }

      /// MONTHLY ACHIEVEMENTS

      if (
        today == lastdayofmonth &&
        new_streak >= daysinmonth &&
        !currentAchievements.includes(month)
      ) {
        await new Achievements({
          _id: mongoose.Types.ObjectId.valueOf(),
          type: month,
          owner: currentUser._id
        }).save();
        unlocks.push(month);
      }

      // TOTAL WORD ACHIEVEMENTS
      var wordsAchievements = [10000, 50000, 100000, 250000, 500000, 1000000];

      for (i = 0; i < wordsAchievements.length; i++) {
        if (totalWords < wordsAchievements[i]) {
          break;
        }
        if (
          totalWords >= wordsAchievements[i] &&
          !currentAchievements.includes(wordsAchievements[i])
        ) {
          await new Achievements({
            _id: mongoose.Types.ObjectId.valueOf(),
            type: wordsAchievements[i],
            owner: currentUser._id
          }).save();
          unlocks.push(wordsAchievements[i]);
        }
      }

      await currentUser.save();

      const words = await new Words({
        _id: mongoose.Types.ObjectId().valueOf(),
        number_of_words,
        elapsed_time,
        date,
        owner: currentUser._id,
        unlocks,
        new_streak: currentUser.streak
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
      const today = dayjs(
        new Date().toLocaleString('en-US', {
          timeZone: user.timezone ? user.timezone : 'Europe/London'
        })
      ).format('YYYY-MM-DD');

      const yesterday = dayjs(today)
        .subtract(1, 'day')
        .format('YYYY-MM-DD');

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
      const today = dayjs(
        new Date().toLocaleString('en-US', {
          timeZone: user.timezone ? user.timezone : 'Europe/London'
        })
      ).format('YYYY-MM-DD');

      const regular = dayjs().format('YYYY-MM-DD');
      console.log({ today, regular });

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
