Template.achievements.helpers({
  achievements: userId => Achievements.find({owner: userId}, {sort: {createdAt: -1}}),
  formatDate: date => moment(date).format("MMMM DD YYYY"),
});
