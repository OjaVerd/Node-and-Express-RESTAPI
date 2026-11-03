const express = require('express');

// Load the two files we wrote
const logger = require('./middleware/logger');
const resourceRoutes = require('./routes/resources');

// Create the Express application
const app = express();

// Step 1: parse incoming JSON bodies into req.body
app.use(express.json());

// Step 2: log every request
app.use(logger);

// Step 3: attach the router under the /api/resources prefix
// Router path "/:id" becomes "/api/resources/:id"
app.use('/api/resources', resourceRoutes);

// Share the app so server.js can start it
module.exports = app;