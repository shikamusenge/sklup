const express = require("express");
const { Router } = require("express");
const route = Router();
const verifyToken = require("./../authenthication/middelware");
const {
  getPosts,
  createPost,
  seachPost,
  editPost,
  deletePost,
} = require("../services/postservices");
route.get("/fetch/:userTocken", getPosts);
route.post("/", verifyToken, createPost);
route.delete("/:id/:token", verifyToken, deletePost);
route.put("/", verifyToken, editPost);
route.put("/:search", verifyToken, seachPost);
module.exports = route;
