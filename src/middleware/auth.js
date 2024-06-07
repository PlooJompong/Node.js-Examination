const authenticate = (req, res, next) => {
  if (global.currentUser) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'You need to be logged in to view the order history',
    });
  }
};

export default authenticate;