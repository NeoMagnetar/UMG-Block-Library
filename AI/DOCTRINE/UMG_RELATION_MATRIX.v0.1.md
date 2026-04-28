# Section 3 — UMG Relation Matrix v0.1

**Document ID:** `UMG_RELATION_MATRIX.v0.1`  
**Status:** Foundation draft  
**Layer:** Compact IR/runtime projection / debug map / visual graph bridge  
**Depends on:** `UMG_COMPILER_LAW.v0.3`, `UMG_IR.v0.1`, `UMG_FOUNDATION_AMENDMENT.IR_CANONICAL_AND_GOV_PRIORITY.v0.1`  
**Feeds into:** Visual dashboard, trace summaries, compact agent context, pass-to-pass state deltas  

---

## 1. Purpose

The **UMG Relation Matrix** is a compact, ASCII-safe representation of the active UMG graph state.

It is a small, readable, token-light shorthand that helps humans, agents, and developer tools understand:

- which route is active;
- which gates opened or closed;
- which NeoStacks, NeoBlocks, bundles, and overlays are active, standby, or off;
- how vertical hierarchy and horizontal sibling relations are currently arranged;
- where merges, bundles, overlays, and capability links are located;
- what changed between compiler/runtime passes.

It is not the canonical source of truth.

The canonical order is:

```text
JSON source artifacts
  ↓
UMG IR
  ↓
RuntimeSpec + Trace
  ↓
Relation Matrix / Relation Delta projection
```

The Relation Matrix is a projection of the UMG IR and runtime state.

---

## 2. Non-Authority Clause

The Relation Matrix must never override:

- source JSON artifacts;
- schema validation;
- UMG IR canonical form;
- compiler law;
- RuntimeSpec;
- Trace.

The matrix is a readable state map.

If the matrix and IR disagree, the IR wins.

If the IR and source JSON disagree, the compiler must use validation, diagnostics, lockfiles, and source maps to resolve the discrepancy.

---

## 3. Design Goals

The Relation Matrix should be:

```text
ASCII-safe
token-light
human-readable
machine-parseable
diff-friendly
stable across passes
stateful
easy to project from IR
easy to map to a visual graph
```

It should not be:

```text
a second schema system
a replacement for JSON
a hidden compiler law
a full artifact dump
a verbose trace log
a crypto/provenance ledger
```

---

## 4. Relation Matrix vs Related Objects

| Object | Role |
|---|---|
| JSON Source | Canonical artifact storage |
| UMG IR | Normalized compiler graph |
| RuntimeSpec | Final resolved operating structure |
| Trace | Explanation/event history |
| Relation Matrix | Compact current graph-state projection |
| Relation Delta | Compact pass-to-pass state change |
| Visual Graph | Human UI/editor/dashboard rendering |

---

## 5. Matrix Snapshot

A **Matrix Snapshot** represents the current state of a UMG run at one pass.

Example:

```text
# UMG_RELATION_MATRIX v0.1
# pass=0007 sleeve=SLV.DEALER.CORE.v1 route=sales_intent
# ir=IR.SLV.DEALER.CORE.v1.000007

GOV.INTENT_ROUTER [A]
GOV.INTENT_ROUTER -O-> TRG.PURCHASE_INTENT [GF][GO]
GOV.INTENT_ROUTER -O-> TRG.COMPLAINT_INTENT [GC]

TRG.PURCHASE_INTENT -F-> NS.SALES [A]
TRG.COMPLAINT_INTENT -X-> NS.CUSTOMER_SERVICE [OFF]

NS.SALES -V-> NB.SALES.INTAKE [A]
NB.SALES.INTAKE -V-> NB.SALES.QUALIFY [A]
NB.SALES.QUALIFY -H- NB.SALES.INVENTORY_LOOKUP [A]
NB.SALES.QUALIFY -H- NB.SALES.FINANCE_CHECK [STBY]
```

The snapshot should be enough to answer:

```text
What path is active right now?
What is off?
What is standby?
What gate opened?
What stack is running?
What relation shape does the active graph have?
```

---

## 6. Matrix Delta

A **Matrix Delta** represents only the state changes between passes.

Example:

```text
# UMG_RELATION_DELTA v0.1
# from_pass=0007 to_pass=0008
# sleeve=SLV.DEALER.CORE.v1

TRG.PURCHASE_INTENT [GO] -> [GC]
TRG.COMPLAINT_INTENT [GC] -> [GF][GO]
NS.SALES [A] -> [OFF]
NS.CUSTOMER_SERVICE [OFF] -> [A]
route sales_intent -> service_complaint
```

Use snapshots for full state.

Use deltas for compact runtime transition.

---

## 7. Header Format

Every matrix should begin with a small metadata header.

Recommended snapshot header:

```text
# UMG_RELATION_MATRIX v0.1
# pass=0007 sleeve=SLV.CODER.SERVUO.v1 route=normal_code_patch
# ir=IR.SLV.CODER.SERVUO.v1.000007
# profile=molt.default.v1 strictness=compile.dev.v1
```

Recommended delta header:

```text
# UMG_RELATION_DELTA v0.1
# from_pass=0007 to_pass=0008
# sleeve=SLV.CODER.SERVUO.v1
# ir_from=IR.SLV.CODER.SERVUO.v1.000007
# ir_to=IR.SLV.CODER.SERVUO.v1.000008
```

Headers are comments and should be ignored by simple parsers unless metadata extraction is needed.

---

## 8. Minimal Grammar

The v0.1 matrix grammar should stay simple.

### Node state line

```text
NODE_ID [STATE][STATE...]
```

Example:

```text
NS.SERVUO.CODER [A]
```

### Relation line

```text
FROM_NODE RELATION TO_NODE [STATE][STATE...]
```

Example:

```text
NB.REPO_CONTEXT -V-> NB.FILE_SCAN [A]
```

### Delta line

```text
NODE_OR_FIELD OLD_STATE -> NEW_STATE
```

Example:

```text
NS.SALES [A] -> [OFF]
```

### Route delta line

```text
route OLD_ROUTE -> NEW_ROUTE
```

Example:

```text
route sales_intent -> service_complaint
```

---

## 9. State Codes

Use ASCII-safe state codes first.

| Code | Meaning |
|---|---|
| `[A]` | Active |
| `[I]` | Idle |
| `[STBY]` | Standby |
| `[OFF]` | Excluded/off for current route |
| `[EX]` | Excluded by route/governance |
| `[BLK]` | Blocked |
| `[WARN]` | Warning / attention |
| `[ERR]` | Error / conflict |
| `[OK]` | Resolved / valid |
| `[LOCK]` | Locked by governance or policy |
| `[UNR]` | Unresolved |
| `[HOT]` | High-importance active state |
| `[COLD]` | Available but inactive |

For v0, prefer the minimal set:

```text
[A]
[I]
[STBY]
[OFF]
[WARN]
[ERR]
[OK]
[LOCK]
[UNR]
```

---

## 10. Gate Codes

Trigger is modeled as a gate.

| Code | Meaning |
|---|---|
| `[GO]` | Gate open |
| `[GC]` | Gate closed |
| `[GF]` | Gate fired |
| `[GM]` | Gate missed |
| `[GB]` | Gate blocked |
| `[GL]` | Gate locked |

Common combinations:

```text
[GF][GO] = trigger fired and gate opened
[GM][GC] = trigger missed and gate remains closed
[GB][GC] = trigger blocked and gate closed
[GL]     = gate locked by governance/policy
```

Example:

```text
GOV.ROUTER -O-> TRG.CODE_PATCH [GF][GO]
```

---

## 11. Relation Codes

| Code | Meaning |
|---|---|
| `-V->` | Vertical precedence / authority / sequence |
| `-H-` | Horizontal sibling / equal-level relation |
| `-F->` | Route flow |
| `-G->` | Gate-to-route relation |
| `-B-` | Bundle membership / grouping |
| `-M->` | Merge / synthesis relation |
| `-O->` | Overlay influence |
| `-C->` | Capability requirement |
| `-T->` | Tool binding |
| `-S->` | Source/dependency relation |
| `-X->` | Disabled / blocked / excluded relation |
| `-D->` | Diagnostic relation |

The relation code should map directly back to an IR edge kind.

---

## 12. Relation Code to IR Edge Mapping

| Matrix Code | IR Edge Kind |
|---|---|
| `-V->` | `vertical_precedence` |
| `-H-` | `horizontal_sibling` |
| `-F->` | `route_flow` or `route_activation` |
| `-G->` | `gate_to_route` |
| `-B-` | `bundle_membership` |
| `-M->` | `merge_input` / `merge_output` |
| `-O->` | `overlay_influence` |
| `-C->` | `capability_requirement` |
| `-T->` | `tool_binding` |
| `-S->` | `source_dependency` |
| `-X->` | `off_exclusion` or `blocked` relation |
| `-D->` | `diagnostic_link` |

---

## 13. Node ID Rules

Matrix lines should use stable artifact IDs or stable IR node IDs.

Preferred:

```text
NB.SERVUO.FILE_SCAN.v1
NS.SERVUO.CODER.v1
TRG.CODE_PATCH
GOV.INTENT_ROUTER.v1
BND.REFACTOR_GUARD.v1
OVR.ART_OF_WAR.BUSINESS_PLAN.v1
CAP.REPO.SEARCH
TP.REPO_ANALYSIS.v1
```

Avoid unstable display names in matrix lines.

Allowed:

```text
NB.SERVUO.FILE_SCAN.v1 [A]
```

Avoid:

```text
File Scanner [A]
```

Reason:

- stable parsing;
- source-map compatibility;
- Relation Matrix to IR back-reference;
- trace correlation;
- future provenance compatibility.

---

## 14. Trigger-as-Gate Rule

The matrix must preserve this rule:

```text
Trigger = gate.
```

A Trigger should appear as a gate node or gate relation.

Example:

```text
TRG.CODE_PATCH [GF][GO]
TRG.CODE_PATCH -F-> NS.SERVUO.CODER [A]
```

Or with governance overlay:

```text
GOV.ROUTER -O-> TRG.CODE_PATCH [GF][GO]
TRG.CODE_PATCH -F-> NS.SERVUO.CODER [A]
```

Do not represent Trigger as generic text.

Represent it as a stateful gate.

---

## 15. Governance Routing

Governance should be visible in matrix form when it affects route selection.

Example:

```text
GOV.INTENT_ROUTER [A]
GOV.INTENT_ROUTER -O-> TRG.PURCHASE_INTENT [GF][GO]
TRG.PURCHASE_INTENT -F-> NS.SALES [A]
GOV.INTENT_ROUTER -O-> TRG.COMPLAINT_INTENT [GC]
TRG.COMPLAINT_INTENT -X-> NS.CUSTOMER_SERVICE [OFF]
```

This shows:

- governance active;
- purchase trigger fired/opened;
- sales route active;
- complaint route closed/off.

---

## 16. Governance/Priority Challenge in Matrix

When priority challenges governance, represent it explicitly.

Example:

```text
GOV.INTENT_ROUTER [A][WARN]
GOV.INTENT_ROUTER -F-> route.sales [A]
BLK.DIRECTIVE.SUPPORT_COMPLAINT.v1 -D-> GOV.INTENT_ROUTER [WARN]
DIAG.ROUTE_CHALLENGE.0001 [WARN]
```

If governance reroutes:

```text
# UMG_RELATION_DELTA v0.1
# from_pass=0011 to_pass=0012

route sales -> service
NS.SALES [A] -> [OFF]
NS.CUSTOMER_SERVICE [OFF] -> [A]
DIAG.ROUTE_CHALLENGE.0001 [WARN] -> [OK]
```

If strict mode fails:

```text
DIAG.ROUTE_CHALLENGE.0001 [ERR]
COMPILE [ERR]
```

---

## 17. Off / Exclusion

Off should be visible.

Example:

```text
NS.SALES [OFF]
TRG.PURCHASE_INTENT -X-> NS.SALES [OFF]
```

Off means:

```text
present but excluded from the active route
```

Off does not mean deleted.

---

## 18. Vertical Authority

Vertical relation:

```text
-H- is not vertical.
-V-> is vertical.
```

Example:

```text
NB.INTAKE -V-> NB.CONTEXT_LOADER [A]
NB.CONTEXT_LOADER -V-> NB.FILE_SCAN [A]
NB.FILE_SCAN -V-> NB.PATCH_PLANNER [A]
```

Meaning:

- sequence;
- dependency;
- authority/precedence;
- lower nodes remain active if compatible;
- higher nodes constrain lower nodes when conflict occurs.

---

## 19. Horizontal Sibling Relation

Horizontal relation:

```text
NB.FILE_SCAN -H- NB.API_MAP [A]
NB.API_MAP -H- NB.DEPENDENCY_TRACE [A]
```

Meaning:

- equal-level relation;
- parallel/sibling contribution;
- no automatic dominance;
- conflict routes to parent, merge recipe, governance, or priority.

---

## 20. Bundles

Bundle relation:

```text
BND.REFACTOR_GUARD [STBY]
BND.REFACTOR_GUARD -B- BLK.INSTRUCTION.REQUIRE_CHANGE_SUMMARY.v1 [STBY]
BND.REFACTOR_GUARD -B- BLK.INSTRUCTION.ISOLATE_SCOPE.v1 [STBY]
BND.REFACTOR_GUARD -B- BLK.PHILOSOPHY.PRESERVE_USER_WORK.v1 [STBY]
```

When activated:

```text
BND.REFACTOR_GUARD [A]
BND.REFACTOR_GUARD -B- BLK.INSTRUCTION.REQUIRE_CHANGE_SUMMARY.v1 [A]
```

---

## 21. Merge / Synthesis

Same-type merge example:

```text
BLK.INSTRUCTION.MINIMAL_PATCH.v1 -M-> MRG.INSTRUCTION.CODE_STYLE.v1 [OK]
BLK.INSTRUCTION.PRESERVE_STYLE.v1 -M-> MRG.INSTRUCTION.CODE_STYLE.v1 [OK]
MRG.INSTRUCTION.CODE_STYLE.v1 -M-> OUT.INSTRUCTION.CODE_STYLE_SYNTH.v1 [OK]
```

Cross-type synthesis example:

```text
SLV.BUSINESS_PLAN.v1 -M-> MRG.BUSINESS_PLAN.ART_OF_WAR.v1 [OK]
BLK.PHILOSOPHY.ART_OF_WAR.v1 -M-> MRG.BUSINESS_PLAN.ART_OF_WAR.v1 [OK]
BLK.BLUEPRINT.INVESTOR_PLAN.v1 -M-> MRG.BUSINESS_PLAN.ART_OF_WAR.v1 [OK]
MRG.BUSINESS_PLAN.ART_OF_WAR.v1 -M-> OVR.ART_OF_WAR.BUSINESS_PLAN.v1 [OK]
```

Untyped synthesis should be shown as a diagnostic:

```text
MRG.UNBOUND_SYNTHESIS.v1 [ERR]
MRG.UNBOUND_SYNTHESIS.v1 -D-> DIAG.UNTYPED_SYNTHESIS.0001 [ERR]
```

---

## 22. Overlays

Overlay relation:

```text
OVR.ART_OF_WAR.BUSINESS_PLAN.v1 [A]
OVR.ART_OF_WAR.BUSINESS_PLAN.v1 -O-> SLV.BUSINESS_PLAN.v1 [A]
```

Governance overlay:

```text
OVR.GOV.INTENT_ROUTER.v1 [A]
OVR.GOV.INTENT_ROUTER.v1 -O-> route.sales [A]
```

Blueprint overlay:

```text
OVR.BLUEPRINT.INVESTOR_READY.v1 [A]
OVR.BLUEPRINT.INVESTOR_READY.v1 -O-> OUT.BUSINESS_PLAN [A]
```

---

## 23. Capabilities and Tool Bindings

Capability requirement:

```text
CAP.REPO.SEARCH [UNR]
NS.SERVUO.CODER.v1 -C-> CAP.REPO.SEARCH [UNR]
```

Resolved tool binding:

```text
CAP.REPO.SEARCH -T-> TP.REPO_ANALYSIS.v1 [OK]
```

Missing required capability:

```text
CAP.COMPILE.CHECK [ERR]
CAP.COMPILE.CHECK -D-> DIAG.MISSING_CAPABILITY.0003 [ERR]
```

---

## 24. Diagnostics

Diagnostics appear as stateful nodes.

Example:

```text
DIAG.SNAP_REQUIRES_RECIPE.0001 [WARN]
BLK.DIRECTIVE.BUSINESS_PLAN.v1 -D-> DIAG.SNAP_REQUIRES_RECIPE.0001 [WARN]
BLK.PHILOSOPHY.ART_OF_WAR.v1 -D-> DIAG.SNAP_REQUIRES_RECIPE.0001 [WARN]
```

Fatal compile issue:

```text
DIAG.UNTYPED_SYNTHESIS.0002 [ERR]
COMPILE [ERR]
```

---

## 25. Services

Runtime service nodes may appear in the matrix if useful.

Examples:

```text
SVC.MEMORY [A]
SVC.CACHE [A]
SVC.TRACE [A]
SVC.GUARD [A]
SVC.LOG [A]
SVC.IO [STBY]
```

Service links:

```text
NB.REPO_CONTEXT -C-> SVC.MEMORY [A]
NB.FILE_SCAN -C-> SVC.CACHE [A]
NS.SERVUO.CODER -C-> SVC.TRACE [A]
```

Services are support/runtime nodes, not ordinary MOLT blocks.

---

## 26. Visual Graph Mapping

A visual builder may project matrix lines as follows:

| Matrix Element | Visual Meaning |
|---|---|
| `[A]` | glowing active node |
| `[OFF]` | dimmed/excluded node |
| `[STBY]` | standby node |
| `[WARN]` | attention outline |
| `[ERR]` | red/error outline |
| `[GO]` | open gate |
| `[GC]` | closed gate |
| `-V->` | vertical authority line |
| `-H-` | horizontal sibling connector |
| `-M->` | merge/synthesis connector |
| `-B-` | bundle/group capsule |
| `-O->` | overlay influence line |
| `-C->` | capability/service requirement |
| `-T->` | tool binding |
| `-X->` | blocked/off relation |

The visual graph should not invent semantics that are absent from IR/matrix.

---

## 27. Parser Notes

A simple parser can read:

```text
NODE_ID [STATE...]
FROM RELATION TO [STATE...]
FIELD OLD -> NEW
```

Recommended parsing order:

1. ignore comment lines beginning with `#`;
2. parse delta lines containing `->` between state blocks or route names;
3. parse relation lines containing a relation token;
4. parse node-state lines;
5. validate IDs against IR if available;
6. emit diagnostics for unknown relation or state codes.

---

## 28. Matrix Validation

A valid Relation Matrix should satisfy:

```text
all node IDs resolve to IR nodes or declared runtime pseudo-nodes
all relation codes map to known IR edge kinds
all state codes are valid
all gate codes are valid
all active routes match IR states
all OFF states correspond to route or governance exclusion
all diagnostics map to Trace/IR diagnostics when possible
```

If validation fails, the matrix should be treated as a debug artifact, not a compiler authority.

---

## 29. Compact ServUO Example

```text
# UMG_RELATION_MATRIX v0.1
# pass=0021 sleeve=SLV.CODER.SERVUO.v1 route=normal_patch
# ir=IR.SLV.CODER.SERVUO.v1.0021

GOV.CODE_ROUTER [A]
GOV.CODE_ROUTER -O-> TRG.CODE_PATCH [GF][GO]
GOV.CODE_ROUTER -O-> TRG.DOCS_ONLY [GC]

TRG.CODE_PATCH -F-> NS.SERVUO.CODER [A]
TRG.DOCS_ONLY -X-> NS.DOCS.WRITER [OFF]

NS.SERVUO.CODER -V-> NB.SERVUO.REQUEST_INTAKE [A]
NB.SERVUO.REQUEST_INTAKE -V-> NB.SERVUO.REPO_CONTEXT [A]
NB.SERVUO.REPO_CONTEXT -H- NB.SERVUO.FILE_SCAN [A]
NB.SERVUO.REPO_CONTEXT -H- NB.SERVUO.API_MAP [A]
NB.SERVUO.FILE_SCAN -H- NB.SERVUO.CLASS_INDEX [A]
NB.SERVUO.API_MAP -H- NB.SERVUO.DEPENDENCY_TRACE [A]

NB.SERVUO.FILE_SCAN -V-> NB.SERVUO.ISSUE_LOCALIZER [A]
NB.SERVUO.ISSUE_LOCALIZER -V-> NB.SERVUO.PATCH_PLANNER [A]
NB.SERVUO.PATCH_PLANNER -V-> NB.SERVUO.CSHARP_GENERATOR [A]
NB.SERVUO.CSHARP_GENERATOR -V-> NB.SERVUO.COMPILE_CHECK [STBY]
NB.SERVUO.COMPILE_CHECK -V-> NB.SERVUO.OUTPUT_PATCH [STBY]

NS.SERVUO.CODER -C-> CAP.REPO.SEARCH [OK]
CAP.REPO.SEARCH -T-> TP.REPO_ANALYSIS.v1 [OK]
NS.SERVUO.CODER -C-> CAP.COMPILE.CHECK [UNR]
CAP.COMPILE.CHECK -D-> DIAG.MISSING_CAPABILITY.0001 [WARN]

SVC.MEMORY [A]
SVC.CACHE [A]
SVC.TRACE [A]
```

---

## 30. Compact Business Plan Overlay Example

```text
# UMG_RELATION_MATRIX v0.1
# pass=0004 sleeve=SLV.BUSINESS_PLAN.v1 route=investor_plan
# ir=IR.SLV.BUSINESS_PLAN.v1.0004

GOV.PLAN_ROUTER [A]
GOV.PLAN_ROUTER -O-> TRG.INVESTOR_PLAN [GF][GO]
TRG.INVESTOR_PLAN -F-> NS.BUSINESS_PLAN.CORE [A]

SLV.BUSINESS_PLAN.v1 -M-> MRG.BUSINESS_PLAN.ART_OF_WAR.v1 [OK]
BLK.PHILOSOPHY.ART_OF_WAR.v1 -M-> MRG.BUSINESS_PLAN.ART_OF_WAR.v1 [OK]
BLK.BLUEPRINT.INVESTOR_READY.v1 -M-> MRG.BUSINESS_PLAN.ART_OF_WAR.v1 [OK]

MRG.BUSINESS_PLAN.ART_OF_WAR.v1 -M-> OVR.ART_OF_WAR.BUSINESS_PLAN.v1 [OK]
OVR.ART_OF_WAR.BUSINESS_PLAN.v1 -O-> NS.BUSINESS_PLAN.CORE [A]
```

---

## 31. Non-Goals for v0.1

The Relation Matrix v0.1 does not need:

- final Unicode glyph set;
- full visual layout coordinates;
- full graph editor serialization;
- crypto/provenance ledger data;
- complete runtime trace history;
- full tool execution logs;
- all source artifact content;
- final marketplace statistics.

It only needs to show compact relation and state.

---

## 32. Acceptance Criteria

The Relation Matrix v0.1 is acceptable when it can show:

- active route;
- selected sleeve;
- active/off/standby nodes;
- trigger gate states;
- governance route decisions;
- vertical authority;
- horizontal sibling relations;
- bundle membership;
- merge/synthesis relations;
- overlays;
- capability requirements;
- tool bindings;
- diagnostics;
- pass-to-pass deltas.

That is enough for v0.

---

## 33. Summary

The UMG Relation Matrix is a compact projection of UMG IR and runtime state.

It lets the system carry a token-light “map of itself” through generation, compiler passes, UI updates, and trace review.

In short:

```text
IR is the structured graph.
Relation Matrix is the compact map.
Relation Delta is the state change.
Trace is the explanation.
RuntimeSpec is the resolved operating plan.
```

The matrix should stay simple, ASCII-safe, parseable, and subordinate to canonical JSON and IR.
