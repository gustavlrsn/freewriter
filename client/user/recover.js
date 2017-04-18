

Template.ResetPassword.onCreated(function() {
   if(Accounts._resetPasswordToken) {
     Session.set('resetPassword', Accounts._resetPasswordToken);
   }
});

Template.ResetPassword.helpers({
  resetPassword: function(){
    return Session.get('resetPassword');
  }
});

Template.ResetPassword.events({
  'submit .resetPasswordForm': function(e, t) {
    e.preventDefault();
    var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('#resetPasswordPassword').val(),
        passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();
        Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
        if (err) {
          Bert.alert( 'Sorry, but something went wrong.', 'danger', 'growl-top-right' );
        } else {
          Bert.alert( 'Your password has been changed. Welcome back!', 'success', 'growl-top-right' );
          Session.set('resetPassword', null);
        }
      });
    return false;
  }
});

Template.ForgotPassword.events({
  'submit .ForgotPasswordForm': function(e, t) {
    e.preventDefault();

    var forgotPasswordForm = $(e.currentTarget),
        email = forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase();

      Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            Bert.alert( 'Sorry, this email does not exist.', 'danger', 'growl-top-right' );

          } else {
            Bert.alert( 'Sorry, but something went wrong.', 'danger', 'growl-top-right' );
          }
        } else {
            Bert.alert( 'Email sent! Check your mailbox.', 'success', 'growl-top-right' );
        }
      });

    return false;
  },
});
