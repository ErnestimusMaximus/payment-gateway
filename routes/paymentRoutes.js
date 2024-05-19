const express = require('express');
const auth = require('../middleware/auth');
const { processStripePayment } = require('../services/stripeService');

const router = express.Router();

// Process a payment
router.post('/pay', auth, async (req, res) => {
  const { amount, currency, source } = req.body;
  try {
    const result = await processStripePayment(req.user._id, amount, currency, source);
    if (result.success) {
      res.send(result.transaction);
    } else {
      res.status(400).send({ error: result.error });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
