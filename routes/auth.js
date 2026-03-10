import express from 'express';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();    
const client = new MongoClient(process.env.MONGODB_URI);
let db;

import { decodejwt } from './jwt/jwt.js';

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db("OqueEuAssisti"); // Nome do seu banco no MongoDB Atlas
  }
  return db;
}


router.post('/login', async (req, res) => {
    console.log('Login request received with body:', req.body);
    const { email, password } = req.body;
    try {
        const db = await connectDB();
        const user = await db.collection('users').findOne({ email});
        if (user) {
            console.log('User pas:', user.password);
            
        }
        console.log('User found in database:', user);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10s' });
        res.cookie("token", token, {
             httpOnly: true,
             secure: true,
            sameSite: "Strict"
});
        res.json({
      message: "Login successful",
      token
    });




    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectDB();
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }   
        await db.collection('users').insertOne({ email, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



export default router;


