require('./bootstrap');
require('./db').connect();
const express = require('express');
// const cron = require('node-cron');
const accountsRoutes = require('./routes/accounts');
const transactionsRoutes = require('./routes/transactions');

// const incomeService = require('./services/incomeService');

// const task = cron.schedule(
//   `${process.env.JOB_CRON}`,
//   incomeService.applyIncome,
//   {
//     scheduled: true,
//     timezone: 'America/Sao_Paulo',
//   }
// );

// task.start();

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/accounts', accountsRoutes);

app.use('/transactions', transactionsRoutes);

module.exports = app;
