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

    'click #salinger': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'salinger'}});
    },
    'click #angelou': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'angelou'}});
    },
    'click #beckett': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'beckett'}});
    },
    'click #christie': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'christie'}});
    },
    'click #dali': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'dali'}});
    },
    'click #dostoyevsky': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'dostoyevsky'}});
    },
    'click #hemingway': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'hemingway'}});
    },
    'click #joyce': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'joyce'}});
    },
    'click #jung': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'jung'}});
    },
    'click #kafka': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'kafka'}});
    },
    'click #lennon': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'lennon'}});
    },
    'click #nietzsche': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'nietzsche'}});
    },
    'click #orwell': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'orwell'}});
    },
    'click #rand': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'rand'}});
    },
    'click #steinbeck': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'steinbeck'}});
    },
    'click #tolkien': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'tolkien'}});
    },
    'click #tolstoy': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'tolstoy'}});
    },
    'click #vonnegut': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'vonnegut'}});
    },
    'click #watts': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'watts'}});
    },
    'click #woolf': function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'woolf'}});
    },
    'click #achebe': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'achebe'}});
    },
    'click #adams': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'adams'}});
    },
    'click #ali': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'ali'}});
    },
    'click #arendt': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'arendt'}});
    },
    'click #baldwin': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'baldwin'}});
    },
    'click #barnes': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'barnes'}});
    },
    'click #beauvoir': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'beauvoir'}});
    },
    'click #earhart': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'earhart'}});
    },
    'click #gordimer': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'gordimer'}});
    },
    'click #huxley': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'huxley'}});
    },
    'click #kahlo': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'kahlo'}});
    },
    'click #kerouac': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'kerouac'}});
    },
    'click #lee': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'lee'}});
    },
    'click #marquez': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'marquez'}});
    },
    'click #nin': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'nin'}});
    },
    'click #plath': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'plath'}});
    },
    'click #rich': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'rich'}});
    },
    'click #suyin': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'suyin'}});
    },
    'click #thoreau': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'thoreau'}});
    },
    'click #tupac': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'tupac'}});
    },
    'click #weil': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'weil'}});
    },
    'click #whitman': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": 'whitman'}});
    }
});
