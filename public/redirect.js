import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { decodejwt } from '../routes/jwt/jwt.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

router.get('/dashboard', decodejwt, (req, res) =>
 res.sendFile(
        path.join(__dirname, 'dashboard.html')
    )
);


export default router;
