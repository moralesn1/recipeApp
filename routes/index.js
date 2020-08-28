const express = require("express");
const router = express.Router();
const RecipeRoutes = require("./recipes");
const NoteRoutes = require("./notes");

// Models
const Recipe = require("../models/recipe");
const Note = require("../models/note");

router.get("/", async (req, res) => {
  // const note = Note.findOne({}, {}, { sort: { createdAt: -1 } }, function (
  //   err,
  //   post
  // ) {
  //   console.log(post + " notes");
  // });
  const recipes = await Recipe.find().sort({ createdAt: -1 }).limit(1);
  console.log(recipes);
  res.render("home", { recipes: recipes });
});

router.use("/recipes", RecipeRoutes);
router.use("/notes", NoteRoutes);

module.exports = router;
