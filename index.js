import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

import redirectRouter from './public/redirect.js';
import authRouter from './routes/auth.js';
import { decodejwt } from './routes/jwt/jwt.js';
import cookieParser from "cookie-parser";

app.use(cookieParser());

app.use('/api', authRouter);
app.use(redirectRouter);   

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});


export default app;







