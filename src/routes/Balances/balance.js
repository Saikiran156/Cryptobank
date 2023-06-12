const userBalance = require('../../controllers/Balances/balance');
const express = require('express');
const router = express.Router();

router.route('/').post(userBalance);
module.exports = router;
