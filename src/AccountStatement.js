/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
const convertDateToUKFormat = require("./Util");

class AccountStatement {
  constructor() {
    this._accountStatementHeaders = "date || credit || debit || balance";
  }

  newAccountStatement(transactions) {
    const statement = [];
    let balance = 0;
    transactions.forEach((transaction) => {
      balance += transaction.transactionValue;
      statement.unshift(
        AccountStatement._singleTransactionString(
          transaction.transactionDate,
          transaction.transactionValue,
          balance,
          transaction.transactionType
        )
      );
    });
    statement.unshift(this._accountStatementHeaders);
    return statement;
  }

  static _singleTransactionString(
    transactionDate,
    transactionValue,
    balance,
    transactionType
  ) {
    return `${AccountStatement._createDateString(
      transactionDate
    )}${AccountStatement._createTransactionValueString(
      transactionValue,
      transactionType
    )}${AccountStatement._createBalanceString(balance)}`;
  }

  static _createTransactionValueString(transactionValue, transactionType) {
    return transactionType === "deposit"
      ? AccountStatement._createDepositString(transactionValue)
      : AccountStatement._createWithdrawalString(transactionValue);
  }

  static _createBalanceString(balance) {
    return `${balance.toFixed(2)}`;
  }

  static _createDateString(transactionDate) {
    return `${convertDateToUKFormat(transactionDate)} || `;
  }

  static _createDepositString(amount) {
    return `${amount.toFixed(2)} || || `;
  }

  static _createWithdrawalString(amount) {
    return `|| ${(-1 * amount).toFixed(2)} || `;
  }
}

module.exports = AccountStatement;
