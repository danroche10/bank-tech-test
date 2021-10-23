/* eslint-disable no-console */
/* eslint-disable comma-dangle */
const Client = require("../src/Client");
const convertDateToUKFormat = require("../src/Util");

describe("Client", () => {
  let client;
  let currentDate;

  beforeEach(() => {
    currentDate = new Date();
    client = new Client();
  });

  it("returns correct amount after several deposits and withdrawals", () => {
    console.log = jasmine.createSpy("log");
    client.deposit(1000);
    client.withdraw(-1000);
    client.deposit(500);
    client.deposit(2000);
    client.withdraw(-1500);
    client.printStatement();
    expect(console.log).toHaveBeenCalledWith(
      "date || credit || debit || balance"
    );
    expect(console.log).toHaveBeenCalledWith(
      `${convertDateToUKFormat(currentDate)} || || 1500.00 || 1000.00`
    );
    expect(console.log).toHaveBeenCalledWith(
      `${convertDateToUKFormat(currentDate)} || 2000.00 || || 2500.00`
    );
    expect(console.log).toHaveBeenCalledWith(
      `${convertDateToUKFormat(currentDate)} || 500.00 || || 500.00`
    );
    expect(console.log).toHaveBeenCalledWith(
      `${convertDateToUKFormat(currentDate)} || || 1000.00 || 0.00`
    );
    expect(console.log).toHaveBeenCalledWith(
      `${convertDateToUKFormat(currentDate)} || 1000.00 || || 1000.00`
    );
  });
});
