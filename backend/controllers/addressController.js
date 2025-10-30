import User from "../models/User.js";
import mongoose from "mongoose";

// 🟢 Получить все адреса
export const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("addresses");
    if (!user) return res.status(404).json({ error: "Пользователь не найден" });

    res.json(user.addresses || []);
  } catch (err) {
    console.error("Ошибка при получении адресов:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Добавить новый адрес
export const addUserAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { address, city, region, zip } = req.body;

    if (!address || !city)
      return res.status(400).json({ error: "Адрес и город обязательны" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "Пользователь не найден" });

    const newAddress = {
      _id: new mongoose.Types.ObjectId(),
      address,
      city,
      region,
      zip,
    };

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json(newAddress);
  } catch (err) {
    console.error("Ошибка при добавлении адреса:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Удалить адрес
export const deleteUserAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "Пользователь не найден" });

    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== id
    );

    await user.save();
    res.json({ message: "Адрес удалён" });
  } catch (err) {
    console.error("Ошибка при удалении адреса:", err);
    res.status(500).json({ error: err.message });
  }
};
