const ethBalance = require('../../controllers/Balances/ethbalance');
const express = require('express');
const router = express.Router();

router.route('/').post(ethBalance);
module.exports = router;
