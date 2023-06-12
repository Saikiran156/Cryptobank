const { expect } = require('chai');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../../models');
const tokens = sequelize.models.tokens;
const { execSync } = require('child_process');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
require('dotenv').config();

describe('Creating Token Models in the Database', () => {
  let sequelize;
  let jwttoken;

  before(async () => {
    sequelize = new Sequelize('testcryptobank', 'postgres', 'sailearnings', {
      host: 'localhost',
      dialect: 'postgres',
    });

    jwttoken = jwt.sign(
      {
        signerAddress: '0xe6A9D13D93CbA162A0fB46d338ADD071247910f3',
      },
      process.env.JWT_SECRET_KEY,
    );
  });

  it('Creating Tokens Table in the database', async () => {
    await tokens.sync();
    execSync('npx sequelize-cli db:migrate --env test', {
      stdio: 'inherit',
    });
  });

  it('Creating Entry in the table', async () => {
    const response = await request(app)
      .post('/api/token')
      .set('Content-Type', 'application/json')
      .set('Authorization', `BEARER ${jwttoken}`)
      .send({
        operation: 'deposit',
        signerAddress: '0xe6A9D13D93CbA162A0fB46d338ADD071247910f3',
        tokenAddress: '0x41Cb39177A332c6dAEcEE40A5343a77411ca6712',
        network: 'Sepolia',
        amount: 5,
      });
    console.log(response.status);
    expect(response.status).to.be.equal(200);
  });

  it('Updating Entry for deposit in the table', async () => {
    const response = await request(app)
      .post('/api/token')
      .set('Content-Type', 'application/json')
      .set('Authorization', `BEARER ${jwttoken}`)
      .send({
        operation: 'deposit',
        signerAddress: '0xe6A9D13D93CbA162A0fB46d338ADD071247910f3',
        network: 'Sepolia',
        tokenAddress: '0x41Cb39177A332c6dAEcEE40A5343a77411ca6712',
        amount: 2,
      });
    console.log(response.status);
    expect(response.status).to.be.equal(200);
  });

  it('Updating Entry for withdraw in the table', async () => {
    const response = await request(app)
      .post('/api/token')
      .set('Content-Type', 'application/json')
      .set('Authorization', `BEARER ${jwttoken}`)
      .send({
        operation: 'withdraw',
        tokenAddress: '0x41Cb39177A332c6dAEcEE40A5343a77411ca6712',
        signerAddress: '0xe6A9D13D93CbA162A0fB46d338ADD071247910f3',
        network: 'Sepolia',
        amount: 3,
      });
    console.log(response.status);
    expect(response.status).to.be.equal(200);
    // console.log(response.body, '...................................re');
  });

  it('Fetching User Token Balance From The Table', async () => {
    console.log('Fetching User Balance...');
    let response = await request(app)
      .post('/api/balance')
      .set('Content-Type', 'application/json')
      .set('Authorization', `BEARER ${jwttoken}`)
      .send({
        signerAddress: '0xe6A9D13D93CbA162A0fB46d338ADD071247910f3',
        TokenAddress: '0x41Cb39177A332c6dAEcEE40A5343a77411ca6712',
        network: 'Sepolia',
      });
    expect(response.status).to.be.equal(200);
  });

  after(async () => {
    execSync('npx sequelize-cli db:migrate:undo:all --env test'),
      await sequelize.close();
  });
});
