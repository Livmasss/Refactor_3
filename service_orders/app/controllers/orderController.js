const Order = require('../models/order');

exports.getAllOrders = async (req, res) => {
  try {
    const where = req.query.userId ? { user_id: req.query.userId } : {};
    const orders = await Order.findAll({ where });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    await order.update(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    await order.destroy();
    res.json({ message: 'Order deleted', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.health = (req, res) => {
  res.json({ status: 'OK', service: 'Orders Service', timestamp: new Date() });
};

exports.status = (req, res) => {
  res.json({ status: 'Orders service is running' });
};
