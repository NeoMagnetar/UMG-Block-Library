# UMG Tool Runtime Resolver Preview v0.1

**Document ID:** `UMG_TOOL_RUNTIME_RESOLVER_PREVIEW.v0.1`  
**Status:** Non-executing resolver design stage  
**Layer:** Resolver preview taxonomy / RuntimeSpec preview extension / cross-schema validation / blocked-reason model  
**Depends on:** `UMG_TOOL_RUNTIME_ARTIFACTS.v0.1`, `UMG_TOOL_CONTRACT.v0.1`, `runtime-spec.schema.json`, `trace.schema.json`, `capability.schema.json`, `toolpack.schema.json`, `tool-binding.schema.json`, `sleeve-runtime-governance.schema.json`, `trust-registry.schema.json`, `approval-token.schema.json`, `rollback-taxonomy.schema.json`  
**Feeds into:** future resolver preview implementation, future RuntimeSpec preview schema extension, future validation trace extension  

---

## 1. Summary

This document defines the non-executing resolver preview model for UMG Tool Runtime.

Resolver preview exists to answer questions like:
- is the declared capability chain structurally valid?
- is a provider known?
- is a binding present and valid?
- does trust policy permit possible execution?
- would approval be required, present, missing, expired, or revoked?
- would the workflow remain preview-only, dry-run-only, or potentially executable under future gated runtime conditions?

Resolver preview must not:
- execute tools
- request live approvals
- mutate runtime state
- bypass OpenClaw gating
- imply execution permission from structural validity

Core principle:

```text
Resolver preview validates possibility, not permission.
```

Governance supremacy remains absolute.

---

## 2. Resolver State Taxonomy

Resolver preview should model runtime readiness as explicit state dimensions rather than a single boolean.

### Capability state
Possible values:
- `declared`
- `registry_known`
- `registry_missing`

Meaning:
- `declared` = the sleeve or runtime-governance artifact names the capability
- `registry_known` = a capability registry artifact exists and validates structurally
- `registry_missing` = no capability registry artifact is found even though the capability is declared

### Trust state
Possible values:
- `trust_valid`
- `trust_blocked`

Meaning:
- `trust_valid` = a trust tier exists and does not hard-block the requested mode/path
- `trust_blocked` = trust policy forbids the chain from advancing

### Provider state
Possible values:
- `provider_available`
- `provider_missing`
- `provider_version_valid`
- `provider_version_invalid`

Meaning:
- `provider_available` = at least one matching toolpack/provider is present in the static chain
- `provider_missing` = no matching provider exists in the validated chain
- `provider_version_valid` = provider version satisfies declared compatibility constraints
- `provider_version_invalid` = provider exists but fails compatibility/version expectations

### Binding state
Possible values:
- `binding_present`
- `binding_validated`
- `binding_invalid`

Meaning:
- `binding_present` = candidate binding artifact exists
- `binding_validated` = binding passes cross-schema checks and policy consistency checks
- `binding_invalid` = binding exists but is structurally or governably inconsistent

### Approval state
Possible values:
- `approval_required`
- `approval_present`
- `approval_missing`
- `approval_expired`
- `approval_revoked`

Meaning:
- `approval_required` = the chain is executable only with a valid approval artifact
- `approval_present` = matching approval token exists structurally and is not revoked/expired by static data rules
- `approval_missing` = required approval artifact is absent
- `approval_expired` = approval artifact exists but indicates expiry
- `approval_revoked` = approval artifact exists but is revoked

### Execution readiness state
Possible values:
- `executable`
- `dry_run_only`
- `blocked_reason`

Meaning:
- `executable` = the chain is structurally compatible with a future gated execution path; this is not live permission
- `dry_run_only` = the chain may be previewed or dry-run validated but not approved for execution readiness
- `blocked_reason` = one or more governance failures prevent execution readiness

Important rule:
- `executable` in preview means **execution could be structurally allowed if runtime gate, human approval, and real provider surfaces all pass later**
- it does **not** mean “run now”

---

## 3. RuntimeSpec Preview Extension

The current RuntimeSpec schema should remain execution-neutral, but preview output should add a structured governance/status extension.

Recommended additional preview fields:
- `capability_state`
- `provider_state`
- `binding_state`
- `trust_state`
- `approval_state`
- `rollback_state`
- `executable_state`

### Proposed RuntimeSpec Preview shape

```json
{
  "runtime_spec_preview_version": "0.1",
  "runtime_spec_id": "RSP.PREVIEW.EXAMPLE.0001",
  "source_ir_id": "IR.EXAMPLE.0001",
  "active_sleeve": "SLV.BUSINESS.RUNTIME_TEMPLATE.v1",
  "execution_mode_requested": "approved_execute",
  "capability_state": [],
  "provider_state": [],
  "binding_state": [],
  "trust_state": [],
  "approval_state": [],
  "rollback_state": [],
  "executable_state": {},
  "warnings": [],
  "errors": [],
  "blocked_reasons": [],
  "governance_summary": {}
}
```

### capability_state entry

```json
{
  "capability_id": "CAP.DESKTOP.UI.CLICK.v1",
  "declared": true,
  "registry_state": "registry_known",
  "risk_level": "high",
  "blocked_by_default": true,
  "allowed_modes": ["assisted", "approved_execute"]
}
```

### provider_state entry

```json
{
  "capability_id": "CAP.DESKTOP.UI.CLICK.v1",
  "toolpack_id": "TP.OPENCLAW.DESKTOP_BRIDGE.v1",
  "provider_state": "provider_available",
  "version_state": "provider_version_valid"
}
```

### binding_state entry

```json
{
  "binding_id": "BIND.DESKTOP.UI.CLICK.v1",
  "capability_id": "CAP.DESKTOP.UI.CLICK.v1",
  "tool_provider": "TP.OPENCLAW.DESKTOP_BRIDGE.v1",
  "binding_state": "binding_validated",
  "allowed_modes": ["assisted", "approved_execute"],
  "failure_policy": "fail_closed"
}
```

### trust_state entry

```json
{
  "trust_tier_id": "TRUST.BUSINESS_VERIFIED",
  "trust_state": "trust_valid",
  "tenant_binding_required": true,
  "tenant_bound": true
}
```

### approval_state entry

```json
{
  "capability_id": "CAP.DESKTOP.UI.CLICK.v1",
  "binding_id": "BIND.DESKTOP.UI.CLICK.v1",
  "approval_state": "approval_missing",
  "approval_required": true
}
```

### rollback_state entry

```json
{
  "binding_id": "BIND.DESKTOP.UI.CLICK.v1",
  "rollback_policy_id": "manual_only",
  "rollback_state": "valid"
}
```

### executable_state object

```json
{
  "state": "blocked_reason",
  "mode_limit": "dry_run_only",
  "blocked_reasons": ["APPROVAL_MISSING"]
}
```

---

## 4. Cross-Schema Validation Rules

Resolver preview should not only validate each artifact individually; it should validate the chain between them.

### capability ↔ toolpack
Rule:
- every required sleeve capability should either:
  - resolve to a known capability registry artifact, or
  - be marked `registry_missing`
- if a provider is claimed, the capability ID must appear in the toolpack’s `provided_capabilities`

Validation result patterns:
- capability declared + provider listed in capability + toolpack provides capability = valid provider chain candidate
- capability declared + no matching toolpack provides it = provider missing

### toolpack ↔ binding
Rule:
- each binding’s `tool_provider` must match a declared or referenced toolpack
- each binding’s `openclaw_tool_id` should appear in the toolpack’s declared tool surfaces
- binding mode/risk/approval rules must not conflict with toolpack-level constraints

Examples:
- binding says `approved_execute`, toolpack supports only `preview`/`dry_run` = invalid
- binding says no approval for critical action, toolpack says human approval required = invalid

### sleeve ↔ capabilities
Rule:
- every `required_capabilities` entry must be present in either:
  - sleeve declarations
  - runtime-governance approved/required capability sets
- preview should detect:
  - undeclared capability references
  - approved capability entries that are not allowed by trust/tenant model

### sleeve ↔ toolpacks
Rule:
- preferred toolpacks should be compatible candidates
- allowed toolpacks must not intersect blocked toolpacks
- a selected provider toolpack must be both:
  - structurally present
  - permitted by tenant boundary and trust tier

### approval token ↔ binding
Rule:
- approval token must match:
  - `capability_id`
  - `toolpack_id`
  - `tool_binding_id`
  - execution mode
  - tenant id
  - sleeve id
- approval tokens must never be treated as global execution authority

### tenant ↔ business sleeve
Rule:
- sleeve business profile tenant ID must match tenant boundary tenant ID
- approval token tenant ID must match the same tenant
- provider/binding target constraints must stay inside allowed roots/apps/toolpacks for that tenant

### trust tier ↔ provider
Rule:
- provider/toolpack trust classification must satisfy trust registry requirements
- if trust tier is `TRUST.BLOCKED`, no execution-ready chain may survive
- if trust tier is `TRUST.EXPERIMENTAL`, approved_execute should not be preview-executable
- if trust tier is `TRUST.BUSINESS_VERIFIED`, tenant binding must be present and valid

---

## 5. Blocked Reason Taxonomy

Blocked reasons should be explicit, machine-readable, and stable.

Recommended set:
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

### Meaning examples

#### CAPABILITY_UNKNOWN
A capability appears in sleeve/runtime governance but no known schema-governed identity is recognized.

#### TRUST_BLOCKED
Trust registry forbids the requested chain from progressing.

#### PROVIDER_MISSING
No toolpack provides the required capability.

#### PROVIDER_VERSION_INVALID
Provider exists but does not satisfy compatibility requirements.

#### BINDING_INVALID
A binding exists but contradicts provider/tool/risk/mode policy.

#### APPROVAL_MISSING
A required approval token is absent.

#### APPROVAL_EXPIRED
Approval token exists but expiry makes it invalid.

#### TENANT_VIOLATION
Requested provider/tool/target/path/app conflicts with tenant boundary rules.

#### EXECUTION_MODE_BLOCKED
Requested execution mode is not allowed by sleeve/toolpack/trust/binding rules.

#### ROLLBACK_POLICY_INVALID
Rollback taxonomy is inconsistent with risk or side-effect level.

---

## 6. Preview Output Contracts

Resolver preview should emit a structured output bundle, not a single pass/fail flag.

### A. RuntimeSpec Preview
Primary structural readiness output.

Should include:
- requested execution mode
- capability state entries
- provider state entries
- binding state entries
- trust state entries
- approval state entries
- rollback state entries
- executable state summary

### B. Validation Trace
A non-executing trace of preview decisions.

Each event should explain:
- what artifact was checked
- what rule was applied
- what result was produced
- what downstream state changed

Suggested event types:
- `capability.declared`
- `capability.registry_known`
- `capability.registry_missing`
- `provider.found`
- `provider.missing`
- `binding.validated`
- `binding.invalid`
- `trust.valid`
- `trust.blocked`
- `approval.required`
- `approval.present`
- `approval.missing`
- `approval.expired`
- `approval.revoked`
- `tenant.valid`
- `tenant.violation`
- `rollback.valid`
- `rollback.invalid`
- `preview.executable_state`

### C. Warnings
Warnings should capture degraded but non-fatal states, such as:
- capability registry missing while provider chain still known
- optional provider missing
- approval absent in non-executing preview mode

### D. Errors
Errors should capture structural invalidity, such as:
- malformed binding
- invalid trust declaration
- tenant mismatch
- contradictory provider/toolpack chain

### E. Blocked reasons
Blocked reasons should be emitted in machine-readable stable tokens using the taxonomy above.

### F. Governance summary
A compact human-auditable summary should answer:
- what was declared
- what providers were found
- what trust tier applied
- what approvals would be required
- whether the chain is preview-only, dry-run-only, or structurally executable pending future gated approval

---

## 7. Preview Resolution Ordering

Resolver preview should run in a deterministic order.

Recommended order:
1. validate sleeve/runtime-governance structure
2. collect declared required and optional capabilities
3. resolve capability registry presence
4. resolve matching toolpack providers
5. validate provider compatibility and version
6. validate binding presence and consistency
7. validate trust registry compatibility
8. validate tenant boundary compatibility
9. validate approval token structure and match state
10. validate rollback policy compatibility
11. derive warnings, errors, blocked reasons
12. derive executable state summary

This ordering helps isolate which layer caused blockage.

---

## 8. Executable State Derivation Rules

Resolver preview should derive final execution-readiness carefully.

### executable
May be emitted only when all are true:
- capability declared
- provider available
- provider version valid
- binding validated
- trust valid
- tenant valid
- approval present when required
- rollback valid
- requested mode allowed

Even then:
- this remains preview-only structural readiness
- real runtime execution still requires OpenClaw gating

### dry_run_only
Should be emitted when:
- declaration/provider/binding chain is mostly valid
- but approval, trust tier, or policy keeps the chain below execution readiness
- or requested mode is `preview`/`dry_run`

### blocked_reason
Should be emitted when:
- one or more hard governance or structural blockers exist
- a stable blocked-reason token is available

---

## 9. Governance Boundary

Resolver preview must never collapse validation into authority.

Rules:
- structural validity is not permission
- provider presence is not permission
- approval token presence is not permission bypass
- executable preview state is not live execution permission
- OpenClaw gating remains the final authority

Short form:

```text
Preview may say possible.
Only runtime gate may say permitted.
```

---

## 10. No-Implementation Boundary

This document does **not**:
- implement resolver logic
- patch Envoy runtime
- patch plugin code
- patch compiler code
- activate Desktop Bridge
- activate PhaseBridge
- request approvals live
- mutate runtime state
- execute sleeves or tools

It defines the preview-state model only.
