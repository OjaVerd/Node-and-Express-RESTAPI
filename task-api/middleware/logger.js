// Express calls this function for every request that reaches it.
//   req  = the incoming request (method, URL, headers, body)
//   res  = the response object (unused here, but must stay in the signature)
//   next = a function that passes the request on to the next step
function logger(req, res, next) {
  // Current date and time 
  const timestamp = new Date().toISOString();

  // The HTTP method: "GET", "POST", "PUT", or "DELETE"
  const method = req.method;

  const route = req.originalUrl;

  // Print one line to the terminal
  console.log('[' + timestamp + '] ' + method + ' ' + route);

  // Without this call the request stops here and the client waits forever
  next();
}

// Lets other files load this function with require('./middleware/logger')
module.exports = logger;