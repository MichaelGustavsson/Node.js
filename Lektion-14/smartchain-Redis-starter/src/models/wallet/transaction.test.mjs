import { beforeEach, describe, expect } from 'vitest';
import Wallet from './Wallet.mjs';
import Transaction from './Transaction.mjs';
import { verifySignature } from '../../utilities/keyManager.mjs';

describe('Transaction', () => {
  let transaction, sender, recipient, amount;

  beforeEach(() => {
    sender = new Wallet();
    recipient = 'melvink';
    amount = 20;

    transaction = new Transaction({
      sender: sender,
      recipient: recipient,
      amount: amount,
    });
  });

  it('should have an id property', () => {
    expect(transaction).toHaveProperty('id');
  });

  describe('outputMap', () => {
    // Output map egenskaperna balance och adress
    it('should should have an outputMap property', () => {
      expect(transaction).toHaveProperty('outputMap');
    });

    it('should display the amount to the recipient', () => {
      expect(transaction.outputMap[recipient]).toEqual(amount);
    });

    it('should display the balance for the senders wallet', () => {
      expect(transaction.outputMap[sender.publicKey]).toEqual(
        sender.balance - amount
      );
    });
  });

  describe('input', () => {
    it('should should have an input property', () => {
      expect(transaction).toHaveProperty('input');
    });

    it('should have a timestamp property', () => {
      expect(transaction.input).toHaveProperty('timestamp');
    });

    it('should have an amount property', () => {
      expect(transaction.input).toHaveProperty('amount');
    });

    it('should have an address property', () => {
      expect(transaction.input).toHaveProperty('address');
    });

    it('should have a signature property', () => {
      expect(transaction.input).toHaveProperty('signature');
    });

    it('should set the amount to the senders balance', () => {
      expect(transaction.input.amount).toEqual(sender.balance);
    });

    it('should set the address to the senders public key', () => {
      expect(transaction.input.address).toEqual(sender.publicKey);
    });

    it('should sign the input', () => {
      expect(
        verifySignature({
          publicKey: sender.publicKey,
          data: transaction.outputMap,
          signature: transaction.input.signature,
        })
      ).toBeTruthy();
    });
  });

  describe('Validate a transaction', () => {
    describe('when it is valid', () => {
      it('should return true', () => {
        expect(Transaction.validate(transaction)).toBeTruthy();
      });
    });

    describe('when it is not valid', () => {
      describe('and the transaction outputMaps value is invalid', () => {
        it('should return false', () => {
          transaction.outputMap[sender.publicKey] = 960;
          expect(Transaction.validate(transaction)).toBeFalsy();
        });
      });

      describe('and the transaction input signature is invalid', () => {
        it('should return false', () => {
          transaction.input.signature = new Wallet().sign(
            'You have been hacked!'
          );
          expect(Transaction.validate(transaction)).toBeFalsy();
        });
      });
    });
  });
});
