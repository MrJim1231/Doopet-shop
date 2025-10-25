import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Нет токена, доступ запрещён" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // теперь в req.user есть userId и role
    next();
  } catch (error) {
    return res.status(403).json({ message: "Недействительный токен" });
  }
};

export default authMiddleware;
