import { beforeEach, describe, expect, vi } from 'vitest';
import Blockchain from './Blockchain.mjs';
import Block from './Block.mjs';
import Transaction from '../wallet/Transaction.mjs';
import Wallet from '../wallet/Wallet.mjs';

describe('Blockchain', () => {
  let blockchain, blockchain_2, org_chain;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain_2 = new Blockchain();
    org_chain = blockchain.chain;
  });

  it('should contain an array of blocks', () => {
    expect(blockchain.chain instanceof Array).toBeTruthy();
  });

  it('should start with the genesis block', () => {
    expect(blockchain.chain.at(0)).toEqual(Block.genesis());
    // expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('should add a new block to the chain', () => {
    const data = 'Polestar';
    blockchain.addBlock({ data });
    expect(blockchain.chain.at(-1).data).toEqual(data);
  });

  describe('isValid() chain function', () => {
    describe('the genesis block is missing or not the first block in the chain', () => {
      it('should return false', () => {
        blockchain.chain[0] = 'strange-block';
        expect(Blockchain.isValid(blockchain.chain)).toBeFalsy();
      });
    });

    describe('when the chain starts with the genesis block and consist of multiple blocks', () => {
      beforeEach(() => {
        blockchain.addBlock({ data: 'Åsa-Nisse' });
        blockchain.addBlock({ data: 'Nisse Hult' });
        blockchain.addBlock({ data: 'Eva Olsson' });
        blockchain.addBlock({ data: 'Emelie Höglund' });
        blockchain.addBlock({ data: 'Bertil Bertilsson' });
      });

      describe('and the lastHash has changed', () => {
        it('should return false', () => {
          blockchain.chain.at(2).lastHash = 'Ooops!';
          expect(Blockchain.isValid(blockchain.chain)).toBeFalsy();
        });
      });

      describe('and the chain contains a block with invalid information', () => {
        it('should return false', () => {
          blockchain.chain.at(1).data = 'You are hacked!!!';
          expect(Blockchain.isValid(blockchain.chain)).toBeFalsy();
        });
      });

      describe('and the chain does not contain any invalid blocks', () => {
        it('returns true', () => {
          expect(Blockchain.isValid(blockchain.chain)).toBeTruthy();
        });
      });
    });
  });

  describe('Replace chain', () => {
    describe('when the new chain is not longer', () => {
      it('should not replace the chain', () => {
        blockchain_2.chain[0] = { data: 'New data in block' };

        blockchain.replaceChain(blockchain_2.chain);

        expect(blockchain.chain).toEqual(org_chain);
      });
    });

    describe('when the new chain is longer', () => {
      beforeEach(() => {
        blockchain_2.addBlock({ data: 'Åsa-Nisse' });
        blockchain_2.addBlock({ data: 'Nisse Hult' });
      });

      describe('but is invalid', () => {
        it('should not replace the chain', () => {
          blockchain_2.chain[1].hash = 'You-have-been-hacked';
          blockchain.replaceChain(blockchain_2.chain);

          expect(blockchain.chain).toEqual(org_chain);
        });
      });
      describe('but is valid', () => {
        beforeEach(() => {
          blockchain.replaceChain(blockchain_2.chain);
        });

        it('should replace the chain', () => {
          expect(blockchain.chain).toEqual(blockchain_2.chain);
        });
      });
    });

    describe('when the shouldValidate flag is true', () => {
      it('should call validateTransactionData', () => {
        const validateTransactionDataMockFn = vi.fn();

        blockchain.validateTransactionData = validateTransactionDataMockFn;

        blockchain_2.addBlock({ data: 'dummy_data' });
        blockchain.replaceChain(blockchain_2.chain, true);

        expect(validateTransactionDataMockFn).toHaveBeenCalled();
      });
    });
  });

  describe('Validate transaction data', () => {
    let transaction, rewardTransaction, wallet;

    beforeEach(() => {
      wallet = new Wallet();
      transaction = wallet.createTransaction({
        recipient: 'David',
        amount: 65,
      });
      rewardTransaction = Transaction.transactionReward({ miner: wallet });
    });

    describe('and the transaction data is valid', () => {
      it('returns true', () => {
        blockchain_2.addBlock({ data: [transaction, rewardTransaction] });

        expect(
          blockchain.validateTransactionData({ chain: blockchain_2.chain })
        ).toBeTruthy();
      });
    });

    // RULE 1.
    describe('and the transaction data has multiple rewards', () => {
      it('should throw an error', () => {
        blockchain_2.addBlock({
          data: [transaction, rewardTransaction, rewardTransaction],
        });

        expect(() =>
          blockchain.validateTransactionData({ chain: blockchain_2.chain })
        ).toThrow('Too many rewards');
      });
    });

    // RULE 2.
    describe('and the transaction has a badly formatted outputMap', () => {
      describe('and the transaction is not a reward transaction', () => {
        it('should throw an error', () => {
          transaction.outputMap[wallet.publicKey] = 6666666;

          blockchain_2.addBlock({ data: [transaction, rewardTransaction] });

          expect(() =>
            blockchain.validateTransactionData({ chain: blockchain_2.chain })
          ).toThrow('Invalid mining reward!');
        });
      });

      describe('and the transaction is a reward transaction', () => {
        it('should throw an error', () => {
          rewardTransaction.outputMap[wallet.publicKey] = 6666666;
          blockchain_2.addBlock({ data: [transaction, rewardTransaction] });

          expect(() =>
            blockchain.validateTransactionData({ chain: blockchain_2.chain })
          ).toThrow('Invalid transaction');
        });
      });
    });

    // RULE 3.
    describe('and the transaction data has at least one badly formatted input', () => {
      it('should throw an error', () => {
        wallet.balance = 10000;
        const spookyMap = {
          [wallet.publicKey]: 9900,
          fakeRecipient: 100,
        };

        const spookyTransaction = {
          input: {
            timestamp: Date.now(),
            amount: wallet.balance,
            address: wallet.publicKey,
            signature: wallet.sign(spookyMap),
          },
          outputMap: spookyMap,
        };

        blockchain_2.addBlock({ data: [spookyTransaction, rewardTransaction] });

        expect(() =>
          blockchain.validateTransactionData({ chain: blockchain_2.chain })
        ).toThrow('Wrong input amount');
      });
    });

    // RULE 4.
    describe('and a block contains multiple identical transactions', () => {
      it('should throw an error', () => {
        blockchain_2.addBlock({
          data: [transaction, transaction, transaction, transaction],
        });

        expect(() =>
          blockchain.validateTransactionData({ chain: blockchain_2.chain })
        ).toThrow('Transaction is a duplicated in the block');
      });
    });
  });
});
