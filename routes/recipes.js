const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");

router.get("/", async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: "desc" });
  res.render("recipes/recipe", { recipes: recipes });
});

router.get("/new", (req, res) => {
  res.render("recipes/new", { recipe: new Recipe() });
});

router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (recipe == null) res.redirect("/");
  res.render("recipes/show", { recipe: recipe });
});

router.get("/edit/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render("recipes/edit", { recipe: recipe });
});

router.post(
  "/",
  async (req, res, next) => {
    req.recipe = new Recipe();
    next();
  },
  saveAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.recipe = await Recipe.findById(req.params.id);
    next();
  },
  saveAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  res.redirect("/recipes");
});

function saveAndRedirect(path) {
  return async (req, res) => {
    let recipe = req.recipe;
    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.recipe = req.body.recipe;

    try {
      recipe = await recipe.save();
      console.log("enter try block");
      res.redirect(`/recipes/${recipe.id}`);
    } catch (e) {
      console.log(e);
      res.redirect(`recipes/${path}`, { recipe: recipe });
    }
  };
}

module.exports = router;
