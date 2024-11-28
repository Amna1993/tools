const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true,
    },
    icon: {
        type: String,
        default: '',
    },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;