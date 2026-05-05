# TOOL-RUNTIME-12 Severity Taxonomy

## Purpose
This note defines the shared severity language for dashboard, report, and audit surfaces in the UMG Tool Runtime governance stack.

These severities describe governance interpretation only.
They do not authorize execution.

---

## info
- **technical meaning:** Informational state with no active structural or governance blocker.
- **user-facing meaning:** Safe to read as background status or confirming context.
- **enterprise-report meaning:** Healthy posture signal with no immediate action required.
- **compliance/audit meaning:** Evidence of observed state, not a violation.
- **remediation urgency:** low
- **retry guidance:** retry not typically needed
- **escalation guidance:** no escalation required

## warning
- **technical meaning:** Non-terminal issue, missing prerequisite, or degraded state that still allows preview or dry-run interpretation.
- **user-facing meaning:** Attention recommended before advancing readiness.
- **enterprise-report meaning:** Managed issue that should be tracked but does not indicate hard governance failure.
- **compliance/audit meaning:** Condition to document and monitor; not necessarily a control breach.
- **remediation urgency:** medium
- **retry guidance:** retry possible after remediation or clarification
- **escalation guidance:** escalate only if repeated or coupled with other blockers

## elevated
- **technical meaning:** Material mismatch, contradiction, or governance concern requiring reviewer attention.
- **user-facing meaning:** Not immediately terminal, but strong review signal.
- **enterprise-report meaning:** Review-needed issue that may affect confidence in validation results.
- **compliance/audit meaning:** Potential control-quality concern that should be investigated.
- **remediation urgency:** medium-high
- **retry guidance:** retry after explicit review and correction
- **escalation guidance:** escalate to governance reviewer if unresolved

## critical
- **technical meaning:** Strong governance or structural blocker preventing readiness progression.
- **user-facing meaning:** Action blocked until the issue is remediated.
- **enterprise-report meaning:** Significant blocker affecting operational readiness and risk posture.
- **compliance/audit meaning:** Control failure or material noncompliance candidate needing remediation evidence.
- **remediation urgency:** high
- **retry guidance:** retry only after remediation
- **escalation guidance:** escalate to owner or operator responsible for the blocked layer

## terminal
- **technical meaning:** Policy-terminal violation that cannot be retried without policy, trust, or configuration change.
- **user-facing meaning:** Stop condition; do not continue under current governance posture.
- **enterprise-report meaning:** Immediate governance stop state requiring ownership attention and likely decision-level review.
- **compliance/audit meaning:** High-severity control boundary breach or explicitly prohibited path.
- **remediation urgency:** immediate
- **retry guidance:** no retry unless policy or boundary conditions change
- **escalation guidance:** escalate immediately to governance, security, or compliance owner
