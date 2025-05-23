import { INITIAL_BALANCE } from '../../utilities/config.mjs';
import { keyMgr } from '../../utilities/keyManager.mjs';
import { createHash } from '../../utilities/hash.mjs';
import Transaction from './Transaction.mjs';

export default class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = keyMgr.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign(data) {
    return this.keyPair.sign(createHash(data));
  }

  createTransaction({ recipient, amount }) {
    if (amount > this.balance) throw new Error('Not enough funds!');
    return new Transaction({ sender: this, recipient, amount });
  }
}
