const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID; //this is needed to delete from mongodb


const app = express();
const port = 3000;
app.use(cors());
app.use(express.json()); //no need to use bodyparser
app.use(express.urlencoded()); //Parse URL-encoded bodies // need this instead of app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => { console.log('I am listening at port 3000') });

app.get('/', (req, res) => {
    // res.send('hello i am working') // sending simple string
    res.sendFile(__dirname + '/index.html'); //it will show the index.html file under localhost:3000 now
})
app.post('/addProduct1/', (req, res) => {
    const product = req.body;
    console.log(product)

});

//mongodb cred
const password = 'myMongodb123';
const dbuser = 'organicUser';
const dbname = 'organicdb';

//mongodb connection code copied from mongodb web
//const MongoClient = require('mongodb').MongoClient; //upore deya hoyese
const uri = "mongodb+srv://organicUser:myMongodb123@cluster0.lroqv.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000, keepAlive: 1 });
client.connect(err => {
    const productCollection = client.db("organicdb").collection("products");
    console.log('db connected 2nd');

    //get data from index.html's form and send to database
    app.post('/addProduct/', (req, res) => {
        const product = req.body;
        // console.log(product);
        productCollection.insertOne(product)
            .then(result => {
                // process result
                console.log('One product added');
                // res.send('data insert successfully');
                //page will be reloaded
                res.redirect('/');
            })

    });

    //read all data/docs from Collection
    app.get('/products', (req, res) => {
        productCollection.find({}).toArray((err, documents) => {
            res.send(documents);
        })

    });

    //get single product from database
    app.get('/product/:id', (req, res) => {
        productCollection.find({ _id: ObjectId(req.params.id) }).toArray((err, doc) => { res.send(doc[0]); })


    });
    //update data
    app.patch('/update/:id', (req, res) => {
        console.log(req.body.price);
        productCollection.updateOne(
            { _id: ObjectId(req.params.id) },
            {
                $set: { price: req.body.price, quantity: req.body.quantity }
            }
        )
        .then(result=>{
            res.send(result.modifiedCount > 0); //update is successfull 
            console.log('will be the result obj');
        })
    })


    //delete data
    app.delete('/delete/:id', (req, res) => {
        productCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then((result) => {
                // console.log(result);
                res.send(result.deletedCount > 0); //delete is successfull 
            })
        //console.log(req.params.id)
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