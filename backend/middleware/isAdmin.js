const user = require('../models/User');

const isAdmin = (req, res, next) => {
  if (req.role === 'admin' && isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. You are not a manager.' });
  }
};

module.exports = isAdmin;
