const schema = require('../schema/transaction/Amount');
const schemaValidation = (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(404).json({ message: error.details });
  } else {
    console.log(value);
    res.status(200).json({ message: 'Validation successful!!!' });
    next();
  }
};

module.exports = schemaValidation;
