const { addMessage, getMessages, getLastMessage } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/addMessage", addMessage);
router.post("/getMessages", getMessages);
router.post("/getLastMessage", getLastMessage);

module.exports = router;
