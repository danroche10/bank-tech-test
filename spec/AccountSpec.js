describe('Account', function () {
  const Account = require('../src/Account');
  const AccountStatementFactory = require('../src/factoryClasses/AccountStatementFactory');
  let account;

  beforeEach(function () {
    accountStatement = {
      createAccountStatement: (transactionValue) => {},
    };
    spyOn(AccountStatementFactory, 'createAccountStatement').and.returnValue(
      accountStatement
    );
    account = new Account(AccountStatementFactory);
  });

  describe('call createAccountStatement from accountStatement class with transaction history as arg', function () {
    it('calls createAccountStatement with empty array as arg', function () {
      spyOn(accountStatement, 'createAccountStatement').and.returnValues(true);
      account.accountStatement();
      expect(accountStatement.createAccountStatement).toHaveBeenCalledWith([]);
    });
  });
});
