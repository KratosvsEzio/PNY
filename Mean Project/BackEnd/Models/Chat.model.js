const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const chatSchema = new Schema({
  name :{type : String },
  description : {type : String, default: 'add group description'},
  createdAt : {type : Date },
  updatedAt : {type : Date },
  participants : [{
    userId: {type: String },
    name: {type: String },
    email: {type: String },
    about: {type: String },
    profileImagePath: {type: String, default: 'http://127.0.0.1:4000/Images/ProfileImage/default.jpg'},
    createdAt: {type: Date},
  }],
  messages : [{
    message: {type: String },
    senderId: {type: String },
    senderName: {type: String },
    createdAt : {type : Date },
    updatedAt : {type : Date },
  }],
});


chatSchema.pre('save', function (next) {
  let now = Date.now()
  this.updatedAt = now;
  this.messages.updatedAt = now;
  // Set a value for createdAt only if it is null
  if (!this.createdAt) {
    this.createdAt = now;
  }
  if(!this.participants.createdAt) {
    this.participants.createdAt = now;
  }
  if(!this.messages.createdAt) {
    this.messages.createdAt = now;
  }
  // Call the next function in the pre-save chain
  next()
})

module.exports = mongoose.model('Chat',chatSchema);
