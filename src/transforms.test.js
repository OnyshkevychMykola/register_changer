import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { toSentenceCase, toSlug, toTitleCase } from './transforms.js';

describe('toSlug', () => {
  it('lowercases, hyphenates, and strips accents and symbols', () => {
    assert.equal(toSlug('Online casinos España'), 'online-casinos-espana');
  });

  it('collapses repeated separators', () => {
    assert.equal(toSlug('Hello,  World!'), 'hello-world');
  });

  it('returns an empty string for blank input', () => {
    assert.equal(toSlug('   ---  '), '');
  });

  it('keeps each line separate', () => {
    assert.equal(
      toSlug('Online casinos España\nBest slots Spain'),
      'online-casinos-espana\nbest-slots-spain',
    );
  });
});

describe('toTitleCase', () => {
  it('replaces hyphens with spaces and capitalizes each word', () => {
    assert.equal(toTitleCase('online-casinos-espana'), 'Online Casinos Espana');
  });

  it('capitalizes each line on its own', () => {
    assert.equal(
      toTitleCase('online-casinos-espana\nbest-slots-spain'),
      'Online Casinos Espana\nBest Slots Spain',
    );
  });
});

describe('toSentenceCase', () => {
  it('replaces hyphens with spaces and capitalizes only the first word', () => {
    assert.equal(toSentenceCase('online-casinos-espana'), 'Online casinos espana');
  });

  it('capitalizes only the first word of each line', () => {
    assert.equal(
      toSentenceCase('online-casinos-espana\nbest-slots-spain'),
      'Online casinos espana\nBest slots spain',
    );
  });
});
