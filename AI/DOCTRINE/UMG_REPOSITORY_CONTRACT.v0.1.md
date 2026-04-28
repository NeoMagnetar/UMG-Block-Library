# Section 9 — Block Library and Repository Contract v0.1

**Document ID:** `UMG_REPOSITORY_CONTRACT.v0.1`  
**Status:** Foundation draft  
**Layer:** Repository roles / public-private boundary / promotion workflow / source-of-truth rules  
**Depends on:** `UMG_COMPILER_LAW.v0.3`, `UMG_IR.v0.1`, `UMG_SLEEVE_PACK_CONTRACT.v0.1`, `UMG_ENVOY_RUNTIME_INTEGRATION.v0.1`  
**Feeds into:** repo cleanup, folder contracts, schema placement, public/private promotion lanes, Envoy loader configuration, compiler bridge planning  

---

## 1. Purpose

This document defines the repository contract for the UMG ecosystem.

It answers:

- what each repo is for;
- what each repo is not for;
- where source artifacts live;
- where runtime state lives;
- where compiler logic lives;
- where Envoy/OpenClaw runtime integration lives;
- how public and private libraries mirror shape without necessarily mirroring content;
- how artifacts move from private/testing into public/canonical form.

The purpose is to prevent repo drift, duplicated authority, accidental private-state leaks, and brittle implementation.

---

## 2. Core Repository Map

The current UMG repo ecosystem should use this high-level separation:

```text
UMG-Block-Library
  = public curated artifact/library surface

umg-compiler
  = canonical deterministic compiler

umg-envoy-agent
  = OpenClaw/Envoy runtime vehicle/plugin

UMG_Envoy_Resleever
  = private personal runtime homebase and testing mirror

local user libraries
  = user-owned blocks/sleeves/toolpacks

imported sleeve packs
  = portable external packages

future registry
  = optional later public discovery/distribution layer
```

---

## 3. Prime Rule

```text
Do not merge repo responsibilities just because the system is connected.
```

UMG works because the roles are separated:

```text
Library supplies artifacts.
Sleeve declares configuration.
Compiler resolves structure.
Envoy runs the system.
Tool Packs execute capabilities.
Resleever tests privately.
Trace explains.
```

---

## 4. UMG-Block-Library Role

`UMG-Block-Library` is the public, curated artifact library.

It should contain:

```text
public MOLT Blocks
public NeoBlocks
public NeoStacks
public Sleeve Packs
public Tool Pack declarations
schemas
manifests
examples
fixtures
human-readable cards
doctrine/reference docs
public-safe golden RuntimeSpec/Trace examples
```

It should not contain:

```text
live private runtime state
raw personal traces
private agent logs
secrets
runtime backups
local machine paths
operator-only rollback history
private sleeves unless intentionally promoted
unreviewed executable tool code as public-safe
```

It may contain runtime/trace **contracts, schemas, fixtures, and sanitized examples**.

It should not be the live runtime homebase.

---

## 5. UMG-Block-Library Public Boundary

The public Block Library should be:

```text
curated
partial but honest
schema-forward
human-browsable
AI-loadable
compiler-ready
public-safe
```

It may be incomplete.

It should not pretend to be exhaustive.

Public quality matters more than artificial completeness.

---

## 6. UMG-Block-Library Folder Contract

Recommended top-level shape:

```text
UMG-Block-Library/
  README.md
  START-HERE.md
  META/
  AI/
  HUMAN/
  docs/
```

Recommended `AI/` shape:

```text
AI/
  SCHEMAS/
  MANIFESTS/
  BLOCKS/
  NEOBLOCKS/
  NEOSTACKS/
  SLEEVES/
  CAPABILITIES/
  EXAMPLES/
  FIXTURES/
```

Recommended `HUMAN/` shape:

```text
HUMAN/
  blocks/
  neoblocks/
  neostacks/
  sleeves/
  capabilities/
  indexes/
  guides/
  visual-cards/
```

`AI/` is machine-readable.

`HUMAN/` is browsable/readable.

`META/` defines public scope, content status, release policy, and repo contract.

---

## 7. AI vs HUMAN Boundary

### AI Layer

The AI layer contains canonical machine-readable artifacts:

```text
schemas
manifests
block JSON
NeoBlock JSON
NeoStack JSON
sleeve manifests
toolpack manifests
fixtures
catalogs
```

### HUMAN Layer

The Human layer contains readable projections:

```text
cards
guides
indexes
visual explanations
plain-English summaries
examples
browse pages
```

Rule:

```text
AI JSON is source of truth.
HUMAN cards explain and mirror.
HUMAN cards should not redefine artifacts differently.
```

Eventually, many Human cards can be generated from AI manifests.

---

## 8. umg-compiler Role

`umg-compiler` is the canonical deterministic compiler.

It should contain:

```text
compiler source
compiler pipeline
schema validation adapters if needed
IR normalization logic or IR acceptance logic
authority/priority resolution
route/gate resolution logic
merge/synthesis resolution
RuntimeSpec emission
Trace emission
CLI
library exports
tests
samples
```

It should not contain:

```text
full public block library
full sleeve marketplace
OpenClaw plugin runtime
tool execution logic
live runtime state
private Resleever state
visual editor UI
creator economy marketplace logic
```

The compiler should remain headless.

The compiler should be usable as:

```text
library
CLI
embedded compiler
```

---

## 9. Compiler Boundary Rule

The compiler may know the schema of source artifacts.

The compiler may normalize source artifacts into IR.

The compiler may emit RuntimeSpec and Trace.

The compiler must not:

```text
call LLMs
generate final prose
execute prompts
run tools
perform OpenClaw actions
fetch untrusted remote packages by itself
mutate user files
silently alter public library artifacts
```

The compiler structures cognition.

Envoy runs the result.

---

## 10. umg-envoy-agent Role

`umg-envoy-agent` is the OpenClaw/Envoy runtime vehicle.

It should contain:

```text
OpenClaw plugin metadata
command surface
sleeve loader
library resolver
compiler bridge
runtime state manager
RuntimeSpec store
Trace store
Relation Matrix emitter
capability resolver
Tool Pack registry
Tool Runner
permission/safety guard
runtime diagnostics
public-safe command surface
developer/private lane if enabled
```

It should not contain:

```text
canonical compiler source
full block library source of truth
public marketplace canon
private Resleever data by default
unbounded operator lanes exposed publicly
silent tool execution
```

Envoy may include small bundled examples or test fixtures.

Those should not become the canonical library.

---

## 11. Envoy Public vs Runtime Lane

Envoy may have more than one lane:

```text
public_safe
developer_local
private_resleever
internal_operator
future_registry
```

The public-safe lane should remain bounded and fail-closed.

The runtime/internal lanes may support compiler bridge, traces, Tool Pack binding, and richer operations, but they must not be accidentally exposed through public commands.

Rule:

```text
Lane widening must be deliberate, documented, permissioned, and traceable.
```

---

## 12. UMG_Envoy_Resleever Role

`UMG_Envoy_Resleever` is the private personal runtime homebase and testing mirror.

It should contain:

```text
private blocks
private NeoBlocks
private NeoStacks
private sleeves
experimental sleeves
local runtime state
local traces
staging outputs
promotion candidates
runtime backups
personal agent configuration
compiler bridge adapters
```

It should not be:

```text
public marketplace
canonical compiler source
all-in-one monolith
generic prompt dump
public source of truth
```

It can mirror the shape of the public Block Library while containing private and experimental material.

---

## 13. Resleever Public Status

The Resleever should be private when the public library and Envoy runtime are clean enough.

If temporarily public for AI/frontend access, it should still be treated architecturally as private.

Rule:

```text
Do not design public architecture around Resleever availability.
```

The public architecture should stand on:

```text
UMG-Block-Library
umg-compiler
umg-envoy-agent
Tool Pack / Capability Pack contracts
```

---

## 14. Mirror Shape, Not Content

Public Block Library and private Resleever should mirror **structure**, not necessarily content.

Mirror:

```text
schemas
folder conventions
artifact identity
sleeve pack contract
toolpack contract
catalog style
human/AI split
promotion metadata
```

Do not require identical content.

The private Resleever can be a superset.

Public Block Library is a curated subset.

Rule:

```text
Every public artifact may exist in Resleever.
Not every Resleever artifact should become public.
```

---

## 15. Local User Library Role

A local user library is a user-owned artifact source.

It may contain:

```text
private blocks
private NeoBlocks
private NeoStacks
private sleeves
local Tool Pack declarations
user examples
personal notes
imported packages
```

Envoy should be able to load it if configured.

Local libraries must follow the same artifact contracts if they want to compile cleanly.

---

## 16. Imported Sleeve Pack Role

An imported sleeve pack is a portable package.

It may come from:

```text
downloaded folder
ZIP package
Git repo
future registry
private exchange
local export
```

Imported sleeve packs must be validated before activation.

Envoy should treat imported packages as untrusted until:

```text
schema validated
identity checked
hash checked
dependencies resolved
capabilities reviewed
tool permissions checked
```

---

## 17. Future Registry Role

A future registry may handle:

```text
public discovery
creator pages
artifact submissions
downloads
clones
usage events
ranking
provenance
reward hooks
verification
moderation
```

This is deferred.

The repo contract should prepare for it through identity/provenance, dependency graphs, and usage-readiness fields.

The registry should not be required for v0.

---

## 18. Source of Truth Rules

### Compiler source of truth

```text
umg-compiler
```

### Public artifact source of truth

```text
UMG-Block-Library / AI/
```

### Public human-readable mirror

```text
UMG-Block-Library / HUMAN/
```

### Runtime vehicle source

```text
umg-envoy-agent
```

### Private runtime/testing source

```text
UMG_Envoy_Resleever
```

### Executable tool source

```text
Tool Pack location declared by toolpack.json
```

### Runtime state source

```text
Envoy runtime / Resleever private runtime / local runtime folders
```

---

## 19. What Goes Where

| Artifact / Concern | Block Library | Compiler | Envoy Agent | Resleever |
|---|---:|---:|---:|---:|
| Public MOLT Blocks | Yes | Samples only | No | Optional mirror |
| Public NeoBlocks | Yes | Samples only | No | Optional mirror |
| Public NeoStacks | Yes | Samples only | No | Optional mirror |
| Public Sleeves | Yes | Samples only | Installed/resolved copy | Optional mirror |
| Compiler logic | No | Yes | Bridge only | Adapter only |
| RuntimeSpec examples | Yes, sanitized | Emits | Stores active | Stores private |
| Trace examples | Yes, sanitized | Emits | Stores active | Stores private/full |
| Live runtime state | No | No | Yes | Yes |
| Tool execution | No | No | Yes | Yes |
| Tool Pack declarations | Yes | No | Yes/installed | Yes/private |
| Tool Pack source code | Optional reviewed packages | No | Yes/installed | Yes/private |
| Human cards | Yes | No | Maybe rendered | Optional |
| Visual dashboard | No | No | Yes/later | Maybe/private |
| Creator provenance | Yes | References | Uses | Uses/private |
| Public marketplace | Later | No | No | No |

---

## 20. Promotion Workflow

Private or experimental artifacts should move through a promotion workflow.

Recommended path:

```text
1. Create/test in Resleever or local user library.
2. Validate schema.
3. Compile through Envoy/compiler.
4. Review RuntimeSpec and Trace.
5. Add identity/provenance.
6. Check duplicate/similarity.
7. Sanitize private data.
8. Add Human card/README.
9. Add to public Block Library.
10. Add/update manifest catalog.
11. Generate lockfile/fixture if needed.
12. Mark public status.
```

Promotion should never be blind copy-paste.

---

## 21. Public Artifact Promotion Criteria

A promoted public artifact should have:

```text
valid schema
stable artifact ID
identity metadata
provenance metadata
content hash
public status
review status
no secrets/private paths
clear purpose
dependencies declared
examples or notes
traceability to source
```

For sleeves:

```text
README.md
sleeve.json
compatibility section
routes/governance section
dependency section
capability section if applicable
lockfile if promoted/stable
```

For Tool Packs:

```text
toolpack.json
README.md
permissions
safety metadata
risk/side-effect levels
trace events
security review status
```

---

## 22. Runtime Artifact Policy

Runtime artifacts include:

```text
RuntimeSpec
Trace
Relation Matrix
Relation Delta
diagnostics
capability status
tool invocation logs
runtime state
```

Public Block Library may contain:

```text
sanitized examples
golden fixtures
schema examples
documentation snippets
```

Private Resleever/Envoy runtime may contain:

```text
live traces
private runtime state
raw diagnostics
active RuntimeSpecs
session logs
tool invocation logs
backup states
```

Rule:

```text
Public repo gets examples and fixtures.
Private/runtime lanes get live operational state.
```

---

## 23. Trace Publication Rule

Before a trace becomes public, it must be sanitized.

Remove or redact:

```text
API keys
tokens
private paths
private file contents
local usernames if needed
machine identifiers if needed
private repo internals if not intended
raw tool inputs/outputs if sensitive
unreviewed runtime state
```

Allowed public trace types:

```text
golden compile trace
schema fixture trace
tutorial trace
sanitized runtime example
test trace
```

---

## 24. Tool Code Placement

Early-stage options:

```text
umg-envoy-agent/capability-packs/
UMG-Block-Library/AI/CAPABILITIES/toolpacks/
UMG_Envoy_Resleever/private-toolpacks/
local-user-library/toolpacks/
```

Recommended rule:

```text
Tool Pack declarations can live in Block Library.
Executable code should live in Envoy/plugin/toolpack repos unless reviewed for public packaging.
```

For v0, keep executable tool code close to Envoy until stable.

Later, mature toolpacks can move to their own repo or registry.

---

## 25. Public/Private Naming

Suggested repo language:

### UMG-Block-Library

```text
Public canonical UMG library for curated blocks, NeoBlocks, NeoStacks,
sleeves, schemas, manifests, examples, and human-readable reference cards.
```

### umg-compiler

```text
Headless deterministic compiler that resolves UMG source artifacts into RuntimeSpec and Trace.
```

### umg-envoy-agent

```text
OpenClaw runtime vehicle that loads sleeves, resolves artifacts, calls the compiler,
manages runtime state, binds Tool Packs, and records trace.
```

### UMG_Envoy_Resleever

```text
Private Resleever workspace and operational mirror for personal sleeves,
testing, runtime state, local traces, and promotion staging.
```

---

## 26. Branch / Release Suggestions

For early organization:

### UMG-Block-Library

```text
main/master = curated public state
draft/* = experimental public candidates
schema/* = schema updates
sleeve/* = sleeve pack work
```

### umg-compiler

```text
main = stable compiler
dev = active compiler work
feature/ir-v0 = IR work
feature/trace-v0 = trace work
```

### umg-envoy-agent

```text
main = public-safe release
dev = local development
feature/compiler-bridge = compiler integration
feature/sleeve-loader = sleeve loading
feature/toolpacks = capability binding
```

### Resleever

```text
private main = active personal state
staging = promotion candidates
archive = historical snapshots
```

These are suggestions, not strict requirements.

---

## 27. Version Synchronization

The repos should not require identical versions.

They should declare compatibility.

Example:

```json
{
  "compatibility": {
    "block_library": ">=0.1.0",
    "compiler": ">=0.1.0 <1.0.0",
    "envoy_agent": ">=0.3.0",
    "ir": "0.1",
    "sleeve_contract": "0.1"
  }
}
```

Compatibility should be explicit in:

```text
sleeve.json
toolpack.json
Envoy config
compiler package
schemas
```

---

## 28. Catalog Rules

Catalogs should index artifacts, not redefine them.

Catalog entries should include:

```text
artifact_id
artifact_type
name
version
status
source_path
summary
tags
content_hash
public_status
```

Catalogs should not contain the full artifact body unless intentionally designed as generated indexes.

Canonical artifact data lives in the artifact file.

---

## 29. Schema Placement

Public schemas should live in:

```text
UMG-Block-Library/AI/SCHEMAS/
```

Compiler may copy/use schemas for tests or package validation, but the public library is the public schema surface.

Compiler-specific internal types may live in:

```text
umg-compiler/src/
```

Envoy-specific runtime schemas may live in:

```text
umg-envoy-agent/src/
```

But cross-repo public artifact contracts should remain visible in the Block Library.

---

## 30. Fixture Placement

Public compile fixtures may live in:

```text
UMG-Block-Library/AI/FIXTURES/
```

Compiler tests may copy or reference fixtures.

Envoy tests may use fixtures to validate loader/bridge behavior.

Fixture types:

```text
sleeve input
resolved IR
RuntimeSpec
Trace
Relation Matrix
diagnostics
```

Fixtures should be sanitized.

---

## 31. Examples vs Fixtures

Examples are for humans and agents to understand usage.

Fixtures are for tests to verify deterministic behavior.

```text
examples = instructional
fixtures = validation/test targets
```

A public artifact may have both.

---

## 32. Cross-Repo Dependency Rule

Dependency direction should be:

```text
Envoy depends on Compiler.
Envoy reads Block Library.
Compiler may use schemas/fixtures.
Block Library does not depend on Envoy runtime.
Block Library does not depend on Resleever.
Resleever may depend on all local/private lanes.
```

Avoid circular dependency.

---

## 33. Compiler Import Rule

Envoy should integrate compiler through:

```text
package import
local workspace import
CLI subprocess
```

Preferred:

```text
package import or local workspace import
```

Fallback:

```text
CLI subprocess
```

Envoy should not copy compiler source into itself except for thin adapters.

---

## 34. Private Data Rule

Never promote without sanitization.

Private data includes:

```text
tokens
keys
local paths
machine names
private repo contents
private agent traces
runtime logs
personal context
unreviewed tool outputs
```

If unsure, keep private.

---

## 35. Repository Cleanup Priorities

Recommended cleanup order:

```text
1. UMG-Block-Library public structure and schemas
2. Sleeve pack contract and example sleeve
3. Compiler IR/RuntimeSpec/Trace alignment
4. Envoy sleeve loader and compiler bridge
5. Tool Pack declaration/binding lane
6. Relation Matrix projection
7. Human library cards and visual browsing
8. Private Resleever mirroring/promotion workflow
```

This keeps the public artifact shape stable before runtime code expands.

---

## 36. Minimal Repo Contract Acceptance Criteria

This repository contract is acceptable when:

```text
each repo has a clear role
compiler authority is not duplicated
public library is not runtime state
Envoy is runtime vehicle
Resleever is private mirror/testbed
Tool Packs have a lane
schemas have a public home
fixtures/examples have a public home
promotion path is explicit
private/public boundary is explicit
dependency direction avoids circularity
```

---

## 37. Non-Goals for v0.1

This document does not define:

```text
final Git branching policy
final package registry
final marketplace
final CI/CD
final token reward engine
final visual dashboard
all directory names forever
all private Resleever workflows
```

It defines the repo boundary and artifact placement law.

---

## 38. Summary

UMG should remain separated into clean, cooperating repositories.

```text
UMG-Block-Library = public artifact library
umg-compiler = canonical compiler
umg-envoy-agent = runtime vehicle
UMG_Envoy_Resleever = private mirror/testbed
Tool Packs = executable capability packages
local libraries = user-owned artifact sources
future registry = optional discovery/economy layer
```

The system becomes easier to build because each part has one job.

The public library can be compiler-ready without becoming a runtime dump.

Envoy can be powerful without becoming the compiler.

The compiler can be authoritative without owning the whole ecosystem.

The Resleever can remain private and useful without shaping public architecture.

This is the repository foundation for UMG.
