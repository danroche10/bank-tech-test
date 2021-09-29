describe('Client', function () {
  const Client = require('../src/Client');
  const AccountFactory = require('../src/factoryClasses/AccountFactory');
  const currentDate = new Date();
  const followingDay = new Date(new Date().getTime() + 86400000);
  const twoDaysAfter = new Date(new Date().getTime() + 86400000 * 2);
  let client;

  beforeEach(function () {
    account = {
      addTransaction: () => {},
      accountStatement: () => {
        return [
          `date || credit || debit || balance`,
          `${currentDate} || 2000.00 || || 2000.00`,
          `${currentDate} || || 1000.00 || 1000.00`,
          `${followingDay} || || 1000.00 || 1000.00`,
          `${twoDaysAfter} || 2000.00 || || 2000.00`,
        ];
      },
    };
    spyOn(AccountFactory, 'createAccount').and.returnValue(account);
    client = new Client(AccountFactory);
  });

  describe('desposits funds into account', function () {
    it('calls updateBalance from user class with correct argument', function () {
      spyOn(account, 'addTransaction').and.returnValues(true);
      client.deposit(100);
      expect(account.addTransaction).toHaveBeenCalledWith(100);
    });
  });

  describe('withdraws funds from account', function () {
    it('calls updateBalance from user class with correct argument', function () {
      spyOn(account, 'addTransaction').and.returnValues(true);
      client.withdraw(100);
      expect(account.addTransaction).toHaveBeenCalledWith(-100);
    });
  });

  describe('console logs client account statement in terminal', function () {
    it('it calls accountStatement method from Account Class', function () {
      spyOn(account, 'accountStatement').and.returnValues(true);
      client.printStatement();
      expect(account.accountStatement).toHaveBeenCalled();
    });

    it('console.logs account statement headers', function () {
      console.log = jasmine.createSpy('log');
      client.printStatement();
      expect(console.log).toHaveBeenCalledWith(
        `date || credit || debit || balance`
      );
    });

    it('console.logs first row of account statement', function () {
      console.log = jasmine.createSpy('log');
      client.printStatement();
      expect(console.log).toHaveBeenCalledWith(
        `${currentDate} || 2000.00 || || 2000.00`
      );
    });

    it('console.logs second row of account statement', function () {
      console.log = jasmine.createSpy('log');
      client.printStatement();
      expect(console.log).toHaveBeenCalledWith(
        `${currentDate} || || 1000.00 || 1000.00`
      );
    });

    it('console.logs third row of account statement', function () {
      console.log = jasmine.createSpy('log');
      client.printStatement();
      expect(console.log).toHaveBeenCalledWith(
        `${followingDay} || || 1000.00 || 1000.00`
      );
    });

    it('console.logs fourth row of account statement', function () {
      console.log = jasmine.createSpy('log');
      client.printStatement();
      expect(console.log).toHaveBeenCalledWith(
        `${twoDaysAfter} || 2000.00 || || 2000.00`
      );
    });
  });
});
