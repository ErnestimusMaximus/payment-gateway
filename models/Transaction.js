const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  paymentProcessor: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
