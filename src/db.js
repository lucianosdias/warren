require('./models/Account');
require('./models/Transaction');

const mongoose = require('mongoose');

module.exports = {
  connect: async () => {
    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    await mongoose.connect(process.env.MONGO_URL, mongooseOpts);

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        process.exit(0);
      });
    });
  },
  closeDatabase: async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  },
  clearDatabase: async () => {
    const { collections } = mongoose.connection;
    const promises = Object.keys(collections).map((key) => {
      const collection = collections[key];
      return collection.deleteMany();
    });
    await Promise.all(promises);
  },
};
