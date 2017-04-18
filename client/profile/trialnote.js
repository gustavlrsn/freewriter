Template.trialnote.helpers({
  trial: function(){
    var user = Meteor.users.findOne({ _id: Meteor.userId() });
    if (user && user.subscription && (user.subscription.status == "trialing")){
      return true;
    }
  },
  endingin: function() {
    var now = moment();
    var user = Meteor.users.findOne({ _id: Meteor.userId() });
    if (user.subscription) {
      var trialends = moment.unix(user.subscription.ends);
      return now.to(trialends);
    }
  },
  ended: function() {
    var now = moment().unix();
    var trialends = Meteor.user().subscription.ends;
    if (now > trialends){
      return true;
    } else {
      return false;
    }
  }
});
