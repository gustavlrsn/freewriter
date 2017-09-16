Accounts.onCreateUser(function(options, user) {
  user.subscription = {
    ends: moment().add(10, 'days').unix(),
    status: "trialing",
  }
  
  if (options.profile) {
    user.profile = options.profile;
  }

  return user;
});
