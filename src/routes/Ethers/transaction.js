const transaction = require('../../controllers/Ethers/transaction');
const express = require('express');
const router = express.Router();

router.route('/').post(transaction);
module.exports = router;
