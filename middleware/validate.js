const validator = require('../helpers/validate');

const saveMember = (req, res, next) => {
  const validationRule = {
    lastname: 'required|string',
    firstname: 'required|string',
    birthdate: 'string',
    phone: 'required|string',
    email: 'email',
    address: 'required|string',
    baptismdate: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveTempleVisit = (req, res, next) => {
    const validationRule = {
      date: 'required|string',
      starttime: 'string',
      organizer: 'string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  saveMember,
  saveTempleVisit
};
