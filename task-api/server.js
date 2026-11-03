// Load the configured app from app.js
const app = require('./app');

// The port the server listens on
const PORT = 3000;

// Start listening. The function runs once the server is ready.
app.listen(PORT, function () {
  console.log('Server running at http://localhost:' + PORT);
});