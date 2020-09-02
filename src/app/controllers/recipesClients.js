const Recipe = require("../models/Recipe");

module.exports = {
  about(req, res) {
    Recipe.all(function(recipes) {
      return res.render('user/about', { recipes })
    })
  },
  index(req, res) {
    const { filter } = req.query
  
    if(filter) {
      Recipe.findBy(filter, function(recipes) {
        return res.render('user/recipes/index', { recipes, filter })
      })

    } else {
      Recipe.all(function(recipes) {
        return res.render('user/recipes/index', { recipes })
      })
    }

  },
  show(req, res) {
    Recipe.find(req.params.id, function(recipe) {
      if(!recipe) return res.send("Recipe not found!");

      recipe.created_at = Date(recipe.created_at).format

      return res.render("user/recipes/recipe", { recipe })
    })
  },
  history(req, res) {
    return res.render("user/history")

  }
}