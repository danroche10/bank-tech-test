class AccountStatement {
  constructor() {
    this._accountStatementHeaders = 'date || credit || debit || balance';
  }
  newAccountStatement(transactions) {
    let statement = [];
    let balance = 0;
    transactions.forEach((transaction) => {
      balance += transaction.transactionValue;
      statement.unshift(
        this._singleTransactionString(
          transaction.transactionDate.toLocaleDateString(),
          transaction.transactionValue,
          balance
        )
      );
    });
    statement.unshift(this._accountStatementHeaders);
    return statement;
  }
  _singleTransactionString(transactionDate, transactionValue, balance) {
    return `${this._createDateString(
      transactionDate
    )}${this._createTransactionValueString(
      transactionValue
    )}${this._createBalanceString(balance)}`;
  }

  _createTransactionValueString(transactionValue) {
    return transactionValue > 0
      ? this._createDepositString(transactionValue)
      : this._createWithdrawalString(transactionValue);
  }

  _createBalanceString(balance) {
    return `${balance.toFixed(2)}`;
  }

  _createDateString(transactionDate) {
    return `${transactionDate} || `;
  }

  _createDepositString(amount) {
    return `${amount.toFixed(2)} || || `;
  }

  _createWithdrawalString(amount) {
    return `|| ${(-1 * amount).toFixed(2)} || `;
  }
}

module.exports = AccountStatement;
