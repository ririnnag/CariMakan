require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mealRoutes = require('./routes/mealRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/meals', mealRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('CariMakan Backend API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
