const express = require("express");
const { Router } = require("express");
const route = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getUserInfo = require("./../authenthication/getUserinfo");
const verifyToken = require("./../authenthication/middelware");
//////// likes
route.post("/:type/:id", verifyToken, async (req, res, next) => {
  try {
    const type = req.params.type;
    const id = req.params.id.toString();
    const Token = req.body.Token;
    const likedPost = await prisma.post.findFirst({
      where: { id: Number(id) },
    });
    const userInfo = await getUserInfo(Token);
    const userId = userInfo.userId.toString();
    if (likedPost) {
      const currentLikes = likedPost.likes;
      const isliked = await prisma.likes.findFirst({
        where: { userId: userId, likedItem: id },
      });
      const likedPostId = likedPost.id.toString();
      console.log(isliked);
      if (!isliked) {
        const data = {
          likedItem: id,
          type: type,
          userId: userId,
        };
        const liking = await prisma.likes.create({
          data: data,
        });
        const liked = await prisma.post.update({
          data: {
            likes: currentLikes + 1,
          },
          where: { id: Number(id) },
        });
        res.status(201).json({
          status: "success",
          likes: liked.likes,
          message: "like added",
        });
      } else {
        res.status(404).json({
          status: "404",
          likes: likedPost.likes,
          message: "like added alerdy added",
        });
      }
    } else {
      return res.status(500).json({
        status: 500,
        message: "some thing went wrong try again later",
      });
    }
  } catch (err) {
    next(err);
  }
});
module.exports = route;
