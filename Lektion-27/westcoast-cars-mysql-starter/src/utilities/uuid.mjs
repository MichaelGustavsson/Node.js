import crypto from 'crypto';

export const generateId = () => {
  return crypto.randomUUID().replaceAll('-', '');
};
