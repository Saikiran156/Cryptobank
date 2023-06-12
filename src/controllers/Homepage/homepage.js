const homepage = (req, res) => {
  res.send('Token verified');
  //   {
  //     try {
  //       if (token == null) {
  //         res.status(404).json({ msg: 'Token Expired' });
  //       } else {
  //         res.status(200).json({ Token: token });
  //       }
  //     } catch (err) {
  //       console.log('Invalid Token');
  //       res.status(404).json({ msg: 'Token Invalidated' });
  //     }
  //   }
};
module.exports = homepage;
