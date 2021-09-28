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
  });
});
