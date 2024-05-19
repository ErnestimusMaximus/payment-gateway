const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('Payment Gateway API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
