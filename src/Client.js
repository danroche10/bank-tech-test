/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
const Account = require("./Account");

class Client {
  constructor(account = new Account()) {
    this._account = account;
    this.errorMessage = "Did not receive a valid Number";
  }

  deposit(amount) {
    if (
      Client._isNotPostive(amount) ||
      Client._isNotCorrectNumberOfDecimalPlaces(amount)
    ) {
      throw new Error(this.errorMessage);
    }
    this._account.addTransaction(amount);
  }

  withdraw(amount) {
    if (
      Client._isNotNegative(amount) ||
      Client._isNotCorrectNumberOfDecimalPlaces(amount)
    ) {
      throw new Error(this.errorMessage);
    }
    this._account.addTransaction(amount);
  }

  printStatement() {
    const clientStatement = this._account.accountStatement();
    for (let i = 0; i < clientStatement.length; i += 1) {
      console.log(clientStatement[i]);
    }
  }

  static _isNotCorrectNumberOfDecimalPlaces(amount) {
    if (Math.abs(amount * 100) % 1 === 0) {
      return false;
    }
    return true;
  }

  static _isNotPostive(amount) {
    if (Math.sign(amount) === 1) {
      return false;
    }
    return true;
  }

  static _isNotNegative(amount) {
    if (Math.sign(amount) === -1) {
      return false;
    }
    return true;
  }
}

module.exports = Client;
