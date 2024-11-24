const User = require('../models/User');

const createUser = async ({ username, email }) => {
  const user = await User.create({ username, email });
  return user;
};

module.exports = {
  createUser,
};
