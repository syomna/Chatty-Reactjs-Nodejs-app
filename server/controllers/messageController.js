const Messages = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data)
      return res.json({ status: 201, message: data });
    else
      return res.json({
        status: 404,
        message: "Failed to add message to the database",
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    return res.json({ messages: projectedMessages });
  } catch (error) {
    console.log(error);
  }
};


module.exports.getLastMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    })
      .sort({ updatedAt: -1 })
      .limit(1);

    if (messages.length === 0) {
      return res.json({ messages: [] });
    }

    const lastMessage = messages[0];
    const projectedMessage = {
      fromSelf: lastMessage.sender.toString() === from,
      message: lastMessage.message.text,
    };

    return res.json({ message: projectedMessage });
  } catch (error) {
    console.log(error);
  }
};

