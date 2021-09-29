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
    this._transactionHistory = [];
  }

  addTransaction(transactionValue) {
    const newTransaction =
      this._currentTransaction.transactionDetails(transactionValue);
    this._transactionHistory.push(newTransaction);
  }

  accountStatement() {
    return this._account.newAccountStatement(this._transactionHistory);
  }

  _isTransactionHistoryEmpty() {
    this._transactionHistory.length === 0 ? true : false;
  }
}

module.exports = Account;
