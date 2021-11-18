const express = require('express');
const router = express.Router();

// Manganelo Route
router.use('/manganelo', require('./manganelo'))


module.exports = router