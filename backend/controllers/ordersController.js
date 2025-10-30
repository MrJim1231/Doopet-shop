import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// 🟢 Создать заказ
export const createOrder = async (req, res) => {
  try {
    const { userId, sessionId, customer, comment, delivery, payment } =
      req.body;

    // Проверяем корзину
    const cart = userId
      ? await Cart.findOne({ userId }).populate("items.productId")
      : await Cart.findOne({ sessionId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Корзина пуста" });
    }

    // Формируем товары
    const items = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
      totalPrice: item.productId.price * item.quantity,
    }));

    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

    // 🆕 Создаём заказ с полными данными клиента
    const order = new Order({
      userId: userId || null,
      sessionId: sessionId || null,
      items,
      total,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        region: customer.region,
        zip: customer.zip,
      },
      comment: comment || "",
      delivery: delivery || "fixed",
      payment: payment || "cash",
    });

    await order.save();

    // Очистка корзины
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    console.error("Ошибка при создании заказа:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Получить все заказы (или только пользователя)
export const getOrders = async (req, res) => {
  try {
    const { userId, role } = req.user; // получаем из токена
    const query = role === "admin" ? {} : { userId };

    const orders = await Order.find(query)
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Ошибка при получении заказов:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Получить один заказ по ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.productId"
    );

    if (!order) {
      return res.status(404).json({ error: "Заказ не найден" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Обновить статус заказа (например, "shipped", "completed")
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Заказ не найден" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Миграция заказов гостя при входе
export const migrateOrders = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const userId = req.user.userId;

    const result = await Order.updateMany(
      { sessionId, userId: null },
      { userId }
    );

    console.log(`🟢 Перенесено заказов: ${result.modifiedCount}`);
    res.json({ message: "Заказы перенесены", count: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
