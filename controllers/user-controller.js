const { User } = require("../models");
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      message: "Get all users",
      data: users
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

const login = async (req, res) => {
  try {
      const { username, password } = req.body;
    
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }
    
      try {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          res.status(200).json({ message: 'Login successful!' });
        } else {
          res.status(401).json({ message: 'Incorrect password.' });
        }
      } catch (err) {
        res.status(500).json({ message: 'Login error.' });
      }

  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};


const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({
      message: "User created successfully",
      data: {
        // id: user._id,
        // username: user.username,
        // email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  login,
  register,
};
