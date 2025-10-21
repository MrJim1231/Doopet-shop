const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Создать заказ
const createOrder = async (req, res) => {
  try {
    const { userId, sessionId, customer } = req.body;

    // Получаем корзину пользователя/гостя
    const cart = userId
      ? await Cart.findOne({ userId }).populate("items.productId")
      : await Cart.findOne({ sessionId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Корзина пуста" });
    }

    // Формируем массив товаров с ценой на момент заказа
    const items = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
      totalPrice: item.productId.price * item.quantity,
    }));

    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

    const order = new Order({
      userId: userId || null,
      sessionId: sessionId || null,
      items,
      total,
      customer,
    });

    await order.save();

    // Очистка корзины после оформления заказа
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить все заказы (с возможностью фильтрации по userId)
const getOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    let orders;
    if (userId) {
      // Только заказы конкретного пользователя
      orders = await Order.find({ userId })
        .populate("items.productId")
        .sort({ createdAt: -1 });
    } else {
      // Для админа: все заказы
      orders = await Order.find()
        .populate("items.productId")
        .sort({ createdAt: -1 });
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить один заказ по id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.productId"
    );
    if (!order) return res.status(404).json({ error: "Заказ не найден" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Обновить статус заказа (например, "shipped", "completed")
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Заказ не найден" });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Экспортируем функции
module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
