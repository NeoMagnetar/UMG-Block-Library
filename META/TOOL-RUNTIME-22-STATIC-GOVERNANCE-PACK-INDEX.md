# TOOL-RUNTIME-22 — Static Governance Pack Index

## Purpose

This index consolidates TOOL-RUNTIME-1 through TOOL-RUNTIME-21 into a single navigable reference for the UMG Tool Runtime static governance stack.

It is an index and cross-reference surface only.
It does not implement runtime behavior, authorize execution, or change release posture.

---

## Governing doctrine

```text
Sleeves declare.
Toolpacks provide.
Envoy validates.
OpenClaw gates execution.
```

Preserved governance rules:
- static readiness never equals implementation approval
- implementation candidate never equals implementation authorized
- release readiness never equals release authorized
- structural validity is not permission
- provider presence is not permission
- approval token presence is not permission bypass
- preview may say possible
- only runtime gate may say permitted

---

## Active security boundary

Envoy Agent v0.2.8 ClawHub/VirusTotal triage remains active.

Carry-forward constraints:
- no `umg-envoy-agent` v0.2.9 publish
- no compiler bridge removal
- no release artifact mutation
- no compiler bridge run
- no assumption that local package hash equals ClawHub hash
- preserve scanner/security remediation as documentation and triage work only unless explicitly authorized later

This index does not weaken or reinterpret those constraints.

---

## Phase-by-phase master index

### TOOL-RUNTIME-1 — Architecture doctrine
**Primary scope:** capability model, toolpack model, execution-mode policy, business sleeve pattern, implementation roadmap

**Key files:**
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_ARCHITECTURE.v0.1.md`
- `META/TOOL-RUNTIME-1-ARCHITECTURE-NOTES.md`

**Key outputs:**
- initial CAP set for desktop / phase / file / workflow surfaces
- initial TP set for Desktop Bridge / PhaseBridge / UMG core runtime
- execution mode ladder from `preview` to `approved_execute`
- core boundary that `TP.UMG.CORE_RUNTIME.v1` must not become a super-provider

---

### TOOL-RUNTIME-2A — Static artifact design set
**Primary scope:** artifact design for capability, toolpack, tool binding, sleeve runtime governance, trust registry, approval token, rollback taxonomy, tenant isolation scaffolding

**Key files:**
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_ARTIFACTS.v0.1.md`
- `META/TOOL-RUNTIME-2A-STATIC-ARTIFACTS.md`

**Key outputs:**
- static artifact family definitions
- approval / trust / rollback / tenant-isolation design surfaces
- relay capability separation groundwork

---

### TOOL-RUNTIME-2B — Formal schema draft layer
**Primary scope:** formal static schemas for capability, toolpack, binding, governance, trust, approval, and rollback artifacts

**Key files:**
- `AI/SCHEMAS/capability.schema.json`
- `AI/SCHEMAS/toolpack.schema.json`
- `AI/SCHEMAS/tool-binding.schema.json`
- `AI/SCHEMAS/sleeve-runtime-governance.schema.json`
- `AI/SCHEMAS/trust-registry.schema.json`
- `AI/SCHEMAS/approval-token.schema.json`
- `AI/SCHEMAS/rollback-taxonomy.schema.json`
- `AI/SCHEMAS/toolpack.schema.legacy-v0.1.json`
- `META/TOOL-RUNTIME-2B-SCHEMA-DRAFTS.md`

**Key outputs:**
- schema-valid static structure for all core artifact families
- reusable approval semantics with expiration/max-uses discipline
- explicit blocked-trust / approval / audit / rollback rules at schema layer

---

### TOOL-RUNTIME-3 — Resolver preview state model
**Primary scope:** preview-state taxonomy and blocked-reason taxonomy

**Key files:**
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_RESOLVER_PREVIEW.v0.1.md`
- `META/TOOL-RUNTIME-3-RESOLVER-PREVIEW-MODEL.md`

**Key outputs:**
- state taxonomy from `declared` through `blocked_reason`
- blocked-reason taxonomy for capability/provider/binding/approval/tenant/rollback/audit/toolpack conflicts
- preserved rule that preview validates possibility, not permission

---

### TOOL-RUNTIME-4 — Preview output schemas and fixtures
**Primary scope:** formal preview output schemas and governed fixture set

**Key files:**
- `AI/SCHEMAS/runtimespec-preview.schema.json`
- `AI/SCHEMAS/validation-trace-preview.schema.json`
- `AI/SCHEMAS/blocked-reason.schema.json`
- `AI/EXAMPLES/runtime-preview/valid-preview-only-chain.json`
- `AI/EXAMPLES/runtime-preview/dry-run-only-chain.json`
- `AI/EXAMPLES/runtime-preview/blocked-trust-chain.json`
- `AI/EXAMPLES/runtime-preview/expired-approval-chain.json`
- `AI/EXAMPLES/runtime-preview/tenant-violation-chain.json`
- `AI/EXAMPLES/runtime-preview/rollback-invalid-chain.json`
- `AI/EXAMPLES/runtime-preview/provider-missing-chain.json`
- `AI/EXAMPLES/runtime-preview/capability-unknown-chain.json`
- `META/TOOL-RUNTIME-4-PREVIEW-OUTPUTS.md`

**Key outputs:**
- formal preview-output schema layer
- fixture pack for valid, dry-run, blocked, approval-expired, tenant-violation, rollback-invalid, provider-missing, and capability-unknown paths
- preserved sentinel mismatch in `valid-preview-only-chain.json`

---

### TOOL-RUNTIME-5 — Cross-schema validation expectation pack
**Primary scope:** locked expected results and validation matrix for preview fixtures

**Key files:**
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_VALIDATION_PACK.v0.1.md`
- `AI/EXAMPLES/runtime-preview/EXPECTED_RESULTS.md`
- `AI/EXAMPLES/runtime-preview/validation-matrix.json`
- `META/TOOL-RUNTIME-5-CROSS-SCHEMA-VALIDATION-PACK.md`

**Key outputs:**
- expectation classes: `PASS`, `PASS_WITH_MISMATCH_NOTE`, `FAIL_SCHEMA`, `FAIL_EXPECTATION`, `FAIL_CONSISTENCY`
- locked outcome mapping for preview fixtures
- preserved sentinel mismatch as expected `PASS_WITH_MISMATCH_NOTE`

---

### TOOL-RUNTIME-6 — Harness contract
**Primary scope:** future non-executing harness contract and validation-runner semantics

**Key files:**
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_HARNESS_CONTRACT.v0.1.md`
- `AI/EXAMPLES/runtime-preview/trace-expectations.json`
- `META/TOOL-RUNTIME-6-HARNESS-CONTRACT.md`

**Key outputs:**
- resolver input bundle shape
- deterministic validation-runner phases
- consistency-check semantics
- fixture-to-trace expectation model
- explicit no-execution harness boundary

---

### TOOL-RUNTIME-7 — Harness report and synthetic trace layer
**Primary scope:** harness-result reporting shape, fixture-bundle manifest, synthetic traces, consistency-failure examples

**Key files:**
- `AI/SCHEMAS/harness-result-report.schema.json`
- `AI/SCHEMAS/fixture-bundle-manifest.schema.json`
- `AI/EXAMPLES/runtime-preview/harness-result-report.example.json`
- `AI/EXAMPLES/runtime-preview/fixture-bundle-manifest.example.json`
- synthetic trace fixtures under `AI/EXAMPLES/runtime-preview/`
- `META/TOOL-RUNTIME-7-HARNESS-REPORTS.md`

**Key outputs:**
- machine-readable harness report contract
- fixture bundle manifest contract
- synthetic traces for each governed preview fixture
- explicit consistency-failure examples

---

### TOOL-RUNTIME-8 — Machine-readable governance rules and reporting schemas
**Primary scope:** consistency-rule catalog and reporting/audit schemas

**Key files:**
- `AI/SCHEMAS/consistency-rule-catalog.schema.json`
- `AI/SCHEMAS/preview-ui-mapping.schema.json`
- `AI/SCHEMAS/enterprise-report.schema.json`
- `AI/SCHEMAS/audit-export.schema.json`
- `AI/EXAMPLES/consistency-rule-catalog.example.json`
- `META/TOOL-RUNTIME-8-CONSISTENCY-RULES.md`

**Key outputs:**
- machine-readable consistency-rule layer
- UI mapping schema
- enterprise report schema
- audit export schema

---

### TOOL-RUNTIME-9 — Example reporting packs
**Primary scope:** concrete examples for UI/report/audit/report-bundle surfaces

**Key files:**
- `AI/EXAMPLES/reporting/preview-ui-mapping.example.json`
- `AI/EXAMPLES/reporting/enterprise-report.example.json`
- `AI/EXAMPLES/reporting/audit-export.example.json`
- `AI/EXAMPLES/reporting/sample-harness-result-bundle.json`
- `META/TOOL-RUNTIME-9-EXAMPLE-REPORTING-PACKS.md`

**Key outputs:**
- reporting examples for UI, enterprise, audit, and bundled harness results

---

### TOOL-RUNTIME-10 — Dashboard state example packs
**Primary scope:** governance dashboard/screen-state example surfaces

**Key files:**
- dashboard-state examples under `AI/EXAMPLES/dashboard/`
- `META/TOOL-RUNTIME-10-DASHBOARD-STATES.md`

**Key outputs:**
- preview-only dashboard state
- dry-run-only dashboard state
- pending-gate dashboard state
- blocked dashboard state
- mismatch-note dashboard state
- terminal-violation dashboard state
- severity legend and audit-export variants

---

### TOOL-RUNTIME-11 — Dashboard crosswalk layer
**Primary scope:** dashboard section map and screen-to-report/audit crosswalks

**Key files:**
- dashboard crosswalk examples under `AI/EXAMPLES/dashboard/`
- `META/TOOL-RUNTIME-11-DASHBOARD-CROSSWALK.md`

**Key outputs:**
- dashboard-section map
- screen-to-report crosswalk
- dashboard-to-audit-export crosswalk
- partial/full/enterprise dashboard layout examples

---

### TOOL-RUNTIME-12 — Language and interpretation layer
**Primary scope:** severity taxonomy, glossary, narrative templates, field dictionary

**Key files:**
- `META/TOOL-RUNTIME-12-SEVERITY-TAXONOMY.md`
- `META/TOOL-RUNTIME-12-NARRATIVE-TEMPLATES.md`
- language/control examples under `AI/EXAMPLES/reporting/` and `AI/EXAMPLES/governance/`

**Key outputs:**
- severity taxonomy note
- dashboard component glossary
- enterprise and compliance narrative templates
- dashboard-to-harness field dictionary

---

### TOOL-RUNTIME-13 — Governance communication standards
**Primary scope:** style, terminology, localization readiness, evidence checklist framing

**Key files:**
- `META/TOOL-RUNTIME-13-GOVERNANCE-STYLE-GUIDE.md`
- `META/TOOL-RUNTIME-13-TERMINOLOGY-FREEZE.md`
- `META/TOOL-RUNTIME-13-EVIDENCE-CHECKLISTS.md`

**Key outputs:**
- communication style guide
- terminology freeze
- report prose variants
- compliance evidence checklist framing
- localization readiness constraints

---

### TOOL-RUNTIME-14 — Evidence, ownership, audience, QA, signoff workflow layer
**Primary scope:** review logistics and governance operations support

**Key files:**
- `META/TOOL-RUNTIME-14-EVIDENCE-OWNERSHIP.md`
- governance examples under `AI/EXAMPLES/governance/`

**Key outputs:**
- evidence pack index
- remediation ownership matrix
- audience profiles
- governance communication QA checklist
- review signoff workflow examples

---

### TOOL-RUNTIME-15 — Governance pack manifest and signoff/escalation inventory layer
**Primary scope:** packaging and review-bundle semantics

**Key files:**
- `AI/SCHEMAS/governance-pack-manifest.schema.json`
- `AI/EXAMPLES/governance/governance-pack-manifest.example.json`
- `AI/EXAMPLES/governance/signoff-record.example.json`
- `AI/EXAMPLES/governance/escalation-taxonomy.example.json`
- `AI/EXAMPLES/governance/readiness-review-checklists.example.json`
- `AI/EXAMPLES/governance/artifact-bundle-inventory.example.json`
- `META/TOOL-RUNTIME-15-GOVERNANCE-PACKS.md`

**Key outputs:**
- governance-pack manifest schema and example
- signoff-record example
- escalation taxonomy example
- readiness review checklists
- artifact bundle inventory

---

### TOOL-RUNTIME-16 — Pack variants and lifecycle semantics
**Primary scope:** audience/variant packaging, lifecycle state, signoff status

**Key files:**
- `AI/EXAMPLES/governance/governance-pack-variants.example.json`
- `AI/EXAMPLES/governance/signoff-status-taxonomy.example.json`
- `AI/EXAMPLES/governance/review-packet-checklists.example.json`
- `AI/EXAMPLES/governance/artifact-lifecycle-status-map.example.json`
- `AI/EXAMPLES/governance/pack-audience-profiles.example.json`
- `META/TOOL-RUNTIME-16-GOVERNANCE-PACK-VARIANTS.md`

**Key outputs:**
- governance pack variants
- signoff-status taxonomy
- review-packet checklists
- artifact lifecycle status map
- audience profiles by pack variant

---

### TOOL-RUNTIME-17 — Maturity, dependency, completeness, escalation models
**Primary scope:** readiness evaluation models

**Key files:**
- `AI/EXAMPLES/governance/governance-pack-maturity-model.example.json`
- `AI/EXAMPLES/governance/artifact-dependency-graph.example.json`
- `AI/EXAMPLES/governance/variant-completeness-scoring.example.json`
- `AI/EXAMPLES/governance/review-escalation-thresholds.example.json`
- `META/TOOL-RUNTIME-17-MATURITY-DEPENDENCY-GRAPH.md`

**Key outputs:**
- maturity model
- dependency graph
- completeness scoring model
- escalation threshold model

---

### TOOL-RUNTIME-18 — Readiness reporting examples
**Primary scope:** concrete reporting surfaces for maturity, dependency, completeness, escalation, dashboard summary

**Key files:**
- `AI/EXAMPLES/governance/maturity-assessment.example.json`
- `AI/EXAMPLES/governance/dependency-health-report.example.json`
- `AI/EXAMPLES/governance/completeness-scoring-report.example.json`
- `AI/EXAMPLES/governance/escalation-threshold-report.example.json`
- `AI/EXAMPLES/governance/readiness-dashboard-summary.example.json`
- `META/TOOL-RUNTIME-18-MATURITY-HEALTH-REPORTS.md`

**Key outputs:**
- maturity-assessment example
- dependency-health report example
- completeness-scoring report example
- escalation-threshold report example
- readiness-dashboard summary example

---

### TOOL-RUNTIME-19 — Readiness packet and decision baseline
**Primary scope:** readiness packet structure, narrative support, decision recording baseline

**Key files:**
- `AI/EXAMPLES/governance/governance-readiness-packet.example.json`
- `AI/EXAMPLES/governance/maturity-to-review-crosswalk.example.json`
- `AI/EXAMPLES/governance/static-assessment-narratives.example.json`
- `AI/EXAMPLES/governance/review-decision-record.example.json`
- `META/TOOL-RUNTIME-19-DEPENDENCY-RISK-TAXONOMY.md`
- `META/TOOL-RUNTIME-19-READINESS-PACKETS.md`

**Key outputs:**
- readiness-packet baseline
- maturity-to-review crosswalk
- static assessment narratives
- canonical review decision record example
- dependency-risk taxonomy note

---

### TOOL-RUNTIME-20 — Readiness packet schemas and decision taxonomy
**Primary scope:** formal readiness/decision schemas and status semantics

**Key files:**
- `AI/SCHEMAS/governance-readiness-packet.schema.json`
- `AI/SCHEMAS/review-decision-record.schema.json`
- `AI/EXAMPLES/governance/readiness-packet-variants.example.json`
- `AI/EXAMPLES/governance/review-decision-status-taxonomy.example.json`
- `META/TOOL-RUNTIME-20-DEPENDENCY-HEALTH-SCORING.md`
- `META/TOOL-RUNTIME-20-READINESS-PACKET-SCHEMAS.md`

**Key outputs:**
- readiness-packet schema
- review-decision-record schema
- readiness packet variant set
- decision-status taxonomy
- dependency-health scoring note

---

### TOOL-RUNTIME-21 — Readiness packet example variants and decision record variants
**Primary scope:** concrete packet and decision examples, dependency narratives, readiness validation checklists

**Key files:**
- `AI/EXAMPLES/governance/readiness-packet-variant-examples/internal_static_readiness_packet.example.json`
- `AI/EXAMPLES/governance/readiness-packet-variant-examples/enterprise_static_readiness_packet.example.json`
- `AI/EXAMPLES/governance/readiness-packet-variant-examples/compliance_static_readiness_packet.example.json`
- `AI/EXAMPLES/governance/readiness-packet-variant-examples/security_triage_readiness_packet.example.json`
- `AI/EXAMPLES/governance/readiness-packet-variant-examples/implementation_candidate_packet.example.json`
- `AI/EXAMPLES/governance/readiness-packet-variant-examples/release_blocked_packet.example.json`
- `AI/EXAMPLES/governance/review-decision-record-variants/accepted_static.example.json`
- `AI/EXAMPLES/governance/review-decision-record-variants/accepted_with_conditions.example.json`
- `AI/EXAMPLES/governance/review-decision-record-variants/rejected_static.example.json`
- `AI/EXAMPLES/governance/review-decision-record-variants/deferred.example.json`
- `AI/EXAMPLES/governance/review-decision-record-variants/blocked_security.example.json`
- `AI/EXAMPLES/governance/review-decision-record-variants/superseded.example.json`
- `AI/EXAMPLES/governance/dependency-health-narratives.example.json`
- `AI/EXAMPLES/governance/readiness-packet-validation-checklists.example.json`
- `META/TOOL-RUNTIME-21-READINESS-VARIANTS.md`

**Key outputs:**
- six readiness packet example variants
- six review decision record variants
- dependency-health narrative templates
- readiness packet validation checklist pack

---

## Stack navigation by artifact family

### Doctrine
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_ARCHITECTURE.v0.1.md`
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_ARTIFACTS.v0.1.md`
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_RESOLVER_PREVIEW.v0.1.md`
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_VALIDATION_PACK.v0.1.md`
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_HARNESS_CONTRACT.v0.1.md`

### Schemas
- capability / toolpack / tool-binding / sleeve governance / trust / approval / rollback schemas under `AI/SCHEMAS/`
- preview-output schemas under `AI/SCHEMAS/`
- harness/reporting schemas under `AI/SCHEMAS/`
- governance readiness/decision schemas under `AI/SCHEMAS/`

### Runtime-preview fixtures and harness examples
- `AI/EXAMPLES/runtime-preview/`

### Reporting and dashboard examples
- `AI/EXAMPLES/reporting/`
- `AI/EXAMPLES/dashboard/`

### Governance examples
- `AI/EXAMPLES/governance/`

### Phase notes / rollup notes
- `META/TOOL-RUNTIME-*.md`

---

## Review entry points

### Fastest re-anchor set
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_ARCHITECTURE.v0.1.md`
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_RESOLVER_PREVIEW.v0.1.md`
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_VALIDATION_PACK.v0.1.md`
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_HARNESS_CONTRACT.v0.1.md`
- `AI/SCHEMAS/governance-readiness-packet.schema.json`
- `AI/SCHEMAS/review-decision-record.schema.json`
- `AI/EXAMPLES/governance/governance-readiness-packet.example.json`
- `AI/EXAMPLES/governance/readiness-packet-variant-examples/`
- `AI/EXAMPLES/governance/review-decision-record-variants/`

### Security-sensitive re-anchor set
- `META/TOOL-RUNTIME-13-GOVERNANCE-STYLE-GUIDE.md`
- `META/TOOL-RUNTIME-19-DEPENDENCY-RISK-TAXONOMY.md`
- `META/TOOL-RUNTIME-20-DEPENDENCY-HEALTH-SCORING.md`
- `META/TOOL-RUNTIME-21-READINESS-VARIANTS.md`

---

## What this stack currently is

The TOOL-RUNTIME stack is currently:
- doctrine
- schemas
- fixtures
- validation expectations
- harness contract
- reporting examples
- dashboard examples
- language controls
- evidence/remediation/signoff scaffolding
- maturity/dependency/completeness models
- readiness packet and review decision packaging
- example variants for readiness and decisions

It is not:
- runtime implementation
- resolver implementation
- harness implementation
- dashboard implementation
- provider activation
- bridge execution
- compiler execution
- release authorization

---

## Recommended next safe phase

A safe continuation after this index phase would be:

### TOOL-RUNTIME-23 — Checklist-to-Packet Crosswalks + Audience Review Bundle Manifests

Likely static-only deliverables:
- checklist-to-packet crosswalk examples
- packet-to-decision traceability examples
- audience review bundle manifest examples
- prohibited-interpretation crosswalk examples
- security-triage companion review notes

As always, any future phase should remain static-only unless the user explicitly changes the boundary.
