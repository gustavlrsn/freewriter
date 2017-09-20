Template.chooseavatar.onCreated(function() {
  Session.setTemp("avatar", "achebe");
});

Template.chooseavatar.events({
  'click .next': function() {
    BlazeLayout.render('MainLayout', {main: 'setdailygoal'});
  },
  'click .signup-badge': function(e) {
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", e.target.id);
    $('#' + e.target.id).addClass('selected');
  }
});

Template.setdailygoal.events({
  'click .next': function() {
    var dailygoal = document.getElementById("dailygoal").value;
    var n = Number(dailygoal);
    check(n, Number);
    if(n>0){
      Session.setTemp("dailygoal", n);
      BlazeLayout.render('MainLayout', {main: 'signup'});
    } else {
      Bert.alert("Input a valid number above 0!");
    }

  }
});


Template.signup.events({
    'submit .signup-form': function (event) {

        event.preventDefault();

        var email = event.target.email.value;
        var password = event.target.password.value;
        var username = event.target.username.value;
        var avatar = Session.get("avatar");
        var dailygoal = Session.get("dailygoal");

        var user = {
          username,
          email,
          password,
          profile: {
            avatar,
            dailygoal
          }
        };
        if (/^[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/.test(username)) {
          Accounts.createUser(user, function(err) {
              if(err) {
                  Bert.alert( (err.reason), 'danger', 'growl-top-right' );
              } else {
                Meteor.call( 'sendVerificationLink', ( error, response ) => {
                  if ( error ) {
                    Bert.alert( error.reason, 'danger', 'growl-top-right' );
                  }
                });
                FlowRouter.go('write');

                analytics.identify( Meteor.userId(), {
                  email: Meteor.user().emails[0].address,
                  username: Meteor.user().username,
                  goal: Meteor.user().profile.dailygoal,
                  subscription: "trial"
                });


                AntiModals.overlay("welcome");
              }
          });
        } else {
          Bert.alert("Your username can only contain letters, numbers and '_'");
        }
    }
});
