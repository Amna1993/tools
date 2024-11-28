const express = require('express');
const { addProduct, getAllProducts } = require('../controllers/productController');
const router = express.Router();

// Route to add a product
router.post('/', addProduct);

// Route to get all products
router.get('/', getAllProducts);

router.post('/', (req, res) => {
    console.log('POST request received:', req.body);
    res.send('Test response');
  });

  
module.exports = router;
