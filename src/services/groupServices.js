const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getUserInfo = require("./../authenthication/getUserinfo");
const verifyToken = require("./../authenthication/middelware");
const getAllUsers = (req, res, next) => {
  try {
    res.status(200).json({ Msg: "getting users api...." });
  } catch (err) {
    next(err);
  }
};

// create group
const createGroup = async (req, res, next) => {
  try {
    const { Token, name, Description, groupStatus, icon} = req.body;
    const currentUser = await getUserInfo(Token);
    const userId = currentUser.userId;
    console.log(userId);
    const group = await prisma.groups.create({
      data: {
        groupOunerID: userId,
        name: name,
        Description: Description,
        status: groupStatus,
        groupIcons: Number(icon),
      },
    });
    if (group) {
      res.status(201).json({
        status: "success",
        message: "group created successfuly ✅",
        detail: group,
      });
    }
  } catch (err) {
    next(err);
  }
};
//// join
const joinGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { Token } = req.body;
    const client = await getUserInfo(Token);
    const userId = client.userId;
    const Joining = await prisma.groupsMembers.create({
      data: {
        groupsId: Number(groupId),
        usersId: userId,
      },
    });
    res.status(201).json({ status: "success", detail: Joining });
  } catch (err) {
    next(err);
  }
};
/// invite
const inviteMember = async (req, res, next) => {
  const { groupId, memberId } = req.params; //
  const { Token, groupName } = req.body;

  const message = `
   You are Invited to join ${groupName} group 
   click here to join http://localhost:3000/v1/api/groups/joingroup/${groupId}/ 
  `;
  const userDeatails = await getUserInfo(Token);
  let att = 1;
  if (userDeatails) {
    const userId = userDeatails.userId.toString();
    const Data = {
      senderId: userId,
      receiverId: memberId,
      content: message,
      Status: "unread",
      attachmentsId: att,
    };
    const Messages = await prisma.messages.create({
      data: Data,
    });
    res.status(201).json({ status: 201, MessageContent: Messages, ok: true });
  }
};

const leftGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { Token } = req.body;
    const client = await getUserInfo(Token);
    const userId = client.userId;
    const Joining = await prisma.groupsMembers.delete({
      where: {
        groupsId_usersId: { groupsId: Number(groupId), usersId: userId },
      },
    });
    res.status(201).json({ status: "success", detail: Joining });
  } catch (err) {
    next(err);
  }
};
const getAllGroups = async (req, res, next) => {
  try {
    const groups = await prisma.groups.findMany({
      include: {
        groupsMembers: {
          include: {
            user: {
              select: { firstName: true, lastName: true },
            },
          },
        },
      },
    });
    res.status(200).json({ status: "success", result: groups });
  } catch (error) {
    next(error);
  }
};
// fetch group posts
const gettingPosts = async (req, res, next) => {
  try {
    const { Token } = req.body;
    const groupId = Number(req.params.groupId);
    const userInfo = await getUserInfo(Token);
    const groupPosts = await prisma.post.findMany({
      where: {
        AND: [{ type: "group" }, { groupsId: groupId }],
      },
      include: {
        groups: { select: { name: true, groupIcons: true } },
        users: { select: { firstName: true, lastName: true } },
        attachments: { select: { url: true } },
        allcomments: {
          include: {
            users: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        alllikes: {
          include: {
            users: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json({
      status: "success",
      result: groupPosts,
    });
  } catch (error) {
    next(error);
  }
};
const searchGroup = async (req, res, next) => {};
module.exports = {
  inviteMember,
  joinGroup,
  getAllGroups,
  searchGroup,
  createGroup,
  leftGroup,
  gettingPosts,
};
