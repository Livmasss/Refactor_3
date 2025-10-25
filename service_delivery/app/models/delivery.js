const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const { generateTrackNumber } = require('../utils/trackNumber');

const Delivery = sequelize.define('Delivery', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
  trackNumber: {
    type: DataTypes.STRING,
    unique: true,
  },
}, {
  timestamps: true,
});

// автоматически создаём трек-номер
Delivery.beforeCreate((delivery) => {
  delivery.trackNumber = generateTrackNumber();
});

module.exports = Delivery;
