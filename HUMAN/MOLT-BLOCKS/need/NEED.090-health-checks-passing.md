# NEED.090 - Health checks passing

**Type:** NEED
**Category:** DELIVERY_READINESS
**Group Description:** What must be true about delivery pipelines and processes before releasing.
**Status:** active

## Definition
Pre-delivery validation checks must all succeed before the release proceeds.

## When to use
What must be true about delivery pipelines and processes before releasing.

## Examples
- all tests must pass before merge
- all MOLT invariants must be satisfied before RuntimeSpec is emitted
- all canary checks must pass before full rollout

## Tags
- need
- delivery_readiness
- health-checks-passing
