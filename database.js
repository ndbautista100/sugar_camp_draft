//connect to mongoDB
const dbURI= 'mongodb+srv://devUser:dev123@cluster0.89lku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
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
    name_string: String,
    merch_price: Number,
    merch_desc: String
    });
 
    // compile schema to model
    var Merch = mongoose.model('Merch', MerchandiseSchema, 'Merchandise');
 
    // a document instance
    var merchandise1 = new Merch({ name_string: 'Betsy Vintage Tee', merch_price: 15.99, merch_desc: 'Vintage Tee with the Sugar Camp Logo' });
 
    // save model to database
    merchandise1.save(function (err, Merch) {
      if (err) return console.error(err);
      console.log(Merch.name_string + " saved to merchandise to collection.");
        var collections = mongoose.connections[0].collections;
        var names = [];

        Object.keys(collections).forEach(function(k) {
            names.push(k);
        });

        console.log(names);
    });
    
});

