require("dotenv").config();
require("./Models/dbConnection");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./Routes/authRoutes");
const productRoutes = require("./Routes/productRoutes");

const PORT = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hlo MOM");
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes)

// Server listening port
app.listen(PORT, () => {
  console.log(`Server Has Started On ${PORT}`);
});
