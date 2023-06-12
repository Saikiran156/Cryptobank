const Joi = require('joi');

const schema = Joi.object({
  operation: Joi.string().required(),
  signerAddress: Joi.string()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .required(),

  tokenAddress: Joi.string()
    .pattern(/^0x[a-fA-F0-9]{40}$/)
    .required(),
  amount: Joi.number().required().precision(18),
  network: Joi.string().required(),
}).unknown();

module.exports = schema;
