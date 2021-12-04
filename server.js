const {MongoClient} = require('mongodb');
var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');


async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
     const dbURI= 'mongodb+srv://devUser:dev123@cluster0.89lku.mongodb.net/SugarCamp?retryWrites=true&w=majority'
     const client = new MongoClient(dbURI);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        var Schema = mongoose.Schema;
var questionSchema = new Schema({
  sectors: String,
  Qid: String,
  Question: String,
  enabled: Boolean
},{collection:'questionPool'});
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 

main().catch(console.error);

