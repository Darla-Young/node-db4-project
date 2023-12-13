const db = require('../../data/db-config')

module.exports = {
  getRecipeById,
}

async function getRecipeById(recipe_id) {
  const recipe = await db('recipes as r')
    .where('r.recipe_id', recipe_id)
    .join('steps as s', 'r.recipe_id', 's.recipe_id')
    .leftJoin('ingredients as i', 's.step_id', 'i.step_id')
    .select(
      'r.recipe_id',
      'r.name',
      'r.created_at',
      's.step_id',
      's.step_number',
      's.instructions',
      'i.ingredient_id',
      'i.ingredient_name',
      'i.qty'
    )
    
  const steps = []

  for (let i in recipe) {
    const { 
      step_id, 
      ingredient_id, 
      ingredient_name, 
      qty,
      step_number,
      instructions,
    } = recipe[i]
   
    const ingredient = {
      "ingredient_id": ingredient_id,
      "ingredient_name": ingredient_name,
      "quantity": qty
    }

    if (!steps[step_id - 1]) {
      steps.push({
        "step_id": step_id,
        "step_number": step_number,
        "step_instructions": instructions,
        "ingredients": ingredient_id ? [ingredient] : []
      })
    }
    else {
      if (ingredient_id) steps[step_id - 1].ingredients.push(ingredient)
    }
  }

  return ({
    "recipe_id": recipe_id,
    "recipe_name": recipe[0].name,
    "created_at": recipe[0].created_at,
    "steps": steps
  })
}