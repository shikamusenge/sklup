const jwt = require("jsonwebtoken");
const verfyToken = async (req, res, next) => {
  const token = req.body.Token || req.params.Token;
  const isTokensValid = await jwt.verify(
    token,
    process.env.PASS_KEY,
    (err, decoded) => {
      if (err) {
        res
          .status(500)
          .json({ ok: false, message: "Your session hasbeen expierd Login" });
      } else {
        next();
      }
    }
  );
};
module.exports = verfyToken;
