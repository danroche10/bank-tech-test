const AccountFactory = require('./factoryClasses/AccountFactory');

class Client {
  constructor(accountFactory = AccountFactory) {
    this.accountClass = accountFactory;
    this.clientAccount = this.accountClass.createAccount();
  }
  deposit(amount) {
    this.clientAccount.addTransaction(100);
  }
}

module.exports = Client;
