import { INITIAL_DIFFICULTY } from '../../utilities/config.mjs';
export const GENESIS_BLOCK = {
  timestamp: Date.now(),
  data: [],
  hash: '#1',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  lastHash: '#######',
};
