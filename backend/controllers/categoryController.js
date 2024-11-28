const Category = require('../models/categoryModel');

// Add a new Category
const addCategory = async (req, res) => {
    const { name, icon } = req.body;

    try{
        const category = await Category.create({ name, icon });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// Get all Categories
const getAllCategories = async (req, res) => {
    try{
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addCategory, getAllCategories };