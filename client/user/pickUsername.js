Template.pickUsername.events({
    'submit .username-form': function (event, f) {
        event.preventDefault();
        var username = event.target.username.value;

        Meteor.call('setUsername', username, function(err, res) {
          if (res) {
            AntiModals.dismissOverlay($(f.firstNode).parent());
          } else {
            Bert.alert("Username is already taken.");
          }
        });

    }
});
