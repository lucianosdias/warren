const express = require('express');

const router = express.Router();
const transactionsController = require('../controllers/transactionController');
const createTransactionValidator = require('../validators/createTransaction');

router.get('/:id', transactionsController.getById);
router.post('/', createTransactionValidator, transactionsController.create);

module.exports = router;
