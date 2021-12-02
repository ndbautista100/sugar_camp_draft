var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

var nameSchema = new mongoose.Schema({
  Name: String,
  Email: String
 }, {collection: 'users'});

var User = mongoose.model("User", nameSchema);
 
 app.use("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
 });


 app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
 });

app.post("/", function(req, res){
  
 });
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});
