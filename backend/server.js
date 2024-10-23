require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

// Use routes
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
