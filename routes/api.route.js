const router = require('express').Router();
const path = require("path");
const FileSystem=require('fs')
router.get('/:filename', async (req, res, next) => {
    const fileName = req.params.filename;
  const filePath = path.join(__dirname,'../uploads',fileName);
  FileSystem.readFile(filePath,(err,data)=>{
    if(err){
      console.error("Error reading file:",err);
      res.status(404).send('File Not Found');
      return;
    }
    res.send(data);
  })
});

module.exports = router;
