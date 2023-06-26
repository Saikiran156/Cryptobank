const { ethers } = require('../../../models');
const { transactionlog } = require('../../../models');
const transaction = async (req, res) => {

  let data = await ethers.findOne({
    where: { connectedAddress: req.body.signerAddress },
  });


  try {
    if (req.body.operation == 'deposit') {
      const logs = await transactionlog.create({
        from: req.body.signerAddress,
        to: '0x099C75ED7a12b5AACBaF1eb03e5E824176A9C8ac',
        amount: req.body.amount,
        networkname: req.body.network,
        timestamp: Math.floor(Date.now() / 1000),
      });
      console.log('Deposit Ether(Transaction log)');
      if (!data) {
        const info = await ethers.create({
          connectedAddress: req.body.signerAddress,
          amount: req.body.amount,
          networkname: req.body.network,
        });
        console.log('Deposit Entry in the Ether table');
      } else {
        const updatedAmount = Number(data.amount) + Number(req.body.amount);
        const depositedAmount = await ethers.update(
          { amount: updatedAmount },
          {
            where: {
              connectedAddress: req.body.signerAddress,
              networkname: req.body.network,
            },
          },
        );
        console.log('Updating Ethers in the Ethers table');
      }
    } else {
      if (req.body.amount <= data.amount) {
        const logs = await transactionlog.create({
          from: '0x099C75ED7a12b5AACBaF1eb03e5E824176A9C8ac',
          to: req.body.signerAddress,
          amount: req.body.amount,
          networkname: req.body.network,
          timestamp: Math.floor(Date.now() / 1000),
        });
        console.log('Withdraw Entry in the Transaction log');
        const withdrawnAmount = await ethers.update(
          { amount: Number(data.amount) - Number(req.body.amount) },
          {
            where: {
              connectedAddress: req.body.signerAddress,
              networkname: req.body.network,
            },
          },
        );
        console.log('Withdraw Entry(update) in the Ethers Table');
      }
      res.send();
    }
  } catch (error) {
    res.status(404).json({ message: 'Invalid request' });
  }
};
module.exports = transaction;
