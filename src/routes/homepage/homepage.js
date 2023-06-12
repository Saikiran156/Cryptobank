const homepage = require('../../controllers/Homepage/homepage');
const express = require('express');
const router = express.Router();

router.route('/').get(homepage);
module.exports = router;
