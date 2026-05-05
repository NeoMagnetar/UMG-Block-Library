# UMG Tool Runtime Validation Pack v0.1

**Document ID:** `UMG_TOOL_RUNTIME_VALIDATION_PACK.v0.1`  
**Status:** Expected-outcome doctrine  
**Layer:** Fixture expectation / cross-schema validation outcome / harness-ready governance reference  
**Depends on:** TOOL-RUNTIME-4 preview schemas and fixtures  
**Feeds into:** future resolver harnesses, regression packs, consistency audits  

---

## 1. Summary

This doctrine locks the expected outcomes for the TOOL-RUNTIME-4 preview fixtures.

It exists so future resolver preview implementations can be checked against:
- stable governance expectations
- stable blocked-reason taxonomy
- stable final readiness classes
- stable warning/error posture

This document does **not** implement resolver behavior.
It defines expected interpretation only.

---

## 2. Final readiness classes

Allowed final readiness values:
- `preview_only`
- `dry_run_only`
- `structurally_executable_pending_gate`
- `blocked`

Interpretation:
- `preview_only` = structurally valid but intentionally limited to preview semantics
- `dry_run_only` = structurally valid enough for simulation/planning but not execution readiness
- `structurally_executable_pending_gate` = complete structural chain pending real runtime gate approval
- `blocked` = one or more governance or structural blockers prevent readiness

---

## 3. Fixture expectation principles

### Principle A — provider absence beats approval presence
If provider is missing, approval cannot rescue the chain.

### Principle B — trust block is terminal
If trust is blocked, otherwise valid provider/binding state cannot advance readiness.

### Principle C — tenant violation is terminal
If tenant boundary is violated, approval presence does not make the chain valid.

### Principle D — rollback invalidity blocks risky actions
For high-risk write or action chains, rollback invalidity blocks readiness.

### Principle E — preview mismatch should be surfaced, not hidden
If a fixture’s detailed fields disagree with its governance summary, validation harnesses should report the mismatch rather than normalize it silently.

---

## 4. Known preserved inconsistency

The fixture `valid-preview-only-chain.json` currently contains:
- `governance_summary.final_preview_readiness = preview_only`
- `executable_state.state = dry_run_only`

This pack preserves that mismatch intentionally as a regression sentinel.

Expected harness behavior:
- mark fixture interpretation as usable
- flag consistency note
- do not silently rewrite the fixture

---

## 5. Expected outcome classes

Suggested harness outcome labels:
- `PASS`
- `PASS_WITH_MISMATCH_NOTE`
- `FAIL_SCHEMA`
- `FAIL_EXPECTATION`
- `FAIL_CONSISTENCY`

---

## 6. Governance boundary

Expected outcomes do not:
- authorize execution
- grant approval
- activate providers
- bypass OpenClaw gating

They define what a compliant preview system should report.
