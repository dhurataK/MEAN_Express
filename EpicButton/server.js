const express = require('express');
const path = require('path');
const app = express();


app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs')
app.get("/", function(req, res){
  res.render("index");
});
const server = app.listen(8000, function() {
  console.log("Running on 8000");
});
const io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
  var count = 0;
  socket.on("pushButton_pressed", function(data) {
    count++;
    socket.emit("increase_count", {count:count});
  });
  socket.on("resetButton_pressed", function(data) {
    count = 0;
    socket.emit("reset_count", {count:count});
  });
});
