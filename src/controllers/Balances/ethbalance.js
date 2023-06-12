const { ethers } = require('../../../models');

const ethBalance = async (req, res) => {
  console.log(ethers, req.body, '......................');
  const data = await ethers.findOne({
    where: {
      connectedAddress: req.body.signerAddress,
      networkname: req.body.network,
    },
  });
  console.log(data);

  res.status(200).json({ amount: data == null ? 0 : data.amount });
};

module.exports = ethBalance;
