const MSG = require("./sendMessage");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const signIn = async (req, res, next) => {
  const { user, password } = req.body;
  let Result = {
    login: false,
    status: 200,
    Message: "Trying signIn",
    user: req.body,
  };
  try {
    const signingUser = await prisma.users.findUnique({
      where: { email: user },
    });
    if (signingUser) {
      const checkPass = await bcrypt.compare(password, signingUser.password);
      if (checkPass) {
        const redirect =
          signingUser.Status === "active"
            ? "dashboard"
            : signingUser.Status === "inprogress"
            ? "verfyotp"
            : "accountblocked";
        Result.redirect = redirect;
        (Result.login = true), (Result.Message = "Login successfully");
        Result.user = { email: signingUser.email, phone: signingUser.phone };
        const Client={
          userId: signingUser.Id,
          email: signingUser.email,
          fname: signingUser.firstName,
          lname: signingUser.lastName,
        }
        let tkn = jwt.sign(
          {
            userId: signingUser.Id,
            email: signingUser.email,
            phone: signingUser.phone,
            Depertment: signingUser.depertiment,
            Option: signingUser.option,
          },
          process.env.PASS_KEY,
          { expiresIn: "12hrs" }
        );
        Result.user=Client;
        Result.Token = tkn;
        let Mess = `StudyHub
       Confrimation number: ${signingUser.key} 
        `;
        let phone = "+250787647168";
        MSG(phone, Mess);
      } else {
        (Result.login = false),
          (Result.Message = "Password provided is not correct");
        Result.user = req.body;
      }
    } else {
      (Result.login = false), (Result.Message = "User Not found");
    }
    res.status(200).json(Result);
  } catch (err) {
    next({ status: 500, message: req.body });
  }
};
module.exports = { signIn };
