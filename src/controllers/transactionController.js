const transactionsService = require('../services/transactionService');

module.exports = {
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await transactionsService.getById(id);
      return res.json({ transaction });
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const { type, amount, accountId } = req.body;
      await transactionsService.create({ type, amount, accountId });
      return res
        .status(200)
        .json({ message: 'Operação realizada com sucesso.' });
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message });
    }
  },
};
