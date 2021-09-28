describe('Account', function () {
  const Account = require('../src/Account');
  const AccountStatementFactory = require('../src/factoryClasses/AccountStatementFactory');
  let account;

  beforeEach(function () {
    accountStatement = {
      createAccountStatement: () => {},
    };
    spyOn(AccountStatementFactory, 'createAccountStatement').and.returnValue(
      accountStatement
    );
    account = new Account(AccountStatementFactory);
  });

  describe('call createAccountStatement from accountStatement class with transaction history as arg', function () {
    const currentDate = new Date().toLocaleDateString();
    it('calls createAccountStatement with empty array as arg', function () {
      spyOn(accountStatement, 'createAccountStatement').and.returnValues(true);
      account.accountStatement();
      expect(accountStatement.createAccountStatement).toHaveBeenCalledWith([]);
    });

    it('calls createAccountStatement with correct array as arg (including transaction Value and date) after 1 transaction', function () {
      spyOn(accountStatement, 'createAccountStatement').and.returnValues(true);
      account.addTransaction(1000);
      account.accountStatement();
      expect(accountStatement.createAccountStatement).toHaveBeenCalledWith([
        { transactionValue: 1000, transactionDate: currentDate },
      ]);
    });

    it('calls createAccountStatement with correct array as arg (including transaction Value and date) after 2 deposit transactions', function () {
      spyOn(accountStatement, 'createAccountStatement').and.returnValues(true);
      account.addTransaction(1000);
      account.addTransaction(1000);
      account.accountStatement();
      expect(accountStatement.createAccountStatement).toHaveBeenCalledWith([
        { transactionValue: 1000, transactionDate: currentDate },
        { transactionValue: 1000, transactionDate: currentDate },
      ]);
    });
  });
});
