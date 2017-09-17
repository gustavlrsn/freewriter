Template.profilepage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var username = FlowRouter.getParam('username');
    self.subscribe('singleUser', username);
  });

});

Template.profilepage.onRendered(function() {
  var username = FlowRouter.getParam('username');
  var user = Meteor.users.findOne({username: username});
  var url = `https://freewriter.io/@${username}`;
  var avatarUrl = `https://freewriter.io/badges/${user.profile.avatar}.png`;
  var title = `@${user.username} at Freewriter`;
  DocHead.addMeta({property: 'description', content: 'Experience the magic of freewriting. Write every day, without stopping to judge or edit.'});
  DocHead.addMeta({property: 'keywords', content: 'freewriting, morning pages, free writing'});
  DocHead.addMeta({property: 'twitter:card', content: 'summary'});
  DocHead.addMeta({property: 'twitter:title', content: title});
  DocHead.addMeta({property: 'twitter:image', content: avatarUrl });
  DocHead.addMeta({property: 'twitter:site', content: '@tryfreewrite'});
  DocHead.addMeta({property: 'twitter:description', content: 'Experience the magic of freewriting. Write every day, without stopping to judge or edit.'});

  DocHead.addMeta({property: 'og:image', content: avatarUrl});
  DocHead.addMeta({property: 'og:image:width', content: '512'});
  DocHead.addMeta({property: 'og:image:height', content: '512'});
  DocHead.addMeta({property: 'og:title', content: title});
  DocHead.addMeta({property: 'og:type', content: 'website'});
  DocHead.addMeta({property: 'og:description', content: 'Experience the magic of freewriting. Write every day, without stopping to judge or edit.'});
  DocHead.addMeta({property: 'og:url', content: url});
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
