const Delivery = require('../models/delivery');
const Redis = require('ioredis');

const redis = new Redis({ host: 'cache', port: 6379 });
const CACHE_TTL = 60;

exports.createDelivery = async (req, res) => {
  try {
    const { address, status, orderId } = req.body;
    const delivery = await Delivery.create({ address, orderId, status });
    res.status(201).json(delivery);
  } catch (error) {
    console.error('Delivery creation error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.findAll();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDeliveryById = async (req, res) => {
  try {
    const deliveryId = req.params.id;

    const cached = await redis.get(`delivery:${deliveryId}`);
    if (cached) {
      console.log(`Cache hit: delivery:${deliveryId}`);
      return res.json(JSON.parse(cached));
    }

    const delivery = await Delivery.findByPk(deliveryId);
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
    
    await redis.set(`delivery:${deliveryId}`, JSON.stringify(delivery), 'EX', CACHE_TTL);

    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });

    await delivery.update(req.body);
    await redis.del(`delivery:${delivery.id}`);

    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });

    await delivery.destroy();
    await redis.del(`delivery:${delivery.id}`);

    res.json({ message: 'Delivery deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.healthCheck = (req, res) => {
  res.json({ status: 'Delivery service healthy' });
};
