const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//////// find all posts
const getPosts = async (req, res, next) => {
  try {
    const Token = req.params.userTocken;
    const userInfo = await getUserInfo(Token);
    const AllPosts = await prisma.post.findMany({
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true,
            depertiment: true,
          },
        },
        attachments:{
          select:{url:true}
        },
        allcomments:{
          include:{
            users:{
              select:{
                firstName:true,
                lastName:true,
                Id:true,
              }
            },
            attachments:{
              select:{url:true}
            }
          }
        }}
    });
    const fileteredPost = AllPosts.filter(
      (post) => post.users.depertiment === userInfo.Depertment
    );
    res.status(200).json({
      Msg: "getting post api....",
      all: AllPosts,
      frequently: fileteredPost,
    });
  } catch (err) {
    next(err);
  }
};
const getUserInfo = async (Token) => {
  const userInfo = await jwt.verify(Token, process.env.PASS_KEY);
  return userInfo;
};
// create POST

const createPost = async (req, res, next) => {
  try {
    const { Token, text, attachment, status } = req.body;
    const attachmentsId = Number(attachment);
    const userInfo = await getUserInfo(Token);
    const Data = {
      content: text,
      status: status,
      userId: "" + userInfo.userId,
      attachmentsId: attachmentsId,
    };
    console.log(userInfo);
    const newPost = await prisma.post.create({
      data: Data,
      include: {
        users: { select: { firstName: true, lastName: true } },
      },
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
//// Search user

const seachPost = async (req, res, next) => {
  try {
    const search = req.params.search;
    const Token = req.body.Token;
    const userInfo = await getUserInfo(Token);
    const AllPosts = await prisma.post.findMany({
      where: {
        content: { contains: search },
      },
      orderBy: { date: "desc" },
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true,
            depertiment: true,
          },
        },
      },
    });
    const fileteredPost = AllPosts.filter(
      (post) => post.users.depertiment === userInfo.Depertment
    );
    res.status(200).json({
      status: "success",
      results: AllPosts.length,
      message: "data fetched",
      all: AllPosts,
      frequently: fileteredPost,
    });
  } catch (err) {
    next(err);
  }
};
//// Edite Post
const editPost = async (req, res, next) => {
  try {
    const { Token, text, attachment, status, postId } = req.body;
    const attachmentsId = Number(attachment);
    const userInfo = await getUserInfo(Token);
    const userId = userInfo.userId.toString();
    const Data = {
      content: text,
      status: status,
      updatedAt: now(),
    };
    const updatedPost = await prisma.post.update({
      data: Data,
      where: { id: Number(postId) },
      include: {
        users: { select: { firstName: true, lastName: true } },
      },
    });
    res.status(200).json({
      status: "success",
      update: true,
      message: "update post successfully",
      details: updatedPost,
    });
  } catch (err) {
    next(err);
  }
};
//// Delete Post
const deletePost = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);
    const Token = req.params.token;
    const userInfo = await getUserInfo(Token);
    const deletedPost = await prisma.post.deleteMany({
      where: {
        id: postId,
        userId: userInfo.userId,
      },
    });
    res.status(200).json({
      status: "success",
      message: "post deleted successfully",
      details: deletedPost,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { getPosts, createPost, seachPost, editPost, deletePost };
