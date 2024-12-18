const User = require('../models/User');

const createUser = async ({ name, email, password }) => {
  const user = await User.create({ name, email, password });
  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password }});
  console.log("🚀 ~ loginUser ~ user:", user)
  return user;
};

module.exports = {
  createUser,
  loginUser
};
