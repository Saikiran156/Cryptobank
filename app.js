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
app.use('/api/generateNonce', nonceroute);

//Authorizations
app.use('/api/home', jwtAuthorization, homeroute);

////Creating and updating the models
app.use('/api/ether', jwtAuthorization, schemaValidation, ethersroute);
app.use('/api/token', jwtAuthorization, tokenschemaValidation, tokensroute);

//Fetching Total Balance of User
app.use('/api/etherbalance', jwtAuthorization, ethbalanceroute);
app.use('/api/balance', jwtAuthorization, balanceroute);

//Fetching the Transaction logs of the User
app.use('/api/etherlogbalance', jwtAuthorization, etherbalanceroute);
app.use('/api/logbalance', jwtAuthorization, tokenbalanceroute);

app.listen(8000);
module.exports = app;
