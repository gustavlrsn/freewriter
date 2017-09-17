Meteor.methods({
  setUsername: function (username) {
    let addSucceeded = false;
    try {
      Accounts.setUsername(Meteor.userId(), username);
      addSucceeded = true;
    } catch(err) {

    }
    return addSucceeded;
  }
});
