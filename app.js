var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
const UserModel = require("./models/user");
const ContactModel = require("./models/contact");
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

//connect to mongoDB
const dbURI= 'mongodb+srv://devUser:dev123@cluster0.89lku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('connected to db'))
.catch((err) => console.log(err));

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");
});
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));


 app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
 });

 app.post("/api/user", (req, res)=>{
   console.log(req.body);
  /*const SaveUser = new UserModel(req.body);
  SaveUser.save((error, savedUser)=>{
      if(error) throw error
      res.json(savedUser)
  })*/
  const user = new UserModel({
    Name: req.body.name,
    Email: req.body.email,
    // ...
  });
  user.save();
  res.redirect("/");
  
});


app.post("/api/contact", (req, res)=>{
  console.log(req.body);
 const contact = new ContactModel({
   Name: req.body.name,
   Email: req.body.email,
   Phone: req.body.phone,
   Message: req.body.message
   // ...
 });
 contact.save();
 res.redirect("/contact.html");
 
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});


