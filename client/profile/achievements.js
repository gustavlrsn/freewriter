Template.achievements.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('achievements');
  });
});

Template.achievements.helpers({
  achievements: ()=> {
    return Achievements.find({}, {sort: {createdAt: -1}});
  },
  formatDate: function(date) {
    return moment(date).format("MMMM DD YYYY");

  }
});
