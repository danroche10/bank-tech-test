class Account {
  constructor() {
    this._transactions = [];
  }

  addTransaction(transactionValue) {
    // Should transaction be its own class ??
    const transactionObject = {
      transactionValue: transactionValue,
      transactionDate: new Date().toLocaleDateString(),
    };
    this._transactions.push(transactionObject);
  }

  // showCurrentBalance() {
  //   let balance = 0;
  //   this._transactions.forEach((transaction) => {
  //     balance += transaction.transactionValue;
  //   });
  //   return balance;
  // }

  // transactionHistory() {
  //   return this._transactions;
  // }

  accountStatement() {
    if (this._transactions.length === 0) {
      return 'date || credit || debit || balance';
    }
  }
}

module.exports = Account;

let account;
account = new Account();
account.addTransaction(100);
console.log(account._transactions);
