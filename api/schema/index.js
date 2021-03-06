const { gql } = require('apollo-server-micro');

const schema = gql`
  type Query {
    currentUser: User
    users: [User]
    user(username: String!): User
    tribeWords: [Words]
  }

  type Mutation {
    signUp(
      avatar: String!
      username: String!
      dailygoal: Int!
      timezone: String!
      email: String!
    ): User
    sendMagicLink(email: String!): Boolean
    editProfile(
      username: String
      dailygoal: Int
      email: String
      timezone: String
      avatar: String
    ): User
    letGo(number_of_words: Int!, elapsed_time: Int!, date: String!): Words
  }

  type User {
    _id: ID
    name: String
    dailygoal: Int
    avatar: String
    createdAt: Date
    # streak: Int
    longestStreak: Int
    # lastCompletedDay: String
    currentStreak: Int
    wordsToday: Int
    wordsTotal: Int
    username: String
    email: String
    emailVerified: Boolean
    wordsPerDay: [Words]
    words: [Words]
    achievements: [Achievements]
    timezone: String
    paying: Boolean
  }

  type Words {
    _id: ID
    number_of_words: Int
    elapsed_time: Int
    createdAt: Date
    owner: User
    date: String
    unlocks: [Int]
    new_streak: Int
  }

  type Achievements {
    _id: ID
    type: Int
    owner: User
    createdAt: Date
  }

  scalar Date
`;

module.exports = schema;
