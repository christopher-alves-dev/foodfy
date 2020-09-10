const { date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {
  all(callback) {
    
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ORDER BY recipes.title ASC
    `, function(err, results) {
      if(err) throw `Database Error! ${err}`;
      
      callback(results.rows)
    })

  },
  create(data, callback) {
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
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
      data.chef
    ]
  
    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`;
      
      callback(results.rows[0]);
    })
  },
  find(id, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.id = $1`, [id], function(err, results) {
        if(err) throw `Database Error! ${err}`;

        callback(results.rows[0]);
      })
  },
  findBy(filter, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.title ILIKE '%${filter}%'
      ORDER BY recipes.title ASC
    `, function(err, results) {
      if(err) throw `Database Error! ${err}`;
      
      callback(results.rows)
    })
  },
  update(data, callback) {
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

    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`;

      callback();
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results) {
      if(err) throw `Database Error! ${err}`;

      return callback();
    })
  },
  chefsSelectOptions(callback) {
    db.query(`SELECT name, id FROM chefs`, function(err, results) {
      if(err) throw `Database Error! ${err}`;

      callback(results.rows);
    })
  }

}