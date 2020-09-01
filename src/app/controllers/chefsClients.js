module.exports = {
  about(req, res) {
    return res.render("about")

  },
  index(req, res) {
    return res.render("chefsList")
  },
  show(req, res) {
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send("Chef not found!");

      chef.created_at = Date(chef.created_at).format

      return res.render("chef", { chef })
    })
  }
}