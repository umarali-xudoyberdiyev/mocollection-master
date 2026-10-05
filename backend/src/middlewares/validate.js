const validate = (schema) => (req, res, next) => {
  try {
    console.log(req.body);
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validate;
