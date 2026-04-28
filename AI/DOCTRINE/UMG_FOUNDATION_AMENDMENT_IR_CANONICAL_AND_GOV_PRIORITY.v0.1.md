# UMG Foundation Amendment — IR Canonical Form + Governance/Priority Tiebreaker v0.1

**Document ID:** `UMG_FOUNDATION_AMENDMENT.IR_CANONICAL_AND_GOV_PRIORITY.v0.1`  
**Status:** Amendment draft  
**Applies to:** `UMG_COMPILER_LAW.v0.3`, `UMG_IR.v0.1`  
**Purpose:** Close two documentation gaps before continuing to Section 3.

---

## 1. Amendment Summary

Two issues needed explicit resolution before continuing:

1. **UMG IR was defined by purpose but not strongly enough by canonical structure.**  
   It needs a concrete normalized object shape, required fields, and canonical ordering rules.

2. **Governance vs Priority needed a tiebreaker.**  
   Governance routes active paths. Priority resolves conflicts inside active routes. But the law must define what happens if governance routing and priority resolution appear to contradict each other.

This amendment resolves both.

---

# Part A — UMG IR Canonical Form

## 2. Canonical IR Definition

The **UMG IR** is a normalized, typed, ordered graph object.

It is not merely “whatever the compiler normalized.”

It has a canonical shape:

```text
UMG_IR =
  Header
  Source
  Profiles
  Nodes
  Edges
  Routes
  Gates
  Bundles
  Overlays
  Merge Recipes
  Capabilities
  States
  Diagnostics
  Source Map
  Integrity
```

In JSON form:

```json
{
  "ir_version": "0.1",
  "ir_id": "IR.SLV.CODER.SERVUO.v1.000001",
  "source": {},
  "profiles": {},
  "nodes": [],
  "edges": [],
  "routes": [],
  "gates": [],
  "bundles": [],
  "overlays": [],
  "merge_recipes": [],
  "capabilities": [],
  "states": {},
  "diagnostics": [],
  "source_map": [],
  "integrity": {}
}
```

This is the canonical top-level field order for v0.1.

---

## 3. Required Top-Level Fields

For v0.1, every valid IR object must include:

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

Fields may contain empty arrays or objects, but the keys should exist.

Reason:

- deterministic parsing
- predictable validation
- easier tests
- stable diffs
- simpler compiler adapters
- easier Relation Matrix projection

---

## 4. IR Header

```json
{
  "ir_version": "0.1",
  "ir_id": "IR.SLV.CODER.SERVUO.v1.000001"
}
```

### `ir_version`

Defines the IR schema version.

### `ir_id`

Unique ID for this normalized IR object.

Recommended form:

```text
IR.<SOURCE_ARTIFACT_ID>.<SEQUENCE_OR_HASH_SHORT>
```

Example:

```text
IR.SLV.CODER.SERVUO.v1.000001
```

---

## 5. Source Object

The `source` object identifies the origin of the compile.

```json
{
  "source": {
    "root_artifact_id": "SLV.CODER.SERVUO.v1",
    "root_artifact_type": "sleeve",
    "root_artifact_version": "1.0.0",
    "library_sources": [
      {
        "id": "UMG-Block-Library",
        "type": "public_library",
        "ref": "main"
      }
    ],
    "input_hash": "sha256:...",
    "compiled_at": "2026-04-27T00:00:00Z"
  }
}
```

Required subfields:

```text
root_artifact_id
root_artifact_type
root_artifact_version
library_sources
input_hash
compiled_at
```

---

## 6. Profiles Object

The `profiles` object declares active compiler profiles.

```json
{
  "profiles": {
    "priority_profile": "molt.default.v1",
    "route_profile": "route.single_primary.v1",
    "merge_profile": "merge.default.v1",
    "strictness_profile": "compile.dev.v1"
  }
}
```

For v0.1, required:

```text
priority_profile
route_profile
merge_profile
strictness_profile
```

Default priority profile:

```text
molt.default.v1
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

---

## 7. Canonical Node Shape

Every node must follow this shape:

```json
{
  "id": "NB.SERVUO.FILE_SCAN.v1",
  "kind": "neoblock",
  "label": "File / Class Scanner",
  "source_ref": "AI/NEOBLOCKS/coders/NB.SERVUO.FILE_SCAN.v1.json",
  "artifact_id": "NB.SERVUO.FILE_SCAN.v1",
  "molt_type": null,
  "roles": ["Trigger", "Instruction", "Subject", "Blueprint"],
  "state": "active",
  "rank": 30,
  "metadata": {}
}
```

Required fields:

```text
id
kind
label
source_ref
artifact_id
molt_type
roles
state
rank
metadata
```

### Node `kind` enum

```text
molt_block
neoblock
neostack
sleeve
bundle
overlay
trigger_gate
route
merge_result
capability
toolpack
service
runtime_slot
```

### Node `state` enum

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

### `rank`

`rank` is used for deterministic ordering inside equivalent sets.

It should not replace MOLT priority.

---

## 8. Canonical Edge Shape

Every edge must follow this shape:

```json
{
  "id": "EDGE.NB.REPO_CONTEXT_TO_FILE_SCAN",
  "from": "NB.SERVUO.REPO_CONTEXT.v1",
  "to": "NB.SERVUO.FILE_SCAN.v1",
  "kind": "vertical_precedence",
  "state": "active",
  "rank": 10,
  "guard": null,
  "reason": "File scan depends on repository context.",
  "metadata": {}
}
```

Required fields:

```text
id
from
to
kind
state
rank
guard
reason
metadata
```

### Edge `kind` enum

```text
vertical_precedence
horizontal_sibling
route_flow
route_activation
gate_to_route
bundle_membership
merge_input
merge_output
overlay_influence
capability_requirement
tool_binding
source_dependency
off_exclusion
conflict
diagnostic_link
```

---

## 9. Canonical Route Shape

```json
{
  "id": "route.normal_code_patch",
  "label": "Normal Code Patch",
  "state": "selected",
  "entry_gate": "TRG.CODE_PATCH",
  "activate": ["NS.SERVUO.CODER.v1"],
  "disable": ["NS.DOCS.WRITER.v1"],
  "standby": ["NS.SERVUO.RECOVERY.v1"],
  "reason": "User request classified as code-patch intent.",
  "metadata": {}
}
```

Required fields:

```text
id
label
state
entry_gate
activate
disable
standby
reason
metadata
```

Route states:

```text
selected
available
standby
disabled
blocked
complete
failed
```

---

## 10. Canonical Gate Shape

```json
{
  "id": "TRG.CODE_PATCH",
  "label": "Code Patch Trigger",
  "state": "fired_open",
  "opens_route": "route.normal_code_patch",
  "closed_routes": ["route.docs_only"],
  "reason": "User requested a code change.",
  "metadata": {}
}
```

Required fields:

```text
id
label
state
opens_route
closed_routes
reason
metadata
```

Gate states:

```text
open
closed
fired_open
missed
blocked
locked
```

---

## 11. Canonical Bundle Shape

```json
{
  "id": "BND.SERVUO.REFACTOR_GUARD.v1",
  "label": "Refactor Guard Bundle",
  "state": "standby",
  "members": [
    "BLK.INSTRUCTION.REQUIRE_CHANGE_SUMMARY.v1",
    "BLK.INSTRUCTION.ISOLATE_FILE_SCOPE.v1"
  ],
  "activation_condition": "route.refactor == true",
  "metadata": {}
}
```

Required fields:

```text
id
label
state
members
activation_condition
metadata
```

---

## 12. Canonical Overlay Shape

```json
{
  "id": "OVR.GOV.INTENT_ROUTER.v1",
  "label": "Intent Router Governance Overlay",
  "overlay_type": "governance",
  "state": "active",
  "targets": ["route.sales", "route.service"],
  "influence": "route_selection",
  "metadata": {}
}
```

Required fields:

```text
id
label
overlay_type
state
targets
influence
metadata
```

Overlay types:

```text
governance
philosophy
blueprint
context
tool
memory
policy
```

---

## 13. Canonical Merge Recipe Shape

```json
{
  "id": "MRG.BUSINESS_PLAN.ART_OF_WAR.v1",
  "merge_type": "cross_type_synthesis",
  "inputs": [
    "SLV.BUSINESS_PLAN.v1",
    "BLK.PHILOSOPHY.ART_OF_WAR.v1",
    "BLK.BLUEPRINT.INVESTOR_PLAN.v1"
  ],
  "target_type": "PhilosophyOverlay",
  "target_role": "generation_overlay",
  "target_container": "RuntimeSpec.overlays",
  "policy": "typed_synthesis",
  "state": "resolved",
  "metadata": {}
}
```

Required fields:

```text
id
merge_type
inputs
target_type
target_role
target_container
policy
state
metadata
```

Rules:

- Same-type merge may infer target type if all inputs share one MOLT type.
- Cross-type synthesis must explicitly declare target type, target role, or target container.
- Untyped cross-type synthesis is fatal in strict mode.

---

## 14. Canonical Capability Shape

```json
{
  "id": "CAP.REPO.SEARCH",
  "capability": "repo.search",
  "required": true,
  "state": "unresolved",
  "satisfied_by": null,
  "permissions": ["filesystem.read"],
  "metadata": {}
}
```

Required fields:

```text
id
capability
required
state
satisfied_by
permissions
metadata
```

Capabilities are requirements only.

Envoy resolves them to Tool Packs.

The compiler does not execute them.

---

## 15. States Object

The `states` object stores high-level active state.

```json
{
  "states": {
    "active_route": "route.normal_code_patch",
    "active_sleeve": "SLV.CODER.SERVUO.v1",
    "active_neostacks": ["NS.SERVUO.CODER.v1"],
    "off_artifacts": ["NS.DOCS.WRITER.v1"],
    "standby_artifacts": ["NS.SERVUO.RECOVERY.v1"]
  }
}
```

Required fields:

```text
active_route
active_sleeve
active_neostacks
off_artifacts
standby_artifacts
```

---

## 16. Diagnostics Shape

```json
{
  "id": "DIAG.0001",
  "level": "warning",
  "code": "SNAP_REQUIRES_RECIPE",
  "message": "Directive and Philosophy are connected but require a typed synthesis recipe.",
  "nodes": [
    "BLK.DIRECTIVE.BUSINESS_PLAN.v1",
    "BLK.PHILOSOPHY.ART_OF_WAR.v1"
  ],
  "edges": [],
  "fatal": false
}
```

Required fields:

```text
id
level
code
message
nodes
edges
fatal
```

Diagnostic levels:

```text
info
warning
error
fatal
```

---

## 17. Source Map Shape

```json
{
  "ir_node_id": "NB.SERVUO.FILE_SCAN.v1",
  "artifact_id": "NB.SERVUO.FILE_SCAN.v1",
  "artifact_type": "neoblock",
  "source_path": "AI/NEOBLOCKS/coders/NB.SERVUO.FILE_SCAN.v1.json",
  "source_origin": "UMG-Block-Library",
  "content_hash": "sha256:..."
}
```

Required fields:

```text
ir_node_id
artifact_id
artifact_type
source_path
source_origin
content_hash
```

---

## 18. Integrity Object

The `integrity` object supports deterministic builds and later provenance.

```json
{
  "integrity": {
    "canonical_hash": "sha256:...",
    "node_count": 42,
    "edge_count": 77,
    "diagnostic_count": 1,
    "lock_ref": "sleeve.lock.json"
  }
}
```

Required fields:

```text
canonical_hash
node_count
edge_count
diagnostic_count
lock_ref
```

---

## 19. Canonical Ordering Rules

To make IR deterministic, arrays must be sorted.

### Nodes

Sort by:

```text
kind_order
rank descending
id ascending
```

### Edges

Sort by:

```text
from ascending
rank descending
kind ascending
to ascending
```

### Routes

Sort by:

```text
state selected first
rank descending if present
id ascending
```

### Diagnostics

Sort by:

```text
fatal first
level severity
id ascending
```

This makes diffing and testing much cleaner.

---

# Part B — Governance vs Priority Tiebreaker

## 20. Problem

The law said:

```text
Governance routes active paths.
Priority resolves conflicts inside the active route.
```

This leaves one edge case:

What if governance routes one way, but priority analysis inside that route implies another route should have won?

Example:

```text
Governance selects Sales route.
A high-priority Directive inside active state says this is a support complaint.
```

Who wins?

---

## 21. Tiebreaker Law

The rule is:

```text
Governance controls route membership.
Priority controls semantic conflict inside the selected route.

If priority discovers evidence that the selected route is invalid, it cannot silently override governance.
It must emit a route-challenge diagnostic and return control to governance for reroute.
```

In short:

```text
Governance wins route selection.
Priority can challenge route selection.
Governance must reroute or confirm.
Trace records both.
```

This prevents priority from secretly switching routes.

---

## 22. Route Challenge

A route challenge is a formal diagnostic.

```json
{
  "id": "DIAG.ROUTE_CHALLENGE.0001",
  "level": "warning",
  "code": "ROUTE_CHALLENGE",
  "message": "Priority analysis found active-route evidence inconsistent with governance route selection.",
  "nodes": [
    "GOV.INTENT_ROUTER.v1",
    "BLK.DIRECTIVE.SUPPORT_COMPLAINT.v1"
  ],
  "edges": [],
  "fatal": false
}
```

In strict mode, this may become fatal if unresolved.

---

## 23. Governance Confirmation

If governance confirms its original route:

```text
Governance route stands.
Priority resolves only inside that active route.
Contradictory out-of-route artifacts remain off or standby.
Trace records confirmation.
```

Trace event:

```json
{
  "event": "route.confirmed",
  "route": "route.sales",
  "challenged_by": "BLK.DIRECTIVE.SUPPORT_COMPLAINT.v1",
  "reason": "Governance classified user intent as purchase despite support-like phrase."
}
```

---

## 24. Governance Reroute

If governance accepts the challenge:

```text
Original route is turned off.
New route activates.
Compiler resumes from route selection.
Trace records reroute.
```

Trace event:

```json
{
  "event": "route.rerouted",
  "from_route": "route.sales",
  "to_route": "route.service",
  "reason": "High-priority directive evidence indicated complaint/support intent."
}
```

---

## 25. Why Governance Wins Route Selection

Governance must win route selection because route activation determines which artifacts are in the active set.

Priority cannot resolve conflicts between active and inactive objects if it is allowed to freely pull inactive objects into the active route.

That would collapse route control.

So the formal sequence is:

```text
1. Governance selects route.
2. Route defines active set.
3. Priority resolves conflicts inside active set.
4. Priority may challenge route.
5. Governance confirms or reroutes.
6. Trace records decision.
```

---

## 26. Strict Mode Rule

In strict/prod mode:

```text
Unresolved governance-priority contradiction = compile failure.
```

In dev mode:

```text
Emit warning, preserve governance route, continue deterministically.
```

This keeps v0 buildable while still surfacing the issue.

---

## 27. Final Added Law

Add this to `UMG_COMPILER_LAW.v0.3`:

```text
Governance is authoritative over route membership.
Priority is authoritative over semantic conflict inside the active route.
Priority may challenge governance by emitting a route-challenge diagnostic, but may not silently reroute.
Governance must confirm, reroute, or fail the compile depending on strictness profile.
```

---

## 28. Final IR Amendment

Add this to `UMG_IR.v0.1`:

```text
UMG IR is a canonical normalized graph object with required top-level fields:
ir_version, ir_id, source, profiles, nodes, edges, routes, gates, bundles, overlays,
merge_recipes, capabilities, states, diagnostics, source_map, integrity.

All nodes and edges follow canonical required shapes.
All arrays have deterministic ordering.
All governance-priority contradictions are represented as route-challenge diagnostics.
```

---

## 29. Summary

Claude's two flags are valid.

This amendment resolves them.

The IR is now defined not only by what it does, but by what it structurally is:

```text
a canonical normalized graph object
```

And the governance-priority contradiction now has a rule:

```text
Governance selects routes.
Priority resolves inside routes.
Priority can challenge governance.
Governance confirms, reroutes, or fails.
Trace records the result.
```

This keeps the system deterministic, auditable, and buildable.
