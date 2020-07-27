// const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;

const Account = require('../../src/models/Account');

// const db = require('../../src/db');
const accountsService = require('../../src/services/accountService');

// let accountId;

// const account = {
//   name: 'Conta Mcck',
//   balance: 0,
// };

// const createAccount = async () => {
//   const createdAccount = await Account.create(account);
//   accountId = createdAccount.id;
// };

describe('Account', () => {
  // beforeAll(async () => {
  //   await db.connect();
  // });

  // beforeEach(async () => {
  //   await createAccount();
  // });

  // afterEach(async () => {
  //   await db.clearDatabase();
  // });

  // afterAll(async () => {
  //   await db.closeDatabase();
  // });

  // it('should return message if nothing is found', async (done) => {
  //   const error = new Error('Conta inexistente.');
  //   await expect(
  //     accountsService.getById(mongoose.Types.ObjectId())
  //   ).rejects.toEqual(error);
  //   done();
  // });

  it('should retrieve correct account if id matches', async (done) => {
    const existingAccount = {
      _id: '507f191e810c19729de860ea',
      name: 'Conta teste',
      balance: 100,
    };

    mockingoose(Account).toReturn(existingAccount, 'findOne');
    const account = await accountsService.getById('507f191e810c19729de860ea');
    expect(account.id).toBe('507f191e810c19729de860ea');
    done();
  });

  it('should create account', async (done) => {
    const existingAccount = {
      _id: '507f191e810c19729de860ea',
      name: 'Conta teste',
      balance: 100,
    };

    mockingoose(Account).toReturn(existingAccount, 'create');
    const account = await accountsService.create({
      name: 'Conta teste',
      balance: 100,
    });

    expect(account.id).toBeDefined();
    expect(account.name).toBe(existingAccount.name);
    expect(account.balance).toBe(existingAccount.balance);
    done();
  });

  // it('should retrieve array with all accounts', async (done) => {
  //   const existingAccounts = [
  //     {
  //       _id: '507f191e810c19729de860ea',
  //       name: 'Conta teste 1',
  //       balance: 100,
  //     },
  //     {
  //       _id: '507f191e810c19729de860eb',
  //       name: 'Conta teste 2',
  //       balance: 1000,
  //     },
  //   ];

  //   mockingoose(Account).toReturn(existingAccounts, 'find');

  //   const accounts = await accountsService.getAll();
  //   console.log(Array.isArray(accounts));
  //   expect(accounts).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({
  //         _id: '507f191e810c19729de860ea',
  //         name: 'Conta teste 1',
  //         balance: 100,
  //       }),
  //       expect.objectContaining({
  //         _id: '507f191e810c19729de860eb',
  //         name: 'Conta teste 2',
  //         balance: 1000,
  //       }),
  //     ])
  //   );
  //   done();
  // });
});
