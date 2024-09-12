import { v4 } from 'uuid';
import { stringifyAutomergeUrl } from './libs';
import type * as t from './t';

/**
 * Helpers for generating IDs and URIs.
 */
export const Generate = {
  uri() {
    const documentId = v4(null, new Uint8Array(16)) as t.BinaryDocumentId;
    return stringifyAutomergeUrl({ documentId });
  },
  id(): t.DocumentId {
    return Generate.uri().split(':')[1] as t.DocumentId;
  },
} as const;
