const AccountStatementFactory = require('./factoryClasses/AccountStatementFactory');
const TransactionFactory = require('./factoryClasses/TransactionFactory');

class Account {
  constructor(
    accountStatementFactory = AccountStatementFactory,
    transactionFactory = TransactionFactory
  ) {
    this._accountStatementClass = accountStatementFactory;
    this._transactionClass = transactionFactory;
    this._account = this._accountStatementClass.createAccountStatement();
    this._currentTransaction = this._transactionClass.createTransaction();
    this._transactions = [];
  }

  // Should transaction be its own class ??
  addTransaction(transactionValue) {
    // const transactionObject = {
    //   transactionValue: transactionValue,
    //   transactionDate: new Date().toLocaleDateString(),
    // };
    const newTransaction =
      this._currentTransaction.transactionDetails(transactionValue);
    this._transactions.push(newTransaction);
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
