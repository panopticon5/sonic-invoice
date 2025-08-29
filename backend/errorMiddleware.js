function errorHandler(err, req, res, next) {
  console.error('Error:', err.stack);

  // Default status code
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
}

module.exports = errorHandler;