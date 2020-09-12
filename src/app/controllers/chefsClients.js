const Chef = require("../models/Chef");

module.exports = {
  async index(req, res) {
    
    const results = await Chef.all()
    const chefs = results.rows

    return res.render('user/chefs/index', { chefs })

  },
  async show(req, res) {
    
    const results = await Chef.find(req.params.id) 
    const chef = results.rows[0]

    if(!chef) return res.send("Chef not found!");

    chef.created_at = Date(chef.created_at).format

    return res.render("user/chefs/chef", { chef })

  }
}