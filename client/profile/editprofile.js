Template.editusername.events({
    'submit .editusername-form': (event, f) => {
        event.preventDefault();
        var username = event.target.username.value;
        if (/^[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/.test(username)) {
          Meteor.call('setUsername', username, function(err, res) {
            if (res) {
              AntiModals.dismissOverlay($(f.firstNode).parent());
            } else {
              Bert.alert("Username is already taken.");
            }
          });
        } else {
          Bert.alert("Your username can only contain letters, numbers and '_'");
        }

    }
});

Template.editgoal.events({
  'submit .editgoal-form': (event, f) => {
      event.preventDefault();
      var goal = event.target.goal.value;
      var n = Number(goal);
      check(n, Number);
      if(n>0){
        Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.dailygoal": n}});
        AntiModals.dismissOverlay($(f.firstNode).parent());
      } else {
        Bert.alert('Input a number above 0!', 'info');
      }

  }
});
Bert.defaults = {
  hideDelay: 3500,
  // Accepts: a number in milliseconds.
  style: 'growl-top-right',
  // Accepts: fixed-top, fixed-bottom, growl-top-left,   growl-top-right,
  // growl-bottom-left, growl-bottom-right.
  type: 'default'
  // Accepts: default, success, info, warning, danger.
};




Template.editemail.events({
  'submit .editemail-form': function (event, f) {
      event.preventDefault();
      var email = event.target.email.value;
      var old = Meteor.user().emails[0].address;


      Meteor.call("updateemail", email, old, function(err, res){
        if (res) {
          AntiModals.dismissOverlay($(f.firstNode).parent());
          Meteor.call( 'sendVerificationLink', ( error, response ) => {
            if ( error ) {
              Bert.alert( error.reason, 'danger' );
            } else {
              let email = Meteor.user().emails[ 0 ].address;
              Bert.alert( `Verification sent to ${ email }!`, 'success' );
            }
          });

        } else {
          Bert.alert("Email already in use.");
        }
      });

  }
});

Template.editpassword.events({
  'submit .editpassword-form': function (event, f) {
      event.preventDefault();

      var oldPass = event.target.old.value;
      var newPass = event.target.new.value;

      Accounts.changePassword(oldPass, newPass, function(err){
        if(err){
          console.log(err);
        } else {
          AntiModals.dismissOverlay($(f.firstNode).parent());
          Bert.alert("Password changed!");
        }

      });

  }
});





Template.editprofile.events({
    'click .resend-verification-link' ( event, template ) {
      Meteor.call( 'sendVerificationLink', ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'danger' );
        } else {
          let email = Meteor.user().emails[ 0 ].address;
          Bert.alert( `Verification sent to ${ email }!`, 'success' );
        }
      });
    },
    'click #editemail': function() {
      AntiModals.overlay("editemail");
    },
    'click #editusername': function() {
      AntiModals.overlay("editusername");
    },
    'click #editgoal': function() {
      AntiModals.overlay("editgoal");
    },
    'click #editpassword': function() {
      AntiModals.overlay("editpassword");
    },
    'click .editbadge': function(e) {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": e.target.id}})
    }
});
