const Order = require('../models/order');
const Redis = require('ioredis');

const redis = new Redis({ host: 'cache', port: 6379 });
const CACHE_TTL = 60;

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
    const orderId = req.params.orderId
    
    const cached = await redis.get(`order:${deliveryId}`);
    if (cached) {
      console.log(`Cache hit: order:${deliveryId}`);
      return res.json(JSON.parse(cached));
    }

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    
    // Cache user
    await redis.set(`order:${orderId}`, JSON.stringify(order), 'EX', CACHE_TTL);

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
    await redis.del(`order:${deliveryId}`);

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
    await redis.del(`order:${deliveryId}`);

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
