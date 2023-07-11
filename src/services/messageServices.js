const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });
const jwt = require("jsonwebtoken");
const getUserInfo = require("../authenthication/getUserinfo");
const getAllMessages = async (req, res, next) => {
  try {
    const Token = req.body.Token;
    const userDeatails = await jwt.verify(Token, process.env.PASS_KEY);
    if (userDeatails) {
      const userId = userDeatails.userId.toString();
      const Messages = await prisma.messages.findMany({
        where: {
          OR: [{ senderId: userId }, { receiverId: userId }],
        },
        include: {
          users: { select: { firstName: true, lastName: true } },
          attachements: { select: { url: true } },
        },
        orderBy: { date: "desc" },
      });
      res.status(200).json(Messages);
    }
  } catch (err) {
    next(err);
  }
};

// create account

const createMessage = async (req, res, next) => {
  try {
    const { Token, message, receiver } = req.body;
    const userDeatails = await jwt.verify(Token, process.env.PASS_KEY);
    let att = 1;
    if (userDeatails) {
      const userId = userDeatails.userId.toString();
      const Data = {
        senderId: userId,
        receiverId: receiver,
        content: message,
        Status: "unread",
        attachmentsId: att,
      };
      const Messages = await prisma.messages.create({
        data: Data,
      });
      res.status(200).json({ status: 201, MessageContent: Messages, ok: true });
    }
  } catch (err) {
    next({
      message: "some thing went wrong please try again later",
      Detail: err,
    });
  }
};
//// Read
const readMessage = async (req, res, next) => {
  try {
    const { senderId, Token } = req.params;
    const userInfo = await getUserInfo(Token);
    const receiverId = userInfo.userId;
    const Read = await prisma.messages.updateMany({
      data: { Status: "read" },
      where: {
        OR: [
          { AND: [{ senderId: senderId }, { receiverId: receiverId }] },
          { AND: [{ receiverId: senderId }, { senderId: receiverId }] },
        ],
      },
    });
    res.status(201).json({ status: "success", result: Read, Detail: userInfo });
  } catch (err) {
    next(err);
  }
};
module.exports = { getAllMessages, createMessage, readMessage };
