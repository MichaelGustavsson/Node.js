import { beforeEach, describe, expect } from 'vitest';
import Transaction from './Transaction.mjs';
import Wallet from './Wallet.mjs';
import TransactionPool from './TransactionPool.mjs';
import Blockchain from '../blockchain/Blockchain.mjs';

describe('TransactionPool', () => {
  let transactionPool, transaction, sender;

  sender = new Wallet();

  beforeEach(() => {
    transaction = new Transaction({
      sender,
      recipient: 'Niklas',
      amount: 50,
    });
    transactionPool = new TransactionPool();
  });

  describe('properties', () => {
    it('should have a transactionMap property', () => {
      expect(transactionPool).toHaveProperty('transactionMap');
    });
  });

  describe('addTransaction', () => {
    it('should add a transaction to the transaction pool', () => {
      transactionPool.addTransaction(transaction);

      expect(transactionPool.transactionMap[transaction.id]).toBe(transaction);
    });
  });

  describe('transactionExists', () => {
    it('should return a transaction by its address', () => {
      transactionPool.addTransaction(transaction);

      expect(
        transactionPool.transactionExists({ address: sender.publicKey })
      ).toBe(transaction);
    });
  });

  describe('validate transactions', () => {
    let transactions = [];

    beforeEach(() => {
      transactions = [];

      for (let i = 0; i < 10; i++) {
        transaction = new Transaction({
          sender,
          recipient: 'James',
          amount: 25,
        });

        // Skapa felaktiga transaktioner...
        if (i % 3 === 0) {
          transaction.input.amount = 1010;
        } else if (i % 3 === 1) {
          transaction.input.signature = new Wallet().sign('darth vader');
        } else {
          transactions.push(transaction);
        }

        transactionPool.addTransaction(transaction);
      }
    });

    it('should only return valid transactions', () => {
      expect(transactionPool.validateTransactions()).toStrictEqual(
        transactions
      );
    });
  });

  // Osäker, kan av misstag ta bort ej befintliga transaktioner
  // som ännu ej är placerade i ett block eller blockkedja
  describe('empty out the transaction pool', () => {
    it('should clear the transactionPool', () => {
      transactionPool.clearTransactions();
      expect(transactionPool.transactionMap).toEqual({});
    });
  });

  describe('empty out the transaction pool correctly', () => {
    it('should clear the pool of existing blockchain transactions', () => {
      const blockchain = new Blockchain();
      const expectedMap = {};

      for (let i = 0; i < 10; i++) {
        const transaction = new Wallet().createTransaction({
          recipient: 'dummy',
          amount: 5,
        });

        transactionPool.addTransaction(transaction);

        if (i % 2 === 0) {
          blockchain.addBlock({ data: [transaction] });
        } else {
          expectedMap[transaction.id] = transaction;
        }
      }

      transactionPool.clearBlockTransactions({ chain: blockchain.chain });
      expect(transactionPool.transactionMap).toEqual(expectedMap);
    });
  });
});
