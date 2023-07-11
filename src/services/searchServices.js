const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { post } = require("../controllers/searchController");
const prisma = new PrismaClient();
//////// find all posts
const searchAll = async (req, res, next) => {
  try {
    const search = req.body.search;
    const AllPosts = await prisma.post.findMany({
      where: { content: { contains: search } },
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

    const users = await prisma.users.findMany({
      where: {
        OR: [
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { email: { contains: search } },
        ],
      },
      include: {
        profilepcs: {
          include: {
            attachements: {
              select: { url: true },
            },
          },
        },
      },
    });
    users.password = users.Status = users.key = "";
    const groups = await prisma.groups.findMany({
      where: {
        OR: [{ Description: { contains: search } }, { name: search }],
      },
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    res.status(200).json({
      status: "success",
      result: {
        peaple: users,
        posts: AllPosts,
        groups: groups,
      },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { searchAll };
