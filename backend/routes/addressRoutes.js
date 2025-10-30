import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ исправлено
import {
  getUserAddresses,
  addUserAddress,
  deleteUserAddress,
} from "../controllers/addressController.js";

const router = express.Router();

// 📦 Адреса пользователя
router.get("/", authMiddleware, getUserAddresses);
router.post("/", authMiddleware, addUserAddress);
router.delete("/:id", authMiddleware, deleteUserAddress);

export default router;
