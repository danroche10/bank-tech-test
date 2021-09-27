const AccountFactory = require('./factoryClasses/AccountFactory');

class Client {
  constructor(accountFactory = AccountFactory) {
    this.accountClass = accountFactory;
    this.clientAccount = this.accountClass.createAccount();
  }
  deposit(amount) {
    this.clientAccount.addTransaction(amount);
  }

  withdraw(amount) {
    this.clientAccount.addTransaction(amount * -1);
  }
}

module.exports = Client;
