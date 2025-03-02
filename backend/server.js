require('dotenv').config();
const express = require('express');
const cors = require('cors');
const openaiRoutes = require('./routes/openai');

const app = express();

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Handle JSON requests

// API Routes
app.use('/api/openai', openaiRoutes);

// Serve static frontend files
app.use(express.static('../frontend/public'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
