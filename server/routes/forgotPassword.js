// mongodb models
const AuthVerificationModel = require('../models.db/authVerificationModel');

// email handler
const nodemailer = require('nodemailer');

// password handler
const bcrypt = require('bcrypt');

// nodemailer transporter

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

// SEND VERIFICATION EMAIL
function forgotPassword({ email, username }, _id, hashedUniqueString, res) {
  // const localBaseUrl = 'http://localhost:5001/';
  const productionBaseUrl = 'https://full-stack-blog-37mi.onrender.com/';

  // HTML
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: 'Reset password',
    text: `Hello ${email}, Reset your password by clicking the link below`,
    html: `<h4>Hello ${username}</h4> <h2>Welcome back to Dev-Blog :)</h2> <h3>Reset your password by clicking the link below</h3>  
      <a href="${
        productionBaseUrl +
        'admin/check-reset-password/' +
        _id +
        '/' +
        hashedUniqueString
      }">Click here to verify your email</a>
       <h4>This link will expire in 6 hours</h4>`,
  };

  // hash the unique string

  if (!hashedUniqueString) {
    res.status(400).send('Error: Something went wrong');
    throw new Error('Something went wrong with hashing the unique string');
  }

  // create a new verification user
  AuthVerificationModel.findOneAndUpdate({
    userId: _id, //AuthModel _id === AuthVerificationModel userId
    uniqueString: hashedUniqueString,
    createdAt: Date.now(),
    expiresAt: new Date(Date.now() + 21600000).getTime(), //6 hours 21600000 milliseconds
  }).then((newVerification) => {
    if (!newVerification) {
      res.status(400);
      throw new Error('Something went wrong on creating verification user');
    }
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error('Something went wrong :( please try again');
    } else {
      res.status(201).send('Email sent successfully!');
    }
  });
}

module.exports = forgotPassword;
