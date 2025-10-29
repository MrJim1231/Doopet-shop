import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";

// 🟢 Получить корзину (по userId или sessionId)
export const getCart = async (req, res) => {
  try {
    const { userId, sessionId } = req.query;

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId }).populate("items.productId");
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId }).populate("items.productId");
    }

    if (!cart) {
      return res.json({ items: [], cartTotal: 0 });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Добавить товар в корзину
export const addToCart = async (req, res) => {
  try {
    const { sessionId, productId, quantity } = req.body;

    // 🔹 Проверяем, есть ли токен в заголовках
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    let userId = null;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;

        // ✅ Выводим данные о пользователе из токена
        // console.log("✅ Авторизованный пользователь добавляет товар:");
        // console.log({
        //   userId: decoded.userId,
        //   name: decoded.name,
        //   email: decoded.email,
        //   role: decoded.role,
        // });
      } catch (err) {
        console.log("⚠️ Ошибка при расшифровке токена:", err.message);
      }
    } else {
      console.log(
        "👤 Гость добавляет товар в корзину (sessionId:",
        sessionId,
        ")"
      );
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Товар не найден" });

    // 🔹 Ищем корзину по userId или sessionId
    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      cart = new Cart({ userId, sessionId, items: [] });
    }

    // 🔹 Проверяем, есть ли уже этот товар в корзине
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].totalPrice =
        cart.items[itemIndex].quantity * cart.items[itemIndex].price;
    } else {
      cart.items.push({
        productId,
        quantity,
        price: product.price,
        totalPrice: product.price * quantity,
      });
    }

    await cart.save();

    // console.log("🛒 Товар успешно добавлен в корзину:", {
    //   userId: userId || "guest",
    //   productId,
    //   quantity,
    // });

    res.json(await cart.populate("items.productId"));
  } catch (err) {
    console.error("❌ Ошибка при добавлении в корзину:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Обновить количество товара
export const updateQuantity = async (req, res) => {
  try {
    const { userId, sessionId, productId, quantity } = req.body;

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) return res.status(404).json({ error: "Корзина не найдена" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item)
      return res.status(404).json({ error: "Товар не найден в корзине" });

    item.quantity = quantity;
    item.totalPrice = item.price * quantity;

    await cart.save();

    res.json(await cart.populate("items.productId"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Удалить товар из корзины
export const removeFromCart = async (req, res) => {
  try {
    const { userId, sessionId, productId } = req.body;

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) return res.status(404).json({ error: "Корзина не найдена" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.json(await cart.populate("items.productId"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Очистить корзину
export const clearCart = async (req, res) => {
  try {
    const { userId, sessionId } = req.body;

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) return res.status(404).json({ error: "Корзина не найдена" });

    cart.items = [];
    await cart.save();

    res.json({ items: [], cartTotal: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Миграция корзины после авторизации
export const migrateCart = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const userId = req.user.userId; // из токена

    if (!sessionId || !userId) {
      return res
        .status(400)
        .json({ message: "sessionId и userId обязательны" });
    }

    // Ищем гостевую корзину
    const guestCart = await Cart.findOne({ sessionId });
    if (!guestCart) {
      return res.status(404).json({ message: "Гостевая корзина не найдена" });
    }

    // Проверяем, есть ли уже корзина у пользователя
    let userCart = await Cart.findOne({ userId });

    if (userCart) {
      // 🔹 Объединяем товары
      guestCart.items.forEach((guestItem) => {
        const existingItem = userCart.items.find(
          (item) => item.productId.toString() === guestItem.productId.toString()
        );
        if (existingItem) {
          existingItem.quantity += guestItem.quantity;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
        } else {
          userCart.items.push(guestItem);
        }
      });
      await userCart.save();
      await Cart.deleteOne({ _id: guestCart._id }); // Удаляем гостевую корзину
    } else {
      // Если у пользователя нет корзины — просто присваиваем userId
      guestCart.userId = userId;
      await guestCart.save();
    }

    // console.log(
    //   `🟢 Корзина sessionId:${sessionId} привязана к userId:${userId}`
    // );

    res.json({ message: "Корзина успешно перенесена" });
  } catch (err) {
    console.error("❌ Ошибка при миграции корзины:", err);
    res.status(500).json({ message: err.message });
  }
};
