Template.achievements.onCreated(function () {
  var self = this;
  self.autorun(function() {
    self.subscribe('achievements');
  });
});

Template.achievements.helpers({
  achievements: () => Achievements.find({}, {sort: {createdAt: -1}}),
  formatDate: date => moment(date).format("MMMM DD YYYY"),
});
