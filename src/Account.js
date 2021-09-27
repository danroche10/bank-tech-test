class Account {
  constructor() {
    this._transactions = [];
  }

  addTransaction(transactionValue) {
    // Should transaction be its own class ??
    const transactionObject = {
      transactionValue: transactionValue,
      transactionDate: 27 / 9 / 2021,
    };
    this._transactions.push(transactionObject);
  }

  showCurrentBalance() {
    let balance = 0;
    this._transactions.forEach((transaction) => {
      balance += transaction.transactionValue;
    });
    return balance;
  }
}

module.exports = Account;
