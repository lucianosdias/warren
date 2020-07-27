const yup = require('yup');

module.exports = async (req, res, next) => {
  try {
    const schema = yup.object().shape({
      accountId: yup.string().required('Identificador da conta não informado.'),
      type: yup
        .string()
        .oneOf(['redeem', 'deposit', 'payment'])
        .required('Tipo de operação não informado.'),
      amount: yup.number().required('Valor da operação não informado.'),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch ({ errors }) {
    return res.status(400).json({ error: true, errors });
  }
};
