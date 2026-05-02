# Master Roadmap to True Next Version Publish

## Purpose

This roadmap defines the staged path from the current TOOL-RUNTIME-22B static-governance state toward a true future publish of the next UMG Envoy Agent version.

It is a planning and review artifact only.
It does not authorize implementation, execution, package publication, release mutation, or security-boundary bypass.

---

## Current state

### Completed static-governance lane
TOOL-RUNTIME-1 through TOOL-RUNTIME-22B are complete or effectively complete as static architecture, doctrine, schema, fixture, reporting, packaging, readiness, and index work.

### Known recent commits
- `53ec900` — `Add TOOL-RUNTIME-21 readiness and decision variants`
- `f50ddfa` — `Add TOOL-RUNTIME-22 static governance index`
- `b7bee03` — `Add TOOL-RUNTIME-22B machine-readable index supplements`

### Current security posture
Envoy Agent v0.2.8 ClawHub/VirusTotal triage remains active.
Current interpretation remains:
- scanner-sensitive but explainable
- likely scanner concern around `child_process` / `spawn` / `fs.writeFileSync`
- no current evidence of hidden install-time malware behavior
- local package hash must not be treated as identical proof of the ClawHub-scanned artifact

### Current hard boundaries
- do not publish `umg-envoy-agent` v0.2.9 yet
- do not delete compiler bridge work
- do not remove compiler bridge code
- do not mutate release artifacts
- do not run compiler bridge
- do not drift from static governance into implementation unless explicitly authorized

---

## Governing doctrine

```text
Sleeves declare.
Toolpacks provide.
Envoy validates.
OpenClaw gates execution.
```

Preserved interpretation rules:
- static readiness never equals implementation approval
- implementation candidate never equals implementation authorized
- release readiness never equals release authorized
- structural validity is not permission
- provider presence is not permission
- approval token presence is not permission bypass
- preview may say possible
- only runtime gate may say permitted

---

## Strategic end state

The true target state is not merely “publish a version.”
The true target state is:
- the scan concern is documented, triaged, and either resolved or bounded clearly enough for review
- compiler bridge work is preserved unless concrete evidence proves it unsafe and explicit user approval allows removal
- the tool-enabled sleeve architecture remains safety-bounded and reviewable
- any future runtime-enabling work happens only through explicit authorization and phase review
- the next published version is justified by evidence, not optimism

---

## Stage map

## Stage 0 — Preserve and consolidate the static governance foundation
**Status:** complete enough for continuation

**Goal:** keep the current architecture/guidance stack stable and navigable.

**Already achieved:**
- doctrine, schemas, fixtures, reporting, dashboard, signoff, readiness, and index layers exist
- machine-readable index supplements exist

**Carry-forward rule:**
No implementation or release inference may be drawn from stack completeness alone.

---

## Stage 1 — Security triage documentation pack
**Status:** immediate next safe stage

**Goal:** create a formal documentation pack for the Envoy v0.2.8 scan concern so later decisions are evidence-based.

**What this stage should produce:**
- security triage overview
- suspected scan-surface inventory
- evidence and non-evidence ledger
- risk interpretation and blocker taxonomy
- preserved constraints and publish gate criteria
- review audiences and signoff expectations

**What this stage must not do:**
- mutate code
- remove compiler bridge work
- publish a package
- claim the package is cleared

**Success condition:**
The scan concern is documented in a reusable, review-ready way with explicit blocker language and explicit non-authorization language.

---

## Stage 2 — Static scan-surface mapping and release-delta planning
**Status:** allowed only as documentation/planning unless otherwise authorized

**Goal:** define how scanner-sensitive surfaces would be mapped and how a future reviewed delta could be described without editing release artifacts.

**Potential deliverables:**
- scan-surface category map
- static code-surface review checklist
- release-delta planning template
- scanner-explanation narrative pack
- component preservation matrix for compiler bridge and related runtime surfaces

**Success condition:**
Reviewers can distinguish suspicious-looking surfaces from actually unjustified behavior at a documentation level.

---

## Stage 3 — Safe tool-enabled sleeve construction doctrine refinement
**Status:** static-only planning allowed

**Goal:** refine the doctrine and artifact expectations needed for safely constructing tool-enabled sleeves in a later, explicitly authorized lane.

**Potential deliverables:**
- safe sleeve construction checklist
- bounded toolpack declaration patterns
- execution-gating crosswalks
- approval and audit expectation bundles
- sleeve-to-toolpack-to-gate traceability examples

**Success condition:**
Future sleeve-building work has a clearer safety and traceability path without prematurely implementing execution behavior.

---

## Stage 4 — Security review readiness and publish-gate framework
**Status:** static-only planning allowed

**Goal:** define the exact gates that must be satisfied before any future next-version publish can be considered.

**Potential deliverables:**
- publish-gate checklist
- blocker-to-evidence crosswalk
- triage-resolution decision variants
- release-readiness prohibition language pack
- reviewer signoff packet template for future publish consideration

**Success condition:**
There is a documented answer to: “What would need to be true before a real publish review could even begin?”

---

## Stage 5 — Explicit authorization checkpoint
**Status:** not automatically allowed

**Goal:** obtain explicit user-directed authorization before any work that crosses from static planning into code change, harness implementation, resolver implementation, or runtime behavior.

**Required before entry:**
- explicit user instruction
- clear scope boundary
- preserved compiler bridge handling rule
- preserved no-bypass security language

**Success condition:**
If and only if authorization is granted, the next implementation lane begins with a documented, bounded scope.

---

## Stage 6 — Future implementation review lane
**Status:** not authorized now

**Possible future scope only if explicitly authorized:**
- runtime code review
- resolver code review
- harness implementation review
- scanner-sensitive code reduction or justification work
- compiler bridge hardening or documentation-aligned refactoring

**Current rule:**
This stage is not entered from the current handoff alone.

---

## Stage 7 — Future release review lane
**Status:** blocked now

**Possible future scope only if explicitly authorized and blockers are cleared:**
- pre-publish evidence review
- package identity and scan interpretation review
- signoff bundle completion
- final publish/no-publish decision

**Current rule:**
No v0.2.9 publish, no release artifact mutation, and no hash-identity collapse are allowed now.

---

## Master blocker set

The following blockers currently stand between the project and a true next-version publish review:

### B1 — Active Envoy v0.2.8 scan triage
This remains an active blocker for release-facing posture.

### B2 — Package identity uncertainty
The local package hash must not be treated as proof of the ClawHub-scanned artifact.

### B3 — Missing formal triage evidence pack
The project has security interpretation, but still needs a consolidated triage documentation pack.

### B4 — No explicit authorization for implementation lane
Static completeness does not authorize code changes.

### B5 — No explicit publish gate satisfaction
The conditions for a real next publish have not yet been documented as satisfied.

---

## Preservation rules

### Compiler bridge preservation rule
Do not delete or remove compiler bridge work unless:
- concrete evidence shows it is unsafe or unjustified, and
- the user explicitly approves a removal/change decision.

### Architecture preservation rule
Do not discard hard-built Tool Runtime architecture just because the current lane is blocked from execution.
Preserve it as reviewable design capital.

### Security interpretation rule
Do not describe the package as cleared, approved, or publish-ready while triage remains active.
Prefer precise language such as:
- structurally documented
- scanner-sensitive but explainable
- still blocked for release-facing interpretation

---

## Immediate next phase

## TOOL-RUNTIME-23 — Security Triage Documentation Pack

**Immediate objective:**
Build the first formal triage documentation pack for the Envoy v0.2.8 scan concern.

**Recommended deliverables:**
- security triage overview
- scan-surface inventory example
- evidence/non-evidence ledger example
- blocker taxonomy example
- publish-gate prerequisites example
- review packet summary note

**Boundary:**
Static documentation and example artifacts only.
No runtime behavior, no provider invocation, no compiler bridge execution, no code patching, no publishing.

---

## Definition of progress

Progress from here should be measured by:
- clearer evidence packaging
- clearer blocker taxonomy
- clearer publish-gate prerequisites
- stronger preservation of compiler bridge and architecture work
- better separation between suspicious-looking surfaces and unjustified behavior

Not by:
- rushing a publish
- collapsing identity uncertainty
- silently drifting into implementation
- deleting bridge work to reduce reviewer discomfort without evidence

---

## Final statement

The path to a true next version publish is now a staged review path, not a leap.
The next safe move is better triage documentation, not release mutation.
