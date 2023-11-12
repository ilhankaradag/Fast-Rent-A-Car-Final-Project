const user = require('../models/User');

const isAdmin = (req, res, next) => {
  if (req.role === 'admin' && isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Erişim engellendi. Yönetici değilsiniz.' });
  }
};

module.exports = isAdmin;
