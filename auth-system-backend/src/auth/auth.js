import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  const token = req.cookies.loginToken;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "Server configuration error" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
