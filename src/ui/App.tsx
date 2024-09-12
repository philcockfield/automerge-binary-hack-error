import { useEffect } from 'react';
import { fromBinary, Repo, toBinary } from '../common';

export type TDoc = { count: number; text?: string };
const repo = new Repo({ network: [] });

export function App() {
  /**
   * Test: to/from binary within browser.
   */
  useEffect(() => {
    const a = repo.create<TDoc>({ count: 123 });
    const binary = toBinary<TDoc>(a);
    const b = fromBinary(repo, binary);

    console.log('b.docSync()', { ...b.docSync() });
  }, []);

  return (
    <>
      <h1>Debug Sample</h1>
    </>
  );
}
