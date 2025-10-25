const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to users database');
  } catch (error) {
    console.error('Users database connection failed:', error.message);
  }
})();

module.exports = sequelize;
