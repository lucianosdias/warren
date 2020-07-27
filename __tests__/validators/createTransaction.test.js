const createTransactionValidator = require('../../src/validators/createTransaction');

class Response {
  status(status) {
    this.status = status;
    return this;
  }

  json(data) {
    return data;
  }
}

describe('Create Transaction Validator', () => {
  it('should return error if accountId field is missing', async (done) => {
    const req = {
      body: {
        type: 'payment',
        amount: 100,
      },
    };
    const res = new Response();
    const next = jest.fn();
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await createTransactionValidator(req, res, next);

    expect(statusSpy).toHaveBeenCalledWith(400);

    expect(jsonSpy).toHaveBeenCalledWith({
      error: true,
      errors: ['Identificador da conta não informado.'],
    });
    done();
  });
  it('should return error if type field is missing', async (done) => {
    const req = {
      body: {
        amount: 100,
        accountId: '5f1bad1467710c20c8cad228',
      },
    };
    const res = new Response();
    const next = jest.fn();
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await createTransactionValidator(req, res, next);

    expect(statusSpy).toHaveBeenCalledWith(400);

    expect(jsonSpy).toHaveBeenCalledWith({
      error: true,
      errors: ['Tipo de operação não informado.'],
    });
    done();
  });
  it('should return error if amount field is missing', async (done) => {
    const req = {
      body: {
        type: 'payment',
        accountId: '5f1bad1467710c20c8cad228',
      },
    };
    const res = new Response();
    const next = jest.fn();
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await createTransactionValidator(req, res, next);

    expect(statusSpy).toHaveBeenCalledWith(400);

    expect(jsonSpy).toHaveBeenCalledWith({
      error: true,
      errors: ['Valor da operação não informado.'],
    });
    done();
  });

  it('should call next when if all parameters are informed', async (done) => {
    const req = {
      body: {
        type: 'payment',
        amount: 100,
        accountId: '5f1bad1467710c20c8cad228',
      },
    };
    const res = new Response();
    const next = jest.fn();
    await createTransactionValidator(req, res, next);
    expect(next).toHaveBeenCalled();
    done();
  });
});
