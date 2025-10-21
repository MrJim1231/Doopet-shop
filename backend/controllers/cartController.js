const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Получить корзину (по userId или sessionId)
const getCart = async (req, res) => {
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

// Добавить товар
const addToCart = async (req, res) => {
  try {
    const { userId, sessionId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Товар не найден" });

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      cart = new Cart({ userId, sessionId, items: [] });
    }

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
    res.json(await cart.populate("items.productId"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Обновить количество
const updateQuantity = async (req, res) => {
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

// Удалить товар
const removeFromCart = async (req, res) => {
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

// Очистить корзину
const clearCart = async (req, res) => {
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

// Единый экспорт всех функций
module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};
