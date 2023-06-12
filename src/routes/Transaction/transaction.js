const transactionlog = require('../../controllers/Transaction/transaction');
const express = require('express');
const router = express.Router();

router.route('/').get(transactionlog);
module.exports = router;
