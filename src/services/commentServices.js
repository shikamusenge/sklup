const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// create comment
const createComment = async (req, res, next) => {
  try {
    const { postId, Token } = req.params;
    const { Text } = req.body;
    const getUserInfo = require("../authenthication/getUserinfo");
    const attachment = req.body | 1;
    const userInfo = await getUserInfo(Token);
    const userId = userInfo.userId;
    const commentData = {
      content: Text,
      userId: userId,
      attachmentsId: attachment,
      postId: Number(postId),
      status: "public",
    };
    const newComment = await prisma.comments.create({
      data: commentData,
    });
    await updatePost(postId, 1);
    res
      .status(200)
      .json({ status: "success", Message: "comment sent", detail: newComment });
  } catch (err) {
    next(err);
  }
};
const updatePost = async (postId, value) => {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(postId),
    },
  });
  const totalComment = post.comments + value;
  await prisma.post.update({
    data: {
      comments: totalComment,
    },
    where: {
      id: Number(postId),
    },
  });
};
//// comment
const deleteComent = async (req, res, next) => {
  try {
    const { commentId, postId } = req.params;
    console.log(commentId, postId);
    const newComment = await prisma.comments.delete({
      where: { id: parseInt(commentId) },
    });
    await updatePost(postId, -1);
    res
      .status(200)
      .json({ status: "success", Message: "comment sent", detail: newComment });
  } catch (err) {
    next(err);
  }
};
module.exports = { createComment, deleteComent };
