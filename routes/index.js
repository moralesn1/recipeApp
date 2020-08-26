const express = require("express");
const router = express.Router();
const RecipeRoutes = require("./recipes");

router.get("/", (req, res) => {
  res.send("YO");
});

router.use("/recipes", RecipeRoutes);

module.exports = router;
