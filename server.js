const express = require('express');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Connect to MongoDB
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/users', require('./routes/api/users-routes'));
app.use('/api/thoughts', require('./routes/api/thoughts-routes'));


// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
