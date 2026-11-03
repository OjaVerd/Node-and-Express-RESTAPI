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

// GET /api/resources
// Returns every task in the array
router.get('/', function (req, res) {
  res.json(tasks);
});

// GET /api/resources/:id
// Returns a single task, or a 404 if no task has that id
router.get('/:id', function (req, res) {
  // URL parameters always arrive as strings, so convert to a number
  const id = Number(req.params.id);

  // Look through the array for the task whose id matches
  // find() returns the task object, or undefined if nothing matched
  const task = tasks.find(function (currentTask) {
    return currentTask.id === id;
  });

  // Nothing found: send a 404 and stop
  // "return" prevents the code below from running and sending a second response
  if (task === undefined) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  // Found it: send it back with the default 200 status
  res.json(task);
});
// POST /api/resources
// Creates a new task from the JSON body and returns it with status 201
router.post('/', function (req, res) {
  // If no JSON body was sent, req.body can be undefined in Express 5
  if (req.body === undefined) {
    return res.status(400).json({ error: 'Request body is required' });
  }

  // Pull out only the fields we accept, so clients can't set their own id
  const title = req.body.title;
  const completed = req.body.completed;

  // title is required
  if (title === undefined || title === '') {
    return res.status(400).json({ error: 'title is required' });
  }

  // default to false if it wasn't sent
  let completedValue;
  if (completed === undefined) {
    completedValue = false;
  } else {
    completedValue = completed;
  }

  // Build the new object, using the next available id
  const newTask = {
    id: nextId,
    title: title,
    completed: completedValue
  };

  // Increase the counter so the next task gets a different id
  nextId = nextId + 1;

  // Add it to the end of the array
  tasks.push(newTask);

  // 201 means "Created"
  res.status(201).json(newTask);
});

// PUT /api/resources/:id
// Updates the fields that were sent for an existing task
router.put('/:id', function (req, res) {
  const id = Number(req.params.id);

  // Find the task. This is the actual object stored in the array,
  // so changing it below changes the stored data.
  const task = tasks.find(function (currentTask) {
    return currentTask.id === id;
  });

  if (task === undefined) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  if (req.body === undefined) {
    return res.status(400).json({ error: 'Request body is required' });
  }

  const title = req.body.title;
  const completed = req.body.completed;

  // Only overwrite a field if the client actually sent it
  if (title !== undefined) {
    task.title = title;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  // id is never touched, so it can't be changed

  res.json(task);
});

// DELETE /api/resources/:id
// Removes a task from the array and returns the removed task
router.delete('/:id', function (req, res) {
  const id = Number(req.params.id);

  // findIndex() returns the position of the match, or -1 if there is none
  const index = tasks.findIndex(function (currentTask) {
    return currentTask.id === id;
  });

  if (index === -1) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  // splice removes items and returns them as an array
  const removedItems = tasks.splice(index, 1);

  // The array holds one item, so take the first one
  const removedTask = removedItems[0];

  res.json(removedTask);
});


module.exports = router;