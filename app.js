const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();
const crosOptions = {
  origin: "https://localhost:5500",
  method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
const usersRoute = require("./src/controllers/userController");
const messageRoute = require("./src/controllers/messagesController");
const commentRoute = require("./src/controllers/comment");
const groupsRoute = require("./src/controllers/groupesController");
const postsRoute = require("./src/controllers/postControllers");
const login = require("./src/authenthication/auth");
const verifyOtp = require("./src/services/userServices");
const search = require("./src/controllers/searchController");
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://studyhubfree.netlify.app");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.get("/", async (req, res, next) => {
  res.send({
    message: "intare teck.com study hub project backend",
    status: 200,
  });
});

app.use("/api", require("./routes/api.route"));
app.use("/v1/api/like", require("./src/controllers/likes"));
app.use("/v1/api/users", usersRoute);
app.use("/v1/api/search", search);
app.use("/v1/api/loging", login);
app.use("/v1/api/groups", groupsRoute);
app.use("/v1/api/messages", messageRoute);
app.use("/v1/api/comment", commentRoute);
app.use("/v1/api/posts", postsRoute);
app.use("/v1/api/verfyotp", verifyOtp.verfyOtpcode);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
