exports.seed = function(knex) {
  return knex('steps').truncate()
    .then(function() {
      return knex('steps').insert([
        {step_number: 1, instructions: 'Spread peanut butter on one side of each slice of bread', recipe_id: 1},
        {step_number: 2, instructions: 'Spread jelly over the peanut butter on only one slice of bread.', recipe_id: 1},
        {step_number: 3, instructions: 'Turn slice with only peanut butter over and place on top of other slice.', recipe_id: 1}
      ])
    })
};
