const express = require('express');
const cors = require('cors');

const app = express();
const port = 3002;
app.use(cors());
app.use(express.json()); //no need to use bodyparser
app.use(express.urlencoded()); //Parse URL-encoded bodies // need this instead of app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => { console.log('I am listening at port 3000') });

app.get('/', (req, res) => {
    // res.send('hello i am working') // sending simple string
    res.sendFile(__dirname + '/index.html'); //it will show the index.html file under localhost:3000 now
})
app.post('/addProduct1/',(req,res)=>{
    const product = req.body;
    console.log(product)

});

//mongodb cred
const password = 'myMongodb123';
const dbuser = 'organicUser';
const dbname = 'organicdb';

//mongodb connection code copied from mongodb web
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicUser:myMongodb123@cluster0.lroqv.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true ,connectTimeoutMS: 30000,keepAlive: 1});
client.connect(err => {
    const collection = client.db("organicdb").collection("products");
    console.log('db connected 2nd');

    //get data from index.html's form and send to database
    app.post('/addProduct/',(req,res)=>{
        const product = req.body;
        // console.log(product);
        collection.insertOne(product)
        .then(result => {
            // process result
            console.log('One product added');
            res.send('data insert successfully');
        })

    });

    //insert data as BSON format Binary form of JSON
    // const product = { name: "modhu", price: 25, qty: 100 };
    // collection.insertOne(product)
    //     .then(result => {
    //         // process result
    //         console.log('One product added');
    //     })

    
    // perform actions on the collection object
    //client.close();
});