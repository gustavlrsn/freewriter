const { Schema } = require('mongoose');

// User
const UserSchema = new Schema({
  _id: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  profile: new Schema({
    name: String,
    avatar: String,
    dailygoal: Number
  }),
  lastCompletedDay: String,
  streak: Number,
  longestStreak: Number,
  emails: [
    new Schema({
      address: String,
      verified: Boolean
    })
  ],
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  // verified_email: {
  //   type: Boolean,
  //   default: false
  // },
  createdAt: {
    type: Date,
    default: Date.now
  },
  timezone: String
});

const WordsSchema = new Schema({
  _id: {
    type: String
  },
  owner: {
    type: String,
    index: true
  },
  number_of_words: Number,
  elapsed_time: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  date: String,
  unlocks: [Number],
  new_streak: Number
});

const AchievementsSchema = new Schema({
  _id: String,
  owner: {
    type: String,
    index: true
  },
  type: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const getModels = db => {
  return {
    User: db.model('User', UserSchema),
    Words: db.model('Words', WordsSchema),
    Achievements: db.model('Achievements', AchievementsSchema)
  };
};

module.exports = { getModels };
