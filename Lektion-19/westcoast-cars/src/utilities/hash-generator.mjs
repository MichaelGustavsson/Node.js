import crypto from 'crypto';

export const generateHash = (...args) => {
  const hash = crypto.createHash('sha256');

  hash.update(
    args
      .map((arg) => JSON.stringify(arg))
      .sort()
      .join('')
  );

  // TODO: Gör om till binär hash...
  return hash.digest('hex');
};
