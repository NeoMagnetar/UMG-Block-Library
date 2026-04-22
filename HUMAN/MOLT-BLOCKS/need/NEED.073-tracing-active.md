# NEED.073 - Tracing active

**Type:** NEED
**Category:** OBSERVABILITY_BASELINE
**Group Description:** What must be true about logging, metrics, and monitoring before a system goes live.
**Status:** active

## Definition
Requests must be traceable from entry to exit across all components before debugging is possible.

## When to use
What must be true about logging, metrics, and monitoring before a system goes live.

## Examples
- distributed trace IDs must be propagated before correlation
- MOLT compilation trace must be written before audit
- request span must be started before downstream calls

## Tags
- need
- observability_baseline
- tracing-active
