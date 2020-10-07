const express = require('express');
const routes = express.Router();

const multer = require('../app/middlewares/multer');

const adminRecipesController = require('../app/controllers/adminRecipesController');
const adminChefsController = require('../app/controllers/adminChefsController');
const SearchController = require('../app/controllers/SearchController')

//ADMIN
//ADMIN SEARCH
routes.get('/search', SearchController.index);

//ADMIN RECIPES
routes.get('/recipes', adminRecipesController.index); // Mostrar a lista de receitas
routes.get('/recipes/create', adminRecipesController.create); // Mostrar formulário de nova receita
routes.get('/recipes/:id', adminRecipesController.show); // Exibir detalhes de uma receita
routes.get('/recipes/:id/edit', adminRecipesController.edit); // Mostrar formulário de edição de receita
routes.post('/recipes', multer.array("photos", 5), adminRecipesController.post); // Cadastrar nova receita
routes.put('/recipes', multer.array("photos", 5), adminRecipesController.put); // Editar uma receita
routes.delete('/recipes', adminRecipesController.delete); // Deletar uma receita

//ADMIN CHEFS
routes.get('/chefs', adminChefsController.index);
routes.get('/chefs/create', adminChefsController.create);
routes.get('/chefs/:id', adminChefsController.show); 
routes.get('/chefs/:id/edit', adminChefsController.edit); 
routes.post('/chefs', multer.array('photos', 1), adminChefsController.post); 
routes.put('/chefs', multer.array('photos', 1), adminChefsController.put); 
routes.delete('/chefs', adminChefsController.delete);

module.exports = routes;