# TOOL-RUNTIME-5 Cross-Schema Validation Pack

## Purpose
This pack defines expected validation outcomes for the runtime preview fixtures created in TOOL-RUNTIME-4.

It exists to support future:
- resolver preview implementation
- fixture validation harnesses
- regression review
- governance audits

This pack defines **expected outcomes only**.
It does not implement resolver behavior or authorize execution.

---

## Validation result contract
For each fixture, the expected result set should specify:
- fixture name
- purpose
- expected final readiness
- expected capability state
- expected provider state
- expected binding state
- expected trust state
- expected approval state
- expected rollback state
- expected executable state
- expected blocked reasons
- expected warnings
- expected errors
- expected governance summary
- expected pass/fail outcome

---

## Fixture expectations

### 1. valid-preview-only-chain.json
- **purpose:** prove that a simple preview-safe read-only chain can validate structurally without blockers
- **expected final readiness:** `preview_only`
- **expected capability_state:** one declared capability, registry known
- **expected provider_state:** provider available, version valid
- **expected binding_state:** binding validated
- **expected trust_state:** trust valid
- **expected approval_state:** no approval required in effect
- **expected rollback_state:** valid with `none`
- **expected executable_state:** should align to preview-only semantics
- **expected blocked_reasons:** none
- **expected warnings:** none
- **expected errors:** none
- **expected governance_summary:** provider complete / trust valid / tenant compliant / final readiness `preview_only`
- **expected pass/fail outcome:** `PASS_WITH_MISMATCH_NOTE`

Important note:
- current fixture contains `executable_state.state = dry_run_only` while governance summary says `preview_only`
- pack expectation treats this as an intentional mismatch to be flagged by future validation tooling rather than silently normalized

### 2. dry-run-only-chain.json
- **purpose:** prove that a valid chain can remain dry-run-only when approval is required but absent
- **expected final readiness:** `dry_run_only`
- **expected capability_state:** declared / registry known
- **expected provider_state:** available / version valid
- **expected binding_state:** validated
- **expected trust_state:** valid with tenant binding true
- **expected approval_state:** `approval_missing`
- **expected rollback_state:** valid
- **expected executable_state:** `dry_run_only`
- **expected blocked_reasons:** `APPROVAL_MISSING`
- **expected warnings:** one warning about missing execution approval
- **expected errors:** none
- **expected governance_summary:** trust valid / approval required / rollback valid / tenant compliant / final readiness `dry_run_only`
- **expected pass/fail outcome:** `PASS`

### 3. blocked-trust-chain.json
- **purpose:** prove that trust policy can hard-block an otherwise structurally complete chain
- **expected final readiness:** `blocked`
- **expected capability_state:** declared / registry known
- **expected provider_state:** available / version valid
- **expected binding_state:** validated
- **expected trust_state:** `trust_blocked`
- **expected approval_state:** approval required
- **expected rollback_state:** valid
- **expected executable_state:** blocked
- **expected blocked_reasons:** `TRUST_BLOCKED`
- **expected warnings:** none
- **expected errors:** trust-blocking error present
- **expected governance_summary:** trust blocked / final readiness `blocked`
- **expected pass/fail outcome:** `PASS`

### 4. expired-approval-chain.json
- **purpose:** prove that an expired approval blocks readiness even when provider and binding are valid
- **expected final readiness:** `blocked`
- **expected capability_state:** declared / registry known
- **expected provider_state:** available / version valid
- **expected binding_state:** validated
- **expected trust_state:** valid
- **expected approval_state:** `approval_expired`
- **expected rollback_state:** valid
- **expected executable_state:** blocked
- **expected blocked_reasons:** `APPROVAL_EXPIRED`
- **expected warnings:** none
- **expected errors:** approval-expired error present
- **expected governance_summary:** approval required / final readiness `blocked`
- **expected pass/fail outcome:** `PASS`

### 5. tenant-violation-chain.json
- **purpose:** prove tenant boundary enforcement overrides approval/provider readiness
- **expected final readiness:** `blocked`
- **expected capability_state:** declared / registry known
- **expected provider_state:** available / version valid
- **expected binding_state:** validated
- **expected trust_state:** valid
- **expected approval_state:** present
- **expected rollback_state:** valid
- **expected executable_state:** blocked
- **expected blocked_reasons:** `TENANT_VIOLATION`
- **expected warnings:** none
- **expected errors:** tenant-violation error present
- **expected governance_summary:** tenant compliance `violating` / final readiness `blocked`
- **expected pass/fail outcome:** `PASS`

### 6. rollback-invalid-chain.json
- **purpose:** prove rollback invalidity blocks execution readiness for high-risk write capability
- **expected final readiness:** `blocked`
- **expected capability_state:** declared / registry known
- **expected provider_state:** available / version valid
- **expected binding_state:** validated
- **expected trust_state:** valid
- **expected approval_state:** present
- **expected rollback_state:** invalid
- **expected executable_state:** blocked
- **expected blocked_reasons:** `ROLLBACK_POLICY_INVALID`
- **expected warnings:** none
- **expected errors:** rollback-policy error present
- **expected governance_summary:** rollback validity `invalid` / final readiness `blocked`
- **expected pass/fail outcome:** `PASS`

### 7. provider-missing-chain.json
- **purpose:** prove provider absence blocks the chain before binding/execution readiness can exist
- **expected final readiness:** `blocked`
- **expected capability_state:** declared / registry known
- **expected provider_state:** missing / version invalid
- **expected binding_state:** none present
- **expected trust_state:** valid
- **expected approval_state:** approval required but cannot rescue missing provider
- **expected rollback_state:** none present / mixed summary acceptable
- **expected executable_state:** blocked
- **expected blocked_reasons:** `PROVIDER_MISSING`
- **expected warnings:** none
- **expected errors:** provider-missing error present
- **expected governance_summary:** provider availability `missing` / final readiness `blocked`
- **expected pass/fail outcome:** `PASS`

### 8. capability-unknown-chain.json
- **purpose:** prove unknown capability declaration is surfaced as a governed blockage even in preview mode
- **expected final readiness:** `blocked`
- **expected capability_state:** declared / registry missing
- **expected provider_state:** none present
- **expected binding_state:** none present
- **expected trust_state:** valid experimental trust
- **expected approval_state:** none present
- **expected rollback_state:** none present / mixed summary acceptable
- **expected executable_state:** blocked
- **expected blocked_reasons:** `CAPABILITY_UNKNOWN`
- **expected warnings:** warning about unknown capability and missing provider chain
- **expected errors:** none required
- **expected governance_summary:** provider missing / final readiness `blocked`
- **expected pass/fail outcome:** `PASS`

---

## Cross-schema expectation rules

### capability ↔ toolpack
- if provider exists, capability must appear in provider `provided_capabilities`
- unknown capability with no provider should resolve to `CAPABILITY_UNKNOWN` or `CAPABILITY_REGISTRY_MISSING` depending on registry result

### toolpack ↔ binding
- validated bindings require matching provider/tool relationship
- provider missing implies binding cannot be required as present

### sleeve ↔ capabilities
- every declared required capability should appear in capability state
- missing capability registry should not be silently normalized away

### approval token ↔ binding
- approval presence only matters if the provider and binding chain already exists
- expired/revoked approvals should block even if everything else is structurally valid

### tenant ↔ business sleeve
- tenant violations override approval presence

### rollback ↔ binding
- invalid rollback policy blocks execution readiness for high-risk side-effect chains

---

## Known mismatch currently preserved

### valid-preview-only-chain.json
Current fixture inconsistency:
- `governance_summary.final_preview_readiness = preview_only`
- `executable_state.state = dry_run_only`

Validation-pack policy:
- preserve fixture as-is
- mark expected result as `PASS_WITH_MISMATCH_NOTE`
- future harness should flag this as a consistency warning, not silently rewrite the fixture

---

## Outcome classes
Recommended validation outcomes for future harnesses:
- `PASS`
- `PASS_WITH_MISMATCH_NOTE`
- `FAIL_SCHEMA`
- `FAIL_EXPECTATION`
- `FAIL_CONSISTENCY`
