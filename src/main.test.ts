import { describe, expect, it } from 'vitest';
import { fromBinary, Repo, toBinary } from './common';

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

/**
 * Binary Hack.
 */
describe('binary hack', () => {
  const repo = new Repo({ network: [] });

  it('toBinary → fromBinary', () => {
    const a = repo.create<TDoc>({ count: 123 });
    const binary = toBinary<TDoc>(a);
    const b = fromBinary(repo, binary);
    expect(b.docSync()).to.eql({ count: 123 });
  });
});
