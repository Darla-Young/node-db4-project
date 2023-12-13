exports.seed = function(knex) {
  return knex('ingredients').truncate()
    .then(function() {
      return knex('ingredients').insert([
        {ingredient_name: 'bread', qty: '2 slices', step_id: 1},
        {ingredient_name: 'peanut butter', qty: '2 tbs', step_id: 1},
        {ingredient_name: 'jelly', qty: '1 tbs', step_id: 2}
      ])
    })
};
