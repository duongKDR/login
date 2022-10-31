const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./userModel");


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
