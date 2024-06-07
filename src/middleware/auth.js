//Middleware för att kontrollera att en användare är inloggad.
//används för att visa orderhistoriken 

const authenticate = (req, res, next) => {
  if (global.currentUser) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'You need to be logged in to view the orderhistory',
      status: 401
    });
  }
};

export default authenticate;