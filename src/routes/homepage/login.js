const jwtCreation = require('../../controllers/Homepage/login');
const express = require('express');
const router = express.Router();

router.route('/').post(jwtCreation);
module.exports = router;
