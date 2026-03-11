import jwt from "jsonwebtoken";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export function decodejwt(req, res, next) {

  const token = req.cookies.token;

  if (!token) {
    return res.sendFile(path.join(__dirname,'..','..','public','login.html'));
    
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch {
    res.sendfile(path.join(__dirname,  'login.html'));
    

  }

}