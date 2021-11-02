/* eslint-disable comma-dangle */
const Account = require("../src/Account");
const AccountStatement = require("../src/AccountStatement");
const Transaction = require("../src/Transaction");

describe("Account", () => {
  let account;
  let realTransaction;
  let realAccountStatement;
  let transaction;

  beforeEach(() => {
    transaction = new Transaction("10/10/2021", 100);
    realAccountStatement = new AccountStatement();
    account = new Account(realAccountStatement, transaction);
  });

  describe("call newAccountStatement from accountStatement class with transaction history as arg", () => {
    const currentDate = new Date().toLocaleDateString();
    const fakeDepositTransaction = {
      transactionValue: 1000,
      transactionDate: currentDate,
      transactionType: "deposit",
    };
    it("calls newAccountStatement with empty array as arg", () => {
      spyOn(realAccountStatement, "newAccountStatement").and.returnValues(true);
      account.accountStatement();
      expect(realAccountStatement.newAccountStatement).toHaveBeenCalledWith([]);
    });

    it("calls newAccountStatement with correct array as arg (including transaction Value and date) after 1 transaction", () => {
      spyOn(realAccountStatement, "newAccountStatement").and.returnValues(true);
      spyOn(realTransaction, "transactionDetails").and.returnValue(
        fakeDepositTransaction
      );
      account.addTransaction(1000);
      account.accountStatement();
      expect(realAccountStatement.newAccountStatement).toHaveBeenCalledWith([
        fakeDepositTransaction,
      ]);
    });

    it("calls newAccountStatement with correct array as arg (including transaction Value and date) after 2 deposit transactions", () => {
      spyOn(realAccountStatement, "newAccountStatement").and.returnValues(true);
      spyOn(transaction, "transactionDetails").and.returnValue([
        fakeDepositTransaction,
        fakeDepositTransaction,
      ]);
      account.addTransaction(1000);
      account.addTransaction(1000);
      account.accountStatement();
      expect(realAccountStatement.newAccountStatement).toHaveBeenCalledWith([
        fakeDepositTransaction,
        fakeDepositTransaction,
      ]);
    });
  });
});
