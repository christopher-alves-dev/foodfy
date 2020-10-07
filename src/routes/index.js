const express = require('express');
const routes = express.Router();

const homeRecipesController = require('../app/controllers/homeRecipesController');
const homeChefsController = require('../app/controllers/homeChefsController')

const users = require('./users')
const admin = require('./admin')

routes.use('/users', users)
routes.use('/admin', admin)

//HOME
routes.get('/', homeRecipesController.about);
routes.get('/history', homeRecipesController.history );

//HOME RECIPES
routes.get('/recipes', homeRecipesController.index);
routes.get('/recipes/:id', homeRecipesController.show);

//HOME CHEFS
routes.get('/chefs', homeChefsController.index);
routes.get('/chefs/:id', homeChefsController.show);

routes.use(function(req, res) {
  res.status(404).render('not-found');
})

module.exports = routes;