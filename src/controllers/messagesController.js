const router = require("express").Router();
const {
  getAllMessages,
  readMessage,
  createMessage,
} = require("../services/messageServices");
const verfyToken = require("../authenthication/middelware");
router.put("/", verfyToken, getAllMessages);
router.get("/:Token/:senderId", verfyToken, readMessage);
router.post("/", verfyToken, createMessage);
module.exports = router;
