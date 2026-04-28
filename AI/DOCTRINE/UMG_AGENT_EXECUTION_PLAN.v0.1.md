# UMG Agent Execution Plan v0.1

**Document ID:** `UMG_AGENT_EXECUTION_PLAN.v0.1` 
**Status:** Operational control draft 
**Layer:** Agent execution / staged implementation / repo safety / review gates 
**Applies to:** `UMG-Block-Library`, `umg-compiler`, `umg-envoy-agent`, `UMG_Envoy_Resleever` 
**Depends on:** `UMG_V0_BUILD_ROADMAP.v0.1`, `UMG_V0_BUILD_ROADMAP_AMENDMENT.PURE_UMG_REFERENCE_SLICE.v0.1` 
**Purpose:** Provide a single agent-safe execution plan for building UMG v0 without drift, premature implementation, or domain-specific foundation confusion.

---

## 1. Control Rule

This document controls agent execution order.

Agents must not infer permission to perform broad work.

Agents must execute one stage at a time.

Each stage requires:

```text
preflight
limited scope
explicit allowed paths
explicit forbidden actions
validation
report
review
commit only after approval
push only after approval
```

## 2. Precedence Rule

If any document conflicts with the pure UMG reference-slice amendment, the amendment wins.

Binding precedence:

1. Safety / private-data boundary
2. Pure UMG reference-slice amendment
3. UMG Agent Execution Plan
4. UMG v0 Build Roadmap
5. Other doctrine files
6. Examples and pilot sleeves

The foundation reference slice is:

```text
SLV.UMG.CORE_REFERENCE.v1
```

The foundation proof is:

```text
Library -> Sleeve -> IR -> Compiler -> RuntimeSpec + Trace -> Envoy -> Relation Matrix -> Capability Status
```

UO/ServUO is not the foundation proof.

UO/ServUO is a later applied pilot.

## 3. Global Agent Rules

Agents must obey:

Do one stage at a time.
Stop after each stage.
Report before commit.
Commit only after explicit approval.
Push only after explicit approval.
Do not force push.
Do not perform broad rewrites.
Do not mass-rename existing artifacts.
Do not delete existing work without explicit instruction.
Do not start the next stage early.
Do not mix stages in one commit.
Do not expose private runtime traces.
Do not execute tools before capability validation exists.
Do not convert examples into authority.
Do not treat UO/ServUO as foundation proof.

## 4. Standard Preflight

Before every stage, run:

```text
git status
git status -sb
git branch --show-current
git log --oneline -5
```

Stop if:

working tree is dirty unexpectedly
branch is not expected
repo is mid-merge/rebase/conflict
unrelated files are modified
unrelated files are staged
remote state is unclear

## 5. Standard Report Format

Every stage report must include:

1. Repo state
2. Files changed
3. Files not changed but inspected
4. Summary of work
5. Validation commands run
6. Validation results
7. Remaining issues
8. Recommended next step
9. Confirm no forbidden actions occurred
10. Confirm no push unless explicitly requested

## 6. Commit Rule

One stage equals one commit unless explicitly told otherwise.

Commit messages should be narrow and descriptive.

Examples:

Update v0 roadmap for pure UMG reference slice
Add UMG agent execution plan
Align public library folder structure
Add UMG v0 schema contracts
Add pure UMG core reference sleeve

## 7. Push Rule

Push only after explicit approval.

Never force push unless explicitly instructed after a recovery review.

## Stage 0 — Foundation Doctrine Placement

### Status

Complete.

### Completed outputs

AI/DOCTRINE/README.md
AI/DOCTRINE/UMG_FOUNDATION_WORKMAP.v0.1.md
AI/DOCTRINE/UMG_COMPILER_LAW.v0.3.md
AI/DOCTRINE/UMG_IR.v0.1.md
AI/DOCTRINE/UMG_FOUNDATION_AMENDMENT_IR_CANONICAL_AND_GOV_PRIORITY.v0.1.md
AI/DOCTRINE/UMG_RELATION_MATRIX.v0.1.md
AI/DOCTRINE/UMG_ARTIFACT_IDENTITY_AND_PROVENANCE.v0.1.md
AI/DOCTRINE/UMG_SLEEVE_PACK_CONTRACT.v0.1.md
AI/DOCTRINE/UMG_OBJECT_CONTRACTS_MOLT_NEOBLOCK_NEOSTACK.v0.1.md
AI/DOCTRINE/UMG_TOOLPACK_CAPABILITY_CONTRACT.v0.1.md
AI/DOCTRINE/UMG_ENVOY_RUNTIME_INTEGRATION.v0.1.md
AI/DOCTRINE/UMG_REPOSITORY_CONTRACT.v0.1.md
AI/DOCTRINE/UMG_HUMAN_AI_LIBRARY_PRESENTATION.v0.1.md
AI/DOCTRINE/UMG_GOVERNANCE_ROUTING_OVERLAY_MODEL.v0.1.md
AI/DOCTRINE/UMG_CREATOR_ECONOMY_HOOKS.v0.1.md
AI/DOCTRINE/UMG_VISUAL_STUDIO_GRAPH_UI_CONCEPTS.v0.1.md
AI/DOCTRINE/UMG_V0_BUILD_ROADMAP.v0.1.md
AI/DOCTRINE/UMG_V0_BUILD_ROADMAP_AMENDMENT_PURE_UMG_REFERENCE_SLICE.v0.1.md

## Stage 0.5 — Doctrine Consistency and Agent Control

### Status

In progress.

### Stage 0.5A — Doctrine Consistency Review

Complete.

### Stage 0.5B — Roadmap Consistency Patch

Complete and committed as:
63486d3 Update v0 roadmap for pure UMG reference slice

### Stage 0.5C — Agent Execution Plan

Draft created. Pending review and commit.

### Stage 0.5D — Push checkpoint

After Stage 0.5B and 0.5C are committed, push both commits together unless instructed otherwise.

## Stage 1 — Public Library Folder Strategy

### Purpose

Resolve folder naming and public-library structure without creating duplicate confusion.

### Current known inspection result

Existing top-level folders include:

AI/
HUMAN/
META/
blocks/
sleeves/
README.md
START-HERE.md

Existing AI/ folders include:

AI/COMPILER/
AI/DOCTRINE/
AI/GATES/
AI/MANIFESTS/
AI/MOLT-BLOCKS/
AI/NEOBLOCKS/
AI/NEOSTACKS/
AI/RUNTIME-REFERENCE/
AI/SCHEMAS/
AI/SLEEVES/
AI/AGENT-INDEX.md
AI/README.md

Existing HUMAN/ folders include:

HUMAN/EXAMPLES/
HUMAN/GATES/
HUMAN/GLOSSARY/
HUMAN/GUIDES/
HUMAN/MOLT-BLOCKS/
HUMAN/NEOBLOCKS/
HUMAN/NEOSTACKS/
HUMAN/SLEEVES/
HUMAN/README.md
HUMAN/START-HERE.md

### Stage 1A — Planning only

Allowed:

inspect folders
classify existing folders
produce keep/map/defer table
recommend canonical naming strategy

Forbidden:

create folders
move files
rename files
delete files
commit
push

Output:

keep-as-is table
map-to-target table
duplicate-risk table
deferred-legacy table
recommended Stage 1B plan

### Stage 1B — Minimal folder additions

Only after review.

Allowed:

create missing non-conflicting folders
add .gitkeep if needed

Forbidden:

mass rename
delete
move large content
create duplicate canonical lanes without README explanation

## Stage 2 — Schema Alignment

### Purpose

Create or align v0 schemas without mass-migrating all existing blocks.

### Target schema files

AI/SCHEMAS/artifact.identity.schema.json
AI/SCHEMAS/provenance.schema.json
AI/SCHEMAS/molt-block.schema.json
AI/SCHEMAS/neoblock.schema.json
AI/SCHEMAS/neostack.schema.json
AI/SCHEMAS/sleeve.schema.json
AI/SCHEMAS/toolpack.schema.json
AI/SCHEMAS/umg-ir.schema.json
AI/SCHEMAS/runtime-spec.schema.json
AI/SCHEMAS/trace.schema.json
AI/SCHEMAS/relation-matrix.schema.json

### Rule

Create schemas for new v0 reference artifacts first.
Do not mass-convert all legacy blocks.

## Stage 3 — Pure UMG Core Reference Sleeve

### Purpose

Create the domain-neutral reference sleeve.

### Target

SLV.UMG.CORE_REFERENCE.v1

### Target folder

AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/

### Required files

sleeve.json
README.md
sleeve.lock.json
examples/

No UO/ServUO in this sleeve.

## Stage 4 — Pure UMG Core Reference Objects

### Required NeoStack

NS.UMG.CORE.COMPILER_FLOW.v1

### Required NeoBlocks

NB.UMG.REQUEST_INTAKE.v1
NB.UMG.ARTIFACT_RESOLUTION.v1
NB.UMG.IR_NORMALIZATION.v1
NB.UMG.COMPILER_EXECUTION.v1
NB.UMG.RUNTIME_SPEC_TRACE.v1
NB.UMG.RELATION_MATRIX_EMIT.v1
NB.UMG.CAPABILITY_STATUS.v1

### Required MOLT Blocks

BLK.TRIGGER.UMG.COMPILE_REQUEST.v1
BLK.DIRECTIVE.UMG.PROVE_RUNTIME_SPINE.v1
BLK.INSTRUCTION.UMG.RESOLVE_ARTIFACTS.v1
BLK.INSTRUCTION.UMG.BUILD_IR.v1
BLK.INSTRUCTION.UMG.RUN_COMPILER.v1
BLK.INSTRUCTION.UMG.EMIT_TRACE.v1
BLK.INSTRUCTION.UMG.EMIT_RELATION_MATRIX.v1
BLK.SUBJECT.UMG.ARTIFACT_LIBRARY.v1
BLK.PRIMARY.UMG.RUNTIME_SPINE.v1
BLK.PHILOSOPHY.UMG.DETERMINISTIC_TRACEABILITY.v1
BLK.BLUEPRINT.UMG.RUNTIME_SPEC_TRACE_OUTPUT.v1

### Required Overlay

OVR.GOV.UMG.ROUTE_CONTROLLER.v1

## Stage 5 — Canonical IR Fixture

### Target folder

AI/FIXTURES/umg-core-reference-sleeve/

### Required fixture files

input.sleeve.json
resolved.ir.json
runtime-spec.json
trace.json
relation-matrix.umg
diagnostics.json

## Stage 6 — Compiler Alignment

### Repo

umg-compiler

### Purpose

accept source bundle or canonical IR
validate canonical IR
emit RuntimeSpec
emit Trace
emit diagnostics
remain headless

### Forbidden

LLM calls
tool execution
file mutation
OpenClaw actions
final prose generation

## Stage 7 — Envoy Sleeve Loader

### Repo

umg-envoy-agent

### Purpose

load sleeve.json
validate schema
resolve artifacts
prepare compiler input

### Target command

umg-envoy sleeve-validate --path AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1

## Stage 8 — Envoy Compiler Bridge

### Repo

umg-envoy-agent

### Purpose

connect Envoy to umg-compiler
store RuntimeSpec
store Trace
surface diagnostics

### Target command

umg-envoy sleeve-compile --path AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1

## Stage 9 — Relation Matrix Emitter

### Repo

umg-envoy-agent

### Purpose

emit Relation Matrix from RuntimeSpec/IR/Trace

### Target command

umg-envoy relation-matrix --active

## Stage 10 — Capability Status Lane

### Purpose

declare capabilities
bind Tool Packs
show capability status
do not execute tools yet

### Core capabilities

CAP.ARTIFACT.RESOLVE
CAP.IR.BUILD
CAP.COMPILER.COMPILE
CAP.TRACE.EMIT
CAP.MATRIX.EMIT

### Core Tool Pack

TP.UMG.CORE_RUNTIME.v1

### Target command

umg-envoy capability-status

## Stage 11 — Diagnostics and Failure Fixtures

### Purpose

create deterministic failure fixtures
prove diagnostics are structured

### Cases

missing dependency
invalid snap
floating MOLT block
untyped synthesis
missing required capability
route challenge warning
route challenge strict failure
lockfile mismatch
unknown overlay type

## Stage 12 — Human Cards and Indexes

### Purpose

create readable Human cards for pure UMG reference artifacts

### Initial cards

HUMAN/sleeves/core/SLV.UMG.CORE_REFERENCE.v1.md
HUMAN/neostacks/core/NS.UMG.CORE.COMPILER_FLOW.v1.md
HUMAN/neoblocks/core/NB.UMG.REQUEST_INTAKE.v1.md
HUMAN/neoblocks/core/NB.UMG.ARTIFACT_RESOLUTION.v1.md
HUMAN/neoblocks/core/NB.UMG.IR_NORMALIZATION.v1.md
HUMAN/neoblocks/core/NB.UMG.COMPILER_EXECUTION.v1.md
HUMAN/neoblocks/core/NB.UMG.RUNTIME_SPEC_TRACE.v1.md
HUMAN/neoblocks/core/NB.UMG.RELATION_MATRIX_EMIT.v1.md
HUMAN/neoblocks/core/NB.UMG.CAPABILITY_STATUS.v1.md
HUMAN/capabilities/toolpacks/TP.UMG.CORE_RUNTIME.v1.md

## Stage 13 — Private Resleever Mirror

### Repo

UMG_Envoy_Resleever

### Purpose

mirror public structure where practical
keep private runtime state private
create staging and promotion lane

### Forbidden

leaking private traces into public repo

## Stage 14 — v0 Release Candidate

### Required proof

Library -> Sleeve -> IR -> Compiler -> RuntimeSpec + Trace -> Envoy -> Relation Matrix -> Capability Status

### Demo commands

umg-envoy sleeve-validate --path AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1
umg-envoy sleeve-compile --path AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1
umg-envoy relation-matrix --active
umg-envoy runtime-status
umg-envoy capability-status

## Final Rule

Do not optimize for speed.

Optimize for:

correct scope
clean diffs
clean commits
deterministic artifacts
traceable decisions
no private leakage
no hidden execution

