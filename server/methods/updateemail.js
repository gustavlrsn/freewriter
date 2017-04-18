Meteor.methods({
  updateemail: function (email, old) {


    let addSucceeded = false;

    try{
        Accounts.addEmail(Meteor.userId(), email);
        Accounts.removeEmail(Meteor.userId(), old);
        //Accounts.sendVerificationEmail(Meteor.userId());
        addSucceeded = true;
    } catch(err) {}

    return addSucceeded;

  }
});
