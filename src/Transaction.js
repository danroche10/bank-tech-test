/* eslint-disable no-underscore-dangle */
class Transaction {
  constructor(transactionDate, transactionValue) {
    this._transactionDate = transactionDate;
    this._transactionValue = transactionValue;
    this._transactionType = Transaction._transactionType(
      this._transactionValue
    );
  }

  transactionDetails() {
    return {
      transactionValue: this._transactionValue,
      transactionDate: this._transactionDate,
      transactionType: this._transactionType,
    };
  }

  static _transactionType(transactionValue) {
    return transactionValue > 0 ? "deposit" : "withdrawal";
  }
}

module.exports = Transaction;
