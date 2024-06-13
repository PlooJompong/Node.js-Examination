const adminAuth = (req, res, next) => {
  if (global.isAdmin) {
    return next();
  }

  res.status(401).json({ error: "Access denied, please login as admin" });
};

export { adminAuth as adminAuthMiddleware }