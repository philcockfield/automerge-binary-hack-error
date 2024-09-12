import { describe, expect, it } from 'vitest';
import { Repo } from '../common';

export type TDoc = { count: number; text?: string };

describe('Automerge basics', () => {
  it('simple document', () => {
    const repo = new Repo({ network: [] });
    const doc = repo.create<TDoc>();
    doc.change((d) => (d.count = 123));
    expect(doc.docSync()?.count).to.eql(123);
  });
});
