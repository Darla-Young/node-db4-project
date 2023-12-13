const express = require('express')
const Recipes = require('./recipe-model')
const {
  checkRecipe, //eslint-disable-line
  checkStep, //eslint-disable-line
  checkIngredient, //eslint-disable-line
} = require('./recipe-middleware') 
const router = express.Router()

router.get('/:id', (req, res, next) => {
  Recipes.getRecipeById(req.params.id)
    .then(recipe => {
      res.json(recipe)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router