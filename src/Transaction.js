/* eslint-disable no-underscore-dangle */
class Transaction {
  constructor(transactionDate = new Date()) {
    this._transactionDate = transactionDate;
  }

  _transactionType(transactionValue) {
    return transactionValue > 0 ? "deposit" : "withdrawal";
  }

  transactionDetails(transactionValue) {
    return {
      transactionValue,
      transactionDate: this._transactionDate,
      transactionType: this._transactionType(transactionValue),
    };
  }
}

module.exports = Transaction;
