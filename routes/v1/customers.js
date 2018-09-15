const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../../models/customer');

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('Single customer Not Found');
  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  customers = await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Look up the course
  //Update course
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
    },
    { new: true }
  );
  //If not existing, return 404 - Bad request
  if (!customer) return res.status(404).send('customer Not Found');

  //Return the updated courses
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  //Look up the customer & delete
  const customer = await Customer.findByIdAndRemove(req.params.id);
  //Doesn't Exist, return 404
  if (!customer) return res.status(404).send('Customer Not Found To Delete');

  //Return the same customer
  res.send(customer);
});

module.exports = router;
