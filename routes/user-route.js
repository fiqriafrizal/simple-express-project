const express = require("express");
const router = express.Router();
const { User } = require("../models");
const userController = require("../controllers/user-controller");
const bcrypt = require('bcrypt');
const { validate } = require('../middleware/validate');
const { loginBodySchema, registerBodySchema } = require('../validations/user.validation');


router.get("/", userController.getAllUsers);
router.post('/login', validate(loginBodySchema, 'body'), userController.login);
router.post("/register", validate(registerBodySchema, 'body'), userController.register);

module.exports = router;
