# TOOL-RUNTIME-3 Resolver Preview Model

## Purpose
This note records the non-executing resolver preview state model for UMG Tool Runtime.

Resolver preview validates possibility, not permission.

## State taxonomy
- `declared`
- `registry_known`
- `registry_missing`
- `trust_valid`
- `trust_blocked`
- `provider_available`
- `provider_missing`
- `provider_version_valid`
- `provider_version_invalid`
- `binding_present`
- `binding_validated`
- `binding_invalid`
- `approval_required`
- `approval_present`
- `approval_missing`
- `approval_expired`
- `approval_revoked`
- `executable`
- `dry_run_only`
- `blocked_reason`

## RuntimeSpec preview extension
Add preview-only structures for:
- `capability_state`
- `provider_state`
- `binding_state`
- `trust_state`
- `approval_state`
- `rollback_state`
- `executable_state`

## Cross-schema validation lanes
- capability ↔ toolpack
- toolpack ↔ binding
- sleeve ↔ capabilities
- sleeve ↔ toolpacks
- approval token ↔ binding
- tenant ↔ business sleeve
- trust tier ↔ provider

## Blocked reasons
- `CAPABILITY_UNKNOWN`
- `CAPABILITY_REGISTRY_MISSING`
- `TRUST_BLOCKED`
- `PROVIDER_MISSING`
- `PROVIDER_VERSION_INVALID`
- `BINDING_MISSING`
- `BINDING_INVALID`
- `APPROVAL_REQUIRED`
- `APPROVAL_MISSING`
- `APPROVAL_EXPIRED`
- `APPROVAL_REVOKED`
- `TENANT_VIOLATION`
- `EXECUTION_MODE_BLOCKED`
- `ROLLBACK_POLICY_INVALID`
- `AUDIT_POLICY_INVALID`
- `TOOLPACK_BLOCKED`
- `TARGET_CONSTRAINT_INVALID`
- `CROSS_SCHEMA_CONFLICT`

## Preview outputs
- RuntimeSpec Preview
- Validation Trace
- Warnings
- Errors
- Blocked reasons
- Governance summary

## Still not implemented
- resolver runtime logic
- provider activation
- approval handling
- desktop or phase execution
- live RuntimeSpec patching
