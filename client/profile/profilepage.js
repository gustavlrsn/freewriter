Template.profilepage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var username = FlowRouter.getParam('username');
    self.subscribe('singleUser', username);
  });

});

Template.profilepage.events({
  'click .resend-verification-link' ( event, template ) {
    Meteor.call( 'sendVerificationLink', ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        let email = Meteor.user().emails[ 0 ].address;
        Bert.alert( `Verification sent to ${ email }!`, 'success' );
      }
    });
  }
});

Template.profilepage.helpers({
  entries: id => {
    return Words.find({ owner: id }, {limit: 20, sort: {createdAt: -1}});
  },
  user: () => {
    return Meteor.users.findOne({username: FlowRouter.getParam('username')});
  },
  paid: () => {
    var user = Meteor.users.findOne({username: FlowRouter.getParam('username')});
    if (user.subscription) {
      var now = moment().unix();
      var ends = user.subscription.ends;
      if (now < ends){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  currentStreak: user => {
    var today = moment().format('YYYY-MM-DD');
    var yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    var lastCompletedDay = user && user.lastCompletedDay;
    var streak = user && user.streak;
    if (lastCompletedDay === yesterday || lastCompletedDay === today) {
      return streak;
    } else {
      return 0;
    }
  },
  longestStreak: user => {
    if(user.longestStreak) {
      return user.longestStreak;
    } else {
      return 0;
    }
  },
  wordsToday: id => {
    var today = moment().format('YYYY-MM-DD');
    return Words.find({ date: today, owner: id }).fetch().reduce((acc, obj) => acc + obj.number_of_words, 0);
  },
  totalWords: id => {
    return Words.find({owner: id}).fetch().reduce((acc, obj) => acc + obj.number_of_words, 0);
  },
  formatDate: function(date) {
    return moment(date).format("dddd MMM. D [at] HH:mm");
  },
  toMinutes: function(milliseconds){
    return Math.round(moment.duration(milliseconds).asMinutes());
  }
});
