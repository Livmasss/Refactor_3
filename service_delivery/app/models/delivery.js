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
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'delivered', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false
  },
  trackNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    defaultValue: () => generateTrackNumber()
  },
}, {
  timestamps: true,
});

module.exports = Delivery;
