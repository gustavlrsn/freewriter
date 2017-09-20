Template.pickUsername.events({
    'submit .username-form': function (event, f) {
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
