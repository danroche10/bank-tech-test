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

  // describe('returns transaction history for account', function () {
  //   it('returns correct transaction history length after one transaction', function () {
  //     account.addTransaction(100);
  //     expect(account.transactionHistory().length).toEqual(1);
  //   });

  //   it('returns correct transaction history length after two transactions', function () {
  //     account.addTransaction(100);
  //     account.addTransaction(100);
  //     expect(account.transactionHistory().length).toEqual(2);
  //   });

  //   it('returns correct transaction date in transaction history after one transaction', function () {
  //     account.addTransaction(100);
  //     expect(account.transactionHistory()[0].transactionDate).toEqual(
  //       new Date().toLocaleDateString()
  //     );
  //   });

  //   it('returns transaction history in correct order after two transactions', function () {
  //     account.addTransaction(20);
  //     account.addTransaction(100);
  //     expect(account.transactionHistory()[1].transactionValue).toEqual(100);
  //   });
  // });

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
