require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
