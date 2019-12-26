exports.get404 = (req, res, next) => {
  res.status(400).render('404', { 
    path: '/404', 
    pageTitle: 'Page not found',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render('500', { 
    path: '/500', 
    pageTitle: 'Error occcurred',
    isAuthenticated: req.session.isLoggedIn
  });
};