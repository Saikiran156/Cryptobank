const transactionlog = require('../../controllers/Tokens/transaction');
const express = require('express');
const router = express.Router();

router.route('/').post(transactionlog);
module.exports = router;
