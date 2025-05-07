import { createHash } from '../utilities/hash.mjs';
import Block from './Block.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
    // this.chain.push(Block.genesis())
  }

  addBlock({ data }) {
    const addedBlock = Block.mineBlock({
      previousBlock: this.chain.at(-1),
      data,
    });
    this.chain.push(addedBlock);
  }

  static isValid(chain) {
    if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    // Testa hela kedjan för att hitta eventuella felaktigheter...
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, data, hash, lastHash } = chain.at(i);
      const prevHash = chain[i - 1].hash;

      if (lastHash !== prevHash) return false;

      const validHash = createHash(timestamp, data, lastHash);
      if (hash !== validHash) return false;
    }

    return true;
  }
}
