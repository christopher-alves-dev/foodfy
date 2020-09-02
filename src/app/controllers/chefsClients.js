const Chef = require("../models/Chef");

module.exports = {
  index(req, res) {
    Chef.all(function(chefs) {
      return res.render('user/chefs/index', { chefs })
    })

  },
  show(req, res) {
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send("Chef not found!");

      chef.created_at = Date(chef.created_at).format

      return res.render("user/chefs/chef", { chef })
    })
  }
}