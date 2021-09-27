const Account = require('../Account');

class AccountFactory {
  static createAccount() {
    return new Account();
  }
}

module.exports = AccountFactory;
