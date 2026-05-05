# TOOL-RUNTIME-12 Narrative Templates

## Files created
- `META/TOOL-RUNTIME-12-SEVERITY-TAXONOMY.md`
- `AI/EXAMPLES/reporting/dashboard-component-glossary.example.json`
- `AI/EXAMPLES/reporting/enterprise-narrative-templates.example.json`
- `AI/EXAMPLES/reporting/compliance-narrative-templates.example.json`
- `AI/EXAMPLES/reporting/dashboard-to-harness-field-dictionary.example.json`

## Severity taxonomy scope
Defines shared severity meaning across technical, user-facing, enterprise, and compliance/audit surfaces.

## Glossary scope
Defines canonical dashboard component language so UI and reporting terms remain consistent.

## Enterprise template scope
Provides reusable narrative templates for preview-only, dry-run-only, pending-gate, blocked, mismatch-note, and terminal-violation outcomes.

## Compliance template scope
Provides compliance-oriented wording for common blocked-reason conditions and evidence/remediation/escalation expectations.

## Field dictionary scope
Maps dashboard/report terminology to harness result, RuntimeSpec preview, trace, blocked reason, enterprise report, and audit export fields.

## Security boundary preserved
This phase remains static only:
- no execution
- no provider activation
- no bridge invocation
- no runtime code changes
- no release mutation

## Recommended next phase
A clean next static phase would be:
- governance language style guide
- report section prose variants
- compliance evidence checklist examples
- dashboard/report localization readiness note
