const Recipe = require("../models/Recipe");

module.exports = {
  async about(req, res) {
    
    const results = await Recipe.all()
    const recipes = results.rows

    return res.render('user/about', { recipes })

  },
  async index(req, res) {
    const { filter } = req.query
  
    if(filter) {
      
      const results = await Recipe.findBy(filter)
      const recipes = results.rows[0]

      return res.render('user/recipes/index', { recipes, filter })

    } else {
      
      const results = await Recipe.all()
      const recipes = results.rows

      return res.render('user/recipes/index', { recipes })

    }

  },
  async show(req, res) {
    
    const results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if(!recipe) return res.send("Recipe not found!");

    recipe.created_at = Date(recipe.created_at).format
    

    return res.render("user/recipes/recipe", { recipe })

  },
  history(req, res) {
    return res.render("user/history")
  }
}