const tokenBalance = require('../../controllers/Balances/tokenbalance');
const express = require('express');
const router = express.Router();

router.route('/').post(tokenBalance);
module.exports = router;
