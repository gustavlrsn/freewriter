Template.login.events({
    'submit .login-form': function (event) {
        event.preventDefault();
        var emailOrUsername = event.target.emailOrUsername.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(emailOrUsername, password,function(err){
            if(err) {
                Bert.alert( (err.reason), 'danger', 'growl-top-right' );
            } else {
              FlowRouter.go('write');

              analytics.identify( Meteor.userId(), {
                email: Meteor.user().emails[0].address,
                username: Meteor.user().username,
                goal: Meteor.user().profile.dailygoal
              });

              if (!Meteor.user().username) {
                AntiModals.overlay('pickUsername');
              }
            }
        });
    }
});
