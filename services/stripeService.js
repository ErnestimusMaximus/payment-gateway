const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Transaction = require('../models/Transaction');

const processStripePayment = async (userId, amount, currency, source) => {
  try {
    const charge = await stripe.charges.create({
      amount: amount * 100, // Amount in cents
      currency,
      source,
      description: 'Payment description'
    });

    const transaction = new Transaction({
      userId,
      amount,
      currency,
      status: 'Completed',
      paymentProcessor: 'Stripe'
    });
    await transaction.save();

    return { success: true, transaction };
  } catch (error) {
    const transaction = new Transaction({
      userId,
      amount,
      currency,
      status: 'Failed',
      paymentProcessor: 'Stripe'
    });
    await transaction.save();

    return { success: false, error: error.message };
  }
};

module.exports = {
  processStripePayment
};
