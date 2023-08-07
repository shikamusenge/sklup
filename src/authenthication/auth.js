const router = require("express").Router();
const { signIn } = require("../services/AuthentinticationServices");
const verifyToken = require("./middelware");
router.post("/", signIn);
router.put("/:Token", verifyToken, (req,res)=>{
    res
    .status(200)
    .json({ tokenExpired: false, message: "Your session is ok" });
});
module.exports = router;
