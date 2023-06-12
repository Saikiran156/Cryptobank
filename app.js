const loginroute = require('./src/routes/homepage/login');
const ethersroute = require('./src/routes/Ethers/transaction');
const tokensroute = require('./src/routes/Tokens/transaction');
const homeroute = require('./src/routes/homepage/homepage');
const nonceroute = require('./src/routes/Access/nonce');
const balanceroute = require('./src/routes/Balances/balance');
const ethbalanceroute = require('./src/routes/Ethbalance/ethbalance');
const tokenbalanceroute = require('./src/routes/Tokenbalance/tokenbalance');
const etherbalanceroute = require('./src/routes/Etherbalance/etherbalance');
const jwtAuthorization = require('./src/middlewares/jwtAuth');
const schemaValidation = require('./src/validations/validate');
const tokenschemaValidation = require('./src/validations/tokenvalidate');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
//JWT creation
app.use('/api/login', loginroute);
//Authorizations
app.use('/api/home', jwtAuthorization, homeroute);
////Creating and updating the models
//
app.use('/api/generateNonce', nonceroute);
app.use('/api/ether', jwtAuthorization, schemaValidation, ethersroute);
app.use('/api/token', jwtAuthorization, tokenschemaValidation, tokensroute);
//Fetching balances
app.use('/api/balance', jwtAuthorization, balanceroute);
app.use('/api/etherbalance', jwtAuthorization, ethbalanceroute);
app.use('/api/logbalance', jwtAuthorization, tokenbalanceroute);
app.use('/api/etherlogbalance', jwtAuthorization, etherbalanceroute);
app.listen(8000);
module.exports = app;
