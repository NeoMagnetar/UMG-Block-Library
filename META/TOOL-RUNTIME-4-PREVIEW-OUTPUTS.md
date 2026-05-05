# TOOL-RUNTIME-4 Preview Outputs

## Purpose
This note records the formal preview-output artifacts for UMG Tool Runtime.

Preview outputs formalize structural governance state only.
They do not authorize runtime action.

## New schemas
- `AI/SCHEMAS/runtimespec-preview.schema.json`
- `AI/SCHEMAS/validation-trace-preview.schema.json`
- `AI/SCHEMAS/blocked-reason.schema.json`

## RuntimeSpec Preview fields
- `requested_execution_mode`
- `capability_state`
- `provider_state`
- `binding_state`
- `trust_state`
- `approval_state`
- `rollback_state`
- `executable_state`
- `warnings`
- `errors`
- `blocked_reasons`
- `governance_summary`

## Governance summary format
Must summarize:
- declared capabilities
- provider availability
- trust status
- approval requirements
- rollback validity
- tenant compliance
- final preview readiness

## Mock fixtures
- `AI/EXAMPLES/runtime-preview/valid-preview-only-chain.json`
- `AI/EXAMPLES/runtime-preview/dry-run-only-chain.json`
- `AI/EXAMPLES/runtime-preview/blocked-trust-chain.json`
- `AI/EXAMPLES/runtime-preview/expired-approval-chain.json`
- `AI/EXAMPLES/runtime-preview/tenant-violation-chain.json`
- `AI/EXAMPLES/runtime-preview/rollback-invalid-chain.json`
- `AI/EXAMPLES/runtime-preview/provider-missing-chain.json`
- `AI/EXAMPLES/runtime-preview/capability-unknown-chain.json`

## Still not implemented
- runtime execution
- provider activation
- live approval processing
- Envoy resolver code
- compiler or plugin changes
