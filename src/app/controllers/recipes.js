const Recipe = require('../models/Recipe');
const Chef = require('../models/Chef');
const File = require('../models/File');

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
      return res.render('admin/recipes', { recipes })
    }

  },
  async create(req, res) {
    const results = await Chef.chefsSelectOptions()
    const chefOptions = results.rows

    return res.render('admin/create', {chefOptions})

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

    const filesPromise = req.files.map(file => File.create({...file, recipe_id: recipeId}))
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
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
    }))

    return res.render('admin/recipe', { recipe, files })
  },
  async edit(req, res) {
    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if(!recipe) return res.send('Recipe not found!');

    recipe.created_at = Date(recipe.created_at).format

    results = await Chef.chefsSelectOptions()
    const chefOptions = results.rows

    results = await Recipe.files(recipe.id)
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
    }))

    return res.render('admin/edit', { recipe, chefOptions, files })
    
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '' && key != 'removedFiles') {
        return res.send('Fill all the fields plz!');
      }
    }

    if(req.files.length != 0) {
      const newFilesPromise = req.files.map(file => {
        File.create({...file, recipe_id: req.body.id})
      })
      await Promise.all(newFilesPromise)

    }

    if(req.body.removedFiles) {
      const removedFiles = req.body.removedFiles.split(',') //[1,2,3,]
      const lastIndex = removedFiles.length -1
      removedFiles.splice(lastIndex, 1) //[1,2,3]

      const removedFilesPromise = removedFiles.map(id => File.delete(id))

      await Promise.all(removedFilesPromise)
    }

    await Recipe.update(req.body)

    return res.redirect(`/admin/recipes/${req.body.id}`)

  },
  async delete(req, res) {

    await Recipe.delete(req.body.id)

    return res.redirect(`/admin/recipes`)

  }
}

