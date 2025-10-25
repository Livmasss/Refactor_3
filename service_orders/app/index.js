const express = require('express');
const cors = require('cors');
const routes = require('./routes/orderRoutes');
const sequelize = require('./models');

const app = express();
const PORT = process.env.PORT || 3002;

// middleware
app.use(cors());
app.use(express.json());
app.use('/', routes);

sequelize.sync({ alter: true })
  .then(() => console.log('Orders database synced'))
  .catch(err => console.error('Orders database sync failed:', err));

// запуск сервера
app.listen(PORT, () => {
    console.log(`Orders service running on port ${PORT}`);
});