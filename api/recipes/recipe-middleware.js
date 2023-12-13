const Recipes = require('./recipe-model') //eslint-disable-line

const checkRecipe = (req, res, next) => {
  // Recipe must have a name
  // Name must be unique
  next()
}

const checkStep = (req, res, next) => {
  // Step must contain some instructions & belong to a recipe.
  next()
}

const checkIngredient = (req, res, next) => {
  // Each ingredient must include a quantity
  next()
}

module.exports = {
  checkRecipe,
  checkStep,
  checkIngredient,
}