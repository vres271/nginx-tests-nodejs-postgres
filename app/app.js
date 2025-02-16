const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const cardRoutes = require('./routes/cardRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);
app.use('/cards', cardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});