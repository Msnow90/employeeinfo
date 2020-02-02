const router = require('express').Router();

// require all routes and compile here
const employeeRoutes = require('./api/employees');

// this is so we can append /api/[route category] to all routes' urls and not have to type in every file, thus reducing confusion
router.use('/api/employees', employeeRoutes);

module.exports = router;