const Transaction = require("../src/Transaction");

describe("Transaction", () => {
  let transaction;
  let transactionValue;
  let currentDate;

  beforeEach(() => {
    currentDate = new Date();
    transaction = new Transaction(currentDate);
  });

  describe("returns object for a transaction specifying the value, date and type", () => {
    it("correctly shows the value date and type for one deposit transaction", () => {
      transactionValue = 500;
      expect(transaction.transactionDetails(transactionValue)).toEqual({
        transactionValue,
        transactionDate: currentDate,
        transactionType: "deposit",
      });
    });
    it("correctly shows the value date and type for one withdrawal transaction", () => {
      transactionValue = -500;
      expect(transaction.transactionDetails(transactionValue)).toEqual({
        transactionValue,
        transactionDate: currentDate,
        transactionType: "withdrawal",
      });
    });

    it("shows the correct date when a custom one is entered that is not today", () => {
      transaction = new Transaction("10/5/2021");
      transactionValue = 500;
      expect(transaction.transactionDetails(transactionValue)).toEqual({
        transactionValue,
        transactionDate: "10/5/2021",
        transactionType: "deposit",
      });
    });
  });
});
