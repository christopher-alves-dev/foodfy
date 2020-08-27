const Dish = require("../models/Dish");

module.exports = {
  about(req, res) {
    return res.render("about")

  },
  recipesList(req, res) {
    return res.render("recipesList")

  },
  show(req, res) {
    const { id } = req.params;

    const foundRecipe = data.recipes.find(function(recipe) {
      return recipe.id == id
      
    })
  
    if(!foundRecipe) {
      return res.render("not-found");
    }
  
    const recipe = {
      ...foundRecipe
    }
  
  
    return res.render("recipe", { recipe })
  },
  history(req, res) {
    return res.render("history")

  },
  index(req, res) {
    
    Dish.all(function(dishes) {
      return res.render('admin/recipes', { dishes })
    })

  },
  create(req, res) {
    return res.render("admin/create")

  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '') {
        return res.send('Fill all the fields plz!');
      }
    }
  
    Dish.create(req.body, function(dish) {
      return res.redirect(`/admin/recipes/${dish.id}`)
    })
  
  },
  showAdmin(req, res) {
    Dish.find(req.params.id, function(dish) {
      if(!dish) return res.send("Dish not found!");

      dish.created_at = Date(dish.created_at).format

      return res.render("admin/recipe", { dish })
    })

  },
  edit(req, res) {
    Dish.find(req.params.id, function(dish) {
      if(!dish) return res.send("Dish not found!");

      dish.created_at = Date(dish.created_at).format

      return res.render("admin/edit", { dish })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == "") {
        return res.send("Fill all the fields plz!");
      }
    }

    Dish.update(req.body, function() {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
  },
  delete(req, res) {

    Dish.delete(req.body.id, function() {
      return res.redirect(`/admin/recipes`)
    })
  }
}

