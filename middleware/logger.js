const logger = (req, res, next) => {
  console.log(`Endpoint: ${req.url}, Method: ${req.method}`);
  next();
  // Here next just means dont end the program after the console.log continue it.
  // its a middleware
};

module.exports = logger;
