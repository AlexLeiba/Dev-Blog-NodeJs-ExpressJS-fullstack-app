// mongodb models
const AuthVerificationModel = require('../models.db/authVerificationModel');

// email handler
const nodemailer = require('nodemailer');

const resetPasswordEmailHtmlTemplate = require('./resetPasswordEmailHtmlTemplate');

// nodemailer transporter

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

// SEND VERIFICATION EMAIL
function forgotPassword({ email }, userDB, hashedUniqueString, res) {
  const baseUrl = process.env.BASE_URL;
  const resetPasswordUrl =
    baseUrl +
    'admin/check-reset-password/' +
    userDB._id +
    '/' +
    hashedUniqueString;

  // HTML
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: 'Reset password',
    text: `Hello ${userDB.username}, Reset your password by clicking the link below`,
    html: resetPasswordEmailHtmlTemplate({
      username: userDB.username,
      resetPasswordUrl,
      baseUrl,
    }),
  };

  // hash the unique string

  if (!hashedUniqueString) {
    res.status(400).send('Error: Something went wrong');
    throw new Error('Something went wrong , please try again');
  }

  // create a new verification user
  AuthVerificationModel.findOneAndUpdate({
    userId: userDB._id,
    uniqueString: hashedUniqueString,
    createdAt: Date.now(),
    expiresAt: new Date(Date.now() + 300000).getTime(), //5 minutes 300000 milliseconds
  }).then((newVerification) => {
    if (!newVerification) {
      res.status(400);
      throw new Error(
        'Something went wrong on updating user data, please try again'
      );
    }
  });

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      throw new Error(
        'Something went wrong on sending email :( please try again'
      );
    } else {
      res.status(201).send('Email sent successfully!');
    }
  });
}

module.exports = forgotPassword;
