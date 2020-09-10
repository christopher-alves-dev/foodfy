const Recipe = require("../models/Recipe");

module.exports = {
  index(req, res) {
    
    const { filter } = req.query
  
    if(filter) {
      Recipe.findBy(filter, function(recipes) {
        return res.render('admin/recipes', { recipes, filter })
      })

    } else {
      Recipe.all(function(recipes) {
        return res.render('admin/recipes', { recipes })
      })
    }

  },
  create(req, res) {
    
    Recipe.chefsSelectOptions(function(options) {
      return res.render('admin/create', {chefOptions: options})
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '') {
        return res.send('Fill all the fields plz!');
      }
    }
  
    Recipe.create(req.body, function(recipe) {
      return res.redirect(`/admin/recipes/${recipe.id}`)
    })
  
  },
  show(req, res) {
    Recipe.find(req.params.id, function(recipe) {
      if(!recipe) return res.send("Recipe not found!");

      recipe.created_at = Date(recipe.created_at).format

      return res.render("admin/recipe", { recipe })
    })

  },
  edit(req, res) {
    Recipe.find(req.params.id, function(recipe) {
      if(!recipe) return res.send("Recipe not found!");

      recipe.created_at = Date(recipe.created_at).format

      Recipe.chefsSelectOptions(function(options) {
        return res.render('admin/edit', { recipe, chefOptions: options})
      })

    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == "") {
        return res.send("Fill all the fields plz!");
      }
    }

    Recipe.update(req.body, function() {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
  },
  delete(req, res) {

    Recipe.delete(req.body.id, function() {
      return res.redirect(`/admin/recipes`)
    })
  }
}

