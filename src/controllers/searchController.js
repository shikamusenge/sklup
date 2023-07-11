const verfyToken = require("../authenthication/middelware");
const router = require("express").Router();
const { searchAll } = require("../services/searchServices");
router.post("/", verfyToken, searchAll);
module.exports = router;
