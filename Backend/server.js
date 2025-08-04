const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

// Use MongoDB Atlas connection string from .env
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Name of your MongoDB database
const dbName = 'PassMA';
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect once, reuse the connection
client.connect().then(() => {
  console.log("✅ Connected to MongoDB Atlas");

  // Get all passwords
  app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('Password');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  });

  // Save password
  app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('Password');
    const result = await collection.insertOne(password);
    res.send({ success: true, result });
  });

  // Delete password
  app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('Password');
    const result = await collection.deleteOne(password);
    res.send({ success: true, result });
  });

  // Start server
  const PORT = process.env.PORT || 3000;
  
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

}).catch((err) => {
  console.error("❌ MongoDB connection failed:", err);
});
