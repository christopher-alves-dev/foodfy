const Chef = require("../models/Chef");

module.exports = {
  about(req, res) {
    return res.render("about")

  },
  chefsList(req, res) {
    return res.render("chefsList")

  },
  show(req, res) {
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send("Chef not found!");

      chef.created_at = Date(chef.created_at).format

      return res.render("chef", { chef })
    })
  },
  history(req, res) {
    return res.render("history")

  },
  index(req, res) {
    
    Chef.all(function(chefs) {
      return res.render('admin/chefs', { chefs })
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
  
    Chef.create(req.body, function(chef) {
      return res.redirect(`/admin/chefs/${chef.id}`)
    })
  
  },
  showAdmin(req, res) {
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send("Chef not found!");

      chef.created_at = Date(chef.created_at).format

      return res.render("admin/chef", { chef })
    })

  },
  edit(req, res) {
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send("Chef not found!");

      chef.created_at = Date(chef.created_at).format

      return res.render("admin/edit", { chef })
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

