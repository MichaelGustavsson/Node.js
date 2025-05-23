import PubNub from 'pubnub';

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'SMARTCHAIN',
};

const credentials = {
  publishKey: process.env.PUB_KEY,
  subscribeKey: process.env.SUB_KEY,
  secretKey: process.env.SEC_KEY,
  userId: process.env.USER_ID,
};

export default class Network {
  constructor({ blockchain, transactionPool }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;

    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.handleMessage());
  }

  broadcast() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  handleMessage(channel, message) {
    console.log(`Got message ${message} on channel ${channel}`);
    return {
      message: (msgObject) => {
        const { channel, message } = msgObject;
        const msg = JSON.parse(message);
        console.log(
          `Meddelande har mottagits på kanal: ${channel}, meddelandet är ${message}`
        );

        switch (channel) {
          case CHANNELS.BLOCKCHAIN:
            this.blockchain.replaceChain(msg);
            break;
          default:
            return;
        }
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}
