require('./bootstrap');
require('./db').connect();
const express = require('express');
const accountsRoutes = require('./routes/accounts');
const transactionsRoutes = require('./routes/transactions');

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/accounts', accountsRoutes);

app.use('/transactions', transactionsRoutes);

module.exports = app;
