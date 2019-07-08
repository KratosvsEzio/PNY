const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const routes = express.Router();

/* Require User models here */
let User = require('../Models/User.model');

// Register User Route
routes.post("/signup",(req, res, next) => {
  console.log(req.body.name);
  bcrypt.hash(req.body.password,10)
    .then(hash => {
      const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hash
      });
      user.save()
      .then(result => {
        res.status(201).json({
          message: 'user is added successfully',
          result : result
        });
      })
      .catch(err => {
        res.status(500).json({
          error : err
        });
      });
    }
  );

});

//Login User Route
routes.post("/login",(req, res, next) => {
  let fetchedUser;
  User.findOne({ email : req.body.email })
    .then(user => {
      if(!user){
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare( req.body.password, user.password );
    })
    .then( result => {
      if(!result){
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      // Token Creation
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        'aashir_azeem_hamza_azeem_azeem_ud_din',
        { expiresIn: '1h'}
      );
      // Sending token after successful Auth
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        user: {
          userId: fetchedUser._id,
          userName: fetchedUser.name,
          profileImage: fetchedUser.profileImagePath,
          about: fetchedUser.about
        },
        message: "Auth Successfull"
      })
    })
    .catch( err => {
      return res.status(401).json({
        message: "Auth failed",
        error: err
      })
    })
});

const MIMETypes = {
  'image/jpg': 'jpg',
  'image/gif': 'gif',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// storing the file on server
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIMETypes[file.mimetype];
    let error = new Error("Invalid mime type")
    if(isValid) {
      error = null;
    }
    callback(error, "Images/ProfileImage");
  },
  filename: (req, file, callback) => {
    let name = file.originalname.toLowerCase().split('.');
    name = name[0].split(' ').join('')
    const ext = MIMETypes[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + ext)
  }
});

//Update User Route
routes.put("/:id", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
  userId = req.params.id;
  // console.log(req.body);
  User.findById(userId, function(err, foundObject) {
    if(err){
      console.log(err,'500 Error');
      res.status(500).send();
    }else{
      if(!foundObject){
        res.status(404).send();
      }else{
        if(req.body.about){
          foundObject.about = req.body.about;
        }
        if(req.body.userName){
          foundObject.name = req.body.userName;
        }
        if(req.file){
          const url = req.protocol + "://" + req.get("host");
          foundObject.profileImagePath =  url + "/Images/ProfileImage/" + req.file.filename;
        }
        foundObject.save(function(err, updatedObject) {
          if(err){
            console.log(err);
            res.status(500).send();
          }else{
            res.status(200).json({
              message: "User Updated Successfully!",
              user: {
                userId: updatedObject._id,
                userName: updatedObject.name,
                profileImage: updatedObject.profileImagePath,
                about: updatedObject.about,
              },
            });
          }
        })
      }
    }
  })
});

module.exports = routes;
