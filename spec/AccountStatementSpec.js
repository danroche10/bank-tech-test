describe('AccountStatement', function () {
  const AccountStatement = require('../src/AccountStatement');
  let accountStatement;
  let accountStatementHeaders;
  let transactions;

  beforeEach(function () {
    accountStatement = new AccountStatement();
    accountStatementHeaders = 'date || credit || debit || balance';
  });

  describe('returns account statement', function () {
    const currentDate = new Date();
    const followingDay = new Date(currentDate.getTime() + 86400000);
    const twoDaysAfter = new Date(currentDate.getTime() + 86400000 * 2);
    it('returns empty account statement after zero transactions', function () {
      transactions = [];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual(['date || credit || debit || balance']);
    });

    it('returns correct account statement after one deposit transactions', function () {
      transactions = [{ transactionValue: 1000, transactionDate: currentDate }];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        `date || credit || debit || balance`,
        `${currentDate.toLocaleDateString()} || 1000.00 || || 1000.00`,
      ]);
    });

    it('returns correct account statement after two deposit transactions', function () {
      transactions = [
        { transactionValue: 1000, transactionDate: currentDate },
        { transactionValue: 1000, transactionDate: currentDate },
      ];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        `date || credit || debit || balance`,
        `${currentDate.toLocaleDateString()} || 1000.00 || || 2000.00`,
        `${currentDate.toLocaleDateString()} || 1000.00 || || 1000.00`,
      ]);
    });

    it('returns correct account statement after two deposit transactions and 1 withdrawal', function () {
      transactions = [
        { transactionValue: 1000, transactionDate: currentDate },
        { transactionValue: 1000, transactionDate: currentDate },
        { transactionValue: -1000, transactionDate: currentDate },
      ];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        `date || credit || debit || balance`,
        `${currentDate.toLocaleDateString()} || || 1000.00 || 1000.00`,
        `${currentDate.toLocaleDateString()} || 1000.00 || || 2000.00`,
        `${currentDate.toLocaleDateString()} || 1000.00 || || 1000.00`,
      ]);
    });
    it('returns correct account statement after two deposit transactions on different dates', function () {
      transactions = [
        {
          transactionValue: 1000,
          transactionDate: currentDate,
        },
        { transactionValue: 2000, transactionDate: followingDay },
      ];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        `date || credit || debit || balance`,
        `${followingDay.toLocaleDateString()} || 2000.00 || || 3000.00`,
        `${currentDate.toLocaleDateString()} || 1000.00 || || 1000.00`,
      ]);
    });

    fit('returns correct account statement after three deposit transactions on different dates', function () {
      transactions = [
        {
          transactionValue: 1000,
          transactionDate: currentDate,
        },
        { transactionValue: 2000, transactionDate: followingDay },
        { transactionValue: 2000, transactionDate: twoDaysAfter },
      ];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        `date || credit || debit || balance`,
        `${twoDaysAfter.toLocaleDateString()} || 2000.00 || || 5000.00`,
        `${followingDay.toLocaleDateString()} || 2000.00 || || 3000.00`,
        `${currentDate.toLocaleDateString()} || 1000.00 || || 1000.00`,
      ]);
    });
  });
});
