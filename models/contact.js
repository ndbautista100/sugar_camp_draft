const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    Name: String,
    Email: String,
    Phone: String,
    Message: String
   });
  
  const Contact = mongoose.model("Contact", ContactSchema);

  module.exports = Contact;