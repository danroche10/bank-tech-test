class Account {
  constructor() {
    this._transactions = [];
  }

  addTransaction(transactionValue) {
    // Should transaction be its own class ??
    const transactionObject = {
      transactionValue: transactionValue,
      transactionDate: new Date().toLocaleDateString(),
    };
    this._transactions.push(transactionObject);
  }

  // showCurrentBalance() {
  //   let balance = 0;
  //   this._transactions.forEach((transaction) => {
  //     balance += transaction.transactionValue;
  //   });
  //   return balance;
  // }

  // transactionHistory() {
  //   return this._transactions;
  // }

  accountStatement() {
    const columnHeaders = 'date || credit || debit || balance';
    if (this._transactions.length === 0) {
      return columnHeaders;
    } else {
      let statementString = '';
      let balance = 0;
      this._transactions.forEach((transaction) => {
        balance += transaction.transactionValue;
        statementString += `\n${transaction.transactionDate} || `;
        if (transaction.transactionValue > 0) {
          statementString += `${transaction.transactionValue.toFixed(
            2
          )} || || `;
        } else {
          statementString += `|| ${(-1 * transaction.transactionValue).toFixed(
            2
          )} || `;
        }
        statementString += `${balance.toFixed(2)}`;
      });
      return columnHeaders + statementString;
    }
  }
}

module.exports = Account;

let account;
account = new Account();
account.addTransaction(1000);
account.addTransaction(2000);
console.log(account.accountStatement());
