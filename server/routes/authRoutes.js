const {
  register,
  login,
  setInfo,
  logOut,
  getAllUsers,
} = require("../controllers/userController");

const router = require('express').Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setInfo/:id", setInfo);
router.post("/getAllUsers/:id", getAllUsers);
router.get("/logout/:id", logOut);

module.exports = router;