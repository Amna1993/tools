const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

// Add a new product
const addProduct = async (req, res) => {
  const { name, url, image, tagline, description, categories } = req.body;

  try {
    // Validate categories
    if (!categories || categories.length < 1 || categories.length > 3) {
      return res.status(400).json({
        message: 'Please select at least 1 and at most 3 categories.',
      });
    }

    // Check if categories exist
    const validCategories = await Category.find({
      _id: { $in: categories },
    });

    if (validCategories.length !== categories.length) {
      return res.status(400).json({
        message: 'Invalid category IDs. Please check and try again.',
      });
    }

    // Create a new product
    const product = await Product.create({
      name,
      url,
      image,
      tagline,
      description,
      categories,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: `Error creating product: ${error.message}` });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categories', 'name icon');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: `Error fetching products: ${error.message}` });
  }
};

module.exports = { addProduct, getAllProducts };
