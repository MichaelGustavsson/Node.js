import { describe, expect } from 'vitest';
import Block from './Block.mjs';
import { GENESIS_BLOCK } from './genesis.mjs';
import { createHash } from '../../utilities/hash.mjs';
import { MINE_RATE } from '../../utilities/config.mjs';

describe('Block', () => {
  // dummy data...
  const timestamp = 2000; //new Date().toString();
  const currentHash = 'current-hash';
  const lastHash = 'prev-hash';
  const data = [1, 2, 3, 4, 5];
  const nonce = 1;
  const difficulty = 1;
  const block = new Block({
    hash: currentHash,
    timestamp,
    lastHash,
    data,
    nonce,
    difficulty,
  });

  describe('should have the correct properties', () => {
    it('should have a timestamp property', () => {
      expect(block).toHaveProperty('timestamp');
    });

    it('should have a hash property', () => {
      expect(block).toHaveProperty('hash');
    });

    it('should have a lastHash property', () => {
      expect(block).toHaveProperty('lastHash');
    });

    it('should have a data property', () => {
      expect(block).toHaveProperty('data');
    });

    it('should hav a nonce property', () => {
      expect(block).toHaveProperty('nonce');
    });

    it('should have difficulty property', () => {
      expect(block).toHaveProperty('difficulty');
    });
  });

  describe('should have its properties correct initialized', () => {
    it('should set a timestamp value', () => {
      expect(block.timestamp).not.toEqual(undefined);
    });

    it('should have a correct hash', () => {
      expect(block.hash).toEqual(currentHash);
    });

    it('should set the lastHash to the hash of previous  block', () => {
      expect(block.lastHash).toEqual(lastHash);
    });

    it('should set the data property', () => {
      expect(block.data).toEqual(data);
    });

    it('should return an instance of the Block class', () => {
      expect(block instanceof Block).toBeTruthy();
      // expect(block instanceof Block).toBe(true);
    });
  });

  describe('genesis() function', () => {
    const genesisBlock = Block.genesis();

    // Test 1. Är genesis blocket en referens till Block klassen...
    it('should return an instance of the Block class', () => {
      expect(genesisBlock instanceof Block).toBeTruthy();
    });
    // Test 2. Kontrollera så att genesis blocket innehåller korrekt start data...
    it('should return the genesis data', () => {
      expect(genesisBlock).toEqual(GENESIS_BLOCK);
    });
  });

  describe('mineblock() function', () => {
    const previousBlock = Block.genesis();
    const data = [6, 7, 8, 9, 10];
    const minedBlock = Block.mineBlock({ previousBlock, data });

    it('should return an instance of class Block', () => {
      expect(minedBlock instanceof Block).toBeTruthy();
    });

    it('should set the lastHash to the hash of the previous block', () => {
      expect(minedBlock.lastHash).toEqual(previousBlock.hash);
    });

    it('should set the data', () => {
      expect(minedBlock.data).toEqual(data);
    });

    it('should set the timestamp', () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it('should create a SHA-256 hash based on given and correct input', () => {
      expect(minedBlock.hash).toEqual(
        createHash(
          minedBlock.timestamp,
          previousBlock.hash,
          data,
          minedBlock.nonce,
          minedBlock.difficulty
        )
      );
    });

    // 000abf456fa...
    // Steg för att testa svårighetsgraden och antal inledande 0...
    it('should create a hash based on the difficulty level', () => {
      expect(minedBlock.hash.substring(0, minedBlock.difficulty)).toEqual(
        '0'.repeat(minedBlock.difficulty)
      );
    });

    // Kontrollera så att justeringen av difficulty görs på rätt sätt...
    it('should adjust the difficulty level', () => {
      const results = [
        previousBlock.difficulty + 1,
        previousBlock.difficulty - 1,
      ];

      expect(results.includes(minedBlock.difficulty)).toBe(true);
    });
  });

  describe('Adjust the difficulty level', () => {
    it('should raise the difficulty level for a quickly mined block', () => {
      expect(
        Block.adjustDifficultyLevel({
          block,
          timestamp: block.timestamp + MINE_RATE - 100,
        })
      ).toEqual(block.difficulty + 1);
    });

    it('should lower the difficulty level for a slowly mined block', () => {
      expect(
        Block.adjustDifficultyLevel({
          block,
          timestamp: block.timestamp + MINE_RATE + 100,
        })
      ).toEqual(block.difficulty - 1);
    });

    it('should have a lower limit of 1 for difficulty level', () => {
      block.difficulty = -1;
      expect(Block.adjustDifficultyLevel({ block })).toEqual(1);
    });
  });
});
