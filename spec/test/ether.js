const { expect } = require('chai');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../../models');
const ethers = sequelize.models.ethers;
const { execSync } = require('child_process');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
require('dotenv').config();

describe('Creating Ether Models in the Database', () => {
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

  it('Creating Ethers Table in the database', async () => {
    await ethers.sync();
    execSync('npx sequelize-cli db:migrate --env test', {
      stdio: 'inherit',
    });
  });

  it('Creating Entry in the table', async () => {
    const response = await request(app)
      .post('/api/ether')
      .set('Content-Type', 'application/json')
      .set('Authorization', `BEARER ${jwttoken}`)
      .send({
        operation: 'deposit',
        signerAddress: '0xe6A9D13D93CbA162A0fB46d338ADD071247910f3',
        network: 'Sepolia',
        amount: 0.016,
      });
    console.log(response.status);
    expect(response.status).to.be.equal(200);
  });

  it('Updating Entry for deposit in the table', async () => {
    const response = await request(app)
      .post('/api/ether')
      .set('Content-Type', 'application/json')
      .set('Authorization', `BEARER ${jwttoken}`)
      .send({
        operation: 'deposit',
        signerAddress: '0xe6A9D13D93CbA162A0fB46d338ADD071247910f3',
        network: 'Sepolia',
        amount: 0.023,
      });
    console.log(response.status);
    expect(response.status).to.be.equal(200);
  });

  it('Updating Entry for withdraw in the table', async () => {
    const response = await request(app)
      .post('/api/ether')
      .set('Content-Type', 'application/json')
      .set('Authorization', `BEARER ${jwttoken}`)
      .send({
        operation: 'withdraw',
        signerAddress: '0xe6A9D13D93CbA162A0fB46d338ADD071247910f3',
        network: 'Sepolia',
        amount: 0.1,
      });
    console.log(response.status);
    expect(response.status).to.be.equal(200);
  });

  it('Fetching User Ether Balance From The Table', async () => {
    console.log('Fetching User Balance...');
    let response = await request(app)
      .post('/api/etherbalance')
      .set('Content-Type', 'application/json')
      .set('Authorization', `BEARER ${jwttoken}`)
      .send({
        signerAddress: '0xe6A9D13D93CbA162A0fB46d338ADD071247910f3',
        network: 'Sepolia',
      });
    expect(response.status).to.be.equal(200);
  });

  after(async () => {
    execSync('npx sequelize-cli db:migrate:undo:all --env test'),
      await sequelize.close();
  });
});
