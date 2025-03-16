const jwt = require("jsonwebtoken");

// Check Authorization headers
const productAuthenticatedMiddleware = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      status: "fail",
      message: "Unauthorized, JWT Token is required.",
    });
  }

  try {
    const decode = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(403).json({
      status: "fail",
      message: "Unauthorized, JWT token is wrong or expired.",
    });
  }
};

module.exports = productAuthenticatedMiddleware;
