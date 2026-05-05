# TOOL-RUNTIME-7 Harness Reports

## Files created
### Schemas
- `AI/SCHEMAS/harness-result-report.schema.json`
- `AI/SCHEMAS/fixture-bundle-manifest.schema.json`

### Synthetic traces
- `AI/EXAMPLES/runtime-preview/synthetic-traces/valid-preview-only-chain.trace.json`
- `AI/EXAMPLES/runtime-preview/synthetic-traces/dry-run-only-chain.trace.json`
- `AI/EXAMPLES/runtime-preview/synthetic-traces/blocked-trust-chain.trace.json`
- `AI/EXAMPLES/runtime-preview/synthetic-traces/expired-approval-chain.trace.json`
- `AI/EXAMPLES/runtime-preview/synthetic-traces/tenant-violation-chain.trace.json`
- `AI/EXAMPLES/runtime-preview/synthetic-traces/rollback-invalid-chain.trace.json`
- `AI/EXAMPLES/runtime-preview/synthetic-traces/provider-missing-chain.trace.json`
- `AI/EXAMPLES/runtime-preview/synthetic-traces/capability-unknown-chain.trace.json`

### Consistency failures
- `AI/EXAMPLES/runtime-preview/consistency-failures/readiness-executable-state-mismatch.json`
- `AI/EXAMPLES/runtime-preview/consistency-failures/provider-binding-contradiction.json`
- `AI/EXAMPLES/runtime-preview/consistency-failures/trust-terminal-violation.json`
- `AI/EXAMPLES/runtime-preview/consistency-failures/approval-expired-executable-violation.json`
- `AI/EXAMPLES/runtime-preview/consistency-failures/rollback-invalid-executable-violation.json`
- `AI/EXAMPLES/runtime-preview/consistency-failures/blocked-reason-missing.json`

## What each schema validates
### harness-result-report.schema.json
Validates the final static harness report surface including:
- mode/security invariants
- outcome classes
- validation sub-results
- blocked reasons
- final readiness
- execution authorization hard-false invariant

### fixture-bundle-manifest.schema.json
Validates a reusable bundle manifest for preview fixtures including:
- bundle metadata
- fixture roots/schema roots
- expected-result references
- included fixture entries
- expected outcomes/readiness
- known mismatch flags
- static security invariants

## Synthetic trace purpose
Synthetic traces give future harnesses and UI/reporting lanes a stable event-comparison surface without needing live resolver behavior.

## Consistency failure purpose
Consistency failure examples define what broken or contradictory outputs look like so future harnesses can fail deterministically instead of inventing ad hoc diagnostics.

## Security boundary preserved
This phase remains static only:
- no execution
- no provider activation
- no bridge invocation
- no compiler execution
- no release mutation

## Recommended next phase
A clean next static phase would be:
- report fixture bundle manifest examples
- harness result report examples
- consistency-rule catalog schema
- UI/report presentation mapping doc
