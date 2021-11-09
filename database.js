//connect to mongoDB
const dbURI= 'mongodb+srv://devUser:dev123@cluster0.89lku.mongodb.net/SugarCamp?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('connected to db'))
.catch((err) => console.log(err));

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");
     
    // define Schema
    var Schema = mongoose.Schema;

    var MerchandiseSchema = new Schema({
    name: String,
    price: Number,
    stock: Number,
    description: String

    }, {collection: 'Merchandise'});
 
    // compile schema to model
    var Merch = mongoose.model('Merch', MerchandiseSchema);
    Merch.find(function (err, Merch) {
        if (err) return console.error(err);
        console.log(Merch);
    });

});
