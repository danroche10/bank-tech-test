/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
const AccountFactory = require("./factoryClasses/AccountFactory");

class Client {
  constructor(accountFactory = AccountFactory) {
    this.accountClass = accountFactory;
    this.clientAccount = this.accountClass.createAccount();
    this.errorMessage = "Did not receive a valid Number";
  }

  deposit(amount) {
    if (
      Client._isAmountPostive(amount) &&
      Client._isCorrectNumberOfDecimalPlaces(amount)
    ) {
      this.clientAccount.addTransaction(amount);
    } else {
      throw new Error(this.errorMessage);
    }
  }

  withdraw(amount) {
    if (
      Client._isAmountNegative(amount) &&
      Client._isCorrectNumberOfDecimalPlaces(amount)
    ) {
      this.clientAccount.addTransaction(amount);
    } else {
      throw new Error(this.errorMessage);
    }
  }

  printStatement() {
    const clientStatement = this.clientAccount.accountStatement();
    for (let i = 0; i < clientStatement.length; i += 1) {
      console.log(clientStatement[i]);
    }
  }

  static _isCorrectNumberOfDecimalPlaces(amount) {
    if (Math.abs(amount * 100) % 1 === 0) {
      return true;
    }
    return false;
  }

  static _isAmountPostive(amount) {
    if (Math.sign(amount) === 1) {
      return true;
    }
    return false;
  }

  static _isAmountNegative(amount) {
    if (Math.sign(amount) === -1) {
      return true;
    }
    return false;
  }
}

module.exports = Client;

// let client = new Client();
// client.deposit(100.0);
