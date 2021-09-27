class Account {
  constructor() {
    this._transactions = [];
    this._accountStatementHeaders = 'date || credit || debit || balance';
  }

  addTransaction(transactionValue) {
    // Should transaction be its own class ??
    const transactionObject = {
      transactionValue: transactionValue,
      transactionDate: new Date().toLocaleDateString(),
    };
    this._transactions.push(transactionObject);
  }

  // relating to statement
  accountStatement() {
    if (this._isTransactionHistoryEmpty()) {
      return this.__accountStatementHeaders;
    } else {
      return this._createAccountStatement();
    }
  }

  // relating to statement
  _createAccountStatement() {
    let statementString = '';
    let balance = 0;
    this._transactions.forEach((transaction) => {
      balance += transaction.transactionValue;
      statementString += this._singleTransactionString(
        transaction.transactionDate,
        transaction.transactionValue,
        balance
      );
    });
    return this._accountStatementHeaders + statementString;
  }

  // relating to statement
  _singleTransactionString(transactionDate, transactionValue, balance) {
    return `${this._createDateString(
      transactionDate
    )}${this._createTransactionValueString(
      transactionValue
    )}${this._createBalanceString(balance)}`;
  }

  // relating to statement
  _createTransactionValueString(transactionValue) {
    if (transactionValue > 0) {
      return this._createDepositString(transactionValue);
    } else {
      return this._createWithdrawalString(transactionValue);
    }
  }

  // relating to statement
  _createBalanceString(balance) {
    return `${balance.toFixed(2)}`;
  }

  // relating to statement
  _createDateString(transactionDate) {
    return `\n${transactionDate} || `;
  }

  _createDepositString(amount) {
    return `${amount.toFixed(2)} || || `;
  }

  // relating to statement
  _createWithdrawalString(amount) {
    return `|| ${(-1 * amount).toFixed(2)} || `;
  }

  // relating to statement
  _isTransactionHistoryEmpty() {
    this._transactions.length === 0 ? true : false;
  }
}

module.exports = Account;

let account;
account = new Account();
account.addTransaction(1000);
account.addTransaction(-1000);
console.log(account._createAccountStatement());
