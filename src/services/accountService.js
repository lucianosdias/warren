const Account = require('../models/Account');

const create = async (account) => {
  const { name = `Conta Teste - ${new Date()}`, balance = 0 } = account;
  const newAccount = new Account({ name, balance });
  const savedAccount = await newAccount.save();
  return Account.create(savedAccount);
};

const getById = async (id) => {
  const account = await Account.findById(id);
  if (!account) throw new Error('Conta inexistente.');
  return account;
};

const getAll = async () => {
  const accounts = await Account.find({}).lean();
  return accounts;
};

const updateBalance = async (accountId, balance) => {
  const account = await Account.findByIdAndUpdate(
    accountId,
    {
      $inc: { balance },
    },
    { new: true }
  );
  return account;
};

module.exports = {
  create,
  getById,
  getAll,
  updateBalance,
};
