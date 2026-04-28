# Section 11 — Governance, Routing, and Overlay Model v0.1

**Document ID:** `UMG_GOVERNANCE_ROUTING_OVERLAY_MODEL.v0.1`  
**Status:** Foundation draft  
**Layer:** Governance / route selection / overlay influence / runtime activation control  
**Depends on:** `UMG_COMPILER_LAW.v0.3`, `UMG_IR.v0.1`, `UMG_RELATION_MATRIX.v0.1`, `UMG_SLEEVE_PACK_CONTRACT.v0.1`, `UMG_ENVOY_RUNTIME_INTEGRATION.v0.1`  
**Feeds into:** Sleeve manifests, NeoStack manifests, IR normalization, RuntimeSpec, Trace, Relation Matrix, Envoy runtime, visual dashboard  

---

## 1. Purpose

This document defines the UMG **Governance, Routing, and Overlay Model**.

It explains how UMG decides:

- which route is active;
- which NeoStack is activated;
- which NeoStack is offed;
- which bundles are active or standby;
- which Trigger gates opened or closed;
- how Philosophy/Blueprint/Context/Tool overlays influence generation;
- how priority resolves conflicts after route selection;
- how governance and priority interact when they disagree;
- how all of this appears in IR, RuntimeSpec, Trace, and Relation Matrix.

Governance is the orchestration layer.

Routing is the active path selection layer.

Overlays are influence layers.

Priority is the conflict-resolution layer inside the selected route.

---

## 2. Existing Schema Context

The current public sleeve schema already includes a `governance` section with `directive_ids`, `policy_links`, and notes, plus runtime fields such as staging file, active stack path, compiler helper, and activation notes.

The current public NeoStack schema also includes `activation_logic` and `governance` sections.

This section formalizes those early schema hooks into a more complete v0.1 governance/routing/overlay law.

---

## 3. Core Distinction

The core distinction is:

```text
Governance controls route membership.
Priority controls semantic conflict inside the active route.
Overlay influences interpretation, formatting, context, or capability.
Trigger gates open or close paths.
Off excludes artifacts from the active run.
Trace records the decision.
```

The compact law:

```text
Governance routes.
Trigger gates.
Route selects.
Off excludes.
Overlay influences.
Priority resolves.
Trace explains.
```

---

## 4. Governance Definition

Governance is the layer that classifies the current situation and determines which route or workflow lane should be active.

Governance can:

```text
select route
activate NeoStack
off NeoStack
activate bundle
standby bundle
open Trigger gate
close Trigger gate
confirm route after challenge
reroute after challenge
emit diagnostics
emit trace events
```

Governance should not:

```text
silently rewrite block content
silently change compiler priority order
execute tools directly
hide route decisions
merge into every block
become an untraceable runtime blob
```

---

## 5. Governance Overlay

Governance should usually appear as an overlay.

Recommended ID form:

```text
OVR.GOV.<DOMAIN>.<SLUG>.v<MAJOR>
```

Examples:

```text
OVR.GOV.CODE_ROUTER.v1
OVR.GOV.DEALERSHIP_INTENT_ROUTER.v1
OVR.GOV.BUSINESS_PLAN_ROUTER.v1
```

Governance overlay example:

```json
{
  "id": "OVR.GOV.CODE_ROUTER.v1",
  "overlay_type": "governance",
  "state": "active",
  "route_selector": "intent_classification",
  "controls": [
    "route.normal_code_patch",
    "route.docs_only",
    "route.compile_recovery"
  ],
  "default_route": "route.normal_code_patch",
  "route_challenge_policy": "diagnose_then_confirm_or_reroute",
  "off_policy": "exclude_non_route_stacks"
}
```

---

## 6. Route Definition

A route is a selected path through a sleeve, NeoStack, NeoBlock graph, or bundle group.

A route determines what is active for this pass.

Example route:

```json
{
  "id": "route.normal_code_patch",
  "label": "Normal Code Patch",
  "entry_gate": "TRG.CODE_PATCH",
  "activate": [
    "NS.CODER.SERVUO.MASTER.v1"
  ],
  "disable": [
    "NS.CODER.DOCS.v1"
  ],
  "standby": [
    "NS.CODER.RECOVERY.v1"
  ],
  "default": true,
  "reason": "User requested a code patch."
}
```

Route rule:

```text
A sleeve can contain many routes.
A pass should have a selected active route.
A route controls active membership for the current pass.
```

For v0, prefer one primary active route unless a sleeve explicitly supports multi-route activation.

---

## 7. Trigger-as-Gate

Trigger is modeled as a gate.

```text
Trigger = gate
```

A Trigger may:

```text
open route
close route
fire route
miss route
block route
lock route
activate bundle
redirect path
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

Trigger gate example:

```json
{
  "id": "TRG.CODE_PATCH",
  "label": "Code Patch Trigger",
  "state": "fired_open",
  "opens_route": "route.normal_code_patch",
  "closed_routes": [
    "route.docs_only"
  ],
  "reason": "Input was classified as a code patch request."
}
```

---

## 8. Off / Exclusion

Off is an exclusion state.

Off means:

```text
present but excluded from this active run
```

Off does not mean deleted.

Governance can off:

```text
MOLT Block
NeoBlock
NeoStack
Bundle
Overlay
Route
Tool/Capability binding for current route
```

Example:

```json
{
  "event": "artifact.offed",
  "artifact_id": "NS.CODER.DOCS.v1",
  "reason": "Normal code patch route selected; docs-only route disabled."
}
```

---

## 9. Standby

Standby means an artifact is available but not active.

Standby is useful for:

```text
fallback routes
recovery stacks
compile-failure handling
escalation bundles
optional tool capability
memory/cache services
```

Standby is not Off.

Standby can become active if triggered.

Example:

```json
{
  "artifact_id": "NS.CODER.RECOVERY.v1",
  "state": "standby",
  "activation_condition": "compile_check.failed == true"
}
```

---

## 10. Route Selection Flow

Recommended route selection flow:

```text
1. Receive input / runtime event.
2. Load active sleeve and available routes.
3. Governance classifies situation.
4. Trigger gates evaluate/open/close.
5. Governance selects active route.
6. Route activates relevant NeoStacks/bundles/overlays.
7. Route offs irrelevant stacks/bundles/overlays.
8. Compiler resolves active route into RuntimeSpec.
9. Priority resolves conflicts inside active route.
10. Trace records route decision.
```

In compact form:

```text
classify → gate → route → activate/off → compile → resolve conflicts → trace
```

---

## 11. Governance vs Priority

Governance and priority must not be confused.

```text
Governance = route membership authority.
Priority = semantic conflict authority inside selected route.
```

Priority cannot silently reroute.

If priority discovers a contradiction in the selected route, it emits a route challenge.

---

## 12. Route Challenge Law

The route-challenge law is:

```text
Governance is authoritative over route membership.
Priority is authoritative over semantic conflict inside the active route.
Priority may challenge governance by emitting a route-challenge diagnostic.
Priority may not silently reroute.
Governance must confirm, reroute, or fail depending on strictness profile.
```

Route challenge example:

```json
{
  "id": "DIAG.ROUTE_CHALLENGE.0001",
  "level": "warning",
  "code": "ROUTE_CHALLENGE",
  "message": "Priority analysis found evidence inconsistent with selected route.",
  "nodes": [
    "OVR.GOV.DEALERSHIP_INTENT_ROUTER.v1",
    "BLK.DIRECTIVE.SUPPORT_COMPLAINT.v1"
  ],
  "fatal": false
}
```

---

## 13. Governance Confirmation

If governance confirms original route:

```text
route stands
active set remains
contradictory out-of-route artifacts remain off or standby
Trace records confirmation
```

Trace example:

```json
{
  "event": "route.confirmed",
  "route": "route.sales",
  "challenged_by": "BLK.DIRECTIVE.SUPPORT_COMPLAINT.v1",
  "reason": "Governance classified input as purchase intent despite support-like phrase."
}
```

---

## 14. Governance Reroute

If governance accepts the challenge:

```text
original route is offed
new route activates
compile resumes from route selection
Trace records reroute
```

Trace example:

```json
{
  "event": "route.rerouted",
  "from_route": "route.sales",
  "to_route": "route.service",
  "reason": "High-priority directive evidence indicated complaint/support intent."
}
```

---

## 15. Strictness Behavior

In dev mode:

```text
unresolved route challenge = warning
governance route may stand
continue deterministically
```

In strict/prod mode:

```text
unresolved route challenge = compile failure
```

Recommended strictness values:

```text
compile.dev.v1
compile.strict.v1
compile.public_safe.v1
compile.test_fixture.v1
```

---

## 16. Overlay Definition

An Overlay is an influence layer.

It modifies:

```text
route selection
interpretation
formatting
context
memory
policy
tool availability
runtime service behavior
```

An Overlay is not automatically a normal MOLT Block.

It may be composed from MOLT Blocks or generated by typed synthesis, but once active it should declare what it influences.

---

## 17. Overlay Types

Recommended overlay types:

```text
governance
philosophy
blueprint
context
memory
tool
policy
runtime
safety
```

### Governance Overlay

Controls route selection, activation, and offing.

### Philosophy Overlay

Applies values, lens, strategy, or interpretive pressure.

### Blueprint Overlay

Shapes output format, structure, and presentation.

### Context Overlay

Adds relevant situational context.

### Memory Overlay

Adds retrieved or durable memory context.

### Tool Overlay

Describes tool availability or capability bindings.

### Policy Overlay

Applies safety/security/legal/operational constraints.

### Runtime Overlay

Applies current runtime state, diagnostics, or service availability.

---

## 18. Overlay Object Shape

Recommended overlay object:

```json
{
  "id": "OVR.ART_OF_WAR.BUSINESS_PLAN.v1",
  "overlay_type": "philosophy",
  "state": "active",
  "source_artifacts": [
    "BLK.PHILOSOPHY.STRATEGY.ART_OF_WAR.v1"
  ],
  "targets": [
    "SLV.BUSINESS_PLAN.v1",
    "NS.BUSINESS_PLAN.CORE.v1"
  ],
  "influence": "strategic_interpretive_lens",
  "activation_condition": "route.business_strategy == true",
  "priority_profile": "molt.default.v1",
  "metadata": {}
}
```

Required fields:

```text
id
overlay_type
state
source_artifacts
targets
influence
activation_condition
metadata
```

---

## 19. Philosophy Overlay

A Philosophy Overlay affects the lens or value pressure.

Example:

```text
Business Plan Sleeve
+
Art of War Philosophy
=
Business Plan generated through strategic Art-of-War lens
```

This should generally land as:

```text
PhilosophyOverlay
```

not as an untyped merge blob.

Example:

```json
{
  "id": "OVR.ART_OF_WAR.BUSINESS_PLAN.v1",
  "overlay_type": "philosophy",
  "influence": "strategic_lens",
  "targets": [
    "NS.BUSINESS_PLAN.CORE.v1"
  ]
}
```

---

## 20. Blueprint Overlay

A Blueprint Overlay shapes output structure.

Example:

```json
{
  "id": "OVR.BLUEPRINT.INVESTOR_READY.v1",
  "overlay_type": "blueprint",
  "influence": "output_structure",
  "targets": [
    "OUT.BUSINESS_PLAN"
  ],
  "format_rules": [
    "executive_summary",
    "market_analysis",
    "strategy_section",
    "risk_section",
    "financial_model"
  ]
}
```

Rule:

```text
Blueprint shapes output.
Blueprint does not override Directive unless explicitly promoted by typed synthesis.
```

---

## 21. Context Overlay

Context Overlay carries situational input.

Examples:

```text
current user request
retrieved repository context
current file path
recent diagnostic
calendar/time/context
local workspace state
```

Context Overlay should be traceable and often temporary.

Example:

```json
{
  "id": "OVR.CONTEXT.REPO_SCAN.PASS_0021",
  "overlay_type": "context",
  "state": "active",
  "targets": [
    "NB.SERVUO.PATCH_PLANNER.v1"
  ],
  "source_artifacts": [],
  "influence": "repo_context",
  "expires": "end_of_pass"
}
```

---

## 22. Memory Overlay

Memory Overlay carries retrieved durable context.

Example:

```json
{
  "id": "OVR.MEMORY.USER_PROJECT_PREFS.v1",
  "overlay_type": "memory",
  "state": "active",
  "targets": [
    "SLV.CODER.SERVUO.v1"
  ],
  "influence": "user_project_preferences",
  "source": "local_memory_retrieval"
}
```

Memory Overlay should distinguish:

```text
durable memory
retrieved context
session state
temporary cache
```

---

## 23. Tool Overlay

Tool Overlay records available capability/tool state.

Example:

```json
{
  "id": "OVR.TOOL.REPO_ANALYSIS.STATUS.v1",
  "overlay_type": "tool",
  "state": "active",
  "targets": [
    "NS.CODER.SERVUO.MASTER.v1"
  ],
  "influence": "capability_availability",
  "capabilities": [
    {
      "id": "CAP.REPO.SEARCH",
      "status": "resolved",
      "satisfied_by": "TP.REPO_ANALYSIS.v1"
    }
  ]
}
```

Tool Overlay does not execute tools.

It represents capability state.

---

## 24. Policy / Safety Overlay

Policy/Safety Overlay applies explicit constraints.

Example:

```json
{
  "id": "OVR.POLICY.PUBLIC_SAFE.v1",
  "overlay_type": "policy",
  "state": "active",
  "targets": [
    "SLV.PUBLIC_SAFE.DEFAULT.v1"
  ],
  "influence": "public_safe_constraints",
  "rules": [
    "no_private_trace_exposure",
    "fail_closed_on_unknown_tool",
    "redact_sensitive_paths"
  ]
}
```

Policy overlays should generally rank high in conflict handling through governance or explicit compiler law.

---

## 25. Typed Synthesis Into Overlay

Cross-type merges may produce overlays.

Example:

```json
{
  "id": "MRG.BUSINESS_PLAN.ART_OF_WAR.v1",
  "merge_type": "cross_type_synthesis",
  "inputs": [
    "SLV.BUSINESS_PLAN.v1",
    "BLK.PHILOSOPHY.STRATEGY.ART_OF_WAR.v1",
    "BLK.BLUEPRINT.BUSINESS.INVESTOR_PLAN.v1"
  ],
  "target_type": "PhilosophyOverlay",
  "target_role": "generation_overlay",
  "target_container": "RuntimeSpec.overlays",
  "policy": "typed_synthesis"
}
```

Output:

```text
OVR.ART_OF_WAR.BUSINESS_PLAN.v1
```

Rule:

```text
Cross-type overlay synthesis must be typed.
```

---

## 26. Overlay Precedence

Overlay precedence should be explicit.

Recommended order for v0:

```text
Policy/Safety Overlay
Governance Overlay
Context/Memory Overlay
Philosophy Overlay
Blueprint Overlay
Tool Overlay
Runtime Overlay
```

This is not a replacement for MOLT priority.

It is overlay application order.

If overlay ordering creates conflict, emit diagnostics.

---

## 27. Overlay Conflict Rule

If two overlays conflict:

```text
1. check explicit overlay precedence
2. check target scope
3. check route membership
4. check typed merge recipe
5. check MOLT priority if overlay is derived from MOLT Blocks
6. emit diagnostic if unresolved
```

Examples:

```text
Two Blueprint overlays conflict over output format.
A Policy overlay blocks a Tool overlay.
A Governance overlay offs a route that Context overlay suggests.
```

Policy/Safety should usually win over lower-risk formatting or convenience overlays.

---

## 28. Active Set Construction

The active set is the set of artifacts participating in the current pass.

Recommended equation:

```text
ActiveSet =
  route.activate
  + required parent sleeve artifacts
  + active overlays
  + active bundles
  + active capabilities
  - route.disable
  - governance.off
  - policy.blocked
```

Standby artifacts are not active unless triggered.

Off artifacts are excluded from the active pass.

---

## 29. Governance Decision Object

Recommended object:

```json
{
  "id": "GOVDEC.PASS_0021",
  "governance_overlay": "OVR.GOV.CODE_ROUTER.v1",
  "input_classification": "code_patch_request",
  "selected_route": "route.normal_code_patch",
  "activated": [
    "NS.CODER.SERVUO.MASTER.v1"
  ],
  "offed": [
    "NS.CODER.DOCS.v1"
  ],
  "standby": [
    "NS.CODER.RECOVERY.v1"
  ],
  "confidence": 0.86,
  "reason": "User requested a code change and provided file/error context.",
  "diagnostics": []
}
```

Confidence is optional.

Reason is recommended.

Trace should include the decision.

---

## 30. Route State Object

Recommended route state:

```json
{
  "route_id": "route.normal_code_patch",
  "state": "selected",
  "entry_gate": "TRG.CODE_PATCH",
  "gate_state": "fired_open",
  "active_neostacks": [
    "NS.CODER.SERVUO.MASTER.v1"
  ],
  "off_neostacks": [
    "NS.CODER.DOCS.v1"
  ],
  "standby_neostacks": [
    "NS.CODER.RECOVERY.v1"
  ]
}
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

## 31. IR Projection

Governance, routing, and overlays normalize into IR.

IR nodes:

```text
overlay
route
trigger_gate
neostack
bundle
capability
diagnostic
```

IR edges:

```text
overlay_influence
gate_to_route
route_activation
off_exclusion
bundle_membership
capability_requirement
diagnostic_link
```

Example:

```json
{
  "from": "OVR.GOV.CODE_ROUTER.v1",
  "to": "TRG.CODE_PATCH",
  "kind": "overlay_influence",
  "state": "active",
  "reason": "Governance evaluated code patch trigger."
}
```

---

## 32. RuntimeSpec Projection

RuntimeSpec should include:

```text
selected_route
active_governance_overlay
active_overlays
active_neostacks
off_artifacts
standby_artifacts
gate_states
route_decision
capability_state
diagnostics
```

Example:

```json
{
  "route": {
    "selected": "route.normal_code_patch",
    "entry_gate": "TRG.CODE_PATCH",
    "gate_state": "fired_open"
  },
  "governance": {
    "overlay": "OVR.GOV.CODE_ROUTER.v1",
    "decision_id": "GOVDEC.PASS_0021"
  },
  "active_neostacks": [
    "NS.CODER.SERVUO.MASTER.v1"
  ],
  "off_artifacts": [
    "NS.CODER.DOCS.v1"
  ],
  "overlays": [
    "OVR.GOV.CODE_ROUTER.v1"
  ]
}
```

---

## 33. Relation Matrix Projection

Governance/routing should project clearly into Relation Matrix.

Example:

```text
GOV.CODE_ROUTER [A]
GOV.CODE_ROUTER -O-> TRG.CODE_PATCH [GF][GO]
GOV.CODE_ROUTER -O-> TRG.DOCS_ONLY [GC]

TRG.CODE_PATCH -F-> NS.CODER.SERVUO.MASTER.v1 [A]
TRG.DOCS_ONLY -X-> NS.CODER.DOCS.v1 [OFF]

NS.CODER.RECOVERY.v1 [STBY]
```

Route challenge projection:

```text
GOV.CODE_ROUTER [A][WARN]
BLK.DIRECTIVE.DOCS_ONLY.v1 -D-> DIAG.ROUTE_CHALLENGE.0001 [WARN]
DIAG.ROUTE_CHALLENGE.0001 [WARN]
```

Reroute delta:

```text
route normal_code_patch -> docs_only
NS.CODER.SERVUO.MASTER.v1 [A] -> [OFF]
NS.CODER.DOCS.v1 [OFF] -> [A]
DIAG.ROUTE_CHALLENGE.0001 [WARN] -> [OK]
```

---

## 34. Trace Events

Governance/routing/overlay Trace events should include:

```text
governance.loaded
governance.classified
gate.evaluated
gate.opened
gate.closed
gate.blocked
route.selected
route.confirmed
route.rerouted
route.blocked
artifact.activated
artifact.offed
artifact.standby
overlay.activated
overlay.deactivated
overlay.conflict
priority.route_challenge
bundle.activated
bundle.standby
active_set.created
runtime_spec.route_written
relation_matrix.emitted
```

Trace events should reference artifact IDs.

---

## 35. Sales / Customer Service Example

Input:

```text
"I want to buy a car."
```

Governance classification:

```text
purchase_intent
```

Route result:

```text
activate Sales NeoStack
off Customer Service Complaint NeoStack
standby Finance and Escalation
```

Relation Matrix:

```text
GOV.DEALERSHIP_INTENT_ROUTER [A]
GOV.DEALERSHIP_INTENT_ROUTER -O-> TRG.PURCHASE_INTENT [GF][GO]
TRG.PURCHASE_INTENT -F-> NS.DEALERSHIP.SALES.v1 [A]

GOV.DEALERSHIP_INTENT_ROUTER -O-> TRG.COMPLAINT_INTENT [GC]
TRG.COMPLAINT_INTENT -X-> NS.DEALERSHIP.CUSTOMER_SERVICE.v1 [OFF]

NS.DEALERSHIP.FINANCE.v1 [STBY]
NS.DEALERSHIP.ESCALATION.v1 [STBY]
```

Input:

```text
"The car I bought has a problem."
```

Route result:

```text
activate Customer Service
off Sales Closing
standby Escalation/Warranty
```

---

## 36. ServUO Coder Example

Input:

```text
"Fix this ServUO compile error."
```

Route:

```text
route.normal_code_patch
```

Result:

```text
activate ServUO Coder Stack
off docs-only stack
standby compile-recovery stack
```

Relation Matrix:

```text
GOV.CODE_ROUTER [A]
GOV.CODE_ROUTER -O-> TRG.CODE_PATCH [GF][GO]
TRG.CODE_PATCH -F-> NS.CODER.SERVUO.MASTER.v1 [A]
TRG.DOCS_ONLY -X-> NS.CODER.DOCS.v1 [OFF]
NS.CODER.RECOVERY.v1 [STBY]
```

If compile check later fails:

```text
TRG.COMPILE_FAIL [GF][GO]
TRG.COMPILE_FAIL -F-> NS.CODER.RECOVERY.v1 [A]
```

---

## 37. Business Plan / Art of War Overlay Example

Input:

```text
"Generate an investor-ready business plan using Art of War strategic principles."
```

Route:

```text
route.investor_business_plan
```

Synthesis:

```text
Business Plan Sleeve
+ Art of War Philosophy
+ Investor Blueprint
→ Art of War Business Plan PhilosophyOverlay / BlueprintOverlay
```

Relation Matrix:

```text
GOV.PLAN_ROUTER [A]
GOV.PLAN_ROUTER -O-> TRG.INVESTOR_PLAN [GF][GO]
TRG.INVESTOR_PLAN -F-> NS.BUSINESS_PLAN.CORE.v1 [A]

SLV.BUSINESS_PLAN.v1 -M-> MRG.BUSINESS_PLAN.ART_OF_WAR.v1 [OK]
BLK.PHILOSOPHY.STRATEGY.ART_OF_WAR.v1 -M-> MRG.BUSINESS_PLAN.ART_OF_WAR.v1 [OK]
BLK.BLUEPRINT.BUSINESS.INVESTOR_PLAN.v1 -M-> MRG.BUSINESS_PLAN.ART_OF_WAR.v1 [OK]

MRG.BUSINESS_PLAN.ART_OF_WAR.v1 -M-> OVR.ART_OF_WAR.BUSINESS_PLAN.v1 [OK]
OVR.ART_OF_WAR.BUSINESS_PLAN.v1 -O-> NS.BUSINESS_PLAN.CORE.v1 [A]
```

---

## 38. Validation Rules

Validator should check:

```text
governance overlay exists if sleeve declares governance
routes reference valid gates
gates reference valid routes
route activate/disable/standby references valid artifacts
offed artifacts are present in sleeve or dependency graph
overlays have valid targets
overlay type is valid
typed synthesis overlays have declared target type/role/container
route challenge policy exists
selected route does not activate missing NeoStacks
disabled route does not remain active unless explicitly multi-route
priority profile exists
strictness profile exists
```

Invalid governance/routing should produce diagnostics.

---

## 39. Fail-Closed Conditions

Fail closed for:

```text
missing required governance overlay in strict mode
selected route missing
entry gate missing
route activates missing NeoStack
route conflict unresolved in strict mode
untyped overlay synthesis
policy overlay blocks required action
unknown overlay type in public-safe mode
unsafe tool overlay requests execution
```

Dev mode may warn and continue deterministically where safe.

---

## 40. Visual Dashboard Projection

The visual dashboard should show:

```text
governance overlay above graph
active route highlighted
closed routes dimmed
offed stacks dimmed
standby stacks outlined
trigger gates as open/closed/fired nodes
overlays as influence layers
route challenges as warnings
reroute transitions as deltas
Trace panel explaining decisions
```

Visual dashboard must not invent active state.

It should render Envoy/IR/RuntimeSpec state.

---

## 41. Non-Goals for v0.1

This document does not finalize:

```text
all possible classifiers
final AI intent-classification algorithm
full visual graph UI
full multi-agent routing
all overlay precedence edge cases
final policy language
final runtime service orchestration
final creator-economy overlay rules
```

It defines the governance/routing/overlay foundation.

---

## 42. Acceptance Criteria

This section is complete when UMG can represent:

```text
governance overlays
route selection
trigger gates
route activation
Off/exclusion
standby state
route challenge diagnostics
governance confirmation
governance reroute
philosophy overlays
blueprint overlays
context overlays
memory overlays
tool overlays
policy overlays
typed synthesis into overlays
IR projection
RuntimeSpec projection
Relation Matrix projection
Trace events
validation/fail-closed behavior
```

---

## 43. Summary

Governance is the orchestration layer.

Routing is the selected path.

Trigger is the gate.

Off is route exclusion.

Overlay is influence.

Priority resolves conflict inside the active route.

Trace explains decisions.

The compact law:

```text
Governance classifies.
Trigger gates.
Route activates.
Off excludes.
Overlay influences.
Priority challenges or resolves.
Trace records.
```

This model lets UMG handle dynamic situations without activating every possible stack at once.

It also lets the system explain why it went down one path instead of another.
