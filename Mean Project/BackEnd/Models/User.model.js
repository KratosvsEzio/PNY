const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name :{ type : String, required : true },
  email :{ type : String, required : true, unique :true },
  password :{ type : String, required : true },
  about :{ type : String, default: "Hey there! I am using WhatsApp." },
  profileImagePath: { type: String, default: 'http://127.0.0.1:4000/Images/ProfileImage/default.jpg'},
  createdAt : { type : Date },
  updatedAt : { type : Date },
});

userSchema.pre('save', function (next) {
  let now = Date.now()
  this.updatedAt = now
  // Set a value for createdAt only if it is null
  if (!this.createdAt) {
    this.createdAt = now
  }
  // Call the next function in the pre-save chain
  next()
})

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema);
