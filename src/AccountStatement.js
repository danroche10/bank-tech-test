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
  _singleTransactionString(
    transactionDate,
    transactionValue,
    balance,
    transactionType
  ) {
    return `${this._createDateString(
      transactionDate
    )}${this._createTransactionValueString(
      transactionValue,
      transactionType
    )}${this._createBalanceString(balance)}`;
  }

  _createTransactionValueString(transactionValue, transactionType) {
    return transactionType === 'deposit'
      ? this._createDepositString(transactionValue)
      : this._createWithdrawalString(transactionValue);
  }

  _createBalanceString(balance) {
    return `${balance.toFixed(2)}`;
  }

  _createDateString(transactionDate) {
    return `${this._convertDateToUKFormat(transactionDate)} || `;
  }

  _convertDateToUKFormat(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }

  _createDepositString(amount) {
    return `${amount.toFixed(2)} || || `;
  }

  _createWithdrawalString(amount) {
    return `|| ${(-1 * amount).toFixed(2)} || `;
  }
}

module.exports = AccountStatement;
