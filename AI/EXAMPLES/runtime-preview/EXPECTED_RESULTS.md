# Runtime Preview Expected Results

This file defines the expected interpretation for each TOOL-RUNTIME-4 runtime preview fixture.

## valid-preview-only-chain.json
- Purpose: read-only preview-safe structural validation
- Final readiness: `preview_only`
- Capability state: declared, registry known
- Provider state: available, version valid
- Binding state: validated
- Trust state: valid
- Approval state: no approval effectively required
- Rollback state: valid
- Executable state: preview-only semantics expected
- Blocked reasons: none
- Warnings: none
- Errors: none
- Governance summary: compliant / valid / preview_only
- Outcome: `PASS_WITH_MISMATCH_NOTE`
- Note: `executable_state.state` currently says `dry_run_only` while final governance readiness says `preview_only`

## dry-run-only-chain.json
- Purpose: valid chain held below execution by missing approval
- Final readiness: `dry_run_only`
- Capability state: declared, registry known
- Provider state: available, version valid
- Binding state: validated
- Trust state: valid
- Approval state: missing
- Rollback state: valid
- Executable state: dry_run_only
- Blocked reasons: `APPROVAL_MISSING`
- Warnings: approval missing warning expected
- Errors: none
- Governance summary: valid / required / dry_run_only
- Outcome: `PASS`

## blocked-trust-chain.json
- Purpose: trust policy hard block
- Final readiness: `blocked`
- Capability state: declared, registry known
- Provider state: available, version valid
- Binding state: validated
- Trust state: blocked
- Approval state: required
- Rollback state: valid
- Executable state: blocked
- Blocked reasons: `TRUST_BLOCKED`
- Warnings: none
- Errors: trust blocking error expected
- Governance summary: blocked / final blocked
- Outcome: `PASS`

## expired-approval-chain.json
- Purpose: expired approval blocks readiness
- Final readiness: `blocked`
- Capability state: declared, registry known
- Provider state: available, version valid
- Binding state: validated
- Trust state: valid
- Approval state: expired
- Rollback state: valid
- Executable state: blocked
- Blocked reasons: `APPROVAL_EXPIRED`
- Warnings: none
- Errors: approval expired error expected
- Governance summary: approval required / blocked
- Outcome: `PASS`

## tenant-violation-chain.json
- Purpose: tenant boundary override
- Final readiness: `blocked`
- Capability state: declared, registry known
- Provider state: available, version valid
- Binding state: validated
- Trust state: valid
- Approval state: present
- Rollback state: valid
- Executable state: blocked
- Blocked reasons: `TENANT_VIOLATION`
- Warnings: none
- Errors: tenant violation error expected
- Governance summary: tenant violating / blocked
- Outcome: `PASS`

## rollback-invalid-chain.json
- Purpose: invalid rollback for risky action
- Final readiness: `blocked`
- Capability state: declared, registry known
- Provider state: available, version valid
- Binding state: validated
- Trust state: valid
- Approval state: present
- Rollback state: invalid
- Executable state: blocked
- Blocked reasons: `ROLLBACK_POLICY_INVALID`
- Warnings: none
- Errors: rollback invalid error expected
- Governance summary: rollback invalid / blocked
- Outcome: `PASS`

## provider-missing-chain.json
- Purpose: missing provider blocks chain
- Final readiness: `blocked`
- Capability state: declared, registry known
- Provider state: missing
- Binding state: absent
- Trust state: valid
- Approval state: required but not sufficient
- Rollback state: absent/mixed
- Executable state: blocked
- Blocked reasons: `PROVIDER_MISSING`
- Warnings: none
- Errors: provider missing error expected
- Governance summary: provider missing / blocked
- Outcome: `PASS`

## capability-unknown-chain.json
- Purpose: unknown capability remains blocked in preview
- Final readiness: `blocked`
- Capability state: declared, registry missing
- Provider state: absent
- Binding state: absent
- Trust state: valid
- Approval state: absent
- Rollback state: absent/mixed
- Executable state: blocked
- Blocked reasons: `CAPABILITY_UNKNOWN`
- Warnings: unknown capability warning expected
- Errors: none required
- Governance summary: provider missing / blocked
- Outcome: `PASS`
