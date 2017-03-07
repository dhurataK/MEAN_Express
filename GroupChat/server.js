const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.get('/', function(req, res) {
  res.render("index")
});

const server = app.listen(8000, function() {
  console.log("Running on port 8000");
});

const io = require('socket.io').listen(server);
io.sockets.on('connection',function(socket){
  socket.on("joined_user", function(data) {
    console.log(data.name);
    socket.broadcast.emit("user_joined",data);
  });
  socket.on("new_message", function(data) {
    io.emit("message_recieved", data);
  });
});
