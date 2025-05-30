import { beforeEach, describe, expect, vi } from 'vitest';
import Wallet from './Wallet.mjs';
import { verifySignature } from '../../utilities/keyManager.mjs';
import Transaction from './Transaction.mjs';
import Blockchain from '../blockchain/Blockchain.mjs';
import { INITIAL_BALANCE } from '../../utilities/config.mjs';

describe('Wallet', () => {
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });

  it('should have a publicKey property', () => {
    console.log(wallet.publicKey);
    expect(wallet).toHaveProperty('publicKey');
  });

  it('should have a balance property', () => {
    expect(wallet).toHaveProperty('balance');
  });

  describe('Signing data', () => {
    const data = 'Avatar';

    it('should verify a valid signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data: data,
          signature: wallet.sign(data),
        })
      ).toBeTruthy();
    });

    it('should not verify an invalid signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data: data,
          signature: new Wallet().sign(data),
        })
      ).toBeFalsy();
    });
  });

  describe('Create transaction', () => {
    describe('and the amount is higher than the balance', () => {
      it('should throw an error', () => {
        expect(() => {
          wallet.createTransaction({
            amount: 88888888,
            recipient: 'Darth Vader',
          });
        }).toThrow('Not enough funds!');
      });
    });

    describe('and the amount is valid', () => {
      let transaction, amount, recipient;

      beforeEach(() => {
        amount = 25;
        recipient = 'Michael';
        transaction = wallet.createTransaction({ amount, recipient });
        console.log(transaction);
      });

      it('should create a transaction object', () => {
        expect(transaction).toBeInstanceOf(Transaction);
      });

      it('should match the wallet input', () => {
        expect(transaction.input.address).toEqual(wallet.publicKey);
      });

      it('should output the amount to the recipient', () => {
        expect(transaction.outputMap[recipient]).toEqual(amount);
        // transaction.outputMap[recipient] = transaction.outputMap['Michael][25]
      });
    });

    // Om en blockkedja är medskickad behöver vi anropa calculateBalance...
    describe('and a chain is supplied', () => {
      // Bekräfta att calculateBalance anropas...
      it('should call the Wallet.calculateBalance', () => {
        const calculateBalanceMockFn = vi.fn();

        // Spara undan den riktiga Wallet.calculateBalance i en variabel...
        const orgCalculateBalance = Wallet.calculateBalance;
        // Koppla Wallet.calculateBalance till calculateBalanceMockFn...
        Wallet.calculateBalance = calculateBalanceMockFn;

        wallet.createTransaction({
          recipient: 'Matilda',
          amount: 20,
          chain: new Blockchain().chain,
        });

        expect(calculateBalanceMockFn).toHaveBeenCalled();

        // Återställ ordningen, det vill säga koppla tillbaka Wallet.calculateBalance
        Wallet.calculateBalance = orgCalculateBalance;
      });
    });
  });

  describe('Calculate the balance', () => {
    let blockchain;

    beforeEach(() => {
      blockchain = new Blockchain();
    });

    // 1. När det inte finns några transaktioner(outputMap)
    describe('and there is not output for the wallet', () => {
      it('should return the initial balance "INITIAL_BALANCE"', () => {
        expect(
          Wallet.calculateBalance({
            chain: blockchain.chain,
            address: wallet.publicKey,
          })
        ).toEqual(INITIAL_BALANCE);
      });
    });

    // 2. Det finns transaktioner för aktuell plånbok...
    describe('and there are outputs(transactions) for the wallet', () => {
      let transaction1, transaction2;

      beforeEach(() => {
        transaction1 = new Wallet().createTransaction({
          recipient: wallet.publicKey,
          amount: 10,
        });

        transaction2 = new Wallet().createTransaction({
          recipient: wallet.publicKey,
          amount: 25,
        });

        blockchain.addBlock({ data: [transaction1, transaction2] });
      });

      it('should calculate the sum of all transactions for the wallet', () => {
        expect(
          Wallet.calculateBalance({
            chain: blockchain.chain,
            address: wallet.publicKey,
          })
        ).toEqual(
          INITIAL_BALANCE +
            transaction1.outputMap[wallet.publicKey] +
            transaction2.outputMap[wallet.publicKey]
        );
      });

      describe('and the wallet has made a transaction', () => {
        let recentTransaction;

        beforeEach(() => {
          recentTransaction = wallet.createTransaction({
            recipient: 'James',
            amount: 10,
          });

          blockchain.addBlock({ data: [recentTransaction] });
        });

        it('should return the amount from recent transaction', () => {
          expect(
            Wallet.calculateBalance({
              chain: blockchain.chain,
              address: wallet.publicKey,
            })
          ).toEqual(recentTransaction.outputMap[wallet.publicKey]);
        });

        describe('and there are outputs(transactions) before and after the recent transaction', () => {
          let recentBlockTransaction, nextBlockTransaction;

          beforeEach(() => {
            recentTransaction = wallet.createTransaction({
              recipient: 'Erik',
              amount: 25,
            });

            // Reward transaction...
            recentBlockTransaction = Transaction.transactionReward({
              miner: wallet,
            });

            blockchain.addBlock({
              data: [recentTransaction, recentBlockTransaction],
            });

            // Create a new transaction for a new Wallet...
            nextBlockTransaction = new Wallet().createTransaction({
              recipient: wallet.publicKey,
              amount: 100,
            });

            blockchain.addBlock({ data: [nextBlockTransaction] });
          });

          it('should include the amounts from the returned balance', () => {
            expect(
              Wallet.calculateBalance({
                chain: blockchain.chain,
                address: wallet.publicKey,
              })
            ).toEqual(
              recentTransaction.outputMap[wallet.publicKey] +
                recentBlockTransaction.outputMap[wallet.publicKey] +
                nextBlockTransaction.outputMap[wallet.publicKey]
            );
          });
        });
      });
    });
  });
});
