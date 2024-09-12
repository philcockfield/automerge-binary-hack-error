import { A, DocHandle } from './libs';
import type * as t from './t';
import { Generate } from './u.id';

type O = Record<string, unknown>;

/**
 * Convert a document to a [Uint8Array] for storage.
 *
 *    See the "hard-coded byte array hack", aka. "binary hack"
 *
 *    Refs:
 *    - https://automerge.org/docs/cookbook/modeling-data/#setting-up-an-initial-document-structure
 *    - https://discord.com/channels/1200006940210757672/1230453235207110666/1231192657666248768 ← Martin Kleppmann
 *
 */
export function toBinary<T extends O>(doc: t.DocHandle<T>): Uint8Array {
  return A.save<T>(doc.docSync()!);
}

/**
 * Generate a new document from a stored binary.
 *
 * NOTE: this uses the "hard-coded byte array hack"
 * refs:
 *   - https://automerge.org/docs/cookbook/modeling-data/#setting-up-an-initial-document-structure
 *   - https://discord.com/channels/1200006940210757672/1231799313995403384
 *   - https://discord.com/channels/1200006940210757672/1230453235207110666/1230520148478267402
 *
 */
export function fromBinary<T extends O>(repo: t.Repo, binary: Uint8Array) {
  const id = Generate.id();

  // Construct handle from binary data.
  const isNew = false;
  const handle = new DocHandle<T>(id, { isNew });
  const doc = tryLoadBinary<T>(binary);
  if (!doc) throw new Error(`Invalid document binary`);

  // Update and register with repo.
  handle.update(() => A.clone(doc));
  repo.handles[id] = handle;
  repo.emit('document', { handle, isNew });

  // Finish up.
  return handle;
}

/**
 * Helpers
 */
function tryLoadBinary<T extends O>(data: Uint8Array) {
  try {
    return A.load<T>(data);
  } catch (error: any) {
    return undefined;
  }
}
