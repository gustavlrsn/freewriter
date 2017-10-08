var header;
var currentPos = [];
window.header = header;
isFaded = false;
mousemove = 0;

$(window).on('beforeunload', function () {
  if (!Reload.isHotReloading && (Session.get("count") > 3)) {
    return 'You wrote something and without clicking "Let it go" before refresh/leaving it will not count towards your progress!';
  }
});

Template.MainLayout.onRendered(function() {
  header = $('header');
  if (Meteor.userId() && Meteor.user() && !Meteor.user().username) {
    AntiModals.overlay('pickUsername');
  }
});

Template.MainLayout.events({
  'mousemove, click': function () {
    mousemove = mousemove + 1;
    if ((isFaded) && (mousemove > 1)) {
      header.stop().animate({ opacity: 100 });
			isFaded = false;
      mousemove = 0;
		}
  }
});
Template.MainLayout.helpers({
  progressBarValue: function() {
    if(Session.get("count")) {
      return totalWordsToday() + Session.get("count");
    } else {
      return totalWordsToday();
    }
  }
});

Template.MainLayout.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('userwords');
    self.subscribe('userData');
  });
});


// Global helpers //
///////////////////////////////////////

function totalWordsToday() {
  var today = moment().format('YYYY-MM-DD');

  var total = Words.find({ date: today, owner: Meteor.userId() }).fetch().map(item => item.number_of_words).reduce((a, b) => a + b, 0);
  return total;
}

Template.registerHelper( 'currentStreak', () => {
  var streak = Meteor.user().streak;
  var lastday = Meteor.user().lastCompletedDay;
  var today = moment().format('YYYY-MM-DD');
  var yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

  if (lastday == yesterday || lastday == today) {
    return streak;
  } else {
    return 0;
  }
});
