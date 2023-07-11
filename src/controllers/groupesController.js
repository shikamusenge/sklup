const router = require("express").Router();
const {
  inviteMember,
  joinGroup,
  getAllGroups,
  searchGroup,
  createGroup,
  leftGroup,
  gettingPosts,
} = require("../services/groupServices");
const verfyToken = require("../authenthication/middelware");

router.put("/:groupId", verfyToken, joinGroup);
router.put("/posts/:groupId", verfyToken, gettingPosts);
router.put("/invite/:groupId/:memberId", inviteMember);
router.get("/", getAllGroups);

router.get("/:search", searchGroup);
router.delete("/:groupId", verfyToken, leftGroup);
router.post("/", verfyToken, createGroup);
module.exports = router;
