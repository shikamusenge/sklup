const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getUserinfo = require("./../authenthication/getUserinfo");
//////// add attacment to database
const addAttachment = async (req, res, next) => {
  try {
    const { Token, url } = req.body;
    const userInfo = await getUserinfo(Token);
    const Data = {
      url:url,
      status:"public"
    };
    const newPost = await prisma.attachments.create({
      data: Data,
    });
    res.status(200).json({
      status: "success",
      post: true,
      message: "Creating post successfully",
      details: newPost,
    });
  } catch (err) {
    next(err);
  }
};
module.exports=addAttachment;