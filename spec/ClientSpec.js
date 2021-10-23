/* eslint-disable no-console */
/* eslint-disable comma-dangle */
const Client = require("../src/Client");
const AccountFactory = require("../src/factoryClasses/AccountFactory");

describe("Client", () => {
  const currentDate = new Date();
  const followingDay = new Date(new Date().getTime() + 86400000);
  const twoDaysAfter = new Date(new Date().getTime() + 86400000 * 2);
  let client;
  let account;
  const errorMessage = "Did not receive a valid Number";

  beforeEach(() => {
    account = {
      addTransaction: () => {},
      accountStatement: () => [
        "date || credit || debit || balance",
        `${currentDate} || 2000.00 || || 2000.00`,
        `${currentDate} || || 1000.00 || 1000.00`,
        `${followingDay} || || 1000.00 || 1000.00`,
        `${twoDaysAfter} || 2000.00 || || 2000.00`,
      ],
    };
    spyOn(AccountFactory, "createAccount").and.returnValue(account);
    client = new Client(AccountFactory);
  });

  describe("deposits funds into account", () => {
    it("calls updateBalance from user class with correct argument", () => {
      spyOn(account, "addTransaction").and.returnValues(true);
      client.deposit(100);
      expect(account.addTransaction).toHaveBeenCalledWith(100);
    });

    it("throws error when passed a negative number", () => {
      spyOn(Math, "sign").and.returnValues(-1);
      expect(() => {
        client.deposit(-100);
      }).toThrowError(errorMessage);
    });

    it("throws error when passed a letter", () => {
      spyOn(Math, "sign").and.returnValues(NaN);
      expect(() => {
        client.deposit("fffefe");
      }).toThrowError(errorMessage);
    });

    it("throws error when passed a number with more than one decimal place", () => {
      spyOn(Math, "sign").and.returnValues(1);
      expect(() => {
        client.deposit(10.0005);
      }).toThrowError(errorMessage);
    });
  });

  describe("withdraws funds from account", () => {
    it("calls updateBalance from user class with correct argument", () => {
      spyOn(account, "addTransaction").and.returnValues(true);
      client.withdraw(-100);
      expect(account.addTransaction).toHaveBeenCalledWith(-100);
    });

    it("throws error when passed a positive number", () => {
      spyOn(Math, "sign").and.returnValues(1);
      expect(() => {
        client.withdraw(100);
      }).toThrowError(errorMessage);
    });

    it("throws error when passed a letter", () => {
      spyOn(Math, "sign").and.returnValues(NaN);
      expect(() => {
        client.withdraw("fffefe");
      }).toThrowError(errorMessage);
    });

    it("throws error when passed a number with more than one decimal place", () => {
      spyOn(Math, "sign").and.returnValues(1);
      expect(() => {
        client.deposit(-10.0005);
      }).toThrowError(errorMessage);
    });
  });

  describe("console logs client account statement in terminal", () => {
    it("it calls accountStatement method from Account Class", () => {
      spyOn(account, "accountStatement").and.returnValues(true);
      client.printStatement();
      expect(account.accountStatement).toHaveBeenCalled();
    });

    it("console.logs account statement headers", () => {
      console.log = jasmine.createSpy("log");
      client.printStatement();
      expect(console.log).toHaveBeenCalledWith(
        "date || credit || debit || balance"
      );
    });

    it("console.logs first row of account statement", () => {
      console.log = jasmine.createSpy("log");
      client.printStatement();
      expect(console.log).toHaveBeenCalledWith(
        `${currentDate} || 2000.00 || || 2000.00`
      );
    });

    it("console.logs second row of account statement", () => {
      console.log = jasmine.createSpy("log");
      client.printStatement();
      expect(console.log).toHaveBeenCalledWith(
        `${currentDate} || || 1000.00 || 1000.00`
      );
    });

    it("console.logs third row of account statement", () => {
      console.log = jasmine.createSpy("log");
      client.printStatement();
      expect(console.log).toHaveBeenCalledWith(
        `${followingDay} || || 1000.00 || 1000.00`
      );
    });

    it("console.logs fourth row of account statement", () => {
      console.log = jasmine.createSpy("log");
      client.printStatement();
      expect(console.log).toHaveBeenCalledWith(
        `${twoDaysAfter} || 2000.00 || || 2000.00`
      );
    });
  });
});
