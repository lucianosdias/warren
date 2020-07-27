/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const Account = require('../../src/models/Account');
const db = require('../../src/db');

const accountData = {
  name: 'Teste',
  balance: 0,
};

describe('Account Model', () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  afterEach(async () => {
    await db.clearDatabase();
  });

  it('create & save account successfully', async () => {
    const validAccount = new Account(accountData);
    const savedAccount = await validAccount.save();

    expect(savedAccount._id).toBeDefined();
    expect(savedAccount.name).toBe(accountData.name);
    expect(savedAccount.balance).toBe(accountData.balance);
  });

  it('insert account successfully, but the field does not defined in schema should be undefined', async () => {
    const accountWithInvalidField = new Account({
      ...accountData,
      outraCoisa: 'Outra Coisa',
    });
    const savedAccountWithInvalidField = await accountWithInvalidField.save();
    expect(savedAccountWithInvalidField._id).toBeDefined();
    expect(savedAccountWithInvalidField.outraCoisa).toBeUndefined();
  });

  it('create account without required field should failed', async () => {
    const accountWithoutRequiredField = new Account({
      ...accountData,
      name: undefined,
    });
    let err;
    try {
      await accountWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
