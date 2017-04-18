Accounts.emailTemplates.siteName = "Freewrite";
Accounts.emailTemplates.from     = "Freewrite <admin@freewrite.org>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[Freewrite] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email.`;

    return emailBody;
  }
};

Accounts.emailTemplates.resetPassword = {
  subject() {
    return "Reset password on Freewrite.org";
  },
  text( user, url ) {
    let urlWithoutHash = url.replace( '#/', '' ),
        emailBody      = `To reset your password, simply visit the following link:\n\n${urlWithoutHash}\n\nThanks!`;

    return emailBody;
  }
};
