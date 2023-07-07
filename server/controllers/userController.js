const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameExists = await User.findOne({ username });
    if (usernameExists)
      return res.json({ status: 409, message: "Username already exists" });
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.json({ status: 409, message: "Email already exists" });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    delete user.password;
    return res.json({ status: 201, user });
  } catch (error) {
    console.log(error);
  }
}


  module.exports.setInfo = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { profileImage, bio } = req.body;
      const user = await User.findByIdAndUpdate(id, { profileImage, bio }, { new: true });
      if (!user) return res.json({ status: 401, message: "Cannot update values" });
      return res.json({ status: 200, user });
    } catch (error) {
      console.log(error);
    }
  };

  module.exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res.json({
          status: 401,
          message: "Incorrect Username or Password",
        });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({
          status: 401,
          message: "Incorrect Username or Password",
        });
      delete user.password;
      return res.json({ status: 200, user });
    } catch (error) {
      console.log(error);
    }
  };

  module.exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({ _id: { $ne: req.params.id } })
        .select(["email", "username", "profileImage", "bio", "_id"])
        .sort({ updatedAt: 1 });
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };

  module.exports.logOut = (req, res, next) => {
    try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  }

