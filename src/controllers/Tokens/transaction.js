const { tokens } = require('../../../models');
const { tokenlog } = require('../../../models');
const transaction = async (req, res) => {
  console.log(tokens, req.body);
  const data = await tokens.findOne({
    where: {
      connectedAddress: req.body.signerAddress,
      tokenAddress: req.body.tokenAddress,
      networkname: req.body.network,
    },
  });

  try {
    if (req.body.operation == 'deposit') {
      const logs = await tokenlog.create({
        from: req.body.signerAddress,
        to: '0x099C75ED7a12b5AACBaF1eb03e5E824176A9C8ac',
        tokenAddress: req.body.tokenAddress,
        amount: req.body.amount,
        networkname: req.body.network,
        timestamp: Math.floor(Date.now() / 1000),
      });
      if (!data) {
        const info = await tokens.create({
          connectedAddress: req.body.signerAddress,
          tokenAddress: req.body.tokenAddress,
          amount: req.body.amount,
          networkname: req.body.network,
        });

        console.log(info);
      } else {
        console.log(typeof data.amount, typeof req.body.amount);
        const depositedAmount = await tokens.update(
          { amount: Number(data.amount) + Number(req.body.amount) },
          {
            where: {
              connectedAddress: req.body.signerAddress,
              tokenAddress: req.body.tokenAddress,
              networkname: req.body.network,
            },
          },
        );

        console.log(depositedAmount);
      }
    } else {
      if (req.body.amount <= data.amount) {
        console.log(typeof data.amount, typeof req.body.amount);

        const logs = await tokenlog.create({
          from: '0x099C75ED7a12b5AACBaF1eb03e5E824176A9C8ac',
          to: req.body.signerAddress,
          tokenAddress: req.body.tokenAddress,
          amount: req.body.amount,
          networkname: req.body.network,
          timestamp: Math.floor(Date.now() / 1000),
        });

        const withdrawnAmount = await tokens.update(
          { amount: Number(data.amount) - Number(req.body.amount) },
          {
            where: {
              connectedAddress: req.body.signerAddress,
              tokenAddress: req.body.tokenAddress,
              networkname: req.body.network,
            },
          },
        );
        console.log(withdrawnAmount);
      }
      res.send();
    }
  } catch (error) {
    res.status(404).json({ message: 'Invalid request' });
  }
};
module.exports = transaction;
