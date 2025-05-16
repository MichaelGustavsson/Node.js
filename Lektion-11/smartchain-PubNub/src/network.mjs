import PubNub from 'pubnub';

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'SMARTCHAIN',
};

const credentials = {
  publishKey: 'pub-c-6041c693-03e7-4bdb-b7e5-47550b48e1e4',
  subscribeKey: 'sub-c-749fdeea-12c6-4c45-8462-56345e74fa71',
  secretKey: 'sec-c-MzVhZTdmNmEtNTQ5Ni00NmY3LTk0ZjAtMGVjNDEwYjlmYWYx',
  userId: 'michael-smartchain',
};

export default class Network {
  constructor({ blockchain }) {
    this.blockchain = blockchain;
    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.handleMessage);
  }

  broadcast() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  handleMessage(channel, message) {
    return {
      message: (msgObject) => {
        const { channel, message } = msgObject;
        const msg = JSON.parse(message);
        console.log(
          `Meddelande har mottagits på kanal: ${channel}, meddelandet är ${message}`
        );

        if (channel === CHANNELS.BLOCKCHAIN) {
          this.blockchain.replaceChain(msg);
        }
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}
