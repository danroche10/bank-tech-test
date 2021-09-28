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
    const currentDate = new Date().toLocaleDateString();
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
        `date || credit || debit || balance\n${currentDate} || 1000.00 || || 1000.00`
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
        `date || credit || debit || balance\n${currentDate} || 1000.00 || || 1000.00\n${currentDate} || 1000.00 || || 2000.00`
      );
    });

    it('returns correct account statement after two deposit transactions and 1 withdrawal', function () {
      transactions = [
        { transactionValue: 1000, transactionDate: '9/28/2021' },
        { transactionValue: 1000, transactionDate: '9/28/2021' },
        { transactionValue: -1000, transactionDate: '9/28/2021' },
      ];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual(
        `date || credit || debit || balance\n${currentDate} || 1000.00 || || 1000.00\n${currentDate} || 1000.00 || || 2000.00\n${currentDate} || || 1000.00 || 1000.00`
      );
    });
  });
});
