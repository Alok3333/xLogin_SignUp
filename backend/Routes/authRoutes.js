const router = require("express").Router();
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/authMiddleware");
const authController = require("../Controllers/authController");

// Routes
router.post("/login", loginValidation, authController.loginUser);
router.post("/signup", signupValidation, authController.signUpUser);

module.exports = router;
