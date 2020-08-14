const fs = require('fs');

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

exports.post = function(req, res ) {

  const keys = Object.keys(req.body);

  for(key of keys) {
    if(req.body[key] == '') {
      return res.send('Fill all the fields plz!');
    }
  }

  let { image, title, name, ingredients, preparation, textArea } = req.body

  const id = Number(data.recipes.length + 1);

  data.recipes.push({
    id,
    image,
    title,
    name,
    ingredients, 
    preparation, 
    textArea
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Write file error!');
    
    return res.redirect('/admin/recipes');
  })

  // return res.send(req.body)
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

  return res.render("admin/edit", { recipe })
}

exports.put = function(req, res ) {
  
}

exports.delete = function(req, res ) {
  
}