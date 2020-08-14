const data = require("./data.json");

exports.about = function(req, res) {
  return res.render("about", { recipes: data.recipes })
}

exports.recipesList = function(req, res) {
  return res.render("recipesList", { recipes: data.recipes })
}

exports.show = function (req, res) {
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
}

exports.history = function(req, res) {
  return res.render("history")
}

exports.index = function(req, res) {

  return res.render("admin/recipes", { recipes: data.recipes })
}

exports.create = function(req, res ) {
  //TODO: PÁGINA CREATE. 
  return res.render("admin/create")
}

exports.showAdmin = function(req, res ) {
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


  return res.render("admin/recipe", { recipe })
}

exports.edit = function(req, res ) {
  
}

exports.post = function(req, res ) {
  
}

exports.put = function(req, res ) {
  
}


exports.delete = function(req, res ) {
  
}