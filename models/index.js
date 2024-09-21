const Blog = require("./blog");
const ReadingList = require("./readinglist");
const User = require("./user");

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'beRead' })

// const doSync = async () => {
//   await User.sync({ alter: true })
//   await Blog.sync({ alter: true })
// }

module.exports = { Blog, User, ReadingList }
