# BR-1 Hashing Specification

## Raw source files

`raw_file_sha256` hashes exact source bytes without decoding or line-ending normalization.

## Normalized records

`canonical_record_sha256` hashes the normalized record after removing its entire `hashes` member.

Deterministic serialization rules:

1. UTF-8 JSON;
2. object keys sorted lexicographically at every depth;
3. arrays retain source/semantic order;
4. no insignificant whitespace;
5. Unicode emitted consistently by the JavaScript JSON serializer;
6. null values preserved;
7. the record's own hash fields excluded.

This is the documented BR-1 deterministic serializer. It is JCS-aligned for the string/boolean/null/integer data used here, without claiming general RFC 8785 number-domain equivalence.

Manifest provenance uses `source_base_commit: 6df902d8e6c0e77d14bec850a971f36d42f90d5d`; it does not contain a self-referential final commit.

## Qualified manifest hash contracts

For `AI/MANIFESTS/h4-block-library-manifest.json` at Block Library commit
`d5bb146c9c7a9b285505627edf59d2e34d0f346e`:

- `RAW_FILE_BYTES_SHA256=1bcff6bc517fb1575e7478e37f1e7a338a3b45cab87f0203d99f605a8f6ff5b3`
- `CANONICAL_KEY_SORTED_COMPACT_JSON_SHA256=0ed0454d5a75171ed4115a2234d9a965becfd3a049af3b5b42429dccddf0409e`

These are different contracts. The first hashes the checked-out LF-pinned bytes. The
second parses JSON, recursively sorts object keys, preserves array order, emits compact
UTF-8 JSON, and hashes those canonical bytes.

The immutable BR-1 baseline inventory contains raw source hashes observed from a
Windows CRLF checkout before commit `51231b0bae72e940915e5713a4231c417388bed2`
pinned source files to LF. Qualification tests therefore compare baseline and current
`canonical_record_sha256` values for semantic preservation; they do not incorrectly
require the pre-normalization raw-byte hash to equal the LF checkout hash.
