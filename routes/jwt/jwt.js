import jwt from "jsonwebtoken";

export function decodejwt(req, res, next) {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch {

    res.status(401).json({ message: "Invalid or expired token" });

  }

}