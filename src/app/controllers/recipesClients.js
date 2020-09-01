const Recipe = require("../models/Recipe");

module.exports = {
  index(req, res) {
    Recipe.all(function(recipes) {
      return res.render('about', { recipes })
    })
  },
  recipesList(req, res) {
    Recipe.all(function(recipes) {
      return res.render('index', { recipes })
    })

  },
  show(req, res) {
    const { id } = req.params;

    const foundRecipe = data.recipes.find(function(recipe) {
      return recipe.id == id
      
    })
  
    if(!foundRecipe) {
      return res.render("not-found");
    }
  
    const recipe = {
      ...foundRecipe
    }
  
  
    return res.render("recipe", { recipe })
  },
  history(req, res) {
    return res.render("history")

  }
}