const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv')
dotenv.config()

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017/PassMA';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassMA';
const port = 3000
app.use(bodyParser.json());
app.use(cors());

client.connect();

// get all password
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('Password');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// save password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('Password');
    const findResult = await collection.insertOne(password);
    res.send({ success: true,result:findResult })
})

// delete password by id
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('Password');
    const findResult = await collection.deleteOne(password);
    res.send({ success: true,result:findResult })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})