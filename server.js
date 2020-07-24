const express = require('express');
const nunjucks = require('nunjucks');
const server = express();
const recipes = require('./data');

server.set("view engine", "njk");

server.use(express.static('public'));

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
}) 

server.get("/", function(req, res) {
  return res.render("about", { recipes })
})

server.get("/recipesList", function(req, res) {
  return res.render("recipesList", { recipes })
})
     
server.get("/recipes/:index", function (req, res) {
  const recipeIndex = req.params.index;

  const recipe = recipes.find(function(recipe) {
    return recipeIndex == recipe.index
    
  })

  if(!recipes[recipeIndex]) {
    return res.render("not-found");
  }
  // console.log(recipes[recipeIndex]);
  return res.render("recipe", { recipes: recipes[recipeIndex] })
})


server.get("/history", function(req, res) {
  return res.render("history")
})

server.use(function(req, res) {
  res.status(404).render("not-found");
})

server.listen(5000, function() {
  console.log('Server is running!');
})