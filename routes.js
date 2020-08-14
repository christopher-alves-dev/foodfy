const express = require('express');
const routes = express.Router();
const dishes = require('./dishes');

routes.get("/", dishes.about)

routes.get("/recipesList", dishes.recipesList)
     
routes.get("/recipes/:id", dishes.show)

routes.get("/history", dishes.history )

routes.get("/admin/recipes", dishes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", dishes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", dishes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", dishes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", dishes.post); // Cadastrar nova receita
routes.put("/admin/recipes", dishes.put); // Editar uma receita
routes.delete("/admin/recipes", dishes.delete); // Deletar uma receita

routes.use(function(req, res) {
  res.status(404).render("not-found");
})

module.exports = routes;