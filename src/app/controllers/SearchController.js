const Recipe = require('../models/Recipe');

module.exports = {
  async index(req, res) {
    try {
      let results, params = {}

      const { filter } = req.query

      if(!filter) return res.redirect('/admin/recipes')

      params.filter = filter

      results = await Recipe.findBy(params)

      async function getImage(recipeId) {
        let results = await Recipe.files(recipeId);
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)

        return files[0]
      }

      const recipesPromise = results.rows.map(async recipe => {
        recipe.image = await getImage(recipe.id);
        return recipe;
      })

      const recipes = await Promise.all(recipesPromise)

      const search = {
        term: req.query.filter
      }
  
      return res.render('admin/search/index', { recipes, search })
  
    } catch (err) {
      console.error(err)
    }
    
  }
}