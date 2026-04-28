# Section 8 — Envoy Runtime Integration v0.1

**Document ID:** `UMG_ENVOY_RUNTIME_INTEGRATION.v0.1`  
**Status:** Foundation draft  
**Layer:** Runtime host / OpenClaw plugin integration / compiler bridge / tool binding  
**Depends on:** `UMG_COMPILER_LAW.v0.3`, `UMG_IR.v0.1`, `UMG_RELATION_MATRIX.v0.1`, `UMG_SLEEVE_PACK_CONTRACT.v0.1`, `UMG_TOOLPACK_CAPABILITY_CONTRACT.v0.1`  
**Feeds into:** UMG Envoy Agent implementation, OpenClaw plugin surface, runtime state, compiler bridge, tool binding, trace storage, visual dashboard  

---

## 1. Purpose

This document defines how **UMG Envoy Agent** integrates the UMG library, sleeve packs, compiler, IR, RuntimeSpec, Trace, Relation Matrix, and Tool Packs into an operational runtime.

The Envoy Agent is the vehicle.

It is the layer that:

- receives user/API/LLM requests;
- loads sleeve packs;
- resolves artifacts from public/private/local libraries;
- builds or receives UMG IR;
- calls/imports the UMG Compiler;
- receives RuntimeSpec and Trace;
- stores active runtime state;
- emits Relation Matrix snapshots/deltas;
- resolves capabilities to Tool Packs;
- invokes tools through OpenClaw/runtime permissions;
- records runtime/tool trace.

Envoy is not the compiler.

Envoy is not the block library.

Envoy is not a sleeve.

Envoy is the runtime host and bridge.

---

## 2. Core Runtime Chain

The operational flow is:

```text
LLM / API / Mind
        ↓
UMG Envoy Agent / OpenClaw Plugin
        ↓
Sleeve Loader
        ↓
Library Resolver
        ↓
UMG IR Builder
        ↓
UMG Compiler Bridge
        ↓
RuntimeSpec + Compiler Trace
        ↓
Runtime Activator
        ↓
Capability Resolver
        ↓
Tool Pack Binder / OpenClaw Tool Runner
        ↓
Runtime Trace + Tool Trace + Relation Matrix
```

The concise form:

```text
Mind enters Envoy.
Envoy loads sleeve.
Envoy resolves library references.
Envoy builds IR.
Envoy calls compiler.
Compiler emits RuntimeSpec + Trace.
Envoy activates RuntimeSpec.
Envoy resolves tools.
Envoy runs allowed tools.
Trace records everything important.
```

---

## 3. Envoy Role

Envoy is responsible for runtime orchestration.

Envoy should:

```text
load sleeves
resolve artifacts
validate package compatibility
build UMG IR
call/import compiler
receive RuntimeSpec
receive compiler Trace
store active runtime state
emit Relation Matrix
resolve Tool Packs
invoke tools only after permission/safety validation
record runtime and tool trace
expose bounded OpenClaw commands
```

Envoy should not:

```text
silently rewrite compiler law
execute unvalidated tools
treat sleeves as executable code
treat Relation Matrix as source of truth
duplicate full block library logic
hide trace decisions
silently widen public command surface
```

---

## 4. Existing Envoy Posture

The current public UMG Envoy Agent is already described as a modular cognitive runtime for OpenClaw with a bounded public-safe interface for parsing, validating, rendering, and building human-inspectable planner paths.

The current public package intentionally excludes the full internal compiler/governance runtime, rollback/promotion lanes, and operator-heavy surfaces.

This Section 8 describes the **target runtime integration lane**, not an instruction to suddenly widen the current public-safe package without review.

The existing fail-closed posture should remain.

---

## 5. Runtime Lane Separation

Envoy may support multiple lanes.

Recommended lanes:

```text
public_safe
developer_local
private_resleever
internal_operator
future_registry
```

### `public_safe`

Bounded commands, reviewable outputs, fail-closed.

### `developer_local`

Local testing of compiler bridge, sleeve loader, IR output, trace output, and Tool Pack binding.

### `private_resleever`

Private personal/runtime testbed with private sleeves, experimental blocks, traces, and local state.

### `internal_operator`

Advanced operator lane for rollback, promotion, scaffold, migration, deeper traces, and runtime control.

### `future_registry`

Future public ecosystem/marketplace/registry lane.

Rule:

```text
Do not expose internal lanes through public-safe commands unless deliberately widened, documented, and permissioned.
```

---

## 6. Main Runtime Modules

Envoy runtime should be organized around these modules:

```text
Config Loader
Library Source Manager
Sleeve Loader
Schema Validator
Artifact Resolver
Lockfile Resolver
IR Builder
Compiler Bridge
RuntimeSpec Store
Trace Store
Relation Matrix Emitter
Governance Runtime
Capability Resolver
Tool Pack Registry
Tool Runner
Permission/Safety Guard
Runtime State Manager
Command Surface
Diagnostics Reporter
```

These modules may be separate files/classes later.

For v0, they can be simple functions if the boundaries remain clear.

---

## 7. Config Loader

Config Loader reads Envoy/OpenClaw configuration.

It should know:

```text
default sleeve ID
library source paths
public/private mode
compiler bridge mode
trace storage mode
toolpack directories
strictness profile
relation matrix setting
```

Example config concept:

```json
{
  "defaultSleeveId": "SLV.CODER.SERVUO.v1",
  "librarySources": [
    {
      "id": "UMG-Block-Library",
      "type": "local_path",
      "path": "C:/UMG/UMG-Block-Library"
    }
  ],
  "compiler": {
    "mode": "package_import",
    "package": "umg-compiler-v0"
  },
  "runtime": {
    "emitRelationMatrix": true,
    "strictness": "dev"
  }
}
```

---

## 8. Library Source Manager

Library Source Manager tracks where artifacts may be loaded from.

Possible sources:

```text
public UMG Block Library
private Resleever
local user library
imported sleeve folder
imported ZIP/package
installed Tool Pack folder
future registry/web source
```

Every source should have:

```text
id
type
path or URL
trust level
read/write permission
priority
```

Example:

```json
{
  "id": "local-user-library",
  "type": "local_path",
  "path": "C:/Users/Magne/UMG/library",
  "trust": "private",
  "permissions": ["read"],
  "priority": 20
}
```

---

## 9. Sleeve Loader

Sleeve Loader reads `sleeve.json`.

It should:

```text
read manifest
validate top-level fields
load README metadata if needed
validate identity/provenance
validate compatibility
collect dependencies
collect routes
collect governance settings
collect capability requirements
collect local deltas
prepare diagnostics
```

Sleeve Loader does not compile by itself.

It prepares input for artifact resolution and IR building.

---

## 10. Schema Validator

Schema Validator should validate:

```text
sleeve manifest
MOLT blocks
NeoBlocks
NeoStacks
Tool Packs
capability declarations
lockfile
IR object
```

Validation should produce diagnostics.

Validation should not silently repair unknown semantics.

Recommended behavior:

```text
invalid required field = error
unsupported semantics in public-safe mode = fail closed
unknown optional field = warning or ignored with trace
invalid tool permission = unavailable
```

---

## 11. Artifact Resolver

Artifact Resolver resolves IDs to concrete artifacts.

It receives dependency IDs from sleeve/NeoStack/NeoBlock manifests.

It searches library sources by priority.

Example resolution:

```text
SLV.CODER.SERVUO.v1
  requires NS.CODER.SERVUO.MASTER.v1
    requires NB.SERVUO.FILE_SCAN.v1
      requires BLK.INSTRUCTION.CODING.SCAN_CLASSES.v1
```

Resolver output should include:

```text
artifact ID
artifact type
version
source path
source origin
content hash
package hash if relevant
diagnostics
```

Resolver should detect:

```text
missing artifact
duplicate ID collision
version mismatch
hash mismatch
untrusted source
deprecated artifact
private artifact in public mode
```

---

## 12. Lockfile Resolver

Lockfile Resolver reads `sleeve.lock.json` when present.

It should determine:

```text
which exact artifact versions/hashes resolved
whether dependencies are pinned
whether current library state matches lockfile
whether drift occurred
whether compile should continue
```

Recommended behavior:

```text
lockfile absent = allowed in dev/draft mode
lockfile mismatch = warning in dev mode
lockfile mismatch = error in strict/promoted mode
```

---

## 13. IR Builder

IR Builder converts resolved source artifacts into canonical UMG IR.

It must use the canonical form defined by the IR amendment.

It should produce:

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

IR Builder should not execute tools.

IR Builder should not generate final content.

It normalizes structure for the compiler.

---

## 14. Compiler Bridge

Compiler Bridge calls or imports the UMG Compiler.

Possible bridge modes:

```text
package_import
local_workspace_import
cli_subprocess
service_call
mock_test_adapter
```

Recommended early modes:

```text
package_import
local_workspace_import
cli_subprocess
```

The compiler repository already frames the compiler as a headless library, CLI, or embedded compiler that compiles Sleeve JSON into deterministic RuntimeSpec and Trace. This supports the bridge model.

Compiler Bridge input:

```text
canonical sleeve bundle or UMG IR
trigger/runtime state
strictness profile
optional compile options
```

Compiler Bridge output:

```text
RuntimeSpec
Compiler Trace
Diagnostics
```

Rule:

```text
Compiler Bridge may adapt input/output shape.
It may not alter compiler law.
```

---

## 15. RuntimeSpec Store

RuntimeSpec Store keeps the active compiled output.

It should track:

```text
active RuntimeSpec
previous RuntimeSpec
RuntimeSpec version/hash
active sleeve ID
active route
active NeoStacks
active capabilities
warnings/errors
created_at
```

RuntimeSpec should be available for:

```text
runtime activation
debugging
Relation Matrix projection
visual dashboard
tool binding
trace review
```

---

## 16. Trace Store

Trace Store stores compiler, runtime, and tool traces.

Trace types:

```text
compiler_trace
runtime_trace
tool_trace
diagnostic_trace
route_trace
capability_trace
```

Trace Store should support:

```text
append event
read recent events
filter by pass_id
filter by route
filter by artifact_id
export sanitized trace
```

Trace should record:

```text
source loaded
schema validated
artifact resolved
route selected
gate fired/opened/closed
bundle activated
stack activated/offed
merge performed
priority conflict resolved
route challenge emitted
capability required/resolved/missing
tool invoked/completed/failed
RuntimeSpec created
Relation Matrix emitted
```

---

## 17. Relation Matrix Emitter

Relation Matrix Emitter projects IR/runtime state into compact text.

It should produce:

```text
UMG_RELATION_MATRIX v0.1
UMG_RELATION_DELTA v0.1
```

Input:

```text
IR
RuntimeSpec
Trace events
Runtime state
```

Output:

```text
matrix snapshot
matrix delta
diagnostics if invalid
```

Rule:

```text
Relation Matrix is projection only.
IR and RuntimeSpec remain authoritative.
```

---

## 18. Governance Runtime

Governance Runtime handles route selection and route challenges.

It should:

```text
classify situation
select active route
open/close trigger gates
activate selected NeoStacks
off irrelevant NeoStacks
emit route trace
handle priority challenge diagnostics
confirm or reroute when needed
```

Governance is authoritative over route membership.

Priority resolves conflicts inside active route.

Priority may challenge governance, but may not silently reroute.

---

## 19. Capability Resolver

Capability Resolver collects capability requirements from:

```text
Sleeve
NeoStack
NeoBlock
Tool Pack manifest
RuntimeSpec
```

It resolves them against installed Tool Packs.

Output:

```json
{
  "capability_id": "CAP.REPO.SEARCH",
  "required": true,
  "status": "resolved",
  "satisfied_by": "TP.REPO_ANALYSIS.v1",
  "tool_id": "repo.search",
  "permission_status": "approved"
}
```

Missing required capability:

```text
block activation or runtime action
emit diagnostic
fail closed if required
```

Missing optional capability:

```text
emit warning
continue degraded
```

---

## 20. Tool Pack Registry

Tool Pack Registry knows installed Tool Packs.

It should index:

```text
toolpack ID
version
source path
provided capabilities
tools
permissions
risk levels
side-effect levels
compatibility
safety metadata
```

Registry should reject or mark unavailable:

```text
invalid manifest
missing safety metadata
unsupported runtime
missing permission
untrusted source
public mode incompatible tool
```

---

## 21. Tool Runner

Tool Runner invokes tools after validation.

Invocation preconditions:

```text
active route selected
capability required by active route/runtime
Tool Pack resolved
permission approved
safety policy passed
input schema validated
trace event emitted
```

If preconditions fail:

```text
do not invoke
emit diagnostic
fail closed if required
```

Tool Runner should return structured results:

```json
{
  "tool_id": "repo.search",
  "status": "completed",
  "output": {},
  "summary": "Found 12 matching files.",
  "trace_id": "TRACE.TOOL.0001"
}
```

---

## 22. Permission / Safety Guard

Permission/Safety Guard evaluates risk before tool invocation.

It should check:

```text
side-effect level
risk level
required permissions
runtime mode
public/private lane
user confirmation requirement
secret redaction requirement
scope limits
```

Rule:

```text
Unknown safety posture = unavailable.
```

---

## 23. Runtime State Manager

Runtime State Manager tracks active operational state.

It should track:

```text
active sleeve
active route
active RuntimeSpec
active IR
active Relation Matrix
active capabilities
active Tool Packs
runtime pass ID
last trace event
warnings/errors
```

State should be explicit, serializable, and inspectable.

---

## 24. Command Surface

Envoy should expose commands according to lane.

Existing public-safe commands include:

```text
status
parse-path
validate-path
render-path
build-path
matrix-status
```

Future runtime lane commands may include:

```text
sleeve-list
sleeve-load
sleeve-validate
sleeve-compile
sleeve-activate
runtime-status
runtime-trace
relation-matrix
capability-status
toolpack-list
toolpack-validate
```

Public-safe lane should remain narrow until intentionally widened.

Developer/private lane may expose more.

---

## 25. Proposed v0.3 Runtime Commands

Recommended early target commands:

```text
umg-envoy sleeve-validate --path <sleeve-folder>
umg-envoy sleeve-compile --path <sleeve-folder>
umg-envoy runtime-status
umg-envoy relation-matrix --active
umg-envoy capability-status
```

Do not start with destructive tool execution.

Start with load, validate, compile, inspect.

---

## 26. Runtime Pass

A runtime pass is one cycle of active processing.

Pass may include:

```text
input received
sleeve selected
route selected
IR built
compiler called
RuntimeSpec emitted
Relation Matrix emitted
capabilities resolved
tools optionally invoked
trace appended
```

Every pass should have:

```text
pass_id
sleeve_id
route_id
runtime_spec_id
trace_id
timestamp
status
```

---

## 27. Runtime Pass Object

Example:

```json
{
  "pass_id": "PASS.000021",
  "sleeve_id": "SLV.CODER.SERVUO.v1",
  "route_id": "route.normal_code_patch",
  "ir_id": "IR.SLV.CODER.SERVUO.v1.000021",
  "runtime_spec_id": "RTS.SLV.CODER.SERVUO.v1.000021",
  "trace_id": "TRACE.PASS.000021",
  "status": "completed_with_warnings",
  "started_at": "2026-04-27T00:00:00Z",
  "completed_at": "2026-04-27T00:00:02Z"
}
```

---

## 28. RuntimeSpec Activation

RuntimeSpec activation should:

```text
set active sleeve
set active route
set active NeoStacks
set active NeoBlocks
set active overlays
set active bundles
set capability requirements
set diagnostics
emit activation trace
emit Relation Matrix
```

Activation should not automatically run tools.

Tool invocation requires an explicit runtime action.

---

## 29. Trace Event Shape

Recommended trace event:

```json
{
  "id": "TRACE.000001",
  "pass_id": "PASS.000021",
  "event": "route.selected",
  "level": "info",
  "artifact_ids": [
    "SLV.CODER.SERVUO.v1",
    "NS.CODER.SERVUO.MASTER.v1"
  ],
  "message": "Selected normal code patch route.",
  "timestamp": "2026-04-27T00:00:00Z",
  "metadata": {}
}
```

Trace should use artifact IDs, not loose display names.

---

## 30. Diagnostics Reporter

Diagnostics Reporter presents warnings/errors.

Diagnostic sources:

```text
schema validation
artifact resolution
lockfile resolution
IR normalization
compiler
governance routing
priority challenge
capability resolution
tool safety
tool execution
Relation Matrix validation
```

Diagnostics should be visible through command output, trace, and dashboard.

---

## 31. Public vs Private Trace

Public-safe trace should be sanitized.

Private/local trace may be more detailed.

Suggested trace visibility:

```text
public_safe = summary/redacted
developer_local = detailed
private_resleever = full local detail
internal_operator = full operator detail
```

Never expose:

```text
tokens
API keys
private machine paths unless user allows
secret file contents
raw private traces
unredacted tool inputs/outputs
```

---

## 32. Integration with Block Library

Envoy should treat UMG Block Library as an artifact source.

It should load:

```text
schemas
manifests
blocks
NeoBlocks
NeoStacks
sleeves
toolpack declarations
examples
fixtures
```

Envoy should not turn the Block Library into a runtime state dump.

Block Library supplies artifacts.

Envoy runs.

---

## 33. Integration with Private Resleever

Private Resleever may use the same structure as the public Block Library but include:

```text
private sleeves
experimental blocks
private tool declarations
runtime state
local traces
promotion candidates
personal agent configs
```

Envoy can load from Resleever as a private library source.

Public architecture should not depend on Resleever.

---

## 34. Integration with Compiler

Envoy should integrate compiler as one of:

```text
npm/package import
local workspace import
CLI subprocess
future local service
```

Recommended early approach:

```text
package import or local workspace import during dev
CLI fallback for testing
```

Compiler remains canonical.

Envoy should not copy compiler logic unless creating a thin adapter.

---

## 35. Integration with Tool Packs

Envoy should load Tool Packs from configured directories.

It should:

```text
read toolpack.json
validate manifest
check compatibility
index provided capabilities
check permissions/safety
bind capabilities when requested
invoke tools only through Tool Runner
record trace
```

Tool Packs may live inside Envoy repo initially.

They may later move to their own repository or registry.

---

## 36. Integration with Visual Dashboard

Envoy should eventually provide dashboard data:

```text
active sleeve
active route
active RuntimeSpec
active Trace
Relation Matrix
active NeoStacks
active capabilities
Tool Pack bindings
diagnostics
```

The visual dashboard should be downstream of Envoy runtime state.

It should not invent runtime state.

---

## 37. Minimal v0 Implementation Target

A realistic v0 Envoy runtime integration should support:

```text
load sleeve.json
validate sleeve manifest
resolve referenced artifacts from local/public library
build canonical UMG IR
call compiler
receive RuntimeSpec + Trace
emit Relation Matrix snapshot
show runtime status
show diagnostics
resolve capability requirements without executing tools
```

Do not require tool invocation in the first pass.

---

## 38. v0.3 Suggested File Modules

Suggested TypeScript-oriented module names:

```text
src/config/envoyConfig.ts
src/library/librarySourceManager.ts
src/sleeves/sleeveLoader.ts
src/validation/schemaValidator.ts
src/artifacts/artifactResolver.ts
src/locks/lockfileResolver.ts
src/ir/irBuilder.ts
src/compiler/compilerBridge.ts
src/runtime/runtimeSpecStore.ts
src/trace/traceStore.ts
src/matrix/relationMatrixEmitter.ts
src/governance/governanceRuntime.ts
src/capabilities/capabilityResolver.ts
src/toolpacks/toolPackRegistry.ts
src/tools/toolRunner.ts
src/safety/permissionSafetyGuard.ts
src/runtime/runtimeStateManager.ts
src/commands/index.ts
```

These names are planning suggestions, not mandatory.

---

## 39. Fail-Closed Rules

Envoy should fail closed for:

```text
invalid sleeve manifest
missing required artifact
invalid IR canonical shape
compiler failure
untyped synthesis
unresolved route challenge in strict mode
missing required capability
unsafe Tool Pack
invalid tool input
unsupported public-lane command
```

In dev mode, some may emit warnings and continue deterministically.

In public-safe mode, unsupported widened behavior should fail closed.

---

## 40. Runtime Output Bundle

A compile/activation pass may produce:

```text
runtimeSpec.json
compiler.trace.json
runtime.trace.json
relation.matrix.umg
relation.delta.umg
diagnostics.json
capability-status.json
```

This output can support debugging, dashboard views, and future fixtures.

---

## 41. Acceptance Criteria

Section 8 is complete when Envoy runtime can be described as able to:

```text
load sleeves
validate manifests
resolve artifact dependencies
respect lockfiles
build canonical IR
call/import compiler
receive RuntimeSpec
receive compiler Trace
activate RuntimeSpec
track runtime state
emit Relation Matrix
resolve capability requirements
bind Tool Packs
guard tool invocation
record runtime/tool trace
fail closed on unsupported or unsafe states
expose lane-appropriate commands
```

---

## 42. Non-Goals for v0.1

This section does not implement:

```text
full public marketplace
full visual node studio
final Tool Pack registry
final OpenClaw command list
sub-agent orchestration
crypto/reward logic
automatic promotion/rollback
full internal operator lane
raw bridge provenance exposure
```

It defines the runtime integration contract.

---

## 43. Summary

UMG Envoy Agent is the runtime vehicle.

It connects the mind, library, sleeve, compiler, tools, and trace.

```text
Block Library supplies artifacts.
Sleeve declares configuration.
Envoy loads and resolves.
IR normalizes.
Compiler structures.
RuntimeSpec activates.
Tool Packs execute.
Trace explains.
Relation Matrix maps state.
```

Envoy must preserve boundaries:

```text
Compiler remains canonical resolver.
Sleeves remain declarative.
Tool Packs contain executable ability.
Block Library remains artifact source.
Relation Matrix remains projection.
Trace remains explanation.
```

This keeps UMG operational without making the runtime opaque or brittle.
