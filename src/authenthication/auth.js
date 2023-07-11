const router = require("express").Router();
const { signIn } = require("../services/AuthentinticationServices");
const verifyToken = require("./middelware");
router.post("/", signIn);
router.put("/", verifyToken);
module.exports = router;
