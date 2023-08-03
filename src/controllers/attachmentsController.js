const verfyToken = require("../authenthication/middelware");
const router = require("express").Router();
const addAttachment = require("../services/attachmentServices");
router.post("/", verfyToken, addAttachment);
module.exports = router;