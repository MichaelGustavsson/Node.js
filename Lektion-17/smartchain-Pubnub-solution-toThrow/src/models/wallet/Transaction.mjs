import { v4 as uuidv4 } from 'uuid';
import { verifySignature } from '../../utilities/keyManager.mjs';
import { MINING_REWARD, REWARD_ADDRESS } from '../../utilities/config.mjs';

export default class Transaction {
  constructor({ sender, recipient, amount, input, outputMap }) {
    this.id = uuidv4().replaceAll('-', '');
    this.outputMap =
      outputMap || this.createOutputMap({ sender, recipient, amount });
    this.input =
      input || this.createInput({ sender, outputMap: this.outputMap });
  }

  static validate(transaction) {
    const {
      input: { address, amount, signature },
      outputMap,
    } = transaction;

    const total = Object.values(outputMap).reduce(
      (sum, amount) => sum + amount
    );

    if (amount !== total) return false;

    if (!verifySignature({ publicKey: address, data: outputMap, signature }))
      return false;

    return true;
  }

  static transactionReward({ miner }) {
    return new this({
      input: REWARD_ADDRESS,
      outputMap: { [miner.publicKey]: MINING_REWARD },
    });
  }

  update({ sender, recipient, amount }) {
    if (amount > this.outputMap[sender.publicKey])
      throw new Error('Not enough funds!');

    if (!this.outputMap[recipient]) {
      this.outputMap[recipient] = amount;
    } else {
      this.outputMap[recipient] = this.outputMap[recipient] + amount;
    }

    this.outputMap[sender.publicKey] =
      this.outputMap[sender.publicKey] - amount;

    this.input = this.createInput({ sender, outputMap: this.outputMap });
  }

  createOutputMap({ sender, recipient, amount }) {
    const map = {};

    map[recipient] = amount;
    map[sender.publicKey] = sender.balance - amount;
    return map;
  }

  createInput({ sender, outputMap }) {
    return {
      timestamp: Date.now(),
      amount: sender.balance,
      address: sender.publicKey,
      signature: sender.sign(outputMap),
    };
  }
}
