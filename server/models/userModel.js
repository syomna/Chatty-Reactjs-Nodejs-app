const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 15,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 40,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    profileImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);