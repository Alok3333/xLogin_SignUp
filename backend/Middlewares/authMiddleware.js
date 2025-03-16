const Joi = require("joi");

//  SignUp validation with joi
const signupValidation = (req, res, next) => {
  // Create Schema from joi object
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "fail",
      message: `${error}`,
    });
  }

  next();
};

//  Login validation with joi
const loginValidation = (req, res, next) => {
  // Create Schema from joi object
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "fail",
      message: `${error}`,
    });
  }

  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
