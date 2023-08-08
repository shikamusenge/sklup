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
const upload = require("./src/services/uploadservice");
const attchmentRoute = require("./src/controllers/attachmentsController");
const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'https://studyhubfree.netlify.app',
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.get("/", async (req, res, next) => {
  res.send({
    message: "intare teck.com study hub project backend",
    status: 200,
  });
});

app.use("/files", require("./routes/api.route"));
app.use("/v1/api/like", require("./src/controllers/likes"));
app.use("/v1/api/users", usersRoute);
app.use("/v1/api/search", search);
app.use("/v1/api/loging", login);
app.use("/v1/api/groups", groupsRoute);
app.use("/v1/api/messages", messageRoute);
app.use("/v1/api/comment", commentRoute);
app.use("/v1/api/posts", postsRoute);
app.use("/v1/api/upload", upload);
app.use("/v1/api/savefile", attchmentRoute);
app.use("/v1/api/verfyotp", verifyOtp.verfyOtpcode);
app.use(express.static('uploads'));
app.use((req, res, next) => {
  next(createError.NotFound());
});


app.get('/files/:filename',(req,res)=>{
  // const fileName = req.params.filename;
  // const filePath = path.join(__dirname,'uploads',fileName);


  // FileSystem.readFile(filePath,(err,data)=>{
  //   if(err){
  //     console.error("Error reading file:",err);
  //     res.status(404).send('File Not Found');
  //     return;
  //   }
  //   res.send(data);
  // })
  res.send({'msg':'getting files'});
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
