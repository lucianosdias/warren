/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const Account = require('../../src/models/Account');
const Transaction = require('../../src/models/Transaction');
const db = require('../../src/db');

let accountId;

const accountData = {
  name: 'Teste',
  balance: 0,
};

const depositTransactionData = {
  type: 'deposit',
  amount: 100,
};

const createAccount = async () => {
  const validAccount = new Account(accountData);
  const savedAccount = await validAccount.save();
  accountId = savedAccount._id;
};

describe('Transaction Model', () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  beforeEach(async () => {
    await createAccount();
  });

  afterEach(async () => {
    await db.clearDatabase();
  });

  it('create & save transaction successfully', async () => {
    const validTransaction = new Transaction({
      ...depositTransactionData,
      accountId,
    });
    const savedTransaction = await validTransaction.save();

    expect(savedTransaction._id).toBeDefined();
    expect(savedTransaction.type).toBe(depositTransactionData.type);
    expect(savedTransaction.amount).toBe(depositTransactionData.amount);
    expect(savedTransaction.createdAt).toBeDefined();
    expect(savedTransaction.updatedAt).toBeDefined();
  });

  it('insert transaction successfully, but the field does not defined in schema should be undefined', async () => {
    const transactionWithInvalidField = new Transaction({
      ...depositTransactionData,
      accountId,
      outraCoisa: 'Outra Coisa',
    });
    const savedTransactionWithInvalidField = await transactionWithInvalidField.save();
    expect(savedTransactionWithInvalidField._id).toBeDefined();
    expect(savedTransactionWithInvalidField.outraCoisa).toBeUndefined();
  });

  it('create transaction without required field should failed', async () => {
    const transactionWithoutRequiredField = new Account({
      ...depositTransactionData,
      amount: 100,
    });
    let err;
    try {
      await transactionWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
