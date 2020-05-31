const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: 'freewriter.io',
});

const { generateLoginJWT } = require('./auth');

const sendMagicLinkEmail = async (user) => {
  // send magic link in production, log it in development
  const token = await generateLoginJWT(user);

  if (process.env.NODE_ENV === 'production') {
    const url = `https://freewriter.io/?token=${token}`;
    var data = {
      from: 'Freewriter <info@freewriter.io>',
      to: user.emails[0].address,
      subject: 'Login to Freewriter',
      text: `Here is your magic link: ${url}`,
    };

    return mailgun
      .messages()
      .send(data)
      .then(() => {
        console.log('Successfully sent magic link with Mailgun');
        return true;
      })
      .catch((error) => {
        throw new Error('Failed to send magic link');
      });
  } else {
    const url = `http://localhost:3000/?token=${token}`;
    console.log(`Here is your magic link: ${url}`);
    return true;
  }
};

module.exports = {
  sendMagicLinkEmail,
};
