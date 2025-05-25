import { beforeEach, describe, expect } from 'vitest';
import Wallet from './Wallet.mjs';
import { verifySignature } from '../../utilities/keyManager.mjs';
import Transaction from './Transaction.mjs';

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
  });
});
