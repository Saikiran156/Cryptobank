const nonce = require('../../controllers/Access/nonce');
const express = require('express');
const router = express.Router();
router.route('/').get(nonce);
module.exports = router;
