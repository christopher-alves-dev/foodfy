const Recipe = require('../models/Recipe');
const File = require('../models/File');
const RecipeFile = require('../models/RecipeFile');

module.exports = {
  async index(req, res) {
    
    const { filter } = req.query
  
    if(filter) {
      const results = await Recipe.findBy(filter)
      const recipes = results.rows

      return res.render('admin/recipes', { recipes, filter })
      
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

      return res.render('admin/recipes/index', { recipes: allRecipes })

    }

  },
  async create(req, res) {
    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    results = await Recipe.chefsSelectOptions()
    const chefsOptions = results.rows

    return res.render('admin/recipes/create', { recipe, chefsOptions })

  },
  async post(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '') {
        return res.send('Fill all the fields plz!');
      }
    }

    if (req.files.length == 0) {
      return res.send('Please, send at least one image')
    }
  
    const results = await Recipe.create(req.body)
    const recipeId = results.rows[0].id

    const filesPromise = req.files.map(async file => {
      const results = await File.create(file);
      const file_id = results.rows[0].id;
      const data = {
        file_id,
        recipe_id: recipeId
      }

      await RecipeFile.create(data)
    })

    await Promise.all(filesPromise)
  
    return res.redirect(`/admin/recipes/${recipeId}`)

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

    return res.render('admin/recipes/show', { recipe, files })
  },
  async edit(req, res) {
    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if(!recipe) return res.send('Recipe not found!');

    recipe.created_at = Date(recipe.created_at).format

    results = await Recipe.chefsSelectOptions()
    const chefsOptions = results.rows

    results = await Recipe.files(recipe.id)
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public','')}`
    }))

    return res.render('admin/recipes/edit', { recipe, chefsOptions, files })
    
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '' && key != 'removedFiles') {
        return res.send('Fill all the fields plz!');
      }
    }

    if(req.files.length != 0) {
      const newFilesPromise = req.files.map(async file => {
        const results = await File.create(file);
        const file_id = results.rows[0].id;
        const data = {
          file_id,
          recipe_id: req.body.id
        }

        await RecipeFile.create(data);

      })

      await Promise.all(newFilesPromise)

    }

    if(req.body.removedFiles) {
      const removedFiles = req.body.removedFiles.split(','); //[1,2,3,]
      const lastIndex = removedFiles.length -1;
      removedFiles.splice(lastIndex, 1); //[1,2,3]

      const removedFilesPromise = removedFiles.map(id => {
        RecipeFile.delete(id);
        File.delete(id);
      })

      await Promise.all(removedFilesPromise);
    }

    await Recipe.update(req.body);

    return res.redirect(`/admin/recipes/${req.body.id}`);

  },
  async delete(req, res) {
    let results = await Recipe.files(req.body.id);
    const files = results.rows;
    const deletedFilesPromise = files.map(file => {
      RecipeFile.delete(file.file_id);
      File.delete(file.file_id);
    });

    await Promise.all(deletedFilesPromise);

    await Recipe.delete(req.body.id)

    return res.redirect(`/admin/recipes/index`)

  }
}

