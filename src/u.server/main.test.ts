import { describe, expect, it } from 'vitest';
import { Repo } from '../common';

export type TDoc = { count: number; text?: string };

describe('Automerge basics', () => {
  const repo = new Repo({ network: [] });

  it('simple document', () => {
    const doc = repo.create<TDoc>({ count: 0 });
    expect(doc.docSync()?.count).to.eql(0);
    doc.change((d) => (d.count = 123));
    expect(doc.docSync()?.count).to.eql(123);
  });
});
