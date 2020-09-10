const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");

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
  
    const results = await Recipe.create(req.body)
    const recipeId = results.rows[0].id
  
    return res.redirect(`/admin/recipes/${recipeId}`)

  },
  async show(req, res) {
    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if(!recipe) return res.send("Recipe not found!");

    recipe.created_at = Date(recipe.created_at).format

    return res.render("admin/recipe", { recipe })
  },
  async edit(req, res) {
    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if(!recipe) return res.send("Recipe not found!");

    recipe.created_at = Date(recipe.created_at).format

    results = await Chef.chefsSelectOptions()
    const chefOptions = results.rows

    return res.render('admin/edit', { recipe, chefOptions })
    
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == "") {
        return res.send("Fill all the fields plz!");
      }
    }

    await Recipe.update(req.body)

    return res.redirect(`/admin/recipes/${req.body.id}`)

  },
  async delete(req, res) {

    await Recipe.delete(req.body.id)

    return res.redirect(`/admin/recipes`)

  }
}

