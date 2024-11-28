const express = require('express');
const cors = require('cors'); // Import CORS
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes'); // Import product routes

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware
app.use(express.json()); // To parse JSON bodies

// API Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/categories', categoryRoutes); // Category routes
app.use('/api/products', productRoutes); // Product routes

// Root Route
app.get('/', (req, res) => {
  res.send('Server is Running');
});

// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
