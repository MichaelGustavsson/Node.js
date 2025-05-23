import { v4 as uuidv4 } from 'uuid';
import { verifySignature } from '../../utilities/keyManager.mjs';

export default class Transaction {
  constructor({ sender, recipient, amount }) {
    this.id = uuidv4().replaceAll('-', '');
    this.outputMap = this.createOutputMap({ sender, recipient, amount });
    this.input = this.createInput({ sender, outputMap: this.outputMap });
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

  update({ sender, recipient, amount }) {
    // Kontrollera så att avsändarens balans inte är lägre än
    // överfört värde...
    if (amount > this.outputMap[sender.publicKey])
      throw new Error('Not enough funds!');

    // Är det en ny mottagare som ska uppdateras/läggas till
    // eller är det en befintlig mottagare som ska uppdateras.
    if (!this.outputMap[recipient]) {
      this.outputMap[recipient] = amount;
    } else {
      this.outputMap[recipient] = this.outputMap[recipient] + amount;
      // this.outputMap[recipient] =+ amount;
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
