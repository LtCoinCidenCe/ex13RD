require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);
sequelize.query("SELECT * FROM blogs;", { type: QueryTypes.SELECT })
  .then(value => {
    value.map(row => {
      console.log(`${row.author}: '${row.title}'`, row.likes, 'likes');
      return null
    })
    sequelize.close()
  })
