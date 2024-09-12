import { expect, test } from 'vitest';
import { sum } from './main.ts';

export type TDoc = { count: number; msg?: string };

test('simple automerge setup', () => {
  expect(sum(1, 2)).toBe(3);
});
