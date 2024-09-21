const Blog = require("./blog");
const User = require("./user");

User.hasMany(Blog)
Blog.belongsTo(User)

// const doSync = async () => {
//   await User.sync({ alter: true })
//   await Blog.sync({ alter: true })
// }

module.exports = { Blog, User }
