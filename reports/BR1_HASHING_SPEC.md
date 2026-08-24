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
