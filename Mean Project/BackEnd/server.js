const http = require('http');
const app = require('./app');
var socket = require('socket.io');
const debug = require("debug")("node-angular");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "4000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);

//socket setup
var User = require('./Models/User.model');
var Chat = require('./Models/Chat.model');

var io = socket(server);
io.on('connection', socket => {
  console.log('made socket connection');

  //join room
  socket.on('chatroom', data =>{
    //check if this User really exist
    User.findOne({_id: data.userId })
    .then( user => {
      //if user exists then join the chat rooms
      if(user){
        for (const chat of data.chats) {
          socket.join(chat._id);
        }
        console.log('joined rooms')
      }else{
        return "user does not exist";
      }
    })
  })

  //send message in room
  socket.on('chat', data => {
    io.in(data.chatId).emit('msg', data);
  })

  //send user is typing in room
  socket.on('typing', data => {
    socket.to(data.chatId).emit('typing', data);
  })

  //trigger update chat participant
  socket.on('updateChatParticipants', data => {
    io.emit('updateChatParticipants', data);
  })

  //disconnect user
  socket.on('disconnect', data => {
    console.log('user disconnected');
  })

})

server.listen(port);
