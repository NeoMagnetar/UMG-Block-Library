# UMG Compiler Law v0.3

**Document ID:** `UMG_COMPILER_LAW.v0.3`  
**Status:** Foundation draft  
**Date:** 2026-04-27  
**Scope:** Compiler law, route law, merge law, geometry law, governance overlay, and trace requirements  
**Primary audience:** UMG compiler implementers, Envoy/OpenClaw integrators, sleeve authors, schema authors, and future visual-builder designers  

---

## 1. Purpose

This document defines the core law for how Universal Modular Generation (UMG) artifacts are selected, connected, ordered, merged, activated, excluded, compiled, and traced.

It exists to prevent drift between:

- MOLT blocks
- NeoBlocks
- NeoStacks
- Sleeves
- overlays
- bundles
- tool/capability declarations
- the UMG Compiler
- the UMG Envoy Agent runtime
- the future visual graph/studio layer

The purpose of v0.3 is not to implement every future feature. The purpose is to define a stable foundation that can support later complexity without requiring brittle backtracking.

---

## 2. High-Level System Position

The compiler law sits in the middle of the UMG system.

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
```

The compiler does not act as the mind.

The compiler does not run tools.

The compiler does not generate final natural language by itself.

The compiler resolves structured UMG artifacts into a deterministic operating structure and explanation.

---

## 3. Core Compiler Contract

The compiler MUST accept a valid UMG source structure or normalized UMG IR.

The compiler MUST produce:

```text
RuntimeSpec
Trace
```

The compiler SHOULD be deterministic.

The compiler SHOULD produce the same output when given the same input, route state, configuration, and library versions.

The compiler MUST preserve enough trace information to explain:

- what was active
- what was inactive
- what was excluded
- what route was chosen
- what gates opened
- what stacks were selected
- what bundles activated
- what merges occurred
- what conflicts were resolved
- what conflicts failed
- what output structure was produced

---

## 4. Normative Terms

This document uses the following terms:

```text
MUST      = required for valid implementation
SHOULD    = recommended for stable implementation
MAY       = optional or future-compatible behavior
MUST NOT  = forbidden behavior
```

---

## 5. Core Artifact Types

### 5.1 MOLT Block

A MOLT block is an atomic semantic unit.

Core MOLT types for v0:

```text
Trigger
Directive
Instruction
Subject
Primary
Philosophy
Blueprint
Off
```

Future MOLT or MetaMOLT types MAY be added, but they MUST be explicitly declared and schema-valid.

A MOLT block MAY exist alone in a library.

A MOLT block SHOULD usually compile through a NeoBlock in active runtime.

### 5.2 NeoBlock

A NeoBlock is the smallest recommended practical runtime composition unit.

A NeoBlock MAY contain:

- zero or more MOLT blocks
- bundles
- merge recipes
- local route behavior
- geometry metadata
- runtime service requirements
- capability declarations

A NeoBlock does not need exactly one of each MOLT type.

A NeoBlock MUST resolve to a coherent local function if it participates in active runtime.

### 5.3 NeoStack

A NeoStack is a functional workflow, department, route lane, or runtime module made from NeoBlocks.

Examples:

```text
NS.CODER.SERVUO.MASTER.v1
NS.DEALERSHIP.SALES.v1
NS.DEALERSHIP.CUSTOMER_SERVICE.v1
NS.BUSINESS_PLAN.STRATEGY.v1
```

A NeoStack SHOULD define:

- supported routes
- included NeoBlocks
- activation behavior
- fallback behavior
- required capabilities
- trace expectations

### 5.4 Sleeve

A sleeve is a full operating configuration.

A sleeve MAY reference:

- MOLT blocks
- NeoBlocks
- NeoStacks
- bundles
- overlays
- tool/capability requirements
- local blocks
- local NeoBlocks
- local NeoStacks
- examples
- documentation

A sleeve SHOULD be declarative.

A sleeve MUST NOT contain hidden executable tool logic by default.

### 5.5 Tool Pack / Capability Pack

A Tool Pack or Capability Pack contains executable ability.

A sleeve MAY request capabilities.

The Envoy runtime resolves and runs tools.

The compiler MUST NOT directly execute tools.

### 5.6 RuntimeSpec

RuntimeSpec is the compiler’s resolved operating structure.

It SHOULD include:

- active sleeve
- active route
- active NeoStacks
- active NeoBlocks
- active MOLT blocks
- excluded objects
- typed merge outputs
- priority decisions
- required capabilities
- warnings
- errors
- output structure

### 5.7 Trace

Trace is the explanation layer.

Trace records compiler decisions and runtime-relevant structural choices.

Trace SHOULD be machine-readable and human-auditable.

---

## 6. Default MOLT Priority

The default v0 MOLT priority order is:

```text
Trigger
Directive
Instruction
Subject
Primary
Philosophy
Blueprint
```

`Off` is not normal low-priority content.

`Off` is an exclusion state.

The priority order SHOULD be used primarily for conflict resolution, not as constant active dominance.

Priority answers:

```text
If two active constraints cannot both be true, which one wins?
```

Priority does not answer:

```text
Which route should be active?
```

Route selection belongs to Governance and Trigger gates.

---

## 7. Optional Future Intent Band

A future optional band MAY be introduced:

```text
Use
Aim
Need
```

Conceptual position:

```text
Subject
Use / Aim / Need
Primary
```

Purpose:

- Subject = what this is about
- Use = what it will be used for
- Aim = what the actor is trying to accomplish
- Need = what must be satisfied
- Primary = current core object/task/output center

For v0, this SHOULD remain optional as an intent-refinement band or MetaMOLT layer.

It MUST NOT destabilize the default priority profile.

---

## 8. Priority Profiles

v0 SHOULD use one default profile:

```text
molt.default.v1
```

Future implementations MAY support named priority profiles.

Priority profiles MUST be:

- explicitly declared
- schema-valid
- compiler-recognized
- trace-recorded

No sleeve, block, or overlay may silently change the priority order.

---

## 9. Core Laws

### 9.1 Off Excludes

```text
Off = exclude from current active route
```

Off means present but unavailable for the current compile/run.

Off does not mean deleted.

Off MAY apply to:

- MOLT blocks
- bundles
- NeoBlocks
- NeoStacks
- routes
- overlays
- capability declarations

The compiler MUST remove or mark Off artifacts before final active composition.

Trace MUST record meaningful Off decisions.

### 9.2 Trigger Gates

```text
Trigger = gate
```

A Trigger opens, closes, activates, blocks, redirects, or enables a path.

Trigger states MAY include:

```text
open
closed
fired
missed
standby
blocked
```

A fired trigger MAY activate:

- a route
- a bundle
- a NeoBlock
- a NeoStack
- an overlay
- a tool/capability request

The compiler/runtime MUST trace trigger-gate decisions.

### 9.3 Governance Routes

Governance is an overlay above the active graph.

Governance classifies the situation and selects the active route.

Governance MAY activate or disable:

- routes
- NeoStacks
- NeoBlocks
- bundles
- overlays
- capability requirements

Governance is not the same thing as priority.

```text
Governance = route selection and activation control
Priority = conflict resolution inside active route
```

### 9.4 Route Selects Current Path

A route is the selected path through a sleeve, NeoStack, NeoBlock graph, or bundle set for the current pass.

A sleeve MAY contain many possible routes.

A compile/run SHOULD select one primary active route, with optional standby routes.

Trace MUST record route selection when route selection affects output.

### 9.5 Snap Connects Compatible Objects

Snap is a composition relation.

Snap means objects are connected into a working composition.

Snap MUST be compatibility-validated.

Objects MAY snap if allowed by:

- same-level sibling relation
- parent NeoBlock
- parent NeoStack
- active route
- bundle definition
- merge recipe
- overlay
- governance rule
- explicit compatibility matrix

Invalid snaps SHOULD warn or fail depending on compiler mode.

### 9.6 Stack Orders Vertical Precedence

Stack expresses vertical order, hierarchy, sequence, or precedence.

```text
Higher constrains lower.
Lower still contributes if compatible.
```

A higher artifact does not automatically erase a lower artifact.

When conflict occurs inside a vertical stack, the higher artifact SHOULD constrain the lower artifact.

Stack may operate within:

- same MOLT type
- NeoBlock ordering
- NeoStack workflow sequence
- route sequence
- visual graph vertical geometry

### 9.7 Horizontal Relation Creates Siblings

Horizontal snapping expresses sibling, equal-level, or parallel relation.

```text
Horizontal = sibling / equal relation / parallel contribution
```

Horizontal siblings do not automatically override one another.

If horizontal siblings conflict, resolution SHOULD route through:

- parent resolver
- merge recipe
- governance rule
- Safety Guard / policy guard
- MOLT priority
- compile warning/failure

### 9.8 Bundle Groups

Bundle is a grouping container.

A bundle may contain mixed artifacts:

- MOLT blocks
- NeoBlocks
- merge recipes
- route fragments
- capability declarations
- examples
- overlays

Bundle does not automatically synthesize meaning.

```text
Bundle = grouped artifacts
Merge = synthesized meaning
```

Bundles MAY be conditional.

Bundles MAY activate when directives, triggers, routes, or governance conditions change.

### 9.9 Merge Synthesizes

Merge creates a synthesis.

Merge MAY combine:

- same MOLT type
- different MOLT types
- overlays
- route fragments
- bundle contents
- NeoBlock outputs

Every merge result MUST resolve into a target.

Valid targets include:

- MOLT type
- MetaMOLT type
- overlay type
- RuntimeSpec slot
- container role
- named typed artifact

Untyped merge blobs MUST NOT continue downstream.

### 9.10 Overlay Influences

Overlay is a layer of influence.

Overlay types MAY include:

```text
Governance Overlay
Philosophy Overlay
Blueprint Overlay
Context Overlay
Tool Overlay
Memory Overlay
Policy Overlay
```

An overlay may influence:

- route selection
- interpretation
- output format
- context injection
- tool availability
- safety posture

Overlays SHOULD be explicit and traceable.

---

## 10. Merge Classes

### 10.1 Same-Type Merge

Same-type merge combines artifacts of the same MOLT type or same object class.

Examples:

```text
Instruction + Instruction → Instruction
Philosophy + Philosophy → Philosophy
Blueprint + Blueprint → Blueprint
```

Same-type merge is the simplest case.

The result type is usually obvious.

### 10.2 Cross-Type Synthesis Merge

Cross-type synthesis merge combines different types into a typed result.

Examples:

```text
Directive + Philosophy → PhilosophyOverlay
Instruction + Blueprint → BlueprintConstraint
Subject + Primary → PrimaryContext
Directive + Instruction + Blueprint → TaskExecutionSpec
BusinessPlanSleeve + ArtOfWarPhilosophy → PhilosophyOverlay or BlueprintOverlay
```

Cross-type merge is allowed only when a target is declared or deterministically resolvable.

### 10.3 Merge Target Resolution

Target resolution order:

```text
1. Explicit target_type in merge recipe
2. Target slot required by parent NeoBlock / NeoStack
3. Target role required by active route
4. Allowed synthesis map
5. Otherwise compile error
```

The compiler MUST trace cross-type synthesis.

---

## 11. Blueprint and Philosophy Behavior

### 11.1 Philosophy

Philosophy applies values, lens, doctrine, or interpretive pressure.

Example:

```text
Apply Art of War strategic principles to business plan generation.
```

Philosophy may influence generation broadly, but it should do so through an explicit overlay or merge result when applied across a larger system.

### 11.2 Blueprint

Blueprint controls output form, rendering, format, structure, and presentation.

Blueprint does not normally override Directive.

Blueprint may strongly shape the final output.

Blueprint may be promoted upward only through explicit typed synthesis.

Example:

```text
Blueprint + Philosophy → GenerationStyleOverlay
```

---

## 12. Visual Geometry Law

The visual builder or graph studio SHOULD encode compiler-relevant relations.

### 12.1 Vertical Geometry

Vertical placement means:

```text
authority / sequence / precedence
```

### 12.2 Horizontal Geometry

Horizontal placement means:

```text
sibling / equal-level / parallel relation
```

### 12.3 Geometry Is Not Enough Alone

The fact that two nodes are visually adjacent does not automatically make the relation valid.

The compiler MUST validate the relation against schema, route, parent, bundle, merge, overlay, or compatibility rules.

### 12.4 Geometry Metadata

Graph relations SHOULD eventually compile into explicit metadata such as:

```json
{
  "from": "NB.SALES.INTENT_CLASSIFIER.v1",
  "to": "NB.SALES.OFFER_ROUTER.v1",
  "relation": "vertical_precedence"
}
```

---

## 13. Relation Matrix Position

The Relation Matrix is a compact state-and-relation projection.

It is not the canonical source of truth.

```text
JSON source artifacts = source of truth
UMG IR = normalized compiler graph
Relation Matrix = compact readable/debug projection
Trace = event explanation over time
```

The Relation Matrix MAY show:

- active state
- Off state
- gate state
- vertical relations
- horizontal relations
- route flow
- merge points
- bundle groups
- overlay influence
- service/tool nodes

Example:

```text
GOV.ROUTER [A]
GOV.ROUTER -O-> TRG.PURCHASE [GF][GO]
TRG.PURCHASE -F-> NS.SALES [A]
TRG.COMPLAINT -X-> NS.SERVICE [OFF]
NS.SALES -V-> NB.SALES.INTAKE [A]
NB.SALES.INTAKE -H- NB.SALES.INVENTORY [A]
```

---

## 14. Compiler Pipeline v0.3

The compiler SHOULD follow this conceptual pipeline:

```text
1. Load sleeve / NeoStack / NeoBlock graph
2. Resolve references from block library, local library, or imported packs
3. Validate schemas and source objects
4. Normalize to UMG IR
5. Apply Off exclusions
6. Select active route / snap
7. Activate conditional bundles
8. Resolve vertical stack order
9. Resolve horizontal sibling groups
10. Apply same-type merges
11. Apply cross-type synthesis merges
12. Assign every synthesis result a target type/container/role
13. Check MOLT priority conflicts
14. Build RuntimeSpec
15. Emit Trace
```

Compiler implementations MAY reorder internal passes for performance, but the resulting semantics SHOULD match this law.

---

## 15. Conflict Resolution

Conflicts SHOULD be resolved in this order:

```text
1. Off / route exclusion
2. Governance route decision
3. Explicit parent/route rule
4. Explicit merge recipe
5. Stack precedence
6. MOLT priority
7. Deterministic fallback in dev mode
8. Compile failure in strict/prod mode
```

### 15.1 Dev Mode

Dev mode MAY resolve unresolved conflicts deterministically while emitting warnings.

### 15.2 Strict / Prod Mode

Strict or production mode SHOULD fail compilation on unresolved semantic conflicts.

---

## 16. Trace Requirements

Trace SHOULD record:

- input sleeve ID
- compiler version
- priority profile
- active route
- active snap
- activated objects
- Off/excluded objects
- trigger gate states
- governance decisions
- bundle activations
- stack resolutions
- horizontal sibling validations
- merge events
- merge target assignments
- conflict resolutions
- warnings
- errors
- output RuntimeSpec ID

Trace events SHOULD be stable enough for debugging and future visual display.

---

## 17. Tool / Capability Boundary

Tools live outside the sleeve.

A sleeve MAY declare required capabilities.

A Tool Pack provides executable capabilities.

Envoy resolves tools.

The compiler MUST NOT execute tools.

The compiler MAY include required capability declarations in RuntimeSpec.

Tool execution trace belongs to Envoy/runtime trace, not compiler trace, unless represented as a requested capability.

---

## 18. Provenance Boundary

Compiler law does not define the full creator economy.

However, compiler output SHOULD preserve artifact references enough for future provenance.

RuntimeSpec and Trace SHOULD retain:

- artifact IDs
- source IDs
- version references
- hash references when available
- parent/derived references when relevant

This allows future usage ledgers and reward logic without altering compiler law.

---

## 19. v0 Simplicity Rules

v0 MUST stay lean.

v0 SHOULD include:

```text
MOLT blocks
NeoBlocks
NeoStacks
Sleeves
Off
Trigger gates
Governance route selection
Snap compatibility
Stack precedence
Bundle grouping
Typed merge
Default priority profile
RuntimeSpec
Trace
Relation Matrix projection
```

v0 SHOULD defer:

```text
public marketplace
crypto/token rewards
advanced anti-abuse
multiple priority profiles
large visual studio
complex autonomous sub-agent mesh
full Web3 layer
```

Future features should be reserved by schema hooks, not implemented prematurely.

---

## 20. Compact Law Sheet

```text
Off excludes.
Trigger gates.
Governance routes.
Route selects the current path.
Snap connects compatible objects.
Stack orders vertical precedence.
Horizontal snapping creates sibling relation.
Bundle groups.
Merge synthesizes typed meaning.
Overlay influences route, interpretation, format, context, or capability.
Priority resolves conflicts inside the active route.
Compiler emits RuntimeSpec and Trace.
Envoy runs the result and binds tools.
```

---

## 21. Implementation Guidance

Implementation SHOULD proceed from this law into:

```text
UMG_IR.v0.1
UMG_RELATION_MATRIX.v0.1
UMG_SLEEVE_PACK.v0.1
UMG_ARTIFACT_IDENTITY.v0.1
UMG_TOOLPACK_CAPABILITY.v0.1
```

This document should be treated as the semantic anchor for those later sections.

---

## 22. Open Questions Reserved for Later

These are intentionally not finalized in this document:

1. Final syntax of all Relation Matrix symbols.
2. Full content-hash normalization policy.
3. Full creator economy reward formula.
4. Full anti-abuse scoring model.
5. Complete visual studio interaction model.
6. All future priority profiles.
7. Whether Use/Aim/Need becomes first-class MOLT or remains MetaMOLT.
8. Complete schema definitions for all object classes.

---

## 23. Summary

UMG Compiler Law v0.3 defines how UMG artifacts become deterministic runtime structure.

The foundation is:

```text
MOLT blocks are atoms.
NeoBlocks are practical semantic units.
NeoStacks are workflow lanes.
Sleeves are operating configurations.
Governance routes.
Triggers gate.
Off excludes.
Snap connects.
Stack orders.
Bundle groups.
Merge synthesizes.
Typed synthesis places meaning.
Priority resolves conflict.
IR normalizes.
RuntimeSpec structures.
Trace explains.
Envoy runs.
Tools act.
```

This is the v0.3 law layer.
