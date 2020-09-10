const Chef = require("../models/Chef");

module.exports = {
  async index(req, res) {
    
    const results = await Chef.all()
    const chefs = results.rows

    return res.render('admin/chefs/index', { chefs })

  },
  create(req, res) {
    return res.render("admin/chefs/create")

  },
  async post(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '') {
        return res.send('Fill all the fields plz!');
      }
    }
  
    const results = await Chef.create(req.body)
    const chefId = results.rows[0].id
  
    return res.redirect(`/admin/chefs/${chefId}`)
  },
  async show(req, res) {

    let results = await Chef.find(req.params.id)
    const chef = results.rows[0]

    if(!chef) return res.send("Chef not found!");

    results = await Chef.findTotalRecipes(chef.id)
    const recipe = results.rows[0]

    results = await Chef.findRecipes(recipe.id)
    const recipes = results.rows

    chef.created_at = Date(chef.created_at).format

    return res.render("admin/chefs/show", { chef, recipe, recipes })

  },
  async edit(req, res) {
    let results = await Chef.find(req.params.id)
    const chef = results.rows[0]

    if(!chef) return res.send("Chef not found!");

    return res.render("admin/chefs/edit", { chef })
    
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == "") {
        return res.send("Fill all the fields plz!");
      }
    }

    await Chef.update(req.body)

    return res.redirect(`/admin/chefs/${req.body.id}`)
  },
  async delete(req, res) {

    await Chef.delete(req.body.id)

    return res.redirect(`/admin/chefs`)

  }
}

