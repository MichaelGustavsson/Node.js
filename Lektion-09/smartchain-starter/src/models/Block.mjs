import { createHash } from '../utilities/hash.mjs';
import { GENESIS_BLOCK } from './genesis.mjs';

export default class Block {
  constructor({ timestamp, hash, lastHash, data }) {
    this.timestamp = timestamp;
    this.hash = hash;
    this.lastHash = lastHash;
    this.data = data;
  }

  static genesis() {
    return new this(GENESIS_BLOCK);
  }

  static mineBlock({ previousBlock, data }) {
    const timestamp = Date.now();
    const lastHash = previousBlock.hash;
    const hash = createHash(timestamp, lastHash, data);

    return new this({
      timestamp,
      lastHash,
      data,
      hash,
    });
  }
}
