const express = require('express');
const checkAuth = require('../middleware/check-auth');
const mongoose = require('mongoose');
const routes = express.Router();

/* Require User models here */
let User = require('../Models/User.model');
let Chat = require('../Models/Chat.model');

// Create new Chat Route
routes.post("", checkAuth, (req, res, next) => {
  User.find().or([{ email: req.body.email }, { _id: req.userData.userId }])
  .select('email name profileImagePath about')
    .then(users => {
      if(!users){
        return res.status(500).json({
          message: "User Not Found"
        });
      }
      // console.log(users, 'users');
      var chat = [];
      let user= [];
      for(let i = 0; i < users.length; i++ ) {
        user.push({
          userId:users[i]._id,
          name:users[i].name,
          email:users[i].email,
          about:user[i].about,
          profileImagePath: users[i].profileImagePath,
          createdAt: new Date()
        });
        // console.log(users[i]._id, 'user');
      }
      for (const u of user) {
        if(u.email != req.userData.email){
          chat = new Chat({
            name:u.name,
            participants:user
          })
        }
      }
      chat.save()
      .then( result => {
        // console.log(result,'result after saving')
        res.status(201).json({
          message: 'user is added successfully',
          chat : {
            ...result,
            id: result._id
          }
        });
      });
    })
    .catch( err => {
      return res.status(500).json({
        message: "Chat Creation Failed",
        error: err
      })
    })
});

// Get all Chats Route
routes.get("/:userId", checkAuth, (req, res, next) => {
  const userId = req.params.userId;
  Chat.find({ "participants.userId": userId })
  .sort([['updatedAt',-1]])
    .then(documents => {
      res.status(200).json({
        message: "Chats fetched successfully!",
        chats: documents
      });
    })
});

// send message Route
routes.put("/:id", checkAuth, (req, res, next) => {
  chatId = req.params.id;
  Chat.findById(chatId, function(err, foundObject) {
    if(err){
      console.log(err,'500 Error');
      res.status(500).send();
    }else{
      if(!foundObject){
        res.status(404).send();
      }else{
        message =  {
          _id: mongoose.Types.ObjectId(),
          message: req.body.message,
          senderId: req.body.userId,
          senderName: req.body.userName,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        foundObject.messages.push(message);

        foundObject.save(function(err, updatedObject) {
          if(err){
            console.log(err);
            res.status(500).send();
          }else{
            res.status(200).json({
              message: "Message sent Successfully!",
              chats: updatedObject
            });
          }
        })
      }
    }
  })
});

//  update user in chat participants
routes.post("/:userId", checkAuth, (req, res, next) => {
  userId = req.params.userId;
  Chat.find({'participants.userId': userId}, function(err, chats) {
    if(err){
      console.log(err,'500 Error');
      res.status(500).send();
    }else{
      if(!chats){
        res.status(404).send();
      }else{
        for (const chat of chats) {
          for(i = 0; i < chat.participants.length; i++){
            if(chat.participants[i].userId === req.params.userId){
              if(req.body.userName){
                chat.participants[i].name = req.body.userName;
                for (const message of chat.messages) {
                  if(message.senderId === req.params.userId){
                    message.senderName = req.body.userName;
                  }
                }
              }
              if(req.body.about){
                console.log(chat.participants[i].about, 'before')
                chat.participants[i].about = req.body.about;
                console.log(chat.participants[i].about, 'after')
              }
              if(req.body.profileImagePath){
                chat.participants[i].profileImagePath = req.body.profileImagePath;
              }
            }
          }
          chat.save(function(err, updatedObject) {
            if(err){
              console.log(err);
              res.status(500).send();
            }
            else{
              return updatedObject;
            }
          })
        }
        res.status(200).json({
          message: "Chat Participants is updated Successfully!",
        });
      }
    }
  })
});

module.exports = routes;
