const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');
require('dotenv').config();
async function jwtCreation(req, res) {
  try {
    console.log(req.body);
    const signedMessage = req.body.signedMessage;
    const message = req.body.message;
    const signerAddress = req.body.signerAddress;

    const verifiedAddress = ethers.utils.verifyMessage(message, signedMessage);

    console.log('Nonce Verification Successful');

    console.log(req.body.signerAddress, 'dsgfd.......');
    if (verifiedAddress == signerAddress) {
      const token = jwt.sign(
        { signerAddress: req.body.signerAddress },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '1d',
        },
      );
      console.log('Token Created', token);
      res.status(200).json({ token });
    }

    // res.send('Login Successful');
  } catch (error) {
    console.log('Token not created', error);
    res.send('Login Failed');
  }
}

module.exports = jwtCreation;
