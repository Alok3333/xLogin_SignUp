const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Has Connected."))
  .catch((err) => console.log(`${err} err from mongoDB`));
