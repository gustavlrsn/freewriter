Template.done.helpers({
  latest: ()=> {
    return Words.findOne({}, {limit: 1, sort: {createdAt: -1, limit: 1}});
  },
  words: function() {
    return Session.get("latest_words");
  },
  minutes: function() {
    var milliseconds = Session.get("latest_time");
    return Math.round(moment.duration(milliseconds).asMinutes());
  }
});
