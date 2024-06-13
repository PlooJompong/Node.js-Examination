const errorHandler = (err, req, res, next) => {
  res.status(404).json({ error: err.message, });

  next()
};

export default errorHandler;