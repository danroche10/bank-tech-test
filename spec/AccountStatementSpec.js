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
    const fakeDepositTransactionToday = {
      transactionValue: 1000,
      transactionDate: currentDate,
      transactionType: 'deposit',
    };
    const fakeDepositTransactionFollowinDay = {
      transactionValue: 2000,
      transactionDate: followingDay,
      transactionType: 'deposit',
    };
    const fakeWithdrawalTransactionToday = {
      transactionValue: -1000,
      transactionDate: currentDate,
      transactionType: 'withdrawal',
    };
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
      transactions = [fakeDepositTransactionToday];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        `date || credit || debit || balance`,
        `${accountStatement._dateConverter(
          currentDate
        )} || 1000.00 || || 1000.00`,
      ]);
    });

    it('returns correct account statement after two deposit transactions', function () {
      transactions = [fakeDepositTransactionToday, fakeDepositTransactionToday];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        `date || credit || debit || balance`,
        `${accountStatement._dateConverter(
          currentDate
        )} || 1000.00 || || 2000.00`,
        `${accountStatement._dateConverter(
          currentDate
        )} || 1000.00 || || 1000.00`,
      ]);
    });

    it('returns correct account statement after two deposit transactions and 1 withdrawal', function () {
      transactions = [
        fakeDepositTransactionToday,
        fakeDepositTransactionToday,
        fakeWithdrawalTransactionToday,
      ];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        `date || credit || debit || balance`,
        `${accountStatement._dateConverter(
          currentDate
        )} || || 1000.00 || 1000.00`,
        `${accountStatement._dateConverter(
          currentDate
        )} || 1000.00 || || 2000.00`,
        `${accountStatement._dateConverter(
          currentDate
        )} || 1000.00 || || 1000.00`,
      ]);
    });
    it('returns correct account statement after two deposit transactions on different dates', function () {
      transactions = [
        fakeDepositTransactionToday,
        fakeDepositTransactionFollowinDay,
      ];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        `date || credit || debit || balance`,
        `${accountStatement._dateConverter(
          followingDay
        )} || 2000.00 || || 3000.00`,
        `${accountStatement._dateConverter(
          currentDate
        )} || 1000.00 || || 1000.00`,
      ]);
    });

    it('returns correct account statement after three deposit transactions on different dates', function () {
      transactions = [
        fakeDepositTransactionToday,
        fakeDepositTransactionFollowinDay,
        {
          transactionValue: 2000,
          transactionDate: twoDaysAfter,
          transactionType: 'deposit',
        },
      ];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        `date || credit || debit || balance`,
        `${accountStatement._dateConverter(
          twoDaysAfter
        )} || 2000.00 || || 5000.00`,
        `${accountStatement._dateConverter(
          followingDay
        )} || 2000.00 || || 3000.00`,
        `${accountStatement._dateConverter(
          currentDate
        )} || 1000.00 || || 1000.00`,
      ]);
    });

    it('returns correct account statement after two deposits and one withdrawal on different dates', function () {
      transactions = [
        fakeDepositTransactionToday,
        fakeDepositTransactionFollowinDay,
        {
          transactionValue: -1000,
          transactionDate: twoDaysAfter,
          transactionType: 'withdrawal',
        },
      ];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        `date || credit || debit || balance`,
        `${accountStatement._dateConverter(
          twoDaysAfter
        )} || || 1000.00 || 2000.00`,
        `${accountStatement._dateConverter(
          followingDay
        )} || 2000.00 || || 3000.00`,
        `${accountStatement._dateConverter(
          currentDate
        )} || 1000.00 || || 1000.00`,
      ]);
    });
  });
});
