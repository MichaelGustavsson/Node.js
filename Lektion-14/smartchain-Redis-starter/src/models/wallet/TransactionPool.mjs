export default class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }

  addTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }

  transactionExists(address) {
    const transactions = Object.values(this.transactionMap);
    return transactions.find(
      (transaction) => transaction.input.address === address
    );
  }
}
