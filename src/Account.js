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

  addTransaction(transactionValue) {
    const newTransaction =
      this._currentTransaction.transactionDetails(transactionValue);
    this._transactions.push(newTransaction);
  }

  accountStatement() {
    return this._account.newAccountStatement(this._transactions);
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
account.addTransaction(-5000);
console.log(account._transactions);
console.log(account.accountStatement());
