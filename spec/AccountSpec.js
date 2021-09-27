describe('Account', function () {
  const Account = require('../src/Account');
  let account;

  beforeEach(function () {
    account = new Account();
  });

  // describe('returns current balance on the account', function () {
  //   it('returns correct balance after one transaction', function () {
  //     account.addTransaction(100);
  //     expect(account.showCurrentBalance()).toEqual(100);
  //   });

  //   it('returns correct balance after two transactions', function () {
  //     account.addTransaction(100);
  //     account.addTransaction(100);
  //     expect(account.showCurrentBalance()).toEqual(200);
  //   });

  //   it('returns correct balance after two transactions, one positive, one negative', function () {
  //     account.addTransaction(100);
  //     account.addTransaction(-100);
  //     expect(account.showCurrentBalance()).toEqual(0);
  //   });
  // });

  describe('returns transaction history for account', function () {
    it('returns correct transaction history length after one transaction', function () {
      account.addTransaction(100);
      expect(account.transactionHistory().length).toEqual(1);
    });

    it('returns correct transaction history length after two transactions', function () {
      account.addTransaction(100);
      account.addTransaction(100);
      expect(account.transactionHistory().length).toEqual(2);
    });

    it('returns correct transaction date in transaction history after one transaction', function () {
      account.addTransaction(100);
      expect(account.transactionHistory()[0].transactionDate).toEqual(
        new Date().toLocaleDateString()
      );
    });

    it('returns transaction history in correct order after two transactions', function () {
      account.addTransaction(20);
      account.addTransaction(100);
      expect(account.transactionHistory()[1].transactionValue).toEqual(100);
    });
  });

  describe('returns account statement', function () {
    it('returns empty account statement after zero transactions', function () {
      account.addTransaction(100);
      expect(account.transactionHistory().length).toEqual(1);
    });
  });
});
