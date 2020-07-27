const cron = require('node-cron');
const server = require('./app');

const incomeService = require('./services/incomeService');

const task = cron.schedule(
  `${process.env.JOB_CRON}`,
  incomeService.applyIncome,
  {
    scheduled: true,
    timezone: 'America/Sao_Paulo',
  }
);

task.start();

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
server.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

process.on('SIGINT', () => {
  task.destroy();
});
