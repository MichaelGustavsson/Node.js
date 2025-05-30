import { expect } from 'vitest';
import { createHash } from './hash.mjs';

describe('createHash function', () => {
  it('should generate a SHA-256 hash as output', () => {
    expect(createHash('test')).toEqual(
      '4d967a30111bf29f0eba01c448b375c1629b2fed01cdfcc3aed91f1b57d5dd5e'
    );
  });

  it('should generate the same output with the same input regardless of order', () => {
    expect(createHash('olle', 'emelie', 'yanet')).toEqual(
      createHash('emelie', 'olle', 'yanet')
    );
  });

  it('should create a unique has when any property have changed', () => {
    const obj = {};
    const orgHash = createHash(obj);
    obj['name'] = 'Evert Ljusberg';

    expect(createHash(obj)).not.toEqual(orgHash);
  });
});
