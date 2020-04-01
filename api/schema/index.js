const { gql } = require('apollo-server-micro');

const schema = gql`
  type Query {
    currentUser: User
    users: [User]
    user(username: String!): User
    tribeWords: [Words]
  }

  type Mutation {
    sendMagicLink(email: String!): Boolean
    updateProfile(name: String): User
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
    wordsPerDay: [Words]
    words: [Words]
    achievements: [Achievements]
  }

  type Words {
    _id: ID
    number_of_words: Int
    elapsed_time: Int
    createdAt: Date
    owner: User
    date: String
    unlocks: [Int]
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
