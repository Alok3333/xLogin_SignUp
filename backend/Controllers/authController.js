const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/userModels");

// POST - SignUp user
exports.signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        status: "fail",
        message: "User already exits.",
        success: false,
      });
    }

    const userModel = new UserModel({
      name: name,
      email: email,
      password: password,
    });

    // Encrypt the password
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    return res.status(201).json({
      status: "success",
      message: "SignUp successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: `${err} Internal server error`,
      success: false,
    });
  }
};

// POST - Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        status: "fail",
        message: "Auth failed Email and Password is wrong 1",
        success: false,
      });
    }

    // Compare bcrypt password
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        status: "fail",
        message: "Auth failed Email and Password is wrong 2",
        success: false,
      });
    }

    // Generate token with jwt.sign
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      status: "success",
      message: "Login success",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      success: false,
    });
  }
};
