require('dotenv').config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('connection ok');
    await sequelize.close();
  }
  catch (error) {
    console.error('connection error:', error);
  }
}

testConnection();
