import Blockchain from './Blockchain.mjs';
import Block from './Block.mjs';
import { beforeEach, describe, expect } from 'vitest';

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
  });
});
