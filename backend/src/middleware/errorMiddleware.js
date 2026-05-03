export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
};

export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', {
    method: req.method,
    url: req.originalUrl,
    message: err.message,
    stack: err.stack,
  });

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal server error',
    details: err.details || undefined,
  });
};
