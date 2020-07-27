const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

const applyIncome = async () => {
  const accounts = await Account.find({ balance: { $gt: 0 } }).lean();

  const promises = [];

  accounts.forEach((account) => {
    const income = account.balance * 0.1;
    const balance = account.balance + income;
    // eslint-disable-next-line no-console
    console.log(`Aplicação de ${income} na conta ${account.name}`);
    promises.push(
      Transaction.create({
        accountId: account._id,
        type: 'income',
        amount: income,
      })
    );
    promises.push(Account.findByIdAndUpdate(account._id, { balance }));
  });

  await Promise.all(promises);
};

module.exports = {
  applyIncome,
};
