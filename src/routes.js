const express = require('express');
const routes = express.Router();
const recipesClients = require('./app/controllers/recipesClients');
const chefsClients = require('./app/controllers/chefsClients')
const recipes = require('./app/controllers/recipes');
const chefs = require('./app/controllers/chefs');

//SITE RECIPES
routes.get("/", recipesClients.index);
routes.get("/recipes", recipesClients.recipesList);
routes.get("/recipes/:id", recipesClients.show);
routes.get("/history", recipesClients.history );

//SITE CHEFS
routes.get("/", chefsClients.about);
routes.get("/chefs", chefsClients.index);
routes.get("/chefs/:id", chefsClients.show);

//ADMIN RECIPES
routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

//ADMIN CHEFS
routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/create", chefs.create);
routes.get("/admin/chefs/:id", chefs.show); 
routes.get("/admin/chefs/:id/edit", chefs.edit); 
routes.post("/admin/chefs", chefs.post); 
routes.put("/admin/chefs", chefs.put); 
routes.delete("/admin/chefs", chefs.delete);





routes.use(function(req, res) {
  res.status(404).render("not-found");
})

module.exports = routes;