const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    muzzle: 'string',
    barrel: 'string',
    optic: 'string',
    stock: 'string',
    magazine: 'string',
    underbarrel: 'string',
    ammunition: 'string',
    rearGrip: 'string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();  // goes to contactsController.updateContact en routes/contacts.
    }
  });
};

module.exports = {
  saveContact
};