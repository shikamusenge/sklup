const router = require("express").Router();
const multer = require('multer');
const path = require('path');;
const upload = multer({ dest: 'uploads/' });
router.post('/', upload.single('file'), (req, res) => {
const fileUrl = `${req.file.filename}`;
res.json({ fileUrl });
});
module.exports=router;