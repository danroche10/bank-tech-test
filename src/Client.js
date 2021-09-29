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

  printStatement() {
    let clientStatement = this.clientAccount.accountStatement();
    for (let i = 0; i < clientStatement.length; i++) {
      console.log(clientStatement[i]);
    }
  }
}
