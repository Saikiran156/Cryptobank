const schema = require('../schema/transaction/Amount');
const schemaValidation = (req, res, next) => {
  // console.log('validation', req.body);
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(404).json({ message: error.details });
  } else {
    console.log('Schema validation Successful');
    res.status(200).json({ message: 'Validation successful!!!' });
    next();
  }
};

module.exports = schemaValidation;
