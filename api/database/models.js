const { Schema } = require('mongoose');

const SubscriptionSchema = new Schema({
  stripeId: String,
  plan: String,
  ends: Number,
  status: String,
  country_data: new Schema({
    user_country: String,
    card_country: String,
    ip_country: String,
  }),
  payment: new Schema({
    card: new Schema({
      type: String,
      lastFour: String,
      country: String,
    }),
    nextPaymentDue: Number,
    tax_percent: Number,
  }),
});

// User
const UserSchema = new Schema({
  _id: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 },
    },
  },
  profile: {
    avatar: String,
    dailygoal: Number,
  },
  lastCompletedDay: String,
  streak: Number,
  longestStreak: Number,
  emails: [
    {
      address: String,
      verified: Boolean,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  timezone: String,
  subscription: SubscriptionSchema,
}).index({ 'emails.address': 1 }, { unique: true });

const WordsSchema = new Schema({
  _id: {
    type: String,
  },
  owner: {
    type: String,
    index: true,
  },
  number_of_words: Number,
  elapsed_time: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  date: String,
  unlocks: [Number],
  new_streak: Number,
});

const AchievementsSchema = new Schema({
  _id: String,
  owner: {
    type: String,
    index: true,
  },
  type: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const getModels = (db) => {
  return {
    User: db.model('User', UserSchema),
    Words: db.model('Words', WordsSchema),
    Achievements: db.model('Achievements', AchievementsSchema),
  };
};

module.exports = { getModels };
