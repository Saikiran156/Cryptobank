const randomBytes = require('randombytes');
async function nonce(req, res) {
  res.status(200).json({ nonce: randomBytes(32).toString('hex') });
}
module.exports = nonce;
