const accountsService = require('../services/accountService');
const transactionsService = require('../services/transactionService');

const create = async (req, res) => {
  const { name, balance } = req.body;
  const newAccount = await accountsService.create({ name, balance });
  return res.json({ account: newAccount });
};
const getAccounts = async (req, res) => {
  try {
    const accounts = await accountsService.getAll();
    return res.json({ accounts });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
};
const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await accountsService.getById(id);
    return res.json({ account });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
};
const getAccountTransactions = async (req, res) => {
  try {
    const { id: accountId } = req.params;
    const transactions = await transactionsService.getByAccount(accountId);
    return res.json({ transactions });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
};

module.exports = {
  create,
  getAccounts,
  getAccountById,
  getAccountTransactions,
};
