const AccountStatement = require("../AccountStatement");

class AccountStatementFactory {
  static createAccountStatement() {
    return new AccountStatement();
  }
}

module.exports = AccountStatementFactory;
