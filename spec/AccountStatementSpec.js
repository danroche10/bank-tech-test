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
    it('returns empty account statement after zero transactions', function () {
      transactions = [];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual('date || credit || debit || balance');
    });

    it('returns correct account statement after one deposit transactions', function () {
      transactions = [{ transactionValue: 1000, transactionDate: currentDate }];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual(
        `date || credit || debit || balance\n${currentDate.toLocaleDateString()} || 1000.00 || || 1000.00`
      );
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
      ).toEqual(
        `date || credit || debit || balance\n${currentDate.toLocaleDateString()} || 1000.00 || || 1000.00\n${currentDate.toLocaleDateString()} || 1000.00 || || 2000.00`
      );
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
      ).toEqual(
        `date || credit || debit || balance\n${currentDate.toLocaleDateString()} || 1000.00 || || 1000.00\n${currentDate.toLocaleDateString()} || 1000.00 || || 2000.00\n${currentDate.toLocaleDateString()} || || 1000.00 || 1000.00`
      );
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
      ).toEqual(
        `date || credit || debit || balance\n${followingDay.toLocaleDateString()} || 2000.00 || || 3000.00\n${currentDate.toLocaleDateString()} || 1000.00 || || 1000.00`
      );
    });

    // it('returns correct account statement after two deposit and 1 withdrawal transactions all on different dates', function () {
    //   transactions = [
    //     { transactionValue: 1000, transactionDate: '01/20/2022' },
    //     { transactionValue: 2000, transactionDate: '01/25/2022' },
    //     { transactionValue: -1000, transactionDate: '01/30/2022' },
    //   ];
    //   expect(
    //     accountStatement.newAccountStatement(
    //       transactions,
    //       accountStatementHeaders
    //     )
    //   ).toEqual(
    //     `date || credit || debit || balance\n01/25/2022 || 2000.00 || || 3000.00\n01/20/2022 || 1000.00 || || 1000.00`
    //   );
    // });
  });
});
