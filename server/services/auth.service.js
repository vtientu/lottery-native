const User = require("../models/User");

const authService = {
  register: async (username, password, fullName) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("Username already in use");
    }

    const newUser = new User({ username, password, fullName });
    await newUser.save();

    return newUser;
  },

  login: async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    return user;
  },
};

module.exports = authService;
