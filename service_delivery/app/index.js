const express = require('express');
const cors = require('cors');
const deliveryRoutes = require('./routes/deliveryRoutes');
const sequelize = require('./models');

const app = express();
const PORT = process.env.PORT || 3003;

// middleware
app.use(cors());
app.use(express.json());

// маршруты
app.use('/', deliveryRoutes);

// синхронизация БД
sequelize.sync({ alter: true })
  .then(() => console.log('Delivery DB synced'))
  .catch(err => console.error('Sync error:', err));

// запуск сервера
app.listen(PORT, () => {
    console.log(`Delivery service running on port ${PORT}`);
});
