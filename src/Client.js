const AccountFactory = require('./factoryClasses/AccountFactory');

class Client {
  constructor(accountFactory = AccountFactory) {
    this.accountClass = accountFactory;
    this.clientAccount = this.accountClass.createAccount();
  }
  deposit(amount) {
    if (this._isAmountPostive(amount)) {
      this.clientAccount.addTransaction(amount);
    } else {
      throw new Error('Did not receive a positive number');
    }
  }

  withdraw(amount) {
    if (this._isAmountNegative(amount)) {
      this.clientAccount.addTransaction(amount);
    } else {
      throw new Error('Did not receive a negative number');
    }
  }

  printStatement() {
    let clientStatement = this.clientAccount.accountStatement();
    for (let i = 0; i < clientStatement.length; i++) {
      console.log(clientStatement[i]);
    }
  }

  _isAmountPostive(amount) {
    if (Math.sign(amount) === 1) {
      return true;
    } else {
      return false;
    }
  }
  _isAmountNegative(amount) {
    if (Math.sign(amount) === -1) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Client;

// let client = new Client();
// client.withdraw('efeffef');
