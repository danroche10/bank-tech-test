class Transaction {
  constructor(transactionDate = new Date().toLocaleDateString()) {
    this._transactionDate = transactionDate;
  }

  _transactionType() {
    return this._transactionValue > 0 ? 'deposit' : 'withdrawal';
  }

  transactionDetails(transactionValue) {
    return {
      transactionValue: transactionValue,
      transactionDate: this._transactionDate,
      transactionType: this._transactionType(),
    };
  }
}

module.exports = Transaction;
