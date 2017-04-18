Template.login.events({
    'submit .login-form': function (event) {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(email,password,function(err){
            if(err) {
                Bert.alert( (err.reason), 'danger', 'growl-top-right' );
            } else {
              FlowRouter.go('write');
              
              analytics.identify( Meteor.userId(), {
                email: Meteor.user().emails[0].address,
                name: Meteor.user().profile.name,
                goal: Meteor.user().profile.dailygoal
              });
            }
        });
    }
});
