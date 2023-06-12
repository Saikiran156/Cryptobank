const { transactionlog } = require('../../../models');
const transaction = async (req, res) => {
  console.log(transactionlog, req.body);
  try {
    if (req.body.operation == 'deposit') {
      console.log('1111111111111111111');
      if (!data) {
        console.log('322222222222222222222222222');
        const info = await transactionlog.create({
          connectedAddress: req.body.signerAddress,
          tokenAddress: req.body.tokenAddress,
          amount: req.body.amount,
          networkname: req.body.network,
        });
        console.log('222222222222222222222222222');
        console.log(info);
      } else {
        console.log(typeof data.amount, typeof req.body.amount);
        const depositedAmount = await transactionlog.update(
          { amount: data.amount + req.body.amount },
          {
            where: {
              connectedAddress: req.body.signerAddress,
              tokenAddress: req.body.tokenAddress,
              networkname: req.body.network,
            },
          },
        );
        console.log('3333333333333333333');
        // console.log(depositedAmount);
      }
    } else {
      if (req.body.amount <= data.amount) {
        console.log(typeof data.amount, typeof req.body.amount);
        const withdrawnAmount = await transactionlog.update(
          { amount: data.amount - req.body.amount },
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
