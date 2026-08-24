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
