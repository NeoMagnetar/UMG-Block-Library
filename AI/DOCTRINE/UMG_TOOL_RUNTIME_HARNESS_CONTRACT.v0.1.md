# UMG Tool Runtime Harness Contract v0.1

**Document ID:** `UMG_TOOL_RUNTIME_HARNESS_CONTRACT.v0.1`  
**Status:** Static harness-contract design  
**Layer:** Resolver input bundle / validation runner semantics / pass-fail classification / consistency checks / fixture-to-trace expectations  
**Depends on:** `UMG_TOOL_RUNTIME_VALIDATION_PACK.v0.1`, TOOL-RUNTIME-4 preview schemas, TOOL-RUNTIME-5 validation pack, active security triage boundary for Envoy Agent v0.2.8  
**Feeds into:** future non-executing resolver harness implementation, regression runner design, cross-schema audit tooling  

---

## 1. Summary

This document defines the contract for a future non-executing resolver validation harness.

The harness is not a runtime executor.
It is a structural validation runner that consumes schema-governed artifacts and fixture expectations, then reports:
- schema validity
- expectation matches/mismatches
- consistency notes
- trace completeness
- final pass/fail classification

This harness must remain within the active security triage boundary.

It must not:
- execute tools
- activate providers
- invoke Desktop Bridge
- invoke PhaseBridge
- invoke compiler bridge
- request live approvals
- mutate runtime state
- publish packages

Core rule:

```text
Harness validates structure, expectations, and governance consistency.
Harness does not exercise runtime power.
```

---

## 2. Resolver Input Bundle Shape

A future harness should operate on an explicit input bundle, not on ambient repo assumptions.

Recommended input bundle shape:

```json
{
  "bundle_version": "0.1",
  "fixture_id": "valid-preview-only-chain.json",
  "preview_fixture_path": "AI/EXAMPLES/runtime-preview/valid-preview-only-chain.json",
  "expected_result_path": "AI/EXAMPLES/runtime-preview/EXPECTED_RESULTS.md",
  "validation_matrix_path": "AI/EXAMPLES/runtime-preview/validation-matrix.json",
  "schema_set": {
    "runtimespec_preview": "AI/SCHEMAS/runtimespec-preview.schema.json",
    "validation_trace_preview": "AI/SCHEMAS/validation-trace-preview.schema.json",
    "blocked_reason": "AI/SCHEMAS/blocked-reason.schema.json"
  },
  "governance_artifacts": {
    "capability_schema": "AI/SCHEMAS/capability.schema.json",
    "toolpack_schema": "AI/SCHEMAS/toolpack.schema.json",
    "tool_binding_schema": "AI/SCHEMAS/tool-binding.schema.json",
    "sleeve_runtime_governance_schema": "AI/SCHEMAS/sleeve-runtime-governance.schema.json",
    "trust_registry_schema": "AI/SCHEMAS/trust-registry.schema.json",
    "approval_token_schema": "AI/SCHEMAS/approval-token.schema.json",
    "rollback_taxonomy_schema": "AI/SCHEMAS/rollback-taxonomy.schema.json"
  },
  "runner_mode": "static_validation_only",
  "security_mode": "no_execution",
  "notes": "No provider activation. No runtime mutation."
}
```

### Required bundle rules
- every run must identify exactly one preview fixture under test
- every run must point to the expected-result contract
- every run must identify the schema set used for validation
- runner mode must remain `static_validation_only`
- security mode must remain `no_execution`

---

## 3. Validation Runner Behavior

A future harness should run in deterministic phases.

### Phase 1 — fixture load
- load preview fixture JSON
- confirm path and fixture identity
- confirm fixture is one of the recognized governed samples

### Phase 2 — schema validation
- validate the preview fixture against `runtimespec-preview.schema.json`
- validate each embedded blocked reason against `blocked-reason.schema.json`
- if trace fixture exists, validate against `validation-trace-preview.schema.json`

### Phase 3 — expectation lookup
- load the expected-result entry for the fixture
- load validation matrix entry for machine-readable expectations

### Phase 4 — semantic comparison
Compare:
- final preview readiness
- capability state classes
- provider state classes
- binding state classes
- trust state classes
- approval state classes
- rollback state classes
- executable state class
- blocked reasons
- warning presence/absence
- error presence/absence
- governance summary fields

### Phase 5 — consistency checks
Check internal consistency of the preview fixture itself, such as:
- executable state vs governance summary readiness
- blocked reasons in executable state vs top-level blocked reason objects
- provider missing vs binding presence contradictions
- trust blocked vs final readiness contradictions
- approval expired/revoked vs approval present contradictions

### Phase 6 — trace expectation checks
If a trace exists or is simulated by expectation:
- ensure expected event classes are present
- ensure blocked reason severity and event order are plausible
- ensure terminal event matches final readiness

### Phase 7 — outcome classification
Return one of:
- `PASS`
- `PASS_WITH_MISMATCH_NOTE`
- `FAIL_SCHEMA`
- `FAIL_EXPECTATION`
- `FAIL_CONSISTENCY`

---

## 4. Pass / Fail Semantics

### PASS
Use when:
- fixture is schema-valid
- expected result matches
- no material internal consistency problems exist

### PASS_WITH_MISMATCH_NOTE
Use when:
- fixture is schema-valid
- expected result is mostly correct
- a known preserved inconsistency exists and is already documented in the validation pack

Current example:
- `valid-preview-only-chain.json`

### FAIL_SCHEMA
Use when:
- fixture fails `runtimespec-preview.schema.json`
- embedded blocked reason objects fail `blocked-reason.schema.json`
- trace output fails `validation-trace-preview.schema.json`

### FAIL_EXPECTATION
Use when:
- fixture is schema-valid
- but does not match the locked expected result set
- and the mismatch is not an approved preserved inconsistency

### FAIL_CONSISTENCY
Use when:
- fixture is schema-valid
- but contains internally contradictory governance state that the harness should not normalize away

Examples:
- provider missing while binding validated
- trust blocked while final readiness claims structurally executable pending gate
- approval revoked while executable_state is emitted as executable

---

## 5. Consistency-Check Semantics

A future harness should perform explicit consistency checks.

### readiness consistency
- `governance_summary.final_preview_readiness` must align with `executable_state`
- allowed exception: documented preserved mismatch fixtures

### provider-binding consistency
- if provider state is `provider_missing`, binding state should not require validated binding presence
- if provider version is invalid, executable state should not be structurally executable pending gate

### trust consistency
- if trust is blocked, final readiness must be `blocked`

### approval consistency
- if approval state is `approval_expired` or `approval_revoked`, final readiness must not be structurally executable pending gate
- if approval state is `approval_missing` in a high-risk execute path, dry-run-only or blocked is expected

### rollback consistency
- if rollback state is invalid for a risky action chain, final readiness must be `blocked`

### blocked-reason consistency
- top-level blocked reason objects must align with executable-state blocked reason tokens
- human-readable blocked reason summaries should align with category and severity

---

## 6. Fixture-to-Trace Expectations

A future harness should know what trace classes are expected for each fixture.

### valid-preview-only-chain.json
Expected event families:
- `capability.declared`
- `capability.registry_known`
- `provider.found`
- `binding.validated`
- `trust.valid`
- `rollback.valid`
- `preview.executable_state`

Expected terminal interpretation:
- preview-safe, not blocked
- consistency note may be emitted for readiness mismatch sentinel

### dry-run-only-chain.json
Expected event families:
- `capability.declared`
- `capability.registry_known`
- `provider.found`
- `binding.validated`
- `trust.valid`
- `approval.missing`
- `rollback.valid`
- `preview.executable_state`

Expected terminal interpretation:
- dry-run-only due to missing approval

### blocked-trust-chain.json
Expected event families:
- `capability.declared`
- `provider.found`
- `binding.validated`
- `trust.blocked`
- `preview.executable_state`

Expected terminal interpretation:
- blocked by trust before approval/runtime readiness matters

### expired-approval-chain.json
Expected event families:
- `capability.declared`
- `provider.found`
- `binding.validated`
- `trust.valid`
- `approval.expired`
- `rollback.valid`
- `preview.executable_state`

Expected terminal interpretation:
- blocked by expired approval

### tenant-violation-chain.json
Expected event families:
- `capability.declared`
- `provider.found`
- `binding.validated`
- `trust.valid`
- `approval.present`
- `tenant.violation`
- `rollback.valid`
- `preview.executable_state`

Expected terminal interpretation:
- blocked by tenant violation

### rollback-invalid-chain.json
Expected event families:
- `capability.declared`
- `provider.found`
- `binding.validated`
- `trust.valid`
- `approval.present`
- `rollback.invalid`
- `preview.executable_state`

Expected terminal interpretation:
- blocked by rollback invalidity

### provider-missing-chain.json
Expected event families:
- `capability.declared`
- `provider.invalid` or provider-missing equivalent
- `preview.executable_state`

Expected terminal interpretation:
- blocked by provider missing
- no validated binding expected

### capability-unknown-chain.json
Expected event families:
- `capability.declared`
- `capability.registry_missing`
- `preview.executable_state`

Expected terminal interpretation:
- blocked by capability unknown

---

## 7. Harness Output Contract

A future harness should emit a static report shape like:

```json
{
  "harness_run_id": "HARNESS.RUNTIME.PREVIEW.0001",
  "fixture": "valid-preview-only-chain.json",
  "schema_result": "PASS",
  "expectation_result": "PASS_WITH_MISMATCH_NOTE",
  "consistency_result": "PASS_WITH_MISMATCH_NOTE",
  "trace_result": "NOT_RUN" ,
  "final_outcome": "PASS_WITH_MISMATCH_NOTE",
  "notes": []
}
```

Suggested result enums:
- `PASS`
- `PASS_WITH_MISMATCH_NOTE`
- `FAIL_SCHEMA`
- `FAIL_EXPECTATION`
- `FAIL_CONSISTENCY`
- `NOT_RUN`

---

## 8. Security Triage Boundary

This harness contract is constrained by the active Envoy Agent v0.2.8 security/reputation triage boundary.

Therefore the harness must never:
- execute tools
- spawn runtime bridges
- invoke Desktop Bridge
- invoke PhaseBridge
- invoke compiler bridge
- mutate runtime state
- request live approval
- publish packages

Security triage gates release and execution.
It does not block static harness design.

---

## 9. Governance Boundary

Harness validation is not execution permission.

Rules:
- schema validity is not permission
- expectation match is not permission
- structural readiness is not permission
- approval token presence in a fixture is not runtime approval bypass
- OpenClaw gating remains final authority

---

## 10. Next Phase

A reasonable next static phase after this contract would be:
- harness report schema drafting
- synthetic trace fixture drafting
- consistency-rule catalog formalization

But none of that should begin unless explicitly authorized.
