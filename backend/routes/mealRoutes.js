const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

// GET /api/meals?search=chicken
router.get('/', mealController.searchMeals);

// GET /api/meals/:id
router.get('/:id', mealController.getMealById);

module.exports = router;
