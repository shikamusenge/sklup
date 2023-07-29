const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getUserinfo = require("./../authenthication/getUserinfo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await prisma.users.findMany({});
    res.status(200).json({ Msg: "getting users api....", users: allUsers });
  } catch (err) {
    next(err);
  }
};
//confirm password
const confirmPassword = async (req, res, next) => {
  try {
    const { currentPassword, Token } = req.body;
    const clientInfo = await getUserinfo(Token);
    const clientEmail = clientInfo.email;
    const user = await prisma.users.findUnique({
      where: { email: clientEmail },
    });
    console.log(user);
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    console.log(isPasswordValid);
    if (isPasswordValid) {
      return next();
    } else {
      return res.status(200).json({
        confirmation: false,
        message: "password specified is not correct",
      });
    }
  } catch (err) {
    next(err);
  }
};
// Veryfy Email
const VeryfyEmail = async (req, res, next) => {
  try {
    const existUser = await prisma.users.findUnique({
      where: { email: req.body.email },
    });
    if (existUser)
      res.status(200).json({
        signup: false,
        message: `User with Email: ${req.body.email} aleady Exist`,
        User: existUser,
      });
    else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
// create account

const createUser = async (req, res, next) => {
  try {
    let newUserInfo = req.body;
    let passKey = "";
    for (let i = 0; i < 5; i++) {
      passKey += Math.floor(Math.random() * 9);
    }

    const hashedPassword = await bcrypt.hash(newUserInfo.password, 10);
    newUserInfo.key = passKey;
    newUserInfo.password = hashedPassword;
    const newUser = await prisma.users.create({ data: newUserInfo });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "intaretek@gmail.com",
        pass: process.env.NODE_Mailer_PASSWORD,
      },
    });

    const mailOptions = {
      from: "intaretek@gmail.com",
      to: req.body.email,
      subject: "SKILLUP CONFIRMATION NUMBER",
      text:
        "Enter the confirmation number below <br> SkillupNo: <b>" +
        passKey +
        "</b>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        // do something useful
      }
    });
 const Token = jwt.sign(
  {
    userId: newUser.Id,
    email: newUser.email,
    phone: newUser.phone,
    Depertment: newUser.depertiment,
    Option: newUser.option,
  },
  process.env.PASS_KEY,
  { expiresIn: "12hrs" }
);
    res.status(200).json({ signup:true,message: "sacount created successfully",token:Token });
  } catch (err) {
    next(err);
  }
};
/////////////////////////////   Rest Password ////////////////////////////////////////////////////////////////////////////
const restUserPassword = async (req, res, next) => {
  try {
    let userEmail = req.body.email;
    const leter =
      "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVNM1234567890@$%!.";
    let newPassword = "";
    for (let i = 0; i < 9; i++) {
      newPassword +=
        leter.split("")[Math.floor(Math.random() * leter.split("").length)];
    }
    const hshdPass = await bcrypt.hash(newPassword, 10);
    const newUser = await prisma.users.update({
      data: { password: hshdPass },
      where: { email: userEmail },
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "intaretek@gmail.com",
        pass: process.env.NODE_Mailer_PASSWORD,
      },
    });

    const mailOptions = {
      from: "no-reply@philemon.com",
      to: req.body.email,
      subject: "SKILLUP New Password",
      html:
        "<h1>Reset Password successfully</h1> <h3>Your New  Skillup password is</h3 <h2 style='color:darkblue'><strong> " +
        newPassword +
        "</strong> </h2> </b> <br> <h2>thank you</h2> <a href='https://studyhubfree.netlify.app' style='border-radius:3px; background-color:green; width:fit-content; padding:8px; color:black; text-decolation:none; font-size:xx-large'> LOGIN</a> <br><br><br> <h1>Chear Studyhub Team <3",
    };
    console.log(newPassword);
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        // do something useful
      }
    });

    res.status(200).json({
      status: "success",
      reset: true,
      message: "Rest Password succesfully",
      User: { email: userEmail },
    });
  } catch (err) {
    next(err);
  }
};
////////////////////////////    Search user  /////////////////////////////////////

const searchUser = (req, res, next) => {
  try {
    res.status(200).json({ Msg: "seaching users api...." });
  } catch (err) {
    next(err);
  }
};
//////////////////////////// change password ///////////////////////////////////
const changePassword = async (req, res, next) => {
  try {
    const { Token, password } = req.body;
    const userInfo = await getUserinfo(Token);
    const userEmail = userInfo.email;
    const change = await prisma.users.update({
      data: { password: password },
      where: {
        email: userEmail,
      },
    });
    return res.status(201).json({
      updatePassword: true,
      message: "password updated",
      user: userEmail,
      details: change,
    });
  } catch (err) {
    next(err);
  }
};
//// veryfy OTP CODE
const verfyOtpcode = async (req, res, next) => {
  try {
    const { Token, otp } = req.body;
    const userInfo = await jwt.verify(Token, process.env.PASS_KEY);
    if (userInfo) {
      const verifyOtp = await prisma.users.findFirst({
        where: {
          key: otp,
          Id: userInfo.userId,
        },
      });
      // send response
      if (verifyOtp) {
        const updateAccountStatus = await prisma.users.update({
          data: {
            Status: "active",
          },
          where: {
            Id: userInfo.userId,
          },
        });
        res.status(201).json({
          status:200,
          verfied: true,
          message: "OTP-Code correct welcome Home",
        });
      } else {
        res.status(200).json({
          verfied: false,
          status:200,
          message: `invalid OTP Enter valid OTP-Code sent on <b> ${userInfo.email}</b>`,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};
/// export
module.exports = {
  getAllUsers,
  createUser,
  searchUser,
  VeryfyEmail,
  confirmPassword,
  changePassword,
  restUserPassword,
  verfyOtpcode,
};
