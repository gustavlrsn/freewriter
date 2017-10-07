Template.managesub.helpers({

  formatDate: function(value) {
    return moment.unix(value).format("YYYY-MM-DD");

  },
  subscription: function() {
    var user = Meteor.users.findOne({ _id: Meteor.userId() });
    if (user.subscription && (user.subscription.status !== "trialing")) {
      return true;
    }
  },
  active: function(){
    var user = Meteor.users.findOne({ _id: Meteor.userId() });
    if (user.subscription && (user.subscription.status == "active")){
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
    var user = Meteor.users.findOne({ _id: Meteor.userId() });
    var ends = user.subscription.ends;
    if (now > ends){
      return true;
    } else {
      return false;
    }
  },
  stillactive: function() {
    var now = moment().unix();
    var user = Meteor.users.findOne({ _id: Meteor.userId() });
    if (user && user.subscription) {
      var ends = user.subscription.ends;
      if (now > ends){
        return false;
      } else {
        return true;
      }
    }
  },
  price: function(plan) {
    if (plan == 'monthly') {
      return "$4/month";
    } else if (plan == 'yearly'){
        return "$40/year";
      } else {
          return 0
        }
  }
});
Template.managesub.events({
  'click [data-id=cancel-subscription]': function() {
    var confirmCancel = confirm("Are you sure you want to cancel your subscription?");
    if (confirmCancel){
      Meteor.call('stripeCancelSubscription', function(error, response){
        if(error){
          Bert.alert(error.reason, "danger");
        } else {
          if (response.error) {
            Bert.alert(response.error.message, "danger");
          } else {
            // Session set in Meteor Chef example.
            analytics.track("Canceled plan");
            Bert.alert("Subscription canceled!", "success");
          }
        }
      });
    }
  }
});
