# Section 13 — Visual Studio / Graph UI Concepts v0.1

**Document ID:** `UMG_VISUAL_STUDIO_GRAPH_UI_CONCEPTS.v0.1`  
**Status:** Foundation draft  
**Layer:** Future visual builder / graph studio / dashboard / human inspection surface  
**Depends on:** `UMG_COMPILER_LAW.v0.3`, `UMG_IR.v0.1`, `UMG_RELATION_MATRIX.v0.1`, `UMG_HUMAN_AI_LIBRARY_PRESENTATION.v0.1`, `UMG_GOVERNANCE_ROUTING_OVERLAY_MODEL.v0.1`  
**Feeds into:** future visual studio, dashboard, sleeve cards, block cards, runtime graph inspection, active route visualization, creator library browsing  

---

## 1. Purpose

This document defines the conceptual foundation for a future **UMG Visual Studio / Graph UI**.

The Visual Studio is the human-facing graph surface where users can inspect, assemble, route, compare, debug, and eventually publish UMG artifacts.

It may support:

- block cards;
- NeoBlock cards;
- NeoStack graph views;
- sleeve cards;
- drag/drop visual composition;
- vertical authority stacking;
- horizontal sibling snapping;
- route highlighting;
- trigger gates;
- governance overlays;
- bundle capsules;
- typed merge nodes;
- tool/capability nodes;
- runtime service nodes;
- Relation Matrix display;
- Trace panel;
- RuntimeSpec inspector;
- public creator-library browsing.

The Visual Studio is not the compiler.

The Visual Studio is not the source of truth.

The Visual Studio is a human interaction and inspection surface over canonical UMG artifacts, IR, RuntimeSpec, Trace, and Relation Matrix.

---

## 2. Core Boundary

The Visual Studio should obey the same authority stack as the rest of UMG.

```text
Canonical JSON artifacts
  ↓
UMG IR
  ↓
RuntimeSpec + Trace
  ↓
Relation Matrix projection
  ↓
Visual Studio rendering
```

The UI renders and edits canonical structures.

It should not invent hidden semantics.

If the visual graph and IR disagree:

```text
IR wins.
UI must refresh or surface a diagnostic.
```

If the IR and canonical JSON disagree:

```text
validation / source map / compiler diagnostics resolve the conflict.
```

---

## 3. Existing Presentation Context

The public Block Library already separates AI and HUMAN surfaces.

The AI side is explicitly described as machine-readable or machine-oriented UMG surfaces such as doctrine, schemas, manifests, baseline block libraries, and selected structural artifacts.

The HUMAN side is explicitly described as readable explanations, glossaries, guides, and curated public-facing views.

The Visual Studio belongs downstream of both:

```text
AI artifacts provide the source.
HUMAN docs explain the source.
Visual Studio renders, inspects, and eventually edits the source.
```

---

## 4. Primary UI Roles

The Visual Studio has four main roles:

### 1. Library Browser

Browse blocks, NeoBlocks, NeoStacks, sleeves, toolpacks, and examples.

### 2. Graph Builder

Create or edit compositions through visual snapping, stacking, grouping, routing, and merging.

### 3. Runtime Dashboard

Inspect active sleeve, active route, active NeoStacks, active gates, Tool Pack bindings, diagnostics, Trace, RuntimeSpec, and Relation Matrix.

### 4. Publishing / Review Surface

Review provenance, dependencies, uniqueness, public status, creator attribution, and future submission readiness.

For v0, prioritize viewing and inspection before editing.

---

## 5. Visual Authority Rule

Visual geometry maps to compiler semantics.

```text
Vertical = authority / sequence / precedence.
Horizontal = sibling / equal-level / parallel relation.
Group/capsule = bundle or package.
Merge node = typed synthesis.
Gate node = Trigger.
Overlay layer = influence / routing / policy / context.
Dimmed node = Off or inactive.
Outlined node = standby.
Highlighted path = active route.
```

The UI must make these meanings clear.

---

## 6. Visual Node Types

Recommended visual node types:

```text
MOLT Block Node
NeoBlock Node
NeoStack Node
Sleeve Card
Bundle Capsule
Trigger Gate Node
Governance Overlay Node
Philosophy Overlay Node
Blueprint Overlay Node
Context Overlay Node
Memory Overlay Node
Tool Overlay Node
Policy/Safety Overlay Node
Capability Node
Tool Pack Node
Runtime Service Node
Merge/Synthesis Node
Diagnostic Node
Trace Event Node
RuntimeSpec Node
```

Each visual node should map to a stable artifact ID, IR node ID, runtime pseudo-node, or diagnostic ID.

---

## 7. Visual Edge Types

Recommended visual edge types:

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
diagnostic_link
```

These should map directly to IR edge kinds and Relation Matrix relation codes.

Example mapping:

```text
vertical_precedence  →  -V->
horizontal_sibling   →  -H-
route_flow           →  -F->
bundle_membership    →  -B-
merge_input/output   →  -M->
overlay_influence    →  -O->
capability_requirement → -C->
tool_binding         →  -T->
off_exclusion        →  -X->
diagnostic_link      →  -D->
```

---

## 8. Vertical Authority Geometry

Vertical placement means one node constrains, sequences, precedes, or governs the node below it.

Example:

```text
NB.REQUEST_INTAKE
  ↓
NB.REPO_CONTEXT
  ↓
NB.FILE_SCAN
  ↓
NB.PATCH_PLANNER
  ↓
NB.CSHARP_GENERATOR
```

Meaning:

```text
higher nodes frame or constrain lower nodes
lower nodes still contribute if compatible
conflict flows upward to parent/route/priority
```

Vertical does not mean:

```text
lower nodes vanish
higher nodes automatically delete lower content
every vertical relation is a hard override
```

Vertical is a precedence and dependency signal.

---

## 9. Horizontal Sibling Geometry

Horizontal placement means equal-level relation.

Example:

```text
NB.FILE_SCAN  ↔  NB.API_MAP  ↔  NB.DEPENDENCY_TRACE
```

Meaning:

```text
sibling modules
parallel contribution
no automatic dominance
same tier
cooperating support roles
```

If horizontal siblings conflict, route to:

```text
parent NeoBlock / NeoStack
merge recipe
governance
priority conflict resolver
diagnostic
```

The UI should show horizontal relations without implying priority.

---

## 10. Snap Compatibility

Visual snapping is not arbitrary.

A valid snap requires at least one compatibility basis:

```text
same-tier sibling compatibility
parent NeoBlock allows pairing
parent NeoStack allows pairing
active route expects relation
bundle declares grouping
merge recipe declares typed synthesis
overlay allows influence
governance authorizes route
compatibility matrix allows relation
```

Invalid snaps should produce a visible diagnostic.

Example:

```text
Blueprint horizontally snapped to Directive without route, bundle, or typed synthesis recipe
→ warning: SNAP_REQUIRES_RECIPE
```

The UI may allow experimental drafts, but invalid relations must not silently compile as valid.

---

## 11. Snap Interaction States

Recommended visual snap states:

```text
valid_snap
invalid_snap
requires_recipe
requires_parent
requires_governance
requires_route
requires_bundle
requires_merge_target
experimental_warning
```

Visual feedback:

```text
valid = normal attach/highlight
invalid = red/blocked
requires recipe = yellow warning
requires governance = purple/top-layer warning
requires route = route badge required
requires merge target = synthesis node required
```

The exact colors can be chosen later.

The semantics should exist first.

---

## 12. Bundle Capsules

Bundles should appear as grouped capsules.

A bundle may contain:

```text
MOLT Blocks
NeoBlocks
overlays
capability declarations
local route fragments
conditional instructions
```

Visual behavior:

```text
collapsed bundle = capsule with title/status/count
expanded bundle = contained nodes visible
standby bundle = outlined/dimmed
active bundle = highlighted
off bundle = dimmed/off state
```

Bundle does not synthesize meaning.

Merge nodes synthesize meaning.

---

## 13. Merge / Synthesis Nodes

Merge should appear as a distinct node or connector.

Same-type merge:

```text
Instruction A
Instruction B
    ↓
MRG.INSTRUCTION.CODE_STYLE
    ↓
Instruction synthesis output
```

Cross-type synthesis:

```text
Directive
Philosophy
Blueprint
    ↓
MRG.BUSINESS_PLAN.ART_OF_WAR
    ↓
OVR.ART_OF_WAR.BUSINESS_PLAN
```

Visual rule:

```text
Every cross-type synthesis merge must show a target type, target role, or target container.
```

Untyped merge should show as error.

---

## 14. Trigger Gate Nodes

Trigger nodes should render as gates.

States:

```text
closed
open
fired
missed
blocked
locked
```

Relation Matrix codes:

```text
[GO] gate open
[GC] gate closed
[GF] gate fired
[GM] gate missed
[GB] gate blocked
[GL] gate locked
```

Visual behavior:

```text
closed gate = path dimmed
open gate = path available
fired gate = active route transition
blocked gate = policy/governance block
locked gate = cannot be changed without authority
```

The user should be able to see why a path opened.

---

## 15. Governance Overlay Visualization

Governance should appear above or around the active graph.

Recommended visual pattern:

```text
Governance Overlay
  ↓ controls
Trigger Gates
  ↓ open/close
Routes
  ↓ activate/off
NeoStacks
```

Example:

```text
OVR.GOV.CODE_ROUTER
  ↓
TRG.CODE_PATCH [fired/open]
  ↓
NS.CODER.SERVUO.MASTER [active]
```

Governance should not be hidden inside the graph.

It is a top-level orchestration layer.

---

## 16. Route Highlighting

The active route should be visually obvious.

Recommended states:

```text
active route = highlighted path
standby route = outlined path
off route = dimmed path
blocked route = blocked marker
challenged route = warning marker
rerouted path = delta animation or transition marker
```

For v0 static rendering, simply show:

```text
active
standby
off
blocked
warning
```

Route should also appear in a Route Inspector panel.

---

## 17. Off / Standby Visualization

Off means excluded from the current active run.

Standby means available but not active.

Visual distinction:

```text
Off = dimmed / excluded / muted
Standby = outlined / paused / available
Active = highlighted / solid
Blocked = warning/error state
```

Do not visually erase Off artifacts by default.

Users should be able to inspect why something was Off.

---

## 18. Overlay Visualization

Overlay types should have recognizable visual treatment.

Recommended overlay display:

```text
Governance Overlay = top controller layer
Philosophy Overlay = lens/influence band
Blueprint Overlay = output frame/format band
Context Overlay = temporary context panel
Memory Overlay = retrieval/memory badge
Tool Overlay = capability/status panel
Policy/Safety Overlay = guardrail/lock band
Runtime Overlay = status/diagnostic layer
```

Overlays should show:

```text
overlay ID
type
state
targets
influence
source artifacts
activation condition
diagnostics
```

---

## 19. Capability / Tool Nodes

Capabilities and Tool Packs should be visually separate.

Capability node:

```text
CAP.REPO.SEARCH
```

Tool Pack node:

```text
TP.REPO_ANALYSIS.v1
```

Binding edge:

```text
CAP.REPO.SEARCH -T-> TP.REPO_ANALYSIS.v1
```

Visual states:

```text
resolved
unresolved
missing
blocked
permission_denied
unsafe
```

Tool execution should not be hidden.

The dashboard should show if a sleeve requires a tool, whether the tool is installed, whether permission is granted, and whether it was invoked.

---

## 20. Runtime Service Nodes

Runtime services may appear as support nodes.

Examples:

```text
SVC.MEMORY
SVC.CACHE
SVC.TRACE
SVC.LOG
SVC.GUARD
SVC.IO
```

Service nodes help users understand support systems without confusing them with MOLT Blocks.

Visual rule:

```text
Runtime services are support nodes, not normal semantic blocks.
```

---

## 21. Relation Matrix Panel

The Visual Studio should include a Relation Matrix panel.

It should show:

```text
current matrix snapshot
latest matrix delta
active route
pass ID
sleeve ID
IR ID
RuntimeSpec ID
diagnostics
```

Example:

```text
GOV.CODE_ROUTER [A]
GOV.CODE_ROUTER -O-> TRG.CODE_PATCH [GF][GO]
TRG.CODE_PATCH -F-> NS.CODER.SERVUO.MASTER.v1 [A]
TRG.DOCS_ONLY -X-> NS.CODER.DOCS.v1 [OFF]
```

The Relation Matrix panel lets developers and AI agents inspect graph state without relying on a visual renderer.

---

## 22. Trace Panel

The Trace panel should show decision history.

Trace events should be filterable by:

```text
pass ID
artifact ID
route ID
event type
severity
diagnostic code
tool invocation
capability
merge
governance decision
```

Example events:

```text
route.selected
gate.opened
artifact.offed
bundle.activated
merge.performed
synthesis.typed
priority.route_challenge
capability.resolved
tool.invoked
runtime_spec.created
relation_matrix.emitted
```

The Trace panel answers:

```text
Why did the system do this?
```

---

## 23. RuntimeSpec Inspector

The RuntimeSpec inspector should show:

```text
active sleeve
active route
active NeoStacks
active NeoBlocks
active MOLT Blocks
active overlays
active bundles
merge outputs
capability requirements
tool bindings
warnings/errors
output plan
```

This is different from the visual graph.

The visual graph shows shape.

RuntimeSpec shows resolved operational state.

---

## 24. Artifact Inspector

Clicking any node should open an inspector.

Inspector fields:

```text
artifact ID
artifact type
name
library code
version
status
creator
source path
provenance
dependencies
relations
runtime state
diagnostics
source JSON preview
Human card link
Trace events involving this artifact
Relation Matrix lines involving this artifact
```

For Tool Packs, inspector should also show:

```text
permissions
risk level
side effects
provided capabilities
tools
safety state
```

---

## 25. Source / Human Toggle

The UI should support toggling between:

```text
Human card
source JSON
Relation Matrix references
Trace references
RuntimeSpec usage
dependency graph
```

This preserves the AI/HUMAN split.

Human view explains.

Source JSON remains canonical.

---

## 26. Sleeve Cards

Sleeve cards should show:

```text
sleeve ID
name
category
purpose
creator
status
version
main NeoStack
routes
governance overlay
required capabilities
recommended Tool Packs
public status
review status
download/clone/use hooks later
```

Sleeve cards are browsing/selection surfaces.

They should not contain the whole sleeve.

---

## 27. Block Cards

MOLT Block cards should show:

```text
block ID
MOLT type
name
library code
summary
priority profile
stack key/rank
merge key/policy
can_float
creator
status
used by NeoBlocks
```

Block cards should be compact.

Atomic blocks should not be visually scattered as normal runtime units unless explicitly allowed.

---

## 28. NeoBlock Cards

NeoBlock cards should show:

```text
NeoBlock ID
purpose
included MOLT Blocks
required/optional MOLT types
geometry summary
bundles
merge recipes
capabilities
used by NeoStacks
creator/status
```

NeoBlock cards are likely the most important reusable visual unit.

---

## 29. NeoStack Cards

NeoStack cards should show:

```text
NeoStack ID
purpose
included NeoBlocks
route participation
activation logic
governance controller
geometry summary
capability requirements
runtime services
used by Sleeves
creator/status
```

NeoStack cards represent workflow lanes.

---

## 30. Tool Pack Cards

Tool Pack cards should show:

```text
Tool Pack ID
provided capabilities
tools exposed
runtime host
permissions
risk levels
side effects
security review status
trace behavior
compatibility
creator/status
```

Tool Pack cards should clearly mark risk.

---

## 31. Visual Layout Modes

The Visual Studio should support multiple layout modes.

Recommended modes:

```text
Library Card View
Sleeve Overview
NeoStack Graph View
NeoBlock Internal View
Route View
Runtime Dashboard View
Relation Matrix View
Trace View
Dependency Graph View
Provenance View
Tool/Capability View
```

Do not force one layout to do everything.

---

## 32. Route View

Route View should show:

```text
available routes
selected route
entry gate
activated artifacts
offed artifacts
standby artifacts
route challenge diagnostics
reroute history
```

This is essential for governance debugging.

---

## 33. Dependency Graph View

Dependency Graph View should show:

```text
what this artifact depends on
what depends on this artifact
creator lineage
derivative lineage
tool dependencies
schema dependencies
```

This view supports future creator economy and provenance.

---

## 34. Provenance View

Provenance View should show:

```text
creator
origin
parent IDs
derived_from
inspired_by
content hash
package hash
public status
review status
uniqueness class
duplicate/variant/remix status
reward tracking status later
```

This should be inspection-only in v0.

---

## 35. Visual Editing v0 vs Later

Do not build full visual editing first.

Recommended order:

```text
v0: inspect/render graph from existing artifacts
v1: edit metadata and links safely
v2: drag/drop NeoBlocks and relations
v3: create new blocks/stacks/sleeves visually
v4: publish/remix/submit through UI
```

Early Visual Studio should be read-mostly.

This prevents corrupting canonical artifacts.

---

## 36. Drag and Drop Semantics

When editing eventually exists:

Dragging vertically should propose:

```text
vertical_precedence
```

Dragging horizontally should propose:

```text
horizontal_sibling
```

Dropping into a capsule should propose:

```text
bundle_membership
```

Dropping into a merge node should propose:

```text
merge_input
```

Dropping into an overlay band should propose:

```text
overlay_influence
```

Dropping onto a route should propose:

```text
route_activation / route_standby / route_disable
```

Every proposed relation must validate before compile.

---

## 37. Visual Matrix Round-Trip

Eventually, the UI should support this round-trip:

```text
Canonical JSON
  → IR
  → Relation Matrix
  → Visual Graph
  → user edits relation
  → validated patch
  → canonical JSON update
```

The dangerous part is the last step.

User edits must become explicit patches, not hidden state changes.

---

## 38. Patch Model for Visual Edits

Visual edits should produce patch objects.

Example:

```json
{
  "patch_type": "add_relation",
  "target_artifact": "NS.CODER.SERVUO.MASTER.v1",
  "relation": {
    "from": "NB.SERVUO.FILE_SCAN.v1",
    "to": "NB.SERVUO.API_MAP.v1",
    "kind": "horizontal_sibling"
  },
  "validation": {
    "status": "pending"
  }
}
```

Patch must validate before commit.

This keeps UI edits auditable.

---

## 39. Diagnostics UX

Diagnostics should be first-class.

Show:

```text
invalid snap
missing artifact
untyped merge
route challenge
missing capability
unsafe toolpack
hash mismatch
lockfile drift
floating MOLT block
unknown overlay type
schema error
```

Diagnostics should link to:

```text
artifact
source JSON
trace event
fix suggestion
```

---

## 40. Active Runtime Dashboard

Runtime dashboard should show:

```text
active sleeve
active route
active NeoStack
active gates
active overlays
active capabilities
Tool Pack binding status
RuntimeSpec status
Relation Matrix snapshot
latest Trace events
diagnostics
```

This is the main operational view for Envoy/OpenClaw integration.

---

## 41. Visual Safety Rules

The UI should prevent or warn against:

```text
arbitrary cross-MOLT snapping
untyped synthesis
floating MOLT blocks without permission
hidden tool execution
unsafe Tool Pack binding
public/private data leakage
editing canonical artifacts without validation
publishing unreviewed private traces
source/Human mismatch
```

Fail closed where necessary.

---

## 42. Public Library UI

A public web/library UI may eventually show:

```text
browse blocks
browse NeoBlocks
browse NeoStacks
browse sleeves
view Human cards
view source JSON
view dependency graph
clone/download
submit remix
creator attribution
usage stats later
review status
public status
```

This is separate from local runtime dashboard.

Public library UI is for discovery.

Runtime dashboard is for operation.

Visual Studio may combine them for advanced users.

---

## 43. Creator Economy UI Hooks

Future UI may show:

```text
downloads
clones
verified uses
dependent artifacts
remixes
nominations
creator profile
reward eligibility state
abuse review state
uniqueness class
dependency credit path
```

Do not show speculative payout or token value in v0.

Use labels such as:

```text
tracking only
reward not enabled
reward locked
eligible pending review
```

---

## 44. Visual Legend

The UI should provide a persistent legend.

Minimum legend:

```text
Vertical line = authority / sequence / precedence
Horizontal line = sibling / parallel relation
Gate = Trigger
Capsule = Bundle
Merge node = typed synthesis
Overlay band = influence layer
Dimmed = Off / excluded
Outlined = Standby
Highlighted = Active
Red/error = invalid / conflict
Yellow/warning = requires review
Tool node = executable capability provider
Service node = runtime support service
```

The legend should match Relation Matrix codes.

---

## 45. Accessibility and Plain Text

The visual UI should always support plain-text inspection.

Reasons:

```text
debugging
AI context
terminal use
screen readers
copy/paste
logs
version control
low-token state transfer
```

Every visual graph should have a corresponding Relation Matrix or JSON source view.

---

## 46. Minimal v0 UI Target

A realistic v0 Visual Studio / Dashboard target:

```text
read sleeve.json
show sleeve card
show active route
show NeoStack graph from existing geometry
show Relation Matrix
show RuntimeSpec summary
show Trace summary
show diagnostics
show capability status
link to source JSON
link to Human card
```

Do not require full drag/drop editing yet.

---

## 47. Future v1 Target

Possible v1:

```text
browse full library
generate Human cards
inspect dependency graph
compare artifacts
validate sleeve visually
display route challenges
display Tool Pack risk
export Relation Matrix
```

---

## 48. Future v2 Target

Possible v2:

```text
safe visual edits
drag/drop with validation
create bundles
create route relations
create typed merge nodes
patch JSON artifacts
generate sleeve pack
preview compile before save
```

---

## 49. Future v3 Target

Possible v3:

```text
public submission UI
creator profile pages
remix/cloning workflows
visual provenance graph
community nomination UI
download/clone/use stats
registry integration
```

---

## 50. Future v4 Target

Possible v4:

```text
advanced multi-agent graph monitoring
live runtime graph animation
token/reward dashboards if enabled
collaborative editing
marketplace/registry moderation
visual tool execution timeline
```

---

## 51. Data Model Summary

Visual Studio should consume and render:

```text
source JSON artifacts
artifact catalogs
Human cards
UMG IR
RuntimeSpec
Trace
Relation Matrix
Relation Delta
Capability status
Tool Pack manifests
Diagnostics
Provenance metadata
```

It should emit:

```text
validated patches
draft artifacts
generated Human cards
visual cards
exported Relation Matrix
diagnostic reports
submission packages later
```

It should not emit hidden runtime state as canonical truth.

---

## 52. Non-Goals for v0.1

This document does not define:

```text
final frontend framework
final CSS design
final icons/colors
final drag/drop implementation
full marketplace UI
wallet/token dashboard
collaborative multiplayer editing
all accessibility implementation details
all graph layout algorithms
```

It defines visual semantics and UI boundaries.

---

## 53. Acceptance Criteria

This section is complete when the future UI can be described as able to represent:

```text
MOLT Blocks
NeoBlocks
NeoStacks
Sleeves
Trigger gates
Governance overlays
Philosophy/Blueprint/Context/Memory/Tool/Policy overlays
vertical authority
horizontal sibling relations
bundles
typed merge nodes
route highlighting
Off and standby states
capability and Tool Pack bindings
runtime services
Relation Matrix
Trace
RuntimeSpec
diagnostics
artifact inspectors
Human/source toggle
dependency/provenance view
safe visual edit path later
```

---

## 54. Summary

The UMG Visual Studio is the human-facing graph and dashboard layer.

It makes UMG visible.

It should show:

```text
what exists
what is active
what is off
what is standby
what route was selected
what gate opened
what overlay influenced
what merged
what tool is bound
what trace explains it
```

It should remain subordinate to canonical artifacts, IR, RuntimeSpec, Trace, and Relation Matrix.

The UI is the window.

The compiler is the resolver.

The artifacts are the source.

The runtime is Envoy.

The trace is the explanation.

The Relation Matrix is the compact map.
