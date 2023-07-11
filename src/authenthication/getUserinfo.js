const jwt = require("jsonwebtoken");

const getUserInfo = async (Token) => {
  const userInfo = await jwt.verify(Token, process.env.PASS_KEY);
  return userInfo;
};
module.exports = getUserInfo;
