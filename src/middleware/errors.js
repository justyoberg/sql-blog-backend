const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: error.message });
  } else if (error.name === 'SequelizeConnectionRefusedError') {
    return res.status(500).send({ error: 'Problem connecting to database' });
  } else {
    return res.status(400).send({ error: error.message });
  }
  next(error);
};

export default errorHandler;
