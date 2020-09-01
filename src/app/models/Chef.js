const { date } = require('../../lib/utils');

const db = require('../../config/db');

module.exports = {
  all(callback) {
    
    db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      GROUP BY chefs.id
      ORDER BY total_recipes DESC`, function(err, results) {
      if(err) throw `Database Error! ${err}`;
      
      callback(results.rows)
    })

  },
  create(data, callback) {
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      date(Date.now()).iso
    ]
  
    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`;
      
      callback(results.rows[0]);
    })
  },
  find(id, callback) {
    db.query(`
      SELECT *
      FROM chefs
      WHERE id = $1`, [id], function(err, results) {
        if(err) throw `Database Error! ${err}`;

        callback(results.rows[0]);
      })
  },
  findRecipes(id, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chefs_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE chef_id = $1`, [id], function(err, results) {
        if(err) throw `Database Error! ${err}`;

        callback(results.rows);
      })
  },
  findTotalRecipes(id, callback) {
    db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      WHERE chefs.id = $1
      GROUP BY chefs.id`, [id], function(err,results) {
        if(err) throw `Database Error! ${err}`;

        callback(results.rows[0]);
      })
  },
  update(data, callback) {
    const query = `
      UPDATE chefs SET
        name=($1),
        avatar_url=($2),
        created_at=($3)
      WHERE id = $4`

    const values = [
      data.name,
      data.avatar_url,
      data.created_at,
      data.id
    ]

    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`;

      callback();
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results) {
      if(err) throw `Database Error! ${err}`;

      return callback()
    })
  },
  chefsRecipes(callback) {
    db.query(`SELECT * FROM recipes`, function(err, results) {
      if(err) throw `Database Error! ${err}`;

      callback(results.rows);
    })
  }
}