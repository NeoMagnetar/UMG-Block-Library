# UMG Foundation Workmap v0.1
## Section 0 — Master Index and Operating Plan

### Purpose

This document is the working map for converting the newly unified UMG foundation into a sequence of formal sections.

Each section will be drafted one at a time. Each section should be strong enough to become a stable reference artifact for implementation, repo cleanup, schema design, compiler work, OpenClaw/Envoy integration, and future public ecosystem planning.

The immediate goal is not to implement everything. The immediate goal is to lock the foundation so implementation can proceed without brittle backtracking.

---

## Operating Principle

UMG should be built as a layered system.

The current build should preserve the future without forcing the future into v0.

The v0 foundation should be lean, deterministic, traceable, and compiler-operable.

Future layers such as the visual studio, creator economy, token/reward mechanics, advanced anti-abuse systems, multiple priority profiles, sub-agent orchestration, and Web3-style provenance can be reserved through clean lanes and schema hooks rather than implemented immediately.

---

## Current Stable Architecture

```text
LLM / API / Mind
        ↓
UMG Envoy Agent / OpenClaw Vehicle
        ↓
Sleeve Pack
        ↓
UMG Block Library / Local Library / Imported Packs
        ↓
UMG IR
        ↓
UMG Compiler
        ↓
RuntimeSpec + Trace
        ↓
Envoy Runtime
        ↓
Tool Packs / Capability Packs
        ↓
Runtime Trace + Tool Trace
```

---

## Core Object Legend

### MOLT Block

Atomic semantic unit.

Examples include Trigger, Directive, Instruction, Subject, Primary, Philosophy, Blueprint, and future optional MetaMOLT types.

MOLT blocks can exist alone in the library, but active runtime should normally route through NeoBlocks rather than loose atomic blocks.

### NeoBlock

Small practical runtime unit composed from one or more MOLT blocks.

A NeoBlock can contain MOLT blocks, bundles, typed merge recipes, capability declarations, and local route behavior.

### NeoStack

Functional workflow lane composed from NeoBlocks.

Examples include a coder stack, sales stack, customer service stack, research stack, or business strategy stack.

### Sleeve Pack

Full operating configuration.

A sleeve declares which blocks, NeoBlocks, NeoStacks, overlays, routes, tool capabilities, and defaults are active or available.

### Tool Pack / Capability Pack

Executable capability layer.

Tool packs provide actual bridges, adapters, scripts, repo tools, memory tools, compiler checks, UI bridges, or OpenClaw tools.

Sleeves request capabilities. Envoy resolves and runs tools.

### UMG IR

Intermediate Representation.

The IR is the normalized compiler graph between source JSON artifacts and the final RuntimeSpec.

### Relation Matrix

Compact ASCII-safe state and relation projection of the active UMG graph.

It is a debug/runtime map, not the canonical source of truth.

### RuntimeSpec

Compiler output describing the resolved active operating structure.

### Trace

Explanation output describing why the compiler/runtime made each important decision.

### Governance Overlay

Top-level route/orchestration layer that classifies the situation, opens/closes trigger gates, activates relevant routes, and turns irrelevant routes off for the current run.

---

## Core Rules Snapshot

```text
Off excludes.
Trigger gates.
Governance routes.
Snap connects compatible objects.
Stack orders vertical precedence.
Horizontal snapping creates sibling relation.
Bundle groups.
Merge synthesizes typed meaning.
Priority resolves conflicts inside the active route.
Compiler emits RuntimeSpec + Trace.
Envoy runs the result and binds tools.
```

---

## Planned Section Sequence

### Section 1 — UMG Compiler Law v0.3

Defines the core resolution law.

Includes Off, Trigger-as-gate, Snap, Stack, Merge, Bundle, Route, Overlay, Governance, priority, typed synthesis, vertical authority, horizontal sibling relation, and trace requirements.

Primary output:

```text
UMG_COMPILER_LAW.v0.3.md
```

### Section 2 — UMG IR v0.1

Defines the normalized intermediate representation between source artifacts and compiler output.

Aligns UMG with recognized engineering concepts such as AST, IR, CFG, DAG, adjacency lists, finite-state snapshots, and trace spans.

Primary output:

```text
UMG_IR.v0.1.md
```

### Section 3 — UMG Relation Matrix v0.1

Defines the compact ASCII-safe runtime map.

Includes state codes, relation codes, gate status, active/off routes, bundle state, overlay state, matrix snapshots, and pass-to-pass deltas.

Primary output:

```text
UMG_RELATION_MATRIX.v0.1.md
```

### Section 4 — UMG Artifact Identity and Provenance v0.1

Defines stable IDs, human library codes, content hashes, package hashes, creator attribution, lineage, derivative status, uniqueness classes, duplicate rules, and future reward-readiness.

Primary output:

```text
UMG_ARTIFACT_IDENTITY.v0.1.md
```

### Section 5 — UMG Sleeve Pack Contract v0.1

Defines sleeve pack structure, manifest shape, lockfile role, compatibility fields, route declarations, NeoStack references, overlays, tool/capability requirements, and README expectations.

Primary output:

```text
UMG_SLEEVE_PACK.v0.1.md
```

### Section 6 — MOLT Block / NeoBlock / NeoStack Contracts v0.1

Defines the object contracts for atomic blocks, composed NeoBlocks, workflow NeoStacks, geometry metadata, composition rules, bundle membership, and typed merge participation.

Primary output:

```text
UMG_COMPOSITION_OBJECTS.v0.1.md
```

### Section 7 — Tool Pack / Capability Pack Contract v0.1

Defines how executable tools are declared, packaged, permissioned, resolved, traced, and bound by Envoy/OpenClaw.

Primary output:

```text
UMG_TOOLPACK_CAPABILITY.v0.1.md
```

### Section 8 — Envoy Runtime Integration v0.1

Defines how UMG Envoy Agent loads sleeves, resolves library references, calls the compiler, receives RuntimeSpec and Trace, activates the runtime, binds tools, and stores runtime trace.

Primary output:

```text
UMG_ENVOY_RUNTIME_INTEGRATION.v0.1.md
```

### Section 9 — Block Library and Repository Contract v0.1

Defines repo roles.

Covers UMG-Block-Library, umg-compiler, umg-envoy-agent, private Resleever, local user libraries, imported sleeve packs, and eventual public/private promotion lanes.

Primary output:

```text
UMG_REPOSITORY_CONTRACT.v0.1.md
```

### Section 10 — Human Library and AI Library Presentation v0.1

Defines the readable human layer and machine-readable AI layer.

Covers human cards, visual references, AI JSON, schemas, manifests, indexes, and how human-facing docs mirror machine artifacts without becoming a second source of truth.

Primary output:

```text
UMG_HUMAN_AI_LIBRARY.v0.1.md
```

### Section 11 — Governance, Routing, and Overlay Model v0.1

Defines governance overlay behavior in more detail.

Includes route selection, trigger gates, stack activation/deactivation, Off behavior, philosophy overlays, blueprint overlays, context overlays, and tool overlays.

Primary output:

```text
UMG_GOVERNANCE_OVERLAY.v0.1.md
```

### Section 12 — Future Creator Economy Hooks v0.1

Defines the non-token foundation for future creator recognition.

Includes usage events, clone/download/use tracking, dependency-graph credit, upstream attribution, derivative works, duplicate rejection, public submission status, and anti-abuse hooks.

Primary output:

```text
UMG_CREATOR_ECONOMY_HOOKS.v0.1.md
```

### Section 13 — Visual Studio / Graph UI Concepts v0.1

Defines the future UI lane without making it required for v0.

Includes vertical authority geometry, horizontal sibling snapping, bundles as grouped capsules, typed merge nodes, governance overlays, active route highlighting, service nodes, runtime trace panels, and sleeve cards.

Primary output:

```text
UMG_VISUAL_STUDIO_CONCEPTS.v0.1.md
```

### Section 14 — v0 Build Roadmap

Converts the above into practical build steps.

Covers file order, schema order, repo cleanup order, compiler bridge order, Envoy runtime order, toolpack lane, and validation strategy.

Primary output:

```text
UMG_V0_BUILD_ROADMAP.md
```

---

## Work Method

Each section should be handled one at a time.

For each section:

1. Draft the written spec in chat.
2. Create a mirrored downloadable Markdown file.
3. Identify unresolved questions, if any.
4. Wait for approval or correction before moving to the next section.

No code changes should be assumed unless explicitly requested.

No repo restructuring should be assumed until the relevant section is approved.

---

## Immediate Next Section

The next section should be:

```text
Section 1 — UMG Compiler Law v0.3
```

This is the correct first section because every other layer depends on the compiler law.

It should define the rules before schemas, repo cleanup, or plugin integration are modified.

---

## Foundation Status

The foundation is coherent enough to proceed.

The current system has stable lanes for:

```text
compiler law
IR
relation matrix
sleeve packaging
artifact identity
provenance
tool capabilities
Envoy runtime
block library structure
governance overlays
future visual UI
future creator economy
```

The next task is to turn the foundation into stable written artifacts one section at a time.
