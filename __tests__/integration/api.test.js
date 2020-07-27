const supertest = require('supertest');
const app = require('../../src/app');

describe('API', () => {
  it('should return status 404 for non-existent route', async () => {
    await supertest(app).get('/warren').expect(404);
  });
});
