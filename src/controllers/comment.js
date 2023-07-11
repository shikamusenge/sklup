const verfyToken = require("../authenthication/middelware");
const router = require("express").Router();
const { createComment, deleteComent } = require("../services/commentServices");
router.post("/:postId/:Token", verfyToken, createComment);
router.delete("/:postId/:commentId/:Token", verfyToken, deleteComent);
module.exports = router;
