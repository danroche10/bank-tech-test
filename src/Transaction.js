/* eslint-disable no-underscore-dangle */
class Transaction {
  constructor(transactionDate = new Date()) {
    this._transactionDate = transactionDate;
  }

  transactionDetails(transactionValue) {
    return {
      transactionValue,
      transactionDate: this._transactionDate,
      transactionType: Transaction._transactionType(transactionValue),
    };
  }

  static _transactionType(transactionValue) {
    return transactionValue > 0 ? "deposit" : "withdrawal";
  }
}

module.exports = Transaction;
