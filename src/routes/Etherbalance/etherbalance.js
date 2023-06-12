const etherBalance = require('../../controllers/Balances/etherbalance');
const express = require('express');
const router = express.Router();

router.route('/').post(etherBalance);
module.exports = router;
