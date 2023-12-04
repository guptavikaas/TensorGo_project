// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  // Add other profile fields as needed
});

module.exports = mongoose.model('User', userSchema);
