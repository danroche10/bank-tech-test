describe('Client', function () {
  const Client = require('../src/Client');
  const AccountFactory = require('../src/factoryClasses/AccountFactory');
  const currentDate = new Date().toLocaleDateString();
  let client;

  beforeEach(function () {
    account = {
      addTransaction: () => {},
      accountStatement: () => {},
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

  describe('prints client account statement in terminal', function () {
    it('it calls accountStatement method from Account Class', function () {
      spyOn(account, 'accountStatement').and.returnValues(true);
      client.printStatement();
      expect(account.accountStatement).toHaveBeenCalled();
    });

    // console.log(not being called in printStatement method)
    it('console.logs stubbed method', function () {
      spyOn(account, 'accountStatement').and.returnValues(
        `date || credit || debit || balance\n${currentDate} || 2000.00 || || 2000.00\n${currentDate} || || 1000.00 || 1000.00`
      );
      console.log = jasmine.createSpy('log');
      client.printStatement();
      expect(console.log).toHaveBeenCalledWith(account.accountStatement);
    });
  });
});
