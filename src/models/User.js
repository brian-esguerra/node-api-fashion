const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Model User
 * @class User
 * @param {Object} user
 * @param {String} user.email - email user (Unique)
 * @param {String} user.password - password crypt MD5
 * @param {String} user.name - full name
 * @param {Boolean} user.oferts - oferts (Optional)
 * @param {String} user.address - address (Optional)
 */
const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  oferts: { type: Boolean, required: false, default: false },
  address: { type: String, required: false, default: '' },
});

module.exports = mongoose.model('User', UserSchema);
