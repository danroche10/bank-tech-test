describe('Account', function () {
  const Account = require('../src/Account');
  let account;

  beforeEach(function () {
    account = new Account();
  });

  describe('returns account statement', function () {
    const currentDate = new Date().toLocaleDateString();
    it('returns empty account statement after zero transactions', function () {
      expect(account.accountStatement()).toEqual(
        'date || credit || debit || balance'
      );
    });

    it('returns correct account statement after 1 deposit', function () {
      account.addTransaction(1000);
      expect(account.accountStatement()).toEqual(
        `date || credit || debit || balance\n${currentDate} || 1000.00 || || 1000.00`
      );
    });

    it('returns correct account statement after 2 deposits', function () {
      account.addTransaction(1000);
      account.addTransaction(2000);
      expect(account.accountStatement()).toEqual(
        `date || credit || debit || balance\n${currentDate} || 1000.00 || || 1000.00\n${currentDate} || 2000.00 || || 3000.00`
      );
    });

    it('returns correct account statement after 2 deposits, one positive and 1 negative', function () {
      account.addTransaction(2000);
      account.addTransaction(-1000);
      expect(account.accountStatement()).toEqual(
        `date || credit || debit || balance\n${currentDate} || 2000.00 || || 2000.00\n${currentDate} || || 1000.00 || 1000.00`
      );
    });
  });
});
