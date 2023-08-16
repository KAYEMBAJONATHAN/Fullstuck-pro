function ErrorHandler(err, req, res, next) {
    if (err.name === 'UnauthenticatedError') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err });
    }
  
    // Handle other errors...
    return res.status(500).json({ message: 'Internal server error' });
  }
  
  module.exports = ErrorHandler;
  