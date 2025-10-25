const express = require('express');
const cors = require('cors');
const routes = require('./routes/userRoutes');
const sequelize = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());
app.use('/', routes);

sequelize.sync({ alter: true })
  .then(() => console.log('Users DB synced'))
  .catch(err => console.error('DB sync failed:', err));

// запуск сервера
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Users service running on port ${PORT}`);
});