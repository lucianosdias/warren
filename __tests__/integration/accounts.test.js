const supertest = require('supertest');
const app = require('../../src/app');

describe('Accounts', () => {
  describe('/accounts/:id', () => {
    it('should return a message when account not exists', async (done) => {
      const assert = {
        error: true,
        message: 'Conta inexistente.',
      };
      const {
        body: { error, message },
      } = await supertest(app).get('/accounts/5eb6fa93f8e55b20d89aa8f4');

      expect(error).toBe(assert.error);
      expect(message).toBe(assert.message);
      done();
    });

    it('should return a object with array when find all', async () => {
      await supertest(app).get('/accounts').expect(200);
    });
  });
});
