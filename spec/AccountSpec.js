const Account = require("../src/Account");
const AccountStatementFactory = require("../src/factoryClasses/AccountStatementFactory");
const TransactionFactory = require("../src/factoryClasses/TransactionFactory");

describe("Account", () => {
  let account;
  let accountStatement;
  let transaction;

  beforeEach(() => {
    accountStatement = {
      newAccountStatement: () => {},
    };
    transaction = {
      transactionDetails: () => {},
    };
    spyOn(AccountStatementFactory, "createAccountStatement").and.returnValue(
      accountStatement
    );
    spyOn(TransactionFactory, "createTransaction").and.returnValue(transaction);
    account = new Account(AccountStatementFactory, TransactionFactory);
  });

  describe("call newAccountStatement from accountStatement class with transaction history as arg", () => {
    const currentDate = new Date().toLocaleDateString();
    const fakeDepositTransaction = {
      transactionValue: 1000,
      transactionDate: currentDate,
      transactionType: "deposit",
    };
    it("calls newAccountStatement with empty array as arg", () => {
      spyOn(accountStatement, "newAccountStatement").and.returnValues(true);
      account.accountStatement();
      expect(accountStatement.newAccountStatement).toHaveBeenCalledWith([]);
    });

    it("calls newAccountStatement with correct array as arg (including transaction Value and date) after 1 transaction", () => {
      spyOn(accountStatement, "newAccountStatement").and.returnValues(true);
      spyOn(transaction, "transactionDetails").and.returnValues(
        fakeDepositTransaction
      );
      account.addTransaction(1000);
      account.accountStatement();
      expect(accountStatement.newAccountStatement).toHaveBeenCalledWith([
        fakeDepositTransaction,
      ]);
    });

    it("calls newAccountStatement with correct array as arg (including transaction Value and date) after 2 deposit transactions", () => {
      spyOn(accountStatement, "newAccountStatement").and.returnValues(true);
      spyOn(transaction, "transactionDetails").and.returnValues(
        fakeDepositTransaction,
        fakeDepositTransaction
      );
      account.addTransaction(1000);
      account.addTransaction(1000);
      account.accountStatement();
      expect(accountStatement.newAccountStatement).toHaveBeenCalledWith([
        fakeDepositTransaction,
        fakeDepositTransaction,
      ]);
    });
  });
});
