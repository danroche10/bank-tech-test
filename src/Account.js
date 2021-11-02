/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
const AccountStatement = require("./AccountStatement");
const Transaction = require("./Transaction");

class Account {
  constructor(
    accountStatement = new AccountStatement(),
    transactionClass = Transaction
  ) {
    this._accountStatement = accountStatement;
    this.TransactionClass = transactionClass;
    this._transactionHistory = [];
  }

  addTransaction(transactionValue) {
    // eslint-disable-next-line operator-linebreak
    const newTransaction = new this.TransactionClass(
      new Date(),
      transactionValue
    );
    const transactionDetails =
      newTransaction.transactionDetails(transactionValue);
    this._transactionHistory.push(transactionDetails);
  }

  accountStatement() {
    return this._accountStatement.newAccountStatement(this._transactionHistory);
  }
}

module.exports = Account;
