const { tokens } = require('../../../models');

const userBalance = async (req, res) => {
  console.log(tokens, req.body, '......................');
  const data = await tokens.findOne({
    where: {
      connectedAddress: req.body.signerAddress,
      tokenAddress: req.body.TokenAddress,
      networkname: req.body.network,
    },
  });
  console.log(data, 'fjlksdajfl');

  res.status(200).json({ amount: data == null ? 0 : data.amount });
};

module.exports = userBalance;
