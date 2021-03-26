const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


app.listen(port,()=>{console.log('I am listening at port 3000')});

app.get('/',(req,res)=>{
    res.send('hello i am working')
})

//mongodb cred
const password = 'myMongodb123';
const dbuser = 'organicUser';
const dbname = 'organicdb';

//mongodb connection code copied from mongodb web
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicUser:myMongodb123@cluster0.lroqv.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("organicdb").collection("products");
  console.log('db connected 2nd');
  // perform actions on the collection object
  client.close();
});