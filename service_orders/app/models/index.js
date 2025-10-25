const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to orders database');
  } catch (error) {
    console.error('Orders database connection failed:', error.message);
  }
})();

module.exports = sequelize;
