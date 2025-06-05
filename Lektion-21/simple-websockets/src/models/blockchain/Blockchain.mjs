import { generateHash } from '../../utilities/hash-generator.mjs';
import Block from '../block/Block.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const newBlock = Block.createBlock({
      previousBlock: this.chain.at(-1),
      data,
    });

    this.chain.push(newBlock);
    return newBlock;
  }

  replaceChain(chain) {
    if (chain.length <= this.chain.length) return;

    if (!Blockchain.isValid(chain)) return;

    this.chain = chain;
    console.log('SYNC CHAIN: ', this.chain);
  }

  static isValid(chain) {
    if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, data, hash, previousHash, nonce, difficulty } =
        chain.at(i);
      const prevHash = chain[i - 1].hash;

      if (previousHash !== prevHash) return false;

      const validHash = generateHash(
        timestamp,
        data,
        previousHash,
        nonce,
        difficulty
      );

      if (hash !== validHash) return false;
    }

    return true;
  }
}
