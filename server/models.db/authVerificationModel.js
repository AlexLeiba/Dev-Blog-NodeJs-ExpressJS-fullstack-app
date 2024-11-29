const mongoose = require('mongoose');

// Article schema
const authVerificationSchema = new mongoose.Schema({
  userId: {
    // will refer to auto generated id of user record
    type: String,
    required: true,
  },
  uniqueString: {
    // user who is about to verify the account
    type: String,
    required: true,
    unique: false,
  },
  createdAt: {
    type: Date,
    required: true,
    unique: true,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('AuthVerification', authVerificationSchema);
