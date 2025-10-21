const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Получить всех пользователей
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // 👈 скрываем пароль
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получить пользователя по ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // 👈 скрываем пароль
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Создать нового пользователя
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Пожалуйста, заполните все поля" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  try {
    const createdUser = await newUser.save();
    const userToReturn = createdUser.toObject();
    delete userToReturn.password; // 👈 не отдаём пароль в ответе
    res.status(201).json(userToReturn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Обновить пользователя
const updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const updateData = { name, email, role };

  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Удалить пользователя
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.status(200).json({ message: "Пользователь успешно удален" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Логин пользователя (генерация токена + данные юзера)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Пожалуйста, заполните все поля" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Неверный пароль" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 👇 возвращаем токен и данные юзера (без пароля)
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Профиль текущего пользователя
const getProfile = async (req, res) => {
  try {
    // userId мы получаем из middleware authMiddleware
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getProfile, // 👈 добавляем
};
