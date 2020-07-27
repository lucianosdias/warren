const Transaction = require('../models/Transaction');
const accountService = require('./accountService');

const TRANSACTION_TYPE = {
  REDEEM: 'redeem',
  DEPOSIT: 'deposit',
  PAYMENT: 'payment',
  INCOME: 'income',
};

const create = async ({ accountId, amount, type }) => {
  const account = await accountService.getById(accountId);

  if (!account) throw new Error('Conta não existe.');

  if (type === TRANSACTION_TYPE.REDEEM && account.balance <= 0)
    throw new Error('Esta conta não possui valor para resgate');

  let amountToUpdate = amount;

  if (type === TRANSACTION_TYPE.PAYMENT || type === TRANSACTION_TYPE.REDEEM) {
    amountToUpdate = -amount;
  }

  const session = await Transaction.startSession();
  session.startTransaction();
  try {
    await Transaction.create([{ accountId, amount, type }], { session });
    await accountService.updateBalance(accountId, amountToUpdate, {
      session,
    });

    await session.commitTransaction();
    session.endSession();
    return true;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const getById = async (id) => {
  const transaction = await Transaction.findById(id);
  return transaction;
};
const getByAccount = async (accountId) => {
  const transactions = await Transaction.find({ accountId });
  return transactions;
};

module.exports = {
  create,
  getById,
  getByAccount,
};
