const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class Session extends Model { }
Session.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'loginsession',
  freezeTableName: true,
})

module.exports = Session
