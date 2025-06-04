import { INITIAL_DIFFICULTY } from '../../utilities/block-config.mjs';

export const GENESIS_BLOCK = {
  timestamp: 1,
  data: [],
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  hash: '#1',
  previousHash: '######',
};
