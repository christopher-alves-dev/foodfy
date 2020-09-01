const Chef = require("../models/Chef");

module.exports = {
  index(req, res) {
    
    Chef.all(function(chefs) {
      return res.render('admin/chefs/index', { chefs })
    })

  },
  create(req, res) {
    return res.render("admin/chefs/create")

  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '') {
        return res.send('Fill all the fields plz!');
      }
    }
  
    Chef.create(req.body, function(chef) {
      return res.redirect(`/admin/chefs/${chef.id}`)
    })
  
  },
  show(req, res) {
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send("Chef not found!");

      Chef.findTotalRecipes(chef.id, function(recipe) {
        
        Chef.findRecipes(recipe.id, function(recipes) {

          chef.created_at = Date(chef.created_at).format

          return res.render("admin/chefs/show", { chef, recipe, recipes })
        })
      })

    })

  },
  edit(req, res) {
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send("Chef not found!");

      chef.created_at = Date(chef.created_at).format

      return res.render("admin/chefs/edit", { chef })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == "") {
        return res.send("Fill all the fields plz!");
      }
    }

    Chef.update(req.body, function() {
      return res.redirect(`/admin/chefs/${req.body.id}`)
    })
  },
  delete(req, res) {

    Chef.delete(req.body.id, function() {
      return res.redirect(`/admin/chefs`)
    })
  }
}
