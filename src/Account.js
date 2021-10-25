/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
const AccountStatement = require("./AccountStatement");
const Transaction = require("./Transaction");

class Account {
  constructor(
    accountStatement = new AccountStatement(),
    transaction = new Transaction()
  ) {
    this._accountStatement = accountStatement;
    this._currentTransaction = transaction;
    this._transactionHistory = [];
  }

  addTransaction(transactionValue) {
    // eslint-disable-next-line operator-linebreak
    const newTransaction =
      this._currentTransaction.transactionDetails(transactionValue);
    this._transactionHistory.push(newTransaction);
  }

  accountStatement() {
    return this._accountStatement.newAccountStatement(this._transactionHistory);
  }
}

module.exports = Account;
