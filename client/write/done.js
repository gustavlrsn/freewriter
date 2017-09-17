Template.done.helpers({
  latest: () => Words.findOne({}, {limit: 1, sort: {createdAt: -1, limit: 1}}),
  words: () => Session.get("latest_words"),
  username: () => Meteor.user().username,
  minutes: () => {
    var milliseconds = Session.get("latest_time");
    return Math.round(moment.duration(milliseconds).asMinutes());
  }
});
