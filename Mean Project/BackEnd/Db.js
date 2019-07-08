const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/WhatsappDB',
  { useNewUrlParser: true },
  (err) => {
    if(!err){
      console.log("MongoDB Successfully Connected.")
    }
    else{
      console.log("Error in DB connetion: " + err)
    }
  }
);
