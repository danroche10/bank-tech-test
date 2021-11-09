/* eslint-disable comma-dangle */
const AccountStatement = require("../src/AccountStatement");
const convertDateToUKFormat = require("../src/Util");

describe("AccountStatement", () => {
  let accountStatement;
  let accountStatementHeaders;
  let transactions;

  beforeEach(() => {
    accountStatement = new AccountStatement();
    accountStatementHeaders = "date || credit || debit || balance";
  });

  describe("returns account statement", () => {
    const currentDate = new Date();
    const followingDay = new Date(currentDate.getTime() + 86400000);
    const twoDaysAfter = new Date(currentDate.getTime() + 86400000 * 2);
    const fakeDepositTransactionToday = {
      _transactionValue: 1000,
      _transactionDate: currentDate,
      _transactionType: "deposit",
    };
    const fakeDepositTransactionFollowinDay = {
      _transactionValue: 2000,
      _transactionDate: followingDay,
      _transactionType: "deposit",
    };
    const fakeWithdrawalTransactionToday = {
      _transactionValue: -1000,
      _transactionDate: currentDate,
      _transactionType: "withdrawal",
    };
    it("returns empty account statement after zero transactions", () => {
      transactions = [];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual(["date || credit || debit || balance"]);
    });

    it("returns correct account statement after one deposit transactions", () => {
      transactions = [fakeDepositTransactionToday];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        "date || credit || debit || balance",
        `${convertDateToUKFormat(currentDate)} || 1000.00 || || 1000.00`,
      ]);
    });

    it("returns correct account statement after two deposit transactions", () => {
      transactions = [fakeDepositTransactionToday, fakeDepositTransactionToday];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        "date || credit || debit || balance",
        `${convertDateToUKFormat(currentDate)} || 1000.00 || || 2000.00`,
        `${convertDateToUKFormat(currentDate)} || 1000.00 || || 1000.00`,
      ]);
    });

    it("returns correct account statement after two deposit transactions and 1 withdrawal", () => {
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
        "date || credit || debit || balance",
        `${convertDateToUKFormat(currentDate)} || || 1000.00 || 1000.00`,
        `${convertDateToUKFormat(currentDate)} || 1000.00 || || 2000.00`,
        `${convertDateToUKFormat(currentDate)} || 1000.00 || || 1000.00`,
      ]);
    });
    it("returns correct account statement after two deposit transactions on different dates", () => {
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
        "date || credit || debit || balance",
        `${convertDateToUKFormat(followingDay)} || 2000.00 || || 3000.00`,
        `${convertDateToUKFormat(currentDate)} || 1000.00 || || 1000.00`,
      ]);
    });

    it("returns correct account statement after three deposit transactions on different dates", () => {
      transactions = [
        fakeDepositTransactionToday,
        fakeDepositTransactionFollowinDay,
        {
          _transactionValue: 2000,
          _transactionDate: twoDaysAfter,
          _transactionType: "deposit",
        },
      ];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        "date || credit || debit || balance",
        `${convertDateToUKFormat(twoDaysAfter)} || 2000.00 || || 5000.00`,
        `${convertDateToUKFormat(followingDay)} || 2000.00 || || 3000.00`,
        `${convertDateToUKFormat(currentDate)} || 1000.00 || || 1000.00`,
      ]);
    });

    it("returns correct account statement after two deposits and one withdrawal on different dates", () => {
      transactions = [
        fakeDepositTransactionToday,
        fakeDepositTransactionFollowinDay,
        {
          _transactionValue: -1000,
          _transactionDate: twoDaysAfter,
          _transactionType: "withdrawal",
        },
      ];
      expect(
        accountStatement.newAccountStatement(
          transactions,
          accountStatementHeaders
        )
      ).toEqual([
        "date || credit || debit || balance",
        `${convertDateToUKFormat(twoDaysAfter)} || || 1000.00 || 2000.00`,
        `${convertDateToUKFormat(followingDay)} || 2000.00 || || 3000.00`,
        `${convertDateToUKFormat(currentDate)} || 1000.00 || || 1000.00`,
      ]);
    });
  });
});
