const AccountStatementFactory = require('./factoryClasses/AccountStatementFactory');

class Account {
  constructor(accountStatementFactory = AccountStatementFactory) {
    this._accountStatementClass = accountStatementFactory;
    this._account = this._accountStatementClass.createAccountStatement();
    this._transactions = [];
  }

  // Should transaction be its own class ??
  addTransaction(transactionValue) {
    const transactionObject = {
      transactionValue: transactionValue,
      transactionDate: new Date().toLocaleDateString(),
    };
    this._transactions.push(transactionObject);
  }

  accountStatement() {
    return this._account.createAccountStatement(this._transactions);
  }

  _isTransactionHistoryEmpty() {
    this._transactions.length === 0 ? true : false;
  }
}

module.exports = Account;

let account;
account = new Account();
account.addTransaction(1000);
// account.addTransaction(1000);
// account.addTransaction(-1000);
console.log(account._transactions);
