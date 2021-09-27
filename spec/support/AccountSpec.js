describe('Account', function () {
  const Account = require('../../src/Account');
  let account;

  beforeEach(function () {
    account = new Account();
  });

  describe('returns current balance on the account', function () {
    it('returns correct balance after one transaction', function () {
      account.addTransaction(100);
      expect(account.showCurrentBalance()).toEqual(100);
    });

    it('returns correct balance after two transactions', function () {
      account.addTransaction(100);
      account.addTransaction(100);
      expect(account.showCurrentBalance()).toEqual(200);
    });

    it('returns correct balance after two transactions, one positive, one negative', function () {
      account.addTransaction(100);
      account.addTransaction(-100);
      expect(account.showCurrentBalance()).toEqual(0);
    });
  });
});
