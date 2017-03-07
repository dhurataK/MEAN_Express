const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const app = express();

app.use(session({
  secret:'DojoCoding'
}));
app.use(bodyParser.urlencoded({extended:true}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');// here we're setting up the ejs

app.get('/', function(req,res){
  res.render("index");
});
app.post('/result', function (req, res) {

  req.session.inputs = {
    name: req.body.name,
    location: req.body.location,
    language: req.body.language,
    comment: req.body.comment
  };
  console.log("POST data: ", req.session.inputs);
  res.redirect('/result');
});
app.get('/result', function (req,res) {
  res.render("result", {results: req.session.inputs})
});
app.listen(3000, function() {
  console.log("Listening on 3000");
})
