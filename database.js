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
    merch_price: double,
    merch_desc: String
    });
 
    // compile schema to model
    var Merch = mongoose.model('Merch', MerchSchema, 'Merchandise');
 
    // a document instance
    var merchandise1 = new Merch({ name: '', price: 10, quantity: 25 });
 
    // save model to database
    book1.save(function (err, book) {
      if (err) return console.error(err);
      console.log(book.name + " saved to bookstore collection.");
    });
     
});
