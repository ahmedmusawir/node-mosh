const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlenght: 50
  },
  phone: {
    type: String,
    rquired: true,
    minlength: 10,
    maxlenght: 12
  },
  isGold: {
    type: Boolean
  }
});
const Customer = mongoose.model('Customer', customerSchema);

//VALIDATION
function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    phone: Joi.string()
      .min(10)
      .max(12)
      .required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
