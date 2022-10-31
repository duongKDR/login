const mongoose = require('mongoose');

const userModelSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },

  // tokens: [
  //   {
  //     token: { type: String, required: true },
  //   },
  // ],

  refreshToken: { type: String },
  role: { type: String, default: "user" },
}, {
  timestamps: true,

});




const UserModel = mongoose.model('userModel', userModelSchema)

module.exports = UserModel