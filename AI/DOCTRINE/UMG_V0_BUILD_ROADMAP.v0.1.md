# Section 14 — v0 Build Roadmap

**Document ID:** `UMG_V0_BUILD_ROADMAP.v0.1`  
**Status:** Foundation draft  
**Layer:** Practical implementation sequencing / repo cleanup / schema alignment / compiler bridge / Envoy integration  
**Depends on:** Sections 0–13 of the UMG Foundation sequence  
**Feeds into:** repo cleanup tasks, implementation issues, agent instructions, staged build tickets, OpenClaw/Envoy integration planning  

---

## 1. Purpose

This document converts the UMG foundation specs into a practical v0 build roadmap.

It answers:

- what to build first;
- what to defer;
- which repo gets which work;
- which schemas need to be aligned;
- how the compiler should be integrated;
- how Envoy should load sleeves;
- when Relation Matrix should appear;
- how Tool Packs should be staged;
- how to avoid brittle backtracking;
- how to preserve future creator-economy and visual-studio expansion without implementing it too early.

The roadmap goal is:

```text
Build the spine first.
Attach muscles later.
Attach economy last.
```

---

## 2. v0 Success Definition

UMG v0 is successful when the system can:

```text
load a sleeve pack
resolve referenced artifacts
normalize into canonical UMG IR
compile through UMG Compiler
emit RuntimeSpec
emit Trace
emit Relation Matrix
show diagnostics
validate capabilities without executing unsafe tools
run through Envoy/OpenClaw in a bounded lane
```

v0 does not need:

```text
full marketplace
full creator economy
token rewards
full visual drag/drop editor
multi-agent mesh
advanced public registry
full tool execution automation
full provenance scoring
```

---

## 3. Current Repo Anchors

The current repository roles are already close to the intended model:

- `UMG-Block-Library` is a curated public block-library surface with doctrine, baseline libraries, schemas, and selected examples.
- `umg-compiler` is the headless deterministic compiler that emits `RuntimeSpec` and `Trace`.
- `umg-envoy-agent` is the OpenClaw runtime/plugin vehicle with a bounded public-safe planner/path surface.
- `UMG_Envoy_Resleever` is the private/personal runtime mirror and testbed.

The roadmap preserves these roles instead of collapsing them.

---

## 4. Build Principle

Every implementation step should obey this order:

```text
1. Define contract.
2. Validate source.
3. Normalize to IR.
4. Compile deterministically.
5. Emit Trace.
6. Emit Relation Matrix.
7. Activate runtime state.
8. Bind tools.
9. Execute tools only after safety/permission checks.
```

Do not let execution outrun structure.

---

## 5. v0 Build Phases

The recommended v0 phases are:

```text
Phase 0 — Foundation Docs and Spec Placement
Phase 1 — Block Library Structure Cleanup
Phase 2 — Schema Alignment
Phase 3 — Sleeve Pack Example
Phase 4 — IR Canonical Object and Builder
Phase 5 — Compiler RuntimeSpec/Trace Alignment
Phase 6 — Envoy Sleeve Loader
Phase 7 — Envoy Compiler Bridge
Phase 8 — Relation Matrix Emitter
Phase 9 — Capability / Tool Pack Declaration Lane
Phase 10 — Diagnostics and Test Fixtures
Phase 11 — Human Cards and Indexes
Phase 12 — Private Resleever Mirror and Promotion Workflow
Phase 13 — v0 Release Candidate
```

Each phase should end with a checkable artifact.

---

# Phase 0 — Foundation Docs and Spec Placement

## 6. Goal

Place the new foundation specs in the correct public documentation location.

Recommended public location:

```text
UMG-Block-Library/
  AI/DOCTRINE/
    UMG_COMPILER_LAW.v0.3.md
    UMG_IR.v0.1.md
    UMG_RELATION_MATRIX.v0.1.md
    UMG_ARTIFACT_IDENTITY_AND_PROVENANCE.v0.1.md
    UMG_SLEEVE_PACK_CONTRACT.v0.1.md
    UMG_OBJECT_CONTRACTS.MOLT_NEOBLOCK_NEOSTACK.v0.1.md
    UMG_TOOLPACK_CAPABILITY_CONTRACT.v0.1.md
    UMG_ENVOY_RUNTIME_INTEGRATION.v0.1.md
    UMG_REPOSITORY_CONTRACT.v0.1.md
    UMG_HUMAN_AI_LIBRARY_PRESENTATION.v0.1.md
    UMG_GOVERNANCE_ROUTING_OVERLAY_MODEL.v0.1.md
    UMG_CREATOR_ECONOMY_HOOKS.v0.1.md
    UMG_VISUAL_STUDIO_GRAPH_UI_CONCEPTS.v0.1.md
    UMG_V0_BUILD_ROADMAP.v0.1.md
```

Optional root index:

```text
UMG-Block-Library/
  AI/DOCTRINE/README.md
```

---

## 7. Phase 0 Tasks

```text
1. Create AI/DOCTRINE/ if missing.
2. Add all approved foundation specs.
3. Add doctrine index.
4. Link START-HERE.md to doctrine index.
5. Link AI/README.md to doctrine index.
6. Add status labels: foundation draft / v0 planning.
```

---

## 8. Phase 0 Done Criteria

Phase 0 is done when:

```text
all specs are stored in the public Block Library
doctrine index lists all specs
START-HERE references the doctrine index
AI/README references the doctrine index
no spec is only trapped in chat
```

---

# Phase 1 — Block Library Structure Cleanup

## 9. Goal

Make `UMG-Block-Library` clean, browsable, and loadable.

Recommended structure:

```text
UMG-Block-Library/
  README.md
  START-HERE.md
  META/
  AI/
    README.md
    DOCTRINE/
    SCHEMAS/
    MANIFESTS/
    BLOCKS/
    NEOBLOCKS/
    NEOSTACKS/
    SLEEVES/
    CAPABILITIES/
    EXAMPLES/
    FIXTURES/
  HUMAN/
    README.md
    GLOSSARY/
    GUIDES/
    INDEXES/
    blocks/
    neoblocks/
    neostacks/
    sleeves/
    capabilities/
    visual-cards/
```

---

## 10. Phase 1 Tasks

```text
1. Confirm current folder structure.
2. Add missing folders as empty `.gitkeep` where needed.
3. Remove or relocate duplicate/provisional clutter.
4. Ensure public/private boundary docs are clear.
5. Keep placeholders honest.
6. Preserve existing working files.
7. Do not mass-rename thousands of blocks yet unless automated and tested.
```

---

## 11. Phase 1 Done Criteria

Phase 1 is done when:

```text
public folders are predictable
AI/HUMAN split is visible
schemas/manifests/artifacts have expected homes
private runtime dumps are absent
placeholder folders are marked honestly
```

---

# Phase 2 — Schema Alignment

## 12. Goal

Align existing schemas with the foundation contracts without breaking everything at once.

Target schemas:

```text
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
```

---

## 13. Schema Alignment Method

Do not rewrite all schemas blindly.

Use a compatibility approach:

```text
existing schema
  ↓
v0.1 compatibility extension
  ↓
new required fields introduced gradually
  ↓
migration script later
```

Recommended immediate action:

```text
add identity/provenance/integrity to new example artifacts first
then migrate existing artifacts in batches
```

---

## 14. Phase 2 Tasks

```text
1. Create shared identity/provenance schema.
2. Update MOLT block schema with identity/provenance/molt/content/integrity shape.
3. Update NeoBlock schema with composition/geometry/capabilities.
4. Update NeoStack schema with composition/activation/governance/geometry.
5. Update sleeve schema with full sleeve pack contract.
6. Add toolpack schema.
7. Add IR schema.
8. Add RuntimeSpec/Trace minimal schemas.
9. Add validation examples.
```

---

## 15. Phase 2 Done Criteria

Phase 2 is done when:

```text
new artifacts can validate
example MOLT Block validates
example NeoBlock validates
example NeoStack validates
example Sleeve Pack validates
example Tool Pack validates
canonical IR object validates
RuntimeSpec/Trace examples validate
```

---

# Phase 3 — Sleeve Pack Example

## 16. Goal

Create one real reference sleeve pack.

Recommended first sleeve:

```text
SLV.CODER.SERVUO.v1
```

Reason:

```text
It is concrete.
It connects to OpenClaw/Envoy.
It uses NeoBlocks/NeoStacks.
It needs capabilities.
It can demonstrate Relation Matrix and Trace.
```

---

## 17. Reference Sleeve Folder

```text
AI/SLEEVES/categories/coders/SLV.CODER.SERVUO.v1/
  sleeve.json
  README.md
  sleeve.lock.json
  examples/
```

Human mirror:

```text
HUMAN/sleeves/coders/SLV.CODER.SERVUO.v1.md
```

---

## 18. Reference Sleeve Should Include

```text
identity
provenance
status
compatibility
dependencies
composition
routes
governance
overlays
runtime_services
capabilities
toolpacks
activation
local_deltas
examples
docs
integrity
```

---

## 19. Phase 3 Done Criteria

Phase 3 is done when:

```text
one sleeve pack exists
it validates against sleeve schema
it references at least one NeoStack
it declares at least one route
it declares governance
it declares capabilities
it has README
it has Human card
it can be normalized into IR fixture
```

---

# Phase 4 — IR Canonical Object and Builder

## 20. Goal

Implement or define the canonical IR builder.

IR must follow the canonical top-level shape:

```text
ir_version
ir_id
source
profiles
nodes
edges
routes
gates
bundles
overlays
merge_recipes
capabilities
states
diagnostics
source_map
integrity
```

---

## 21. IR Builder Location

Recommended location depends on implementation choice.

Option A — Compiler owns IR builder:

```text
umg-compiler/src/ir/
```

Option B — Envoy builds IR, compiler accepts IR:

```text
umg-envoy-agent/src/ir/
umg-compiler/src/compileIr.ts
```

Recommended v0 approach:

```text
Compiler should own canonical IR validation and compile semantics.
Envoy may have a thin adapter/builder that prepares source bundle.
```

Best practical split:

```text
umg-compiler = canonical IR types + validation + compile from IR
umg-envoy-agent = sleeve loader + artifact resolver + calls compiler
```

---

## 22. Phase 4 Tasks

```text
1. Define TypeScript IR types.
2. Define IR JSON schema.
3. Build source-to-IR normalization for reference sleeve.
4. Emit source_map.
5. Emit diagnostics.
6. Emit integrity fields.
7. Add deterministic sorting.
8. Add tests for stable output.
```

---

## 23. Phase 4 Done Criteria

Phase 4 is done when:

```text
reference sleeve produces valid canonical IR
IR output is deterministic
source_map points back to artifacts
diagnostics are structured
IR can be saved as fixture
IR can be passed to compiler
```

---

# Phase 5 — Compiler RuntimeSpec / Trace Alignment

## 24. Goal

Align `umg-compiler` with the new foundation law.

The compiler should compile valid source/IR into:

```text
RuntimeSpec
Trace
Diagnostics
```

It should remain headless.

---

## 25. Compiler Pipeline Target

Compiler v0 pipeline:

```text
1. Load input sleeve bundle or IR.
2. Validate.
3. Normalize to IR if needed.
4. Apply Off exclusions.
5. Resolve governance/route/gates.
6. Resolve stack order.
7. Resolve horizontal sibling relations.
8. Activate bundles.
9. Apply same-type merges.
10. Apply cross-type typed synthesis.
11. Resolve priority conflicts inside active route.
12. Emit route challenges if needed.
13. Emit RuntimeSpec.
14. Emit Trace.
15. Optionally emit Relation Matrix through adapter.
```

---

## 26. Compiler Must Not

```text
call LLMs
generate final prose
execute tools
mutate files
perform OpenClaw actions
hide inference
silently reroute without Trace
```

---

## 27. Phase 5 Tasks

```text
1. Add or update RuntimeSpec type.
2. Add or update Trace event type.
3. Add route/gate events.
4. Add merge/synthesis events.
5. Add route challenge diagnostic.
6. Add strict/dev behavior.
7. Add canonical sorting tests.
8. Add fixture tests using SLV.CODER.SERVUO.v1.
```

---

## 28. Phase 5 Done Criteria

Phase 5 is done when:

```text
compiler can compile reference sleeve/IR
RuntimeSpec is deterministic
Trace explains route/gate/merge/priority decisions
strict/dev modes behave differently where expected
tests pass
```

---

# Phase 6 — Envoy Sleeve Loader

## 29. Goal

Implement Envoy loading of `sleeve.json`.

Envoy should:

```text
read sleeve.json
validate manifest
validate identity/provenance
check compatibility
collect dependencies
resolve library paths
load local deltas
prepare compiler input
```

---

## 30. Envoy Loader Location

Suggested paths:

```text
umg-envoy-agent/src/sleeves/sleeveLoader.ts
umg-envoy-agent/src/library/librarySourceManager.ts
umg-envoy-agent/src/artifacts/artifactResolver.ts
umg-envoy-agent/src/validation/schemaValidator.ts
```

---

## 31. Phase 6 Tasks

```text
1. Add library source config.
2. Add sleeve loader.
3. Add schema validation.
4. Add artifact resolver.
5. Resolve dependencies from UMG-Block-Library.
6. Detect missing artifact.
7. Detect version/hash mismatch where available.
8. Return resolved sleeve bundle.
```

---

## 32. Phase 6 Done Criteria

Phase 6 is done when:

```text
Envoy can load reference sleeve
Envoy can resolve referenced NeoStack/NeoBlock/block IDs
Envoy can report missing dependencies
Envoy can produce a resolved source bundle for compiler
```

---

# Phase 7 — Envoy Compiler Bridge

## 33. Goal

Connect `umg-envoy-agent` to `umg-compiler`.

Supported bridge modes:

```text
package_import
local_workspace_import
cli_subprocess
```

Recommended first implementation:

```text
local_workspace_import or package_import
```

CLI fallback is useful for debugging.

---

## 34. Bridge Contract

Input:

```text
resolved sleeve bundle or canonical IR
compile options
strictness profile
trigger/runtime state
```

Output:

```text
RuntimeSpec
Trace
Diagnostics
optional Relation Matrix
```

---

## 35. Phase 7 Tasks

```text
1. Add compilerBridge module.
2. Define compile request object.
3. Define compile response object.
4. Call compiler.
5. Store RuntimeSpec.
6. Store Trace.
7. Return diagnostics to command output.
8. Add command: sleeve-compile.
```

---

## 36. Phase 7 Done Criteria

Phase 7 is done when:

```text
umg-envoy sleeve-compile can compile reference sleeve
RuntimeSpec is returned
Trace is returned
diagnostics are visible
failures fail closed
```

---

# Phase 8 — Relation Matrix Emitter

## 37. Goal

Emit Relation Matrix from IR/RuntimeSpec/Trace.

Relation Matrix should be a projection only.

---

## 38. Relation Matrix Location

Suggested paths:

```text
umg-envoy-agent/src/matrix/relationMatrixEmitter.ts
```

or if compiler emits it:

```text
umg-compiler/src/matrix/
```

Recommended v0:

```text
compiler emits RuntimeSpec + Trace
Envoy emits Relation Matrix projection
```

Reason:

Envoy owns runtime state and dashboard needs.

Compiler remains focused.

---

## 39. Phase 8 Tasks

```text
1. Add state code map.
2. Add gate code map.
3. Add relation code map.
4. Emit snapshot from RuntimeSpec/IR.
5. Emit delta between passes if previous state exists.
6. Add command: relation-matrix --active.
7. Add fixture output.
```

---

## 40. Phase 8 Done Criteria

Phase 8 is done when:

```text
reference sleeve compile emits matrix snapshot
matrix uses stable artifact IDs
active/off/standby states are visible
trigger gates are visible
capability lines can appear
diagnostics can appear
```

---

# Phase 9 — Capability / Tool Pack Declaration Lane

## 41. Goal

Add Tool Pack and Capability declaration support without requiring full tool execution.

v0 should validate and bind declarations first.

Execution can come later.

---

## 42. Tool Pack First Target

Recommended first toolpack declaration:

```text
TP.REPO_ANALYSIS.v1
```

Provides:

```text
CAP.REPO.SEARCH
CAP.REPO.READ
```

Optional later:

```text
TP.SERVUO.CODER_TOOLS.v1
TP.MEMORY_RAG.v1
TP.UI_BRIDGE.v1
```

---

## 43. Phase 9 Tasks

```text
1. Add toolpack schema.
2. Add CAP ID registry or catalog.
3. Add TP.REPO_ANALYSIS.v1/toolpack.json.
4. Add capability resolver in Envoy.
5. Read sleeve capability requirements.
6. Match capabilities to installed toolpacks.
7. Emit capability status.
8. Show capability status in RuntimeSpec/Relation Matrix.
9. Do not invoke tools yet unless explicitly enabled.
```

---

## 44. Phase 9 Done Criteria

Phase 9 is done when:

```text
sleeve declares CAP.REPO.SEARCH
toolpack declares it provides CAP.REPO.SEARCH
Envoy marks capability resolved
missing optional capability warns
missing required capability fails or blocks in strict mode
Relation Matrix shows CAP -> TP binding
```

---

# Phase 10 — Diagnostics and Test Fixtures

## 45. Goal

Create deterministic fixtures for the whole v0 chain.

Fixtures should live in:

```text
UMG-Block-Library/AI/FIXTURES/
```

Compiler tests may reference or copy them.

Envoy tests may consume them.

---

## 46. Fixture Set

Recommended fixture folders:

```text
AI/FIXTURES/
  servuo-coder-sleeve/
    input.sleeve.json
    resolved.ir.json
    runtime-spec.json
    trace.json
    relation-matrix.umg
    diagnostics.json
```

---

## 47. Diagnostic Cases

Create fixtures for:

```text
valid sleeve
missing dependency
invalid snap
floating MOLT block
untyped synthesis
missing required capability
route challenge warning
route challenge strict failure
lockfile mismatch
unknown overlay type
```

---

## 48. Phase 10 Done Criteria

Phase 10 is done when:

```text
happy-path fixture exists
at least three failure fixtures exist
compiler tests use fixtures
Envoy loader tests use fixtures
diagnostics are stable and readable
```

---

# Phase 11 — Human Cards and Indexes

## 49. Goal

Create browsable Human documentation for the example artifacts.

Start small.

Do not generate every card yet.

---

## 50. First Human Cards

Create:

```text
HUMAN/sleeves/coders/SLV.CODER.SERVUO.v1.md
HUMAN/neostacks/coders/NS.CODER.SERVUO.MASTER.v1.md
HUMAN/neoblocks/coders/NB.SERVUO.FILE_SCAN.v1.md
HUMAN/capabilities/toolpacks/TP.REPO_ANALYSIS.v1.md
```

Indexes:

```text
HUMAN/INDEXES/Sleeve-Index.md
HUMAN/INDEXES/NeoStack-Index.md
HUMAN/INDEXES/NeoBlock-Index.md
HUMAN/INDEXES/ToolPack-Index.md
```

---

## 51. Phase 11 Done Criteria

Phase 11 is done when:

```text
example sleeve has a Human card
example NeoStack has a Human card
example NeoBlock has a Human card
example Tool Pack has a Human card
indexes link to cards and source JSON
Human cards do not contradict source JSON
```

---

# Phase 12 — Private Resleever Mirror and Promotion Workflow

## 52. Goal

Make private Resleever mirror the public library shape without forcing identical content.

Resleever should be private/testing.

Public Block Library should remain curated.

---

## 53. Resleever Mirror Structure

Recommended:

```text
UMG_Envoy_Resleever/
  AI/
    BLOCKS/
    NEOBLOCKS/
    NEOSTACKS/
    SLEEVES/
    CAPABILITIES/
    FIXTURES/
  HUMAN/
  runtime/
  traces/
  staging/
  promotion-candidates/
```

If existing structure differs, do not break working runtime blindly.

Add adapters or staging folders first.

---

## 54. Promotion Workflow Implementation

Implement a manual checklist first:

```text
1. Validate artifact.
2. Compile if applicable.
3. Review RuntimeSpec/Trace.
4. Sanitize private data.
5. Add identity/provenance.
6. Add content hash placeholder or real hash.
7. Add Human card.
8. Copy to public Block Library.
9. Update catalog.
10. Mark status.
```

Automation can come later.

---

## 55. Phase 12 Done Criteria

Phase 12 is done when:

```text
Resleever has a staging/promotion lane
public/private boundary is clear
one artifact can move from Resleever candidate to public library by checklist
private traces do not leak into public
```

---

# Phase 13 — v0 Release Candidate

## 56. Goal

Stabilize a narrow working v0 release.

The release candidate should demonstrate:

```text
one reference sleeve
one reference NeoStack
several reference NeoBlocks
several MOLT Blocks
one Tool Pack declaration
canonical IR
RuntimeSpec
Trace
Relation Matrix
Envoy loader
Compiler bridge
Diagnostics
Human cards
```

---

## 57. Release Candidate Command Flow

Ideal demo flow:

```bash
umg-envoy sleeve-validate --path AI/SLEEVES/categories/coders/SLV.CODER.SERVUO.v1
umg-envoy sleeve-compile --path AI/SLEEVES/categories/coders/SLV.CODER.SERVUO.v1
umg-envoy relation-matrix --active
umg-envoy runtime-status
umg-envoy capability-status
```

Compiler standalone:

```bash
umg compile --in AI/FIXTURES/servuo-coder-sleeve/input.sleeve.json --pretty
```

---

## 58. v0 Release Candidate Done Criteria

v0 RC is done when:

```text
all target commands work or have documented placeholders
reference sleeve compiles
RuntimeSpec/Trace/Relation Matrix are emitted
schemas validate example artifacts
capability binding is visible
tool execution is not required
public/private boundary is preserved
tests/fixtures exist
docs link together
```

---

# Implementation Order by Repository

## 59. UMG-Block-Library Tasks

Priority order:

```text
1. Add foundation doctrine docs.
2. Clean folder structure.
3. Add/update schemas.
4. Add identity/provenance schema.
5. Add reference sleeve pack.
6. Add reference NeoStack/NeoBlocks/blocks.
7. Add Tool Pack declaration.
8. Add fixtures.
9. Add Human cards.
10. Add indexes/catalog updates.
```

---

## 60. umg-compiler Tasks

Priority order:

```text
1. Add canonical IR types/schema support.
2. Align RuntimeSpec type.
3. Align Trace type/events.
4. Add route/gate handling.
5. Add typed synthesis validation.
6. Add route challenge diagnostic.
7. Add dev/strict behavior.
8. Add fixture tests.
9. Keep compiler headless.
```

---

## 61. umg-envoy-agent Tasks

Priority order:

```text
1. Preserve public-safe lane.
2. Add developer-local sleeve validate command.
3. Add sleeve loader.
4. Add artifact resolver.
5. Add compiler bridge.
6. Add RuntimeSpec/Trace stores.
7. Add Relation Matrix emitter.
8. Add capability resolver.
9. Add Tool Pack registry without execution.
10. Add runtime-status/capability-status commands.
```

---

## 62. UMG_Envoy_Resleever Tasks

Priority order:

```text
1. Make private if possible.
2. Mirror public structure where practical.
3. Add staging/promotion folders.
4. Keep private traces/runtime state private.
5. Use reference sleeve as test.
6. Promote only sanitized artifacts.
```

---

# Validation Strategy

## 63. Validation Layers

Validation should happen at multiple layers:

```text
schema validation
artifact reference validation
identity/provenance validation
dependency validation
IR canonical validation
compiler validation
RuntimeSpec validation
Relation Matrix validation
capability binding validation
public/private safety validation
```

---

## 64. Recommended Validators

Create validators for:

```text
validate:molt-block
validate:neoblock
validate:neostack
validate:sleeve
validate:toolpack
validate:ir
validate:runtime-spec
validate:trace
validate:relation-matrix
validate:public-safety
```

---

## 65. Test Philosophy

Tests should prove:

```text
determinism
source-map traceability
stable IDs
valid route selection
valid Off behavior
valid typed synthesis
valid diagnostics
valid capability binding
no private data leakage in public fixtures
```

---

# Minimal First Working Slice

## 66. First Slice

The smallest useful slice is:

```text
one sleeve
one NeoStack
three NeoBlocks
seven MOLT Blocks
one route
one governance overlay
one Tool Pack declaration
one capability
one IR fixture
one RuntimeSpec fixture
one Trace fixture
one Relation Matrix fixture
one Envoy compile command
```

This is the recommended first implementation target.

---

## 67. Suggested First Slice Objects

```text
SLV.CODER.SERVUO.v1

NS.CODER.SERVUO.MASTER.v1

NB.SERVUO.REQUEST_INTAKE.v1
NB.SERVUO.REPO_CONTEXT.v1
NB.SERVUO.FILE_SCAN.v1

BLK.TRIGGER.CODING.CODE_PATCH_REQUEST.v1
BLK.DIRECTIVE.CODING.PATCH_TASK.v1
BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1
BLK.SUBJECT.SERVUO.FILE_SYSTEM.v1
BLK.PRIMARY.CODING.ACTIVE_PATCH_OBJECT.v1
BLK.PHILOSOPHY.SAFETY.PRESERVE_USER_WORK.v1
BLK.BLUEPRINT.CODING.PATCH_REPORT.v1

OVR.GOV.CODE_ROUTER.v1

TP.REPO_ANALYSIS.v1
CAP.REPO.SEARCH
CAP.REPO.READ
```

---

# Deferred Work

## 68. Defer Until After v0

```text
full visual drag/drop editing
public creator economy enforcement
token mechanics
advanced anti-abuse scoring
multi-priority-profile runtime
complex multi-agent orchestration
public registry
automatic publishing portal
large-scale block migration
full tool execution automation
browser/UI control tools
remote marketplace
```

Reserve hooks.

Do not implement now.

---

# Risk Register

## 69. Main Risks

### Risk 1 — Schema Overreach

Trying to fully migrate 2,000 blocks immediately could stall the build.

Mitigation:

```text
start with reference artifacts and migration scripts later
```

### Risk 2 — Envoy Becomes Compiler

Envoy may duplicate compiler logic.

Mitigation:

```text
Envoy loads/resolves; compiler resolves semantics
```

### Risk 3 — Block Library Becomes Runtime Dump

Public repo may collect private traces/state.

Mitigation:

```text
fixtures only, sanitized examples only
```

### Risk 4 — Tool Execution Too Early

Tool execution may introduce safety and debugging complexity.

Mitigation:

```text
v0 validates and binds Tool Packs, but execution is optional/later
```

### Risk 5 — Visual UI Before Data Model

Building graph UI before IR/RuntimeSpec stabilizes may cause brittle UI logic.

Mitigation:

```text
render existing artifacts first; edit later
```

### Risk 6 — Creator Economy Premature

Reward mechanics too early can distort architecture.

Mitigation:

```text
identity/provenance/usage hooks now; rewards later
```

---

# Milestone Table

## 70. Milestones

| Milestone | Output | Primary Repo |
|---|---|---|
| M0 | Foundation docs placed | UMG-Block-Library |
| M1 | Clean public folder structure | UMG-Block-Library |
| M2 | Schema contracts aligned | UMG-Block-Library |
| M3 | Reference sleeve pack | UMG-Block-Library |
| M4 | Canonical IR fixture | UMG-Block-Library / compiler |
| M5 | Compiler emits RuntimeSpec + Trace | umg-compiler |
| M6 | Envoy loads sleeve | umg-envoy-agent |
| M7 | Envoy calls compiler | umg-envoy-agent |
| M8 | Relation Matrix emitted | umg-envoy-agent |
| M9 | Capability binding visible | umg-envoy-agent |
| M10 | Fixtures/tests pass | all relevant |
| M11 | Human cards/indexes exist | UMG-Block-Library |
| M12 | Resleever promotion path | Resleever |
| M13 | v0 release candidate | all |

---

# Practical Next Five Actions

## 71. Immediate Actions

The best immediate build sequence is:

```text
1. Commit the foundation docs to UMG-Block-Library/AI/DOCTRINE/.
2. Update UMG-Block-Library folder structure and doctrine index.
3. Create the reference sleeve pack: SLV.CODER.SERVUO.v1.
4. Create minimal valid schemas for sleeve, IR, RuntimeSpec, Trace, and Tool Pack.
5. Implement Envoy sleeve-validate before sleeve-compile.
```

This avoids starting with the hardest code first.

---

# Agent Instruction Template

## 72. Instruction for an OpenClaw/Codex Agent

Use this when assigning implementation:

```text
TASK
Implement UMG v0 foundation alignment in staged order.

RULES
- Do not collapse repo responsibilities.
- Keep UMG-Block-Library as public artifact library.
- Keep umg-compiler headless and deterministic.
- Keep umg-envoy-agent as runtime vehicle.
- Do not expose private Resleever/runtime state publicly.
- Do not implement token economy.
- Do not implement full visual editor.
- Do not execute tools in v0 unless explicitly requested.
- Preserve fail-closed behavior.

STAGE
Start with foundation docs placement, folder cleanup, schemas, and one reference sleeve pack.

OUTPUT
Provide changed files, summary, validation commands, and unresolved questions.
```

---

# v0 Definition of Done

## 73. Final v0 Definition of Done

UMG v0 is done when:

```text
foundation docs are placed
public library structure is clean
schemas validate reference artifacts
one sleeve pack exists
one NeoStack exists
several NeoBlocks exist
MOLT Blocks compose into NeoBlocks
sleeve compiles into canonical IR
compiler emits RuntimeSpec
compiler emits Trace
Envoy can load the sleeve
Envoy can call the compiler
Relation Matrix is emitted
capabilities/toolpacks are declared and binding status is visible
diagnostics are structured
Human cards explain reference artifacts
public/private boundary is preserved
tests/fixtures prove deterministic behavior
```

---

## 74. Summary

The v0 roadmap is deliberately narrow.

It does not try to build all future UMG.

It builds the spine:

```text
Library → Sleeve → IR → Compiler → RuntimeSpec + Trace → Envoy → Relation Matrix → Capability Status
```

Once that works, UMG has a real foundation.

Then later versions can safely add:

```text
visual editing
tool execution
public submissions
creator economy
registry
advanced overlays
multi-agent orchestration
```

The correct next engineering move is not more theory.

It is a small, working, deterministic reference slice.

That reference slice should be:

```text
ServUO Coder Sleeve
```

because it touches the important lanes without requiring the entire future ecosystem.
