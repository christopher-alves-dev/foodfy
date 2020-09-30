const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");
const File = require("../models/File");

module.exports = {
  async index(req, res) {
    try {
      const results = await Chef.all()
      const chefs = results.rows
  
      async function getImage(file_id) {
        let results = await Chef.file(file_id);
        const file = results.rows[0];
  
        return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
      }
  
      const chefsPromise = chefs.map(async chef => {
        chef.image = await getImage(chef.file_id);
        return chef;
      });
  
      const allChefs = await Promise.all(chefsPromise);
  
      return res.render('admin/chefs/index', { chefs: allChefs })

    } catch(err) {
      console.error(err)
    }

  },
  create(req, res) {
    return res.render("admin/chefs/create")
  },
  async post(req, res) {
    try {
      const keys = Object.keys(req.body);

      for(key of keys) {
        if(req.body[key] == '') {
          return res.send('Fill all the fields plz!');
        }
      }
  
      if (req.files.length == 0) {
        return res.send('Please, send at least one image.');
      }
  
      let results = await File.create(req.files[0]);
      const file_id = results.rows[0].id;
  
      const data = {...req.body, file_id};
      results = await Chef.create(data);
      const chefId = results.rows[0].id
    
      return res.redirect(`/admin/chefs/${chefId}`)

    } catch(err) {
      console.error(err)
    }
    
  },
  async show(req, res) {

    try {
      let results = await Chef.find(req.params.id)
      const chef = results.rows[0]
  
      if(!chef) return res.send("Chef not found!");
  
      chef.created_at = Date(chef.created_at).format
  
      results = await Chef.file(chef.file_id);
      chef.file = {...results.rows[0]};
      chef.file.src = `${req.protocol}://${req.headers.host}${chef.file.path.replace('public', '')}`;
  
      results = await Chef.chefRecipes(chef.id);
      const recipes = results.rows;
  
      async function getImage(recipeId) {
        let results = await Recipe.files(recipeId);
        const file = results.rows[0];
  
        return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
      }
  
      const recipesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(recipe.id);
        return recipe;
      });
  
      const allChefRecipes = await Promise.all(recipesPromise);
  
      return res.render("admin/chefs/show", { chef, recipes: allChefRecipes })

    } catch(err) {
      console.error(err)
    }
    
  },
  async edit(req, res) {
    try {
      let results = await Chef.find(req.params.id)
      const chef = results.rows[0]
  
      if(!chef) return res.send("Chef not found!");
  
      results = await Chef.file(chef.file_id);
      let files = results.rows;
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
      }))
        
      return res.render("admin/chefs/edit", { chef, files })

    } catch(err) {
      console.error(err)
    }
    
    
  },
  async put(req, res) {
    try {
      const keys = Object.keys(req.body);

      for(key of keys) {
        if(req.body[key] == '' && key != 'removedFiles') {
          return res.send('Fill all the fields plz!');
        }
      }
  
      let file_id;
  
      if(req.files.length != 0) {
        const results = await File.create(req.files[0]);
        file_id = results.rows[0].id;
      }
  
      const data = {
        ...req.body,
        file_id: file_id || req.body.file_id
      };
  
      await Chef.update(data)
  
      if(req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(',');
        const lastIndex = removedFiles.length - 1
        removedFiles.splice(lastIndex, 1)
  
        const removedFilesPromise = removedFiles.map(id => File.delete(id))
  
        await Promise.all(removedFilesPromise)
      }
  
      return res.redirect(`/admin/chefs/${req.body.id}`)

    } catch(err) {
      console.error(err)
    }
    
  },
  async delete(req, res) {
    try {
      await Chef.delete(req.body.id);
      await File.delete(req.body.file_id)
  
      return res.redirect(`/admin/chefs`)
  
    } catch(err) {
      console.error(err)
    } 
    
  }
}

