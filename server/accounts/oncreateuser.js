Accounts.onCreateUser(function(options, user) {

  //var trialends = moment().add(10, 'days').unix();
  var trialends = moment().add(10, 'days').unix();
  user.subscription = {};
  user.subscription.ends = trialends;
  user.subscription.status = "trialing";

  if (options.profile)
    user.profile = options.profile;
  return user;

});
