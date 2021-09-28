const Transaction = require('../Transaction');

class TransactionFactory {
  static createTransaction() {
    return new Transaction();
  }
}

module.exports = TransactionFactory;
