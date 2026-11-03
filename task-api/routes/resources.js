// Load Express so we can create a router
const express = require('express');

// A router is a mini-app that holds a group of related routes
const router = express.Router();

// The in-memory database
// This resets every time the server restarts
let tasks = [
  { id: 1, title: 'Express', completed: false },
  { id: 2, title: 'REST API', completed: false }
];

// The next ID to hand out. Kept separate from the array so that
// deleting a task never causes an old ID to be reused.
let nextId = 3;