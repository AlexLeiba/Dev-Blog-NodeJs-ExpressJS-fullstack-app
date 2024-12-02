// mongodb models
const AuthVerificationModel = require('../models.db/authVerificationModel');

// email handler
const nodemailer = require('nodemailer');

// unique id generator
const { v4: uuidv4 } = require('uuid');

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
function sendVerificationEmail({ email, username }, _id, res) {
  const baseUrl = process.env.BASE_URL;
  const uniqueString = uuidv4() + _id;

  // HTML
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: 'Verify your email',
    text: `Hello ${email}, please verify your email by clicking the link below`,
    html: `<h4>Hello ${username}</h4> <h2>Welcome to Dev-Blog :)</h2> <h3>please verify your email by clicking the link below</h3>  
      <a href="${
        baseUrl + 'admin/email-verification/' + _id + '/' + uniqueString
      }">Click here to verify your email</a>
       <h4>This link will expire in 6 hours</h4>`,
  };

  // hash the unique string
  const hashedUniqueString = bcrypt.hashSync(uniqueString, 10);

  if (!hashedUniqueString) {
    res.status(400).send('Error: Something went wrong');
    throw new Error('Something went wrong with hashing the unique string');
  }

  // create a new verification user
  AuthVerificationModel.create({
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
      throw new Error('Something went wrong :(, verification email failed!');
    } else {
      res.status(201).send('Email sent successfully!');
    }
  });
}

module.exports = sendVerificationEmail;
