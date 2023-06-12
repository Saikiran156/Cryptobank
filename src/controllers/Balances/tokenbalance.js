const { tokenlog } = require('../../../models');
const { Op } = require('sequelize');
const tokenBalance = async (req, res) => {
  //   console.log(tokens, req.body, '......................');
  const data = await tokenlog.findAll({
    where: {
      // [Op.and]: [
      //   {
      //     networkname: {
      //       [Op.like]: req.body.network,
      //     },
      //   },
      // ],
      networkname: { [Op.like]: req.body.network },
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
  console.log(data, 'tokenbalance');

  res.status(200).json({ data });
};

module.exports = tokenBalance;
