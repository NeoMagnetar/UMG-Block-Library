# TOOL-RUNTIME-9 Example Reporting Packs

## Files created
- `AI/EXAMPLES/reporting/preview-ui-mapping.example.json`
- `AI/EXAMPLES/reporting/enterprise-report.example.json`
- `AI/EXAMPLES/reporting/audit-export.example.json`
- `AI/EXAMPLES/reporting/sample-harness-result-bundle.json`

## What each example demonstrates
### preview-ui-mapping.example.json
Demonstrates how readiness states, blocked reasons, severities, remediation, mismatch notes, and terminal violations should be displayed in UI surfaces.

### enterprise-report.example.json
Demonstrates an executive-facing summary with fixture inventory, validation outcomes, blocked issues, trust/approval/rollback posture, tenant compliance, remediation roadmap, and risk summary.

### audit-export.example.json
Demonstrates a portable audit package that references the fixture bundle, expected results, validation matrix, trace expectations, harness results, synthetic traces, and consistency failures.

### sample-harness-result-bundle.json
Demonstrates canonical report entries for PASS, PASS_WITH_MISMATCH_NOTE, FAIL_SCHEMA, FAIL_EXPECTATION, and FAIL_CONSISTENCY.

## How examples relate to schemas
- `preview-ui-mapping.example.json` aligns to `AI/SCHEMAS/preview-ui-mapping.schema.json`
- `enterprise-report.example.json` aligns to `AI/SCHEMAS/enterprise-report.schema.json`
- `audit-export.example.json` aligns to `AI/SCHEMAS/audit-export.schema.json`
- harness result entries draw from `AI/SCHEMAS/harness-result-report.schema.json`

## Security boundary preserved
This phase remains example/reporting only:
- no execution
- no provider activation
- no bridge invocation
- no runtime code changes
- no release mutation

## Recommended next phase
A clean next static phase would be:
- example UI screen/state packs
- reporting severity taxonomy note
- governance dashboard section mapping
- audit export example variants for partial vs full scope
