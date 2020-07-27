const express = require('express');

const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/', accountController.create);
router.get('/', accountController.getAccounts);
router.get('/:id', accountController.getAccountById);
router.get('/:id/transactions', accountController.getAccountTransactions);

module.exports = router;
