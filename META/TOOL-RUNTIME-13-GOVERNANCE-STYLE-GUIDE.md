# TOOL-RUNTIME-13 Governance Style Guide

## Purpose
This guide standardizes tone, terminology, and phrasing across UMG Tool Runtime dashboard, report, audit, and governance outputs.

It governs communication only.
It does not authorize execution.

---

## Tone rules
- be clear, direct, and non-dramatic
- prefer factual wording over persuasive wording
- describe structural state, not imagined runtime behavior
- distinguish possibility from permission
- prefer stable governance language over informal synonyms

### Good phrasing
- "The chain is structurally valid for preview-only interpretation."
- "Execution remains unauthorized pending runtime gate approval."
- "Trust policy blocks this chain."

### Prohibited phrasing
- "The chain is safe to run now."
- "This action is approved." (unless referring to a bounded approval artifact in a clearly scoped way)
- "The system can just do it."

---

## Wording rules
- use `preview_only`, `dry_run_only`, `structurally_executable_pending_gate`, and `blocked` consistently
- use `blocked reason` for machine-readable blockers, not vague terms like "issue" when a blocked reason exists
- use `approval present` only to describe token presence, never as a synonym for execution permission
- use `provider available` only when a provider chain exists structurally
- use `execution authorized` only when an explicit field says so; otherwise prefer `not authorized`

---

## Severity wording consistency
- `info` = informational state with no active blocker
- `warning` = non-terminal issue or missing prerequisite
- `elevated` = review-needed mismatch or governance concern
- `critical` = strong blocker requiring remediation
- `terminal` = policy-terminal stop condition

Avoid severity inflation.
Do not call everything critical.

---

## Blocked-state wording
Preferred:
- "The chain is blocked by {blocked_reason_code}."
- "Trust policy blocks this chain."
- "Tenant boundary rules are violated."

Avoid:
- "Something went wrong."
- "The chain failed mysteriously."
- "The system rejected it." (without naming the governing reason)

---

## Mismatch wording
Preferred:
- "A known mismatch note is preserved for regression visibility."
- "The fixture contains a documented readiness/executable-state sentinel mismatch."

Avoid:
- "Ignore this mismatch."
- "This mismatch does not matter." 

Mismatch notes should be explained, not dismissed.

---

## Remediation wording
Preferred:
- action-oriented
- bounded
- clearly tied to the blocked reason
- explicit about whether retry is appropriate

Examples:
- "Review the trust registry assignment before retrying."
- "Issue a fresh bounded approval token if policy still permits the action."
- "Restore tenant-compliant roots, apps, and toolpacks before re-evaluation."

Avoid:
- "Fix the issue somehow."
- "Try again later." (unless a real retry condition exists)

---

## Escalation wording
Preferred:
- name the owner or escalation lane
- distinguish retry from escalation
- reserve urgent language for terminal or critical conditions

Examples:
- "Escalate to the governance owner if the trust assignment remains blocked."
- "Escalate immediately to the compliance owner for terminal tenant violations."

Avoid:
- "Escalate everything."
- "Contact support." (too vague for governed internal output)

---

## Enterprise summary tone
- concise
- posture-oriented
- non-alarmist
- decision-useful
- explicit about what is and is not authorized

Good example:
- "The governance pack is structurally complete for static preview validation, but no runtime execution authority is granted."

Bad example:
- "Everything looks great and ready to go."

---

## Compliance summary tone
- evidence-driven
- control-oriented
- explicit about boundary violations
- explicit about required evidence and remediation

Good example:
- "Approval was absent for the evaluated execution path; bounded approval evidence is required before higher readiness is considered."

Bad example:
- "Approval was probably missing."

---

## Prohibited ambiguous terms
Do not use these without clarification:
- safe
- approved
- ready
- valid
- failed
- passed
- allowed
- blocked

Instead, scope them:
- structurally valid
- approval token present
- execution not authorized
- final readiness blocked
- expectation validation passed

---

## Preferred canonical terms
Prefer:
- `preview_only`
- `dry_run_only`
- `structurally_executable_pending_gate`
- `blocked`
- `blocked reason`
- `trust blocked`
- `approval missing`
- `approval expired`
- `tenant violation`
- `rollback invalid`
- `provider missing`
- `capability unknown`
- `execution authorized = false`

---

## Example good phrasing set
- "Structural readiness is present, but execution remains unauthorized."
- "The chain is blocked by a tenant boundary violation."
- "Approval is required and currently missing."
- "A preserved mismatch note remains visible for validation review."

## Example prohibited phrasing set
- "The runtime can probably handle it."
- "This is basically approved."
- "Everything passed, so execution is fine."
- "Ignore the mismatch."

---

## Terminology freeze notes
- governance tokens and blocked reason codes should not be localized or paraphrased in machine-readable output
- readiness state names should remain stable until explicitly versioned
- field names should not drift across dashboard, harness, report, and audit surfaces
- human-facing prose may vary by audience, but canonical terms must remain recognizable
