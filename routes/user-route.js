const express = require("express");
const router = express.Router();
const { User } = require("../models");
const userController = require("../controllers/user-controller");
const bcrypt = require('bcrypt');


router.get("/", userController.getAllUsers);
router.post('/login', userController.login);
router.post("/register", userController.register);

module.exports = router;
