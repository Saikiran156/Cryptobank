// async function nonceValidation(req, res, next) {
//   const nonce = req.body.nonce;
//   const signer = req.body.signer;
//   if (nonce == null) {
//     res.send('Invalid Nonce');
//   } else {
//     const verification = await signer.verifyMessage(nonce);
//     console.log('Nonce Verification Successful');
//     next();
//   }
// }

// module.exports = nonceValidation;
