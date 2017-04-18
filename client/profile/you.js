Template.you.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('wordsPerDay');
  });
});


Template.you.events({
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


Template.you.helpers({
  entries: ()=> {
    return Words.find({}, {limit: 20, sort: {createdAt: -1}});
  },

  formatDate: function(date) {
    return moment(date).format("dddd MMM. D [at] HH:mm");

  },
  toMinutes: function(milliseconds){
    return Math.round(moment.duration(milliseconds).asMinutes());
  }
});
