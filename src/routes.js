const express = require('express');
const routes = express.Router();
const multer = require('./app/middlewares/multer');
const recipesClients = require('./app/controllers/recipesClients');
const chefsClients = require('./app/controllers/chefsClients')
const recipes = require('./app/controllers/recipes');
const chefs = require('./app/controllers/chefs');

routes.get('/', recipesClients.about);
routes.get('/history', recipesClients.history );

//SITE RECIPES
routes.get('/recipes', recipesClients.index);
routes.get('/recipes/:id', recipesClients.show);

//SITE CHEFS
routes.get('/chefs', chefsClients.index);
routes.get('/chefs/:id', chefsClients.show);

//ADMIN RECIPES
routes.get('/admin/recipes', recipes.index); // Mostrar a lista de receitas
routes.get('/admin/recipes/create', recipes.create); // Mostrar formulário de nova receita
routes.get('/admin/recipes/:id', recipes.show); // Exibir detalhes de uma receita
routes.get('/admin/recipes/:id/edit', recipes.edit); // Mostrar formulário de edição de receita
routes.post('/admin/recipes', multer.array("photos", 5), recipes.post); // Cadastrar nova receita
routes.put('/admin/recipes', multer.array("photos", 5), recipes.put); // Editar uma receita
routes.delete('/admin/recipes', recipes.delete); // Deletar uma receita

//ADMIN CHEFS
routes.get('/admin/chefs', chefs.index);
routes.get('/admin/chefs/create', chefs.create);
routes.get('/admin/chefs/:id', chefs.show); 
routes.get('/admin/chefs/:id/edit', chefs.edit); 
routes.post('/admin/chefs', multer.array('photos', 1), chefs.post); 
routes.put('/admin/chefs', multer.array('photos', 1), chefs.put); 
routes.delete('/admin/chefs', chefs.delete);

routes.get('/ads/create', function(req, res) {

})



routes.use(function(req, res) {
  res.status(404).render('not-found');
})

module.exports = routes;