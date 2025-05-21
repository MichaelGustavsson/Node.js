import { v4 as uuidv4 } from 'uuid';

export default class Transaction {
  constructor({ sender, recipient, amount }) {
    this.id = uuidv4().replaceAll('-', '');
    this.outputMap = this.createOutputMap({ sender, recipient, amount });
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
