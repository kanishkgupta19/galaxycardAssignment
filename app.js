const flash = require('flash'); 
const app = require('./settings');
const path = require('path');
const multer = require('multer');

//File Upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'assets/uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const { DataTypes, QueryTypes, useInflection } = require('sequelize');
//Database
require('./src/database/db');


//Models
const User = sequelize.define('users', {
    // Model attributes are defined here
    username: DataTypes.STRING,
    contact: DataTypes.BIGINT,
    email: DataTypes.STRING
});

const Files = sequelize.define('files', {
    // Model attributes are defined here
    filename: DataTypes.STRING,
    filepath: DataTypes.STRING,
    userid: DataTypes.INTEGER
});


app.get("/", (req, res)=>{
    res.render("index");
});

app.get("/user/:userid", async (req, res)=>{
    let uid = req.params.userid;
    let userInfo = await User.findOne({
        where: {
          id: uid
        }
      });
    
    var records = JSON.stringify(userInfo, null, 2);
    let files = await Files.findAll({
        where: {
          userid: uid
        }
      });
    var file_records = JSON.parse(JSON.stringify(files, null, 2));
    var userrecord = [JSON.parse(records), file_records];
    res.render("user", {data: userrecord});
});

app.get("/admin", async (req, res)=>{
    let userInfo = await User.findAll();
    var records = JSON.stringify(userInfo, null, 2);
      records = JSON.parse(records);
    let admin_status = req.query.status;
    if(admin_status=='success')
        res.render("admin", {records: records, message:"User Updated Successfully", status:'success'});
    else if(admin_status=='error')
        res.render("admin", {records: records, message:"Some Error Occurred", status:'error'});
    else
        res.render("admin", {records: records, message:'null', status:'null'});
});

app.post("/add-user",async (req, res)=>{
    const data = req.body;
    const jane = await User.create({ username: data.username, contact: data.contact, email: data.email});
    jane.save();
    res.redirect('/admin');
});

app.post("/update-user", async (req, res)=>{
    const data = req.body;
    const uid = data.userid;
    
    const update = await User.update({ username: data.username, contact: data.contact, email: data.email}, {
        where: {
          id: uid
        }
      });
    if(update[0]==1)
    {
        res.redirect('/admin?status=success');
    }
    else{
        res.redirect('/admin?status=error');
    }
    
});

app.post('/upload-file',  async (req, res)=>{
    const files = req.file;
    let upload = multer({storage: storage}).single('file');
    upload(req, res, async function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        const filedata = await Files.create({filename:req.body.filename, filepath:req.file.path, userid:req.body.userid});
        filedata.save();
        // Display uploaded image for user validation
        //res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
        backURL=req.header('Referer') || '/';
        // do your thang
            res.redirect(backURL);
    });

    //res.send("File Uploaded");
    
});

app.post("/delete-user", async (req, res)=>{
    const data = req.body;
    const uid = data.delete_userid;
    var deleteuser = await User.destroy({
        where: {
          id: uid
        }
      });
    res.redirect('/admin');
});

app.post("/delete-file", async (req, res)=>{
    const data = req.body;
    const uid = data.fileid;
    var deleteuser = await Files.destroy({
        where: {
          id: uid
        }
      });
      backURL=req.header('Referer') || '/';
     res.redirect(backURL);
});

app.post('/login', async (req, res)=>{
    const data = req.body;
    const record = await User.findOne({where: {email:data.email, username:data.username} });
    console.log(record);
    if(record)
        res.redirect('/user/'+record.id);  
    else
        {res.send("No Records Found"); } 
});

  app.listen(9980, ()=>{
    console.log("Server Started..");
});