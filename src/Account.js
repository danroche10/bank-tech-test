const AccountStatementFactory = require('./factoryClasses/AccountStatementFactory');

class Account {
  constructor(accountStatementFactory = AccountStatementFactory) {
    this._accountStatementClass = accountStatementFactory;
    this._account = this._accountStatementClass.createAccountStatement();
    this._transactions = [];
    this._accountStatementHeaders = 'date || credit || debit || balance';
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
    if (this._isTransactionHistoryEmpty()) {
      return this.__accountStatementHeaders;
    } else {
      return this._account.createAccountStatement(
        this._transactions,
        this._accountStatementHeaders
      );
    }
  }

  _isTransactionHistoryEmpty() {
    this._transactions.length === 0 ? true : false;
  }
}

module.exports = Account;

let account;
account = new Account();
account.addTransaction(1000);
account.addTransaction(1000);
account.addTransaction(-1000);
console.log(account.accountStatement());
