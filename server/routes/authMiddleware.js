const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  // token handler
  const jwt = require('jsonwebtoken');

  if (token) {
    try {
      // CHECK IF THIS TOKEN IS USING THE SAME SECRET KEY THAT WE ARE USING
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).send(err.message);
      res.redirect('/admin/login');
    }
  } else {
    res.status(401);
    res.redirect('/admin/login');
  }
};

module.exports = authMiddleware;
