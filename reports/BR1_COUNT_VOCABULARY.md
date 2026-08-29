# BR-1 Count Vocabulary

Source base: `6df902d8e6c0e77d14bec850a971f36d42f90d5d`

| Count class | Definition | Baseline |
| --- | --- | ---: |
| `AGGREGATE_H4_LANE_RECORDS` | Records in the six aggregate H4-lane source shelves. This describes the current aggregate shelf, not qualification status. | 1,370 |
| `SOURCE_BACKED_H4_CANDIDATES` | Aggregate shelf plus nine standalone `BLK.*` draft artifacts. | 1,379 |
| `PROMOTED_H4_CANONICAL_RECORDS` | Aggregate records that pass BR-1 normalization, taxonomy, projection, and validation. | Qualified only after BR-1 |
| `PLATFORM_EXTENSION_RECORDS` | AIM/USE/NEED records kept at compatibility paths and explicitly excluded from H4 MOLT types. | 900 |
| `DERIVED_EXPORT_RECORDS` | Secondary/export mirrors under `blocks/molt/subjects`; never added to canonical or extension source totals. | 300 |

Counts must always be reported with their class. No report may use an unqualified `MOLT_TOTAL`.

## Current qualified shelf (BR-2M)

The immutable BR-1 baseline above remains the observation at source base
`6df902d8e6c0e77d14bec850a971f36d42f90d5d`. Commit
`08fc3e6607fe959c4ace38d944996636d8385561` subsequently promoted six
qualified education records. The current qualification expectations are:

- `AGGREGATE_H4_LANE_RECORDS`: **1,376**
- `SOURCE_BACKED_H4_CANDIDATES`: **1,385** (1,376 aggregate + 9 standalone drafts)
- `PROMOTED_H4_CANONICAL_RECORDS`: **1,376**

This is a six-record legitimate delta, not a rewrite of the BR-1 baseline.
