const router = require("express").Router();
const verfyToken = require("../authenthication/middelware");
const {
  getAllUsers,
  searchUser,
  createUser,
  VeryfyEmail,
  confirmPassword,
  changePassword,
  restUserPassword,
  verfyOtpcode,
} = require("../services/userServices");
router.get("/", getAllUsers);
router.get("/:search", searchUser);
router.patch("/confirm", confirmPassword);
router.patch("/change/password", confirmPassword, verfyToken, changePassword);
router.post("/", VeryfyEmail, createUser);
router.post("/resetpassword", restUserPassword);
router.post("/verifyotp", verfyToken, verfyOtpcode);
module.exports = router;
