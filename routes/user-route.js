const express = require("express");
const router = express.Router();
const { User } = require("../models");
const userController = require("../controllers/user-controller");
const bcrypt = require('bcrypt');


router.get("/", userController.getAllUsers);

router.post('/login', async (req, res) => {
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
});


router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({
      message: "User created successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});


module.exports = router;
