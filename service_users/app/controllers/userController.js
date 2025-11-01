const User = require('../models/user');
const Redis = require('ioredis');

const redis = new Redis({ host: 'cache', port: 6379 }); // internal Docker hostname
const CACHE_TTL = 120;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userkId;
    const cachedUser = await redis.get(`user:${userId}`);
    if (cachedUser) {
      console.log(`Cache hit: user:${userId}`);
      return res.json(JSON.parse(cachedUser));
    }

    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Cache user
    await redis.set(`user:${userId}`, JSON.stringify(user), 'EX', CACHE_TTL);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update(req.body);
    
    await redis.del(`user:${user.id}`);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
  
    await user.destroy();
    await redis.del(`user:${user.id}`);

    res.json({ message: 'User deleted', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.health = (req, res) => {
  res.json({ status: 'OK', service: 'Users Service', timestamp: new Date() });
};

exports.status = (req, res) => {
  res.json({ status: 'Users service is running' });
};
