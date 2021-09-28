describe('Transaction', function () {
  const Transaction = require('../src/Transaction');
  let transaction;
  let transactionValue;

  beforeEach(function () {
    transaction = new Transaction();
  });

  describe('returns object for a transaction specifying the value, date and type', function () {
    const currentDate = new Date().toLocaleDateString();
    it('correctly shows the value date and type for one deposit transaction', function () {
      transactionValue = 500;
      expect(transaction.transactionDetails(transactionValue)).toEqual({
        transactionValue: transactionValue,
        transactionDate: currentDate,
        transactionType: 'deposit',
      });
    });
    it('correctly shows the value date and type for one withdrawal transaction', function () {
      transactionValue = -500;
      expect(transaction.transactionDetails(transactionValue)).toEqual({
        transactionValue: transactionValue,
        transactionDate: currentDate,
        transactionType: 'withdrawal',
      });
    });

    it('shows the correct date when a custom one is entered that is not today', function () {
      transaction = new Transaction('10/5/2021');
      transactionValue = 500;
      expect(transaction.transactionDetails(transactionValue)).toEqual({
        transactionValue: transactionValue,
        transactionDate: '10/5/2021',
        transactionType: 'deposit',
      });
    });
  });
});
