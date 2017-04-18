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
    self.subscribe('wordsPerDay');
    self.subscribe('userData');
  });
});


// Global helpers //
///////////////////////////////////////

Template.registerHelper( 'nopermission', () => {
  var user = Meteor.users.findOne({ _id: Meteor.userId() });

  var now = moment().unix();

  if (user && user.subscription){
    var ends = user.subscription.ends;

    if (now > ends) {
      return true;
    } else {
      return false;
    }
  }
});

Template.registerHelper( 'wordsToday', () => {

  return totalWordsToday();
});

function totalWordsToday() {
  var today = moment().format('YYYY-MM-DD');

  var total = Words.find({ date: today, owner: Meteor.userId() }).fetch().map(item => item.number_of_words).reduce((a, b) => a + b, 0);
  return total;
}

Template.registerHelper( 'totalWordsWritten', () => {
  var total = Words.find({}).fetch().map(item => item.number_of_words).reduce((a, b) => a + b, 0);
  return total;
});

Template.registerHelper( 'oldCurrentStreak', () => {
  var streak = 0;
  var wordPerDayArray = aggregatedWords.find({}, {sort: {_id: -1}}).fetch();

  for (i = 0; i < wordPerDayArray.length; i++){
    var testdate = moment().subtract(i + 1, 'days').format('YYYY-MM-DD'); // (Yesterday - (i+1) days) formatted as 'YYYY-MM-DD'
    var obj = _.find(wordPerDayArray, function(obj) { return obj._id == testdate });
    if (obj) {
      if (obj.total >= 750) {
        streak += 1;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  var today = moment().format('YYYY-MM-DD');
  var obj = _.find(wordPerDayArray, function(obj) { return obj._id == today });
  if (obj) {
    if (obj.total >= 750) {
      streak += 1;
    }
  }
  return streak;
});

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
