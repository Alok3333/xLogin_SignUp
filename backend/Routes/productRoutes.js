const router = require("express").Router();
const productRoutes = require("../Middlewares/productMiddleware");

// routes
router.get("/", productRoutes, (req, res) => {
  return res.status(200).json([
    {
      name: "HP Laptop 14x",
      price: 50000,
    },
    {
      name: "Moto G31",
      price: 12000,
    },
  ]);
});

module.exports = router;
