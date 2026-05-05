# TOOL-RUNTIME-20 Dependency Health Scoring

## Purpose
This note defines how dependency health scores should be interpreted in the static governance lane.

These score bands describe readiness posture only.
They do not authorize implementation or release.

## Score bands
### 95-100: excellent_static_health
- dependency set is nearly complete and stable
- little or no missing dependency risk remains
- static approval confidence is high
- implementation candidacy still requires explicit authorization and security gate review
- release readiness still remains false while Envoy v0.2.8 triage is active

### 85-94: strong_static_health
- dependency posture is strong with limited remaining issues
- missing dependencies are non-terminal or clearly bounded
- static approval is usually supportable
- implementation candidacy remains gated by explicit authorization and active blockers

### 70-84: review_needed
- dependency posture is usable but incomplete enough to require targeted review
- one or more meaningful gaps remain
- static approval may be delayed until reviewers confirm adequacy
- implementation candidacy should not advance without remediation

### 50-69: remediation_required
- dependency health is materially degraded
- required or high-value dependencies are missing or uncertain
- static approval should generally pause pending remediation
- implementation candidacy is blocked

### 0-49: blocked_dependency_health
- dependency posture is too incomplete or too risky for meaningful progression
- critical or terminal dependency gaps dominate the pack
- static approval is blocked
- implementation candidacy is blocked
- release readiness is blocked

## Missing dependency severity
- optional display-only artifact missing -> typically low
- required example/report/fixture reference missing -> medium to high
- required evidence/checklist/signoff reference missing -> high
- security triage resolution or active constraint clarity missing in release-facing context -> terminal

## Critical dependency rules
A dependency should be considered critical when its absence:
- blocks schema interpretation
- blocks fixture or validation-pack interpretation
- blocks signoff or compliance evidence posture
- prevents coherent governance pack packaging

## Terminal dependency rules
A dependency should be considered terminal when its absence or unresolved state:
- requires policy or security boundary change before progression
- blocks implementation-candidate posture
- blocks release readiness
- activates a terminal escalation threshold

## Remediation expectations
- review-needed band: targeted remediation and recheck
- remediation-required band: corrective action before progression
- blocked-dependency-health band: halt progression until blockers are resolved

## Escalation requirements
- review-needed: owner review usually sufficient
- remediation-required: owner plus governance review likely required
- blocked-dependency-health: escalate to the relevant terminal owner (security, governance, compliance, or release)
