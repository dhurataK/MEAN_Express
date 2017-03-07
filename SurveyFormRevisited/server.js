const express = require('express');
const path = require('path'); // a core Node module working with and handling paths
const bodyParser = require('body-parser');
const app = express();

// Returns middleware that only parses urlencoded bodies.
// A new body object containing the parsed data is populated  on the request object after the middleware
// This object will contain key-values pairs where the value can be a string or array(when extended is false) or
// any type (when extended is true)
app.use(bodyParser.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'views')); // sets up your apps view folder
app.set('view engine','ejs');

app.get('/', function(req, res){
  res.render("index");
});

const server = app.listen(8000, function() {
  console.log("Listening on port 8000");
});

const io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
  socket.on("posting_form", function(data) {
    var user = {
      name:data.response[0],
      location:data.response[1],
      language:data.response[2],
      comment:data.response[3]
    }
    socket.emit("updated_message",{updated_message:user});
    socket.emit("random_number",{random_number:"Your lucky number emitted by server is "+ Math.floor((Math.random() * 1000) + 1)});
  });
});
