// tests no longer needed since no public methods in Transaction class
// const Transaction = require("../src/Transaction");

// describe("Transaction", () => {
//   let transaction;
//   let transactionValue;
//   let currentDate;

//   beforeEach(() => {
//     currentDate = new Date();
//   });

//   describe("returns object for a transaction specifying the value, date and type", () => {
//     it("correctly shows the value date and type for one deposit transaction", () => {
//       transaction = new Transaction(currentDate, 100);
//       expect(transaction.transactionDetails(transactionValue)).toEqual({
//         transactionValue: 100,
//         transactionDate: currentDate,
//         transactionType: "deposit",
//       });
//     });
//     it("correctly shows the value date and type for one withdrawal transaction", () => {
//       transaction = new Transaction(currentDate, -100);
//       expect(transaction.transactionDetails(transactionValue)).toEqual({
//         transactionValue: -100,
//         transactionDate: currentDate,
//         transactionType: "withdrawal",
//       });
//     });

//     it("shows the correct date when a custom one is entered that is not today", () => {
//       transaction = new Transaction("10/5/2021", 100);
//       expect(transaction.transactionDetails(transactionValue)).toEqual({
//         transactionValue: 100,
//         transactionDate: "10/5/2021",
//         transactionType: "deposit",
//       });
//     });
//   });
// });
