const auth = (req, res, next) => {
  if (global.currentUser) {
    return next();
  }

  res.status(401).json({ message: 'You need to be logged in to view the order history or modify your cart' });
};

export default auth;