const express = require('express');
const { addCategory, getAllCategories } = require('../controllers/categoryController');
const router = express.Router();

// Route to add a Category
router.post('/',addCategory);

// Routes to get all Categories
router.get('/',getAllCategories);

module.exports = router;