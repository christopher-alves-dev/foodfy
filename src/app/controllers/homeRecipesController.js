const Recipe = require('../models/Recipe');

module.exports = {
  async about(req, res) {
    
    const results = await Recipe.all()
    const recipes = results.rows

    async function getImage(recipeId) {
      let results = await Recipe.files(recipeId);
      const file = results.rows[0];

      return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
    }

    const recipesPromise = recipes.map(async recipe => {
      recipe.image = await getImage(recipe.id);
      return recipe;
    })

    const allRecipes = await Promise.all(recipesPromise);

    return res.render('home/about', { recipes: allRecipes })

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

      async function getImage(recipeId) {
        let results = await Recipe.files(recipeId);
        const file = results.rows[0];
  
        return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
      }
  
      const recipesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(recipe.id);
        return recipe;
      })
  
      const allRecipes = await Promise.all(recipesPromise);

      return res.render('home/recipes/index', { recipes: allRecipes })

    }

  },
  async show(req, res) {
    
    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if(!recipe) return res.send('Recipe not found!');

    recipe.created_at = Date(recipe.created_at).format
    
    results = await Recipe.files(recipe.id)
    const files = results.rows.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public','')}`
    }))

    return res.render('home/recipes/recipe', { recipe, files })

  },
  history(req, res) {
    return res.render('home/history')
  }
}