import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Нет токена, доступ запрещён" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ нормализуем ключи — теперь всегда есть userId
    req.user = {
      userId: decoded.userId || decoded._id,
      role: decoded.role || "user",
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error("Ошибка проверки токена:", error.message);
    return res.status(403).json({ message: "Недействительный токен" });
  }
};

export default authMiddleware;
