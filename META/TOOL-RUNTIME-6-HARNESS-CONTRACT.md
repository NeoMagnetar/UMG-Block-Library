# TOOL-RUNTIME-6 Harness Contract

## Purpose
This note records the static contract for a future non-executing resolver validation harness.

## Must define
- resolver input bundle shape
- validation runner behavior
- pass/fail semantics
- consistency-check semantics
- fixture-to-trace expectations

## Input bundle must include
- fixture under test
- expected result reference
- validation matrix reference
- schema set
- governance schema set
- runner mode = `static_validation_only`
- security mode = `no_execution`

## Harness outcomes
- `PASS`
- `PASS_WITH_MISMATCH_NOTE`
- `FAIL_SCHEMA`
- `FAIL_EXPECTATION`
- `FAIL_CONSISTENCY`

## Fixture-to-trace expectations
Each fixture should imply expected event families such as:
- `capability.declared`
- `capability.registry_known`
- `provider.found`
- `binding.validated`
- `trust.valid`
- `trust.blocked`
- `approval.missing`
- `approval.expired`
- `tenant.violation`
- `rollback.invalid`
- `preview.executable_state`

## Security boundary preserved
The harness must not:
- execute tools
- invoke providers
- run compiler bridge
- grant approvals
- mutate runtime state
- publish packages
