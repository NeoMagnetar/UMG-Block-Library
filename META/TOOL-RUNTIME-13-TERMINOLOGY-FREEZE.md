# TOOL-RUNTIME-13 Terminology Freeze

## Purpose
Freeze canonical terminology before runtime implementation begins so dashboard, report, audit, and governance outputs do not drift.

## Canonical terms
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
- `execution_authorized`

## Synonyms allowed
- preview-only ↔ `preview_only`
- dry-run-only ↔ `dry_run_only`
- pending runtime gate ↔ `structurally_executable_pending_gate`
- blocked reason ↔ blocker reason (human-facing only, not machine-facing)

## Synonyms prohibited
- safe (when meaning merely preview-valid)
- approved (when meaning approval-present but not execution-authorized)
- ready (without specifying readiness class)
- valid (without specifying structural vs governance vs schema validity)
- failure (without naming the blocked reason or violated rule)

## Localization readiness notes
- machine-readable tokens should not be translated
- blocked reason codes must remain exact
- severity tokens should remain stable even if display labels are localized
- readiness state codes should remain exact in machine-readable artifacts

## Field naming freeze
Freeze canonical field names across artifacts unless explicitly versioned:
- `final_readiness`
- `blocked_reasons`
- `approval_state`
- `trust_state`
- `provider_state`
- `rollback_state`
- `execution_authorized`

## UI label freeze
Prefer stable UI labels:
- Preview Only
- Dry Run Only
- Pending Runtime Gate
- Blocked
- Blocked Reasons
- Remediation Guidance
- Audit Export

## Compliance wording freeze
Prefer:
- control boundary
- evidence required
- remediation required
- escalation required
- no execution authorized

## Enterprise wording freeze
Prefer:
- readiness posture
- governance posture
- remediation roadmap
- risk summary
- blocked issue summary
