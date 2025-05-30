import { createHash } from '../../utilities/hash.mjs';
import Block from './Block.mjs';
import Transaction from '../wallet/Transaction.mjs';
import Wallet from '../wallet/Wallet.mjs';
import { REWARD_ADDRESS, MINING_REWARD } from '../../utilities/config.mjs';

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

  // replaceChain tar in en lista av block...
  replaceChain(chain, callback) {
    if (chain.length <= this.chain.length) return;

    if (!Blockchain.isValid(chain)) return;

    if (callback) callback();

    this.chain = chain;
  }

  // Validerar inkommande lista av transaktioner mot aktuell instans och dess
  // lista av transaktioner...
  validateTransactionData({ chain }) {
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      let rewardCount = 0;

      for (let transaction of block.data) {
        if (transaction.input.address === REWARD_ADDRESS.address) {
          rewardCount += 1;

          // Regel 1: Kontrollera om det finns fler belöningstransaktion än 1.
          if (rewardCount > 1) {
            console.error('Too many rewards');
            return false;
          }
        }
      }
    }
    return true;
  }

  static isValid(chain) {
    if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    // Testa hela kedjan för att hitta eventuella felaktigheter...
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, data, hash, lastHash, nonce, difficulty } =
        chain.at(i);
      const prevHash = chain[i - 1].hash;

      if (lastHash !== prevHash) return false;

      const validHash = createHash(
        timestamp,
        data,
        lastHash,
        nonce,
        difficulty
      );
      if (hash !== validHash) return false;
    }

    return true;
  }
}
