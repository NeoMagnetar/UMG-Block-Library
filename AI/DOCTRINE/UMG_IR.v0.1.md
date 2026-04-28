# Section 2 — UMG IR v0.1

**Document ID:** `UMG_IR.v0.1`  
**Status:** Foundation draft  
**Layer:** Compiler / normalization / graph representation  
**Depends on:** `UMG_COMPILER_LAW.v0.3`  
**Feeds into:** `RuntimeSpec`, `Trace`, `Relation Matrix`, Envoy runtime activation  

---

## 1. Purpose

The **UMG IR** is the intermediate representation used between raw UMG source artifacts and final compiler output.

It exists so the compiler does not reason directly over scattered files, visual graph positions, loose JSON objects, or natural-language descriptions.

Instead, all source artifacts are normalized into a typed graph.

```text
Source Artifacts
  ↓
UMG IR
  ↓
Compiler Resolution
  ↓
RuntimeSpec + Trace
  ↓
Envoy Runtime
```

The IR is the compiler's working model.

It is not the public UI.
It is not the final runtime.
It is not the block library.
It is not the Relation Matrix.

It is the structured internal graph the compiler uses to make deterministic decisions.

---

## 2. Why UMG Needs an IR

UMG contains multiple artifact types:

- MOLT Blocks
- NeoBlocks
- NeoStacks
- Sleeves
- Bundles
- Overlays
- Tool / Capability declarations
- Route definitions
- Merge recipes
- Governance rules
- Future provenance and identity metadata

If the compiler tries to process these directly from their source files, the system becomes brittle.

The IR solves this by creating one normalized graph where every artifact becomes a typed node, edge, route, gate, or rule.

This gives UMG:

- deterministic compilation
- easier validation
- clearer trace output
- compact runtime state
- future visual graph compatibility
- easier testing
- safer evolution across repos and tools

---

## 3. Engineering Alignment

The UMG IR should align with recognizable software/compiler concepts.

| Engineering Concept | UMG Equivalent |
|---|---|
| AST | Parsed source artifact structure |
| IR | Normalized UMG compiler graph |
| CFG | Active route / control-flow path through gates and NeoStacks |
| DAG | Dependency graph between blocks, NeoBlocks, NeoStacks, sleeves, and tools |
| Adjacency list | Compact relation map between nodes |
| FSM / state machine | Trigger gates, route states, active/off/standby states |
| Trace spans/events | Explanation of compiler/runtime decisions |
| Source map | Mapping from IR nodes back to source files and artifact IDs |
| Lockfile | Resolved dependency snapshot |

UMG terms can stay expressive, but implementation should remain explainable to normal developers.

---

## 4. Source Artifacts

The IR is generated from source artifacts.

Source artifacts include:

```text
AI/BLOCKS/
AI/NEOBLOCKS/
AI/NEOSTACKS/
AI/SLEEVES/
AI/CAPABILITIES/
AI/MANIFESTS/
AI/SCHEMAS/
```

A source artifact may also come from:

- the public UMG Block Library
- a local user library
- an imported sleeve pack
- a private Resleever mirror
- an installed tool pack
- a test fixture

The compiler should not care where the artifact came from once it is normalized.

It should care that the artifact is valid, typed, referenced, and traceable.

---

## 5. IR Boundary

The IR is not the source of truth for authoring.

The source of truth remains:

- canonical JSON artifacts
- schemas
- manifests
- sleeve packs
- lockfiles

The IR is the compiler's normalized working form.

```text
JSON source artifacts = canonical storage
UMG IR = normalized compiler graph
Relation Matrix = compact state/debug projection
RuntimeSpec = resolved runtime output
Trace = explanation history
```

This boundary prevents the IR from becoming a second competing library.

---

## 6. Minimum IR Object

A v0.1 IR object should contain:

```json
{
  "ir_version": "0.1",
  "source": {},
  "priority_profile": "molt.default.v1",
  "nodes": [],
  "edges": [],
  "routes": [],
  "gates": [],
  "bundles": [],
  "overlays": [],
  "merge_recipes": [],
  "capabilities": [],
  "states": {},
  "source_map": [],
  "diagnostics": []
}
```

Each section has a clear responsibility.

---

## 7. IR Source Metadata

The `source` object identifies where the IR came from.

```json
{
  "source": {
    "sleeve_id": "SLV.CODER.SERVUO.v1",
    "sleeve_version": "1.0.0",
    "library_sources": [
      "UMG-Block-Library",
      "local-user-library"
    ],
    "compiled_at": "2026-04-27T00:00:00Z",
    "compiler_target": "umg-compiler-v0"
  }
}
```

This allows the Trace to explain which sleeve and libraries were used.

---

## 8. IR Nodes

Everything active or potentially active in a compile becomes a node.

Node types may include:

```text
molt_block
neoblock
neostack
sleeve
bundle
overlay
trigger_gate
route
tool_capability
service
merge_result
runtime_slot
```

A minimal node:

```json
{
  "id": "NB.SERVUO.FILE_SCAN.v1",
  "node_type": "neoblock",
  "source_artifact_id": "NB.SERVUO.FILE_SCAN.v1",
  "label": "File / Class Scanner",
  "state": "active",
  "molt_roles": ["Trigger", "Instruction", "Subject", "Blueprint"],
  "metadata": {}
}
```

Node state should be explicit.

Common states:

```text
active
idle
standby
off
warning
error
locked
resolved
```

---

## 9. IR Edges

Edges define relationships between nodes.

Edge types should be explicit.

```text
vertical_precedence
horizontal_sibling
route_flow
gate_to_route
bundle_membership
merge_input
merge_output
overlay_influence
capability_requirement
tool_binding
source_dependency
off_exclusion
```

Example:

```json
{
  "from": "NB.SERVUO.REPO_CONTEXT.v1",
  "to": "NB.SERVUO.FILE_SCAN.v1",
  "edge_type": "vertical_precedence",
  "state": "active",
  "reason": "File scan depends on repo context"
}
```

Horizontal sibling example:

```json
{
  "from": "NB.SERVUO.FILE_SCAN.v1",
  "to": "NB.SERVUO.API_MAP.v1",
  "edge_type": "horizontal_sibling",
  "state": "active",
  "reason": "Both operate at scan/mapping tier"
}
```

---

## 10. Routes

A route is a selected path through a sleeve or NeoStack.

Routes are how UMG avoids activating every possible workflow at once.

Example:

```json
{
  "id": "route.normal_code_patch",
  "label": "Normal Code Patch",
  "entry_gate": "TRG.CODE_PATCH",
  "activate": [
    "NS.SERVUO.CODER.v1"
  ],
  "disable": [
    "NS.DOCS.WRITER.v1"
  ],
  "standby": [
    "NS.SERVUO.RECOVERY.v1"
  ]
}
```

At compile time, one or more routes may be selected depending on governance and trigger state.

For v0, prefer one primary active route unless explicitly declared otherwise.

---

## 11. Gates

Trigger is modeled as a gate.

A gate can be:

```text
open
closed
fired
missed
blocked
locked
```

Example:

```json
{
  "id": "TRG.CODE_PATCH",
  "node_type": "trigger_gate",
  "gate_state": "fired_open",
  "opens_route": "route.normal_code_patch",
  "reason": "User requested a code change"
}
```

Gate behavior:

```text
closed gate = path unavailable
open gate = path available
fired gate = route activation event occurred
blocked gate = policy or governance prevented activation
```

---

## 12. Governance in IR

Governance appears in the IR as overlay nodes and route-control edges.

Governance does not merge into every block.

It classifies the situation and controls activation.

Example:

```json
{
  "id": "GOV.INTENT_ROUTER.v1",
  "node_type": "overlay",
  "overlay_type": "governance",
  "state": "active",
  "controls": [
    "route.sales",
    "route.service"
  ]
}
```

Governance route decision edge:

```json
{
  "from": "GOV.INTENT_ROUTER.v1",
  "to": "route.sales",
  "edge_type": "route_activation",
  "state": "active",
  "reason": "Input classified as purchase intent"
}
```

---

## 13. Bundles

Bundles are group containers.

They may activate together, remain standby, or be excluded.

A bundle does not automatically synthesize meaning.

Example:

```json
{
  "id": "BND.SERVUO.DANGEROUS_REFACTOR_GUARD.v1",
  "node_type": "bundle",
  "state": "standby",
  "members": [
    "BLK.INSTRUCTION.REQUIRE_CHANGE_SUMMARY.v1",
    "BLK.INSTRUCTION.ISOLATE_FILE_SCOPE.v1",
    "BLK.PHILOSOPHY.PRESERVE_USER_WORK.v1"
  ],
  "activation_condition": "route.refactor == true"
}
```

---

## 14. Merge Recipes

Merge recipes define synthesis.

There are two classes:

```text
same_type_merge
cross_type_synthesis
```

Same-type merge example:

```json
{
  "id": "MRG.INSTRUCTION.CODE_STYLE.v1",
  "merge_type": "same_type_merge",
  "inputs": [
    "BLK.INSTRUCTION.PREFER_MINIMAL_PATCH.v1",
    "BLK.INSTRUCTION.PRESERVE_PROJECT_STYLE.v1"
  ],
  "target_type": "Instruction",
  "policy": "dedupe_append"
}
```

Cross-type synthesis example:

```json
{
  "id": "MRG.BUSINESS_PLAN.ART_OF_WAR.v1",
  "merge_type": "cross_type_synthesis",
  "inputs": [
    "SLV.BUSINESS_PLAN.v1",
    "BLK.PHILOSOPHY.ART_OF_WAR.v1",
    "BLK.BLUEPRINT.INVESTOR_PLAN.v1"
  ],
  "target_role": "generation_overlay",
  "target_type": "PhilosophyOverlay",
  "policy": "typed_synthesis"
}
```

Every merge must have a target.

No untyped synthesis may continue downstream.

---

## 15. Overlays

Overlays influence the graph without becoming ordinary content blocks.

Overlay types may include:

```text
governance
philosophy
blueprint
context
tool
memory
policy
```

Examples:

```json
{
  "id": "OVR.ART_OF_WAR.BUSINESS_PLAN.v1",
  "node_type": "overlay",
  "overlay_type": "philosophy",
  "state": "active",
  "influences": [
    "SLV.BUSINESS_PLAN.v1"
  ]
}
```

Overlays should declare their influence target.

---

## 16. Capabilities

Capabilities are declared needs, not direct execution.

The IR should include capability requirements so Envoy can resolve them later.

Example:

```json
{
  "id": "CAP.REPO.SEARCH",
  "node_type": "tool_capability",
  "capability": "repo.search",
  "required": true,
  "state": "unresolved"
}
```

Envoy may later bind it to a tool pack:

```json
{
  "from": "CAP.REPO.SEARCH",
  "to": "TP.REPO_ANALYSIS.v1",
  "edge_type": "tool_binding",
  "state": "resolved"
}
```

The compiler records the requirement.

Envoy resolves and executes tools.

---

## 17. States

The IR should track runtime-relevant states.

Recommended v0 states:

```text
active
idle
standby
off
excluded
blocked
warning
error
resolved
unresolved
locked
```

Gate-specific states:

```text
gate_open
gate_closed
gate_fired
gate_missed
gate_blocked
```

Route-specific states:

```text
route_selected
route_available
route_disabled
route_standby
```

State changes should be traceable.

---

## 18. Priority Profile

The IR should carry a priority profile.

For v0:

```json
{
  "priority_profile": "molt.default.v1"
}
```

Default order:

```text
Trigger
Directive
Instruction
Subject
Primary
Philosophy
Blueprint
```

Optional future `Use / Aim / Need` can be represented as an intent-refinement band without destabilizing v0.

Example:

```json
{
  "meta_slots": {
    "IntentRefinement": {
      "position": "between:Subject,Primary",
      "contains": ["Use", "Aim", "Need"]
    }
  }
}
```

No sleeve or block may silently change the priority order.

Any profile change must be declared, validated, and traced.

---

## 19. Source Map

The source map links IR nodes back to original files/artifacts.

Example:

```json
{
  "ir_node_id": "NB.SERVUO.FILE_SCAN.v1",
  "source_artifact_id": "NB.SERVUO.FILE_SCAN.v1",
  "source_path": "AI/NEOBLOCKS/coders/NB.SERVUO.FILE_SCAN.v1.json",
  "source_type": "neoblock",
  "origin": "UMG-Block-Library"
}
```

This is essential for:

- debugging
- provenance
- trace explanations
- visual editor navigation
- creator attribution
- future package validation

---

## 20. Diagnostics

The IR should carry diagnostics before final compile output.

Diagnostic levels:

```text
info
warning
error
fatal
```

Examples:

```json
{
  "level": "warning",
  "code": "SNAP_REQUIRES_RECIPE",
  "message": "Directive and Philosophy are connected but require a typed synthesis recipe.",
  "nodes": [
    "BLK.DIRECTIVE.BUSINESS_PLAN.v1",
    "BLK.PHILOSOPHY.ART_OF_WAR.v1"
  ]
}
```

Fatal example:

```json
{
  "level": "fatal",
  "code": "UNTYPED_SYNTHESIS",
  "message": "Cross-type merge has no target type, role, container, or RuntimeSpec slot.",
  "nodes": [
    "MRG.BUSINESS_PLAN.ART_OF_WAR.v1"
  ]
}
```

---

## 21. IR to Relation Matrix

The Relation Matrix is generated from the IR.

It is a compact readable projection.

Example IR relation:

```json
{
  "from": "GOV.INTENT_ROUTER.v1",
  "to": "TRG.PURCHASE_INTENT",
  "edge_type": "overlay_influence",
  "state": "active"
}
```

Relation Matrix projection:

```text
GOV.INTENT_ROUTER [A]
GOV.INTENT_ROUTER -O-> TRG.PURCHASE_INTENT [GF][GO]
```

The matrix is allowed to be compact.
The IR must be structured.

---

## 22. IR to RuntimeSpec

The compiler resolves IR into RuntimeSpec.

RuntimeSpec should include:

- selected sleeve
- selected route
- active NeoStacks
- active NeoBlocks
- active MOLT blocks
- resolved overlays
- resolved bundles
- merge outputs
- priority decisions
- capability requirements
- warnings/errors
- output plan

The IR is richer than RuntimeSpec.

RuntimeSpec is the final operational subset.

---

## 23. IR to Trace

Trace should record meaningful decisions made while resolving the IR.

Trace events may include:

```text
source.loaded
schema.validated
ir.normalized
route.selected
gate.opened
gate.closed
artifact.offed
bundle.activated
bundle.standby
stack.resolved
sibling.resolved
merge.performed
synthesis.typed
priority.conflict_resolved
capability.required
diagnostic.emitted
runtime_spec.created
```

Each trace event should reference relevant IR node IDs.

---

## 24. Minimal v0 IR Example

```json
{
  "ir_version": "0.1",
  "source": {
    "sleeve_id": "SLV.CODER.SERVUO.v1"
  },
  "priority_profile": "molt.default.v1",
  "nodes": [
    {
      "id": "GOV.ROUTER.v1",
      "node_type": "overlay",
      "overlay_type": "governance",
      "state": "active"
    },
    {
      "id": "TRG.CODE_PATCH",
      "node_type": "trigger_gate",
      "gate_state": "fired_open"
    },
    {
      "id": "NS.SERVUO.CODER.v1",
      "node_type": "neostack",
      "state": "active"
    },
    {
      "id": "NB.SERVUO.FILE_SCAN.v1",
      "node_type": "neoblock",
      "state": "active"
    }
  ],
  "edges": [
    {
      "from": "GOV.ROUTER.v1",
      "to": "TRG.CODE_PATCH",
      "edge_type": "overlay_influence",
      "state": "active"
    },
    {
      "from": "TRG.CODE_PATCH",
      "to": "NS.SERVUO.CODER.v1",
      "edge_type": "route_activation",
      "state": "active"
    },
    {
      "from": "NS.SERVUO.CODER.v1",
      "to": "NB.SERVUO.FILE_SCAN.v1",
      "edge_type": "vertical_precedence",
      "state": "active"
    }
  ],
  "routes": [
    {
      "id": "route.normal_code_patch",
      "state": "route_selected"
    }
  ],
  "diagnostics": []
}
```

---

## 25. Non-Goals for v0.1

The IR v0.1 does not need to implement:

- full visual editor behavior
- final graph layout coordinates
- crypto reward logic
- public marketplace logic
- multiple priority profiles
- full anti-abuse provenance scoring
- runtime tool execution
- final Relation Matrix glyph syntax
- complex multi-agent orchestration

The IR only needs to normalize UMG artifacts into a deterministic graph.

---

## 26. v0.1 Acceptance Criteria

UMG IR v0.1 is acceptable when it can represent:

- sleeve source
- blocks
- NeoBlocks
- NeoStacks
- governance overlays
- route selection
- trigger gates
- Off/exclusion
- bundles
- vertical precedence
- horizontal siblings
- typed merges
- capability requirements
- diagnostics
- source mapping
- trace references

If it can do that, it is enough for v0.

---

## 27. Summary

The UMG IR is the compiler's normalized graph layer.

It transforms scattered UMG artifacts into a deterministic structure that can be resolved into RuntimeSpec and Trace.

It should use familiar engineering patterns: IR, CFG, DAG, adjacency lists, finite-state route/gate states, diagnostics, source maps, and trace events.

The IR preserves UMG's unique concepts while keeping implementation understandable to developers.

In short:

```text
JSON source artifacts define the system.
UMG IR normalizes the system.
Compiler resolves the system.
RuntimeSpec operates the system.
Trace explains the system.
Relation Matrix summarizes the system.
Envoy runs the system.
```
