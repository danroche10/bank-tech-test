describe('Client', function () {
  const Client = require('../src/Client');
  const AccountFactory = require('../src/factoryClasses/AccountFactory');
  let client;

  beforeEach(function () {
    account = {
      addTransaction: () => {},
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
});
