const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
});

// Middleware to generate a unique slug
productSchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    return next();
  }

  // Generate slug from the name
  let baseSlug = slugify(this.name, { lower: true });

  // Ensure slug is unique
  let slug = baseSlug;
  let count = 1;

  while (await mongoose.models.Product.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  this.slug = slug;
  next();
});

module.exports = mongoose.model('Product', productSchema);
