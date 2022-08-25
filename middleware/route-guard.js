const isLoggedIn = (req, res, next) => {
  console.log('isLoggedIn', req.session.currentUser);

  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  next();
};

const isLoggedOut = (req, res, next) => {
  console.log('isLoggedOut', req.session.currentUser);

  if (req.session.currentUser) {
    return res.redirect('/');
  }
  
  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};