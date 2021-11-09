/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable comma-dangle */
const Account = require("../src/Account");
const AccountStatement = require("../src/AccountStatement");

describe("Account", () => {
  let account;
  let realAccountStatement;
  let transaction;

  beforeEach(() => {
    realAccountStatement = new AccountStatement();
  });

  describe("call newAccountStatement from accountStatement class with transaction history as arg", () => {
    const currentDate = new Date().toLocaleDateString();
    const fakeDepositTransaction = {
      transactionValue: 1000,
      transactionDate: currentDate,
      transactionType: "deposit",
    };
    it("calls newAccountStatement with empty array as arg", () => {
      account = new Account(realAccountStatement, transaction);
      spyOn(realAccountStatement, "newAccountStatement").and.returnValues(true);
      account.accountStatement();
      expect(realAccountStatement.newAccountStatement).toHaveBeenCalledWith([]);
    });

    it("calls newAccountStatement with correct array as arg (including transaction Value and date) after 1 transaction", () => {
      class TransactionDepositMock {
        transactionDetails() {
          return fakeDepositTransaction;
        }
      }
      spyOn(realAccountStatement, "newAccountStatement").and.returnValues(true);
      account = new Account(realAccountStatement, TransactionDepositMock);
      account.addTransaction(1000);
      account.addTransaction(1000);
      account.accountStatement();
      expect(realAccountStatement.newAccountStatement).toHaveBeenCalledWith([
        fakeDepositTransaction,
        fakeDepositTransaction,
      ]);
    });

    it("calls newAccountStatement with correct array as arg (including transaction Value and date) after 2 deposit transactions", () => {
      class TransactionDepositMock {
        transactionDetails() {
          return fakeDepositTransaction;
        }
      }
      spyOn(realAccountStatement, "newAccountStatement").and.returnValues(true);
      account = new Account(realAccountStatement, TransactionDepositMock);
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
