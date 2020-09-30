const { date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {
  all() {
    
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ORDER BY recipes.title ASC
    `)

  },
  create(data) {
    const query = `
      INSERT INTO recipes (
        title,
        ingredients,
        preparation,
        information,
        created_at,
        chef_id
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `

    const values = [
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
      data.chef
    ]

    console.log(data.ingredients)
  
    return db.query(query, values)
  },
  chefsSelectOptions() {
    return db.query(`SELECT name, id FROM chefs`)
  },
  find(id) {
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.id = $1`, [id])
  },
  findBy(filter) {
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.title ILIKE '%${filter}%'
      ORDER BY recipes.title ASC
    `)
  },
  update(data) {
    const query = `
      UPDATE recipes SET
        title=($1),
        ingredients=($2),
        preparation=($3),
        information=($4),
        created_at=($5),
        chef_id=($6)
      WHERE id = $7`

    const values = [
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.created_at,
      data.chef,
      data.id
    ]

    console.log(data.ingredients)


    return db.query(query, values)
  },
  delete(id) {
    return db.query(`DELETE FROM recipes WHERE id = $1`, [id])
  },
  files(id) {
    return db.query(`
      SELECT recipe_files.*, files.name AS name, files.path AS path, files.id AS file_id
      FROM recipe_files 
      LEFT JOIN files ON (recipe_files.file_id = files.id)
      WHERE recipe_files.recipe_id = $1
    `, [id])
  }
}