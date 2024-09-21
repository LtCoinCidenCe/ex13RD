const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../util/db")

class ReadingList extends Model { }
ReadingList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
  },
  state: {
    type: DataTypes.CHAR(20),
    allowNull: false,
    defaultValue: 'unread',
    get() {
      const value = this.getDataValue('state')
      return value.trim()
    }
  }
}, {
  sequelize,
  underscored: 'true',
  modelName: 'readinglist',
  freezeTableName: true
})

module.exports = ReadingList
