const Delivery = require('../models/delivery');

// Создать доставку
exports.createDelivery = async (req, res) => {
  try {
    const { address, status } = req.body;
    const delivery = await Delivery.create({ address, status });
    res.status(201).json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить все доставки
exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.findAll();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить доставку по ID
exports.getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновить доставку
exports.updateDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });

    await delivery.update(req.body);
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удалить доставку
exports.deleteDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });

    await delivery.destroy();
    res.json({ message: 'Delivery deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Проверка здоровья
exports.healthCheck = (req, res) => {
  res.json({ status: 'Delivery service healthy' });
};
