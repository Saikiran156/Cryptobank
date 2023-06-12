const { transactionlog } = require('../../../models');
const { Op } = require('sequelize');
const etherBalance = async (req, res) => {
  //   console.log(tokens, req.body, '......................');
  console.log(req.body.network);
  const data = await transactionlog.findAll({
    where: {
      networkname: { [Op.like]: req.body.network },
      // [Op.and]: [
      //   {
      //     networkname: {
      //       [Op.like]: req.body.network,
      //     },
      //   },
      // ],

      [Op.or]: [
        {
          from: {
            [Op.like]: req.body.signerAddress,
          },
        },
        {
          to: {
            [Op.like]: req.body.signerAddress,
          },
        },
      ],
      //   from: req.body.signerAddress,
    },
  });
  console.log(data, 'Ethers log');

  res.status(200).json({ data });
};

module.exports = etherBalance;
