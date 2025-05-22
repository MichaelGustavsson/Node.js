import EC from 'elliptic';
import { createHash } from './hash.mjs';

export const keyMgr = new EC.ec('secp256k1');

export const verifySignature = ({ publicKey, data, signature }) => {
  const key = keyMgr.keyFromPublic(publicKey, 'hex');
  return key.verify(createHash(data), signature);
};
