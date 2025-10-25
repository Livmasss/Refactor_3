const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(' Connected to delivery database');
  } catch (error) {
    console.error('DB connection failed:', error);
  }
})();

module.exports = sequelize;
