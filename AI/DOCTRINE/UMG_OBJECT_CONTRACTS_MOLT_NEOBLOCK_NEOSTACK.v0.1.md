# Section 6 — MOLT Block / NeoBlock / NeoStack Contracts v0.1

**Document ID:** `UMG_OBJECT_CONTRACTS.MOLT_NEOBLOCK_NEOSTACK.v0.1`  
**Status:** Foundation draft  
**Layer:** Artifact contracts / composition contracts / compiler source normalization  
**Depends on:** `UMG_COMPILER_LAW.v0.3`, `UMG_IR.v0.1`, `UMG_ARTIFACT_IDENTITY_AND_PROVENANCE.v0.1`, `UMG_SLEEVE_PACK_CONTRACT.v0.1`  
**Feeds into:** UMG Block Library schemas, Human library cards, sleeve packs, IR normalization, Relation Matrix, RuntimeSpec, Trace  

---

## 1. Purpose

This document defines the v0.1 object contracts for:

- **MOLT Blocks**
- **NeoBlocks**
- **NeoStacks**

These are the three core composition layers beneath a Sleeve Pack.

```text
MOLT Block  →  NeoBlock  →  NeoStack  →  Sleeve
```

The purpose of this contract is to make each layer clear, loadable, traceable, and compiler-ready.

---

## 2. Existing Schema Context

The current public UMG Block Library already includes early schemas for all three layers.

The existing `molt-block.schema.json` defines a block with fields such as `id`, `type`, `name`, `category`, `status`, `version`, `tags`, `source`, `scope`, `content`, `constraints`, `examples`, and type-specific fields for Directive, Trigger, Instruction, Subject, Primary, Philosophy, and Blueprint.

The existing `neoblock.schema.json` defines a NeoBlock with fields such as `id`, `name`, `purpose`, `category`, `status`, `version`, `tags`, `molt_block_ids`, `composition_logic`, `governing_directives`, `examples`, and `source`.

The existing `neostack.schema.json` defines a NeoStack with fields such as `id`, `name`, `purpose`, `category`, `status`, `version`, `tags`, `neoblock_ids`, `activation_logic`, `governance`, `examples`, and `source`.

Those schemas are good starts.

This section upgrades them into the formal v0.1 artifact contract needed for compiler law, IR normalization, Relation Matrix projection, sleeve packaging, and future provenance tracking.

---

## 3. Layer Roles

### MOLT Block

A **MOLT Block** is an atomic semantic unit.

It defines a typed piece of meaning, constraint, trigger behavior, subject framing, primary concern, philosophy, or output blueprint.

A MOLT Block should be small enough to reuse.

### NeoBlock

A **NeoBlock** is the smallest practical runtime composition unit.

It composes one or more MOLT Blocks into a coherent local function.

MOLT Blocks can technically exist alone, but most runtime behavior should flow through NeoBlocks to prevent random clutter and oversimplified behavior.

### NeoStack

A **NeoStack** is a functional workflow, department, or runtime lane made from NeoBlocks.

A NeoStack represents larger behavior such as:

- ServUO Coder Stack
- Sales Stack
- Customer Service Stack
- Business Plan Strategy Stack
- Research Stack
- Visual Generation Stack

Governance routes between NeoStacks.

---

## 4. Composition Rule

The core composition rule is:

```text
MOLT Blocks are atoms.
NeoBlocks are semantic units.
NeoStacks are workflow lanes.
Sleeves are operating configurations.
```

A MOLT Block may be referenced by multiple NeoBlocks.

A NeoBlock may be referenced by multiple NeoStacks.

A NeoStack may be referenced by multiple Sleeves.

This creates dependency graph credit and reusable modularity.

---

## 5. MOLT Type Set

The default v0 MOLT type set is:

```text
Trigger
Directive
Instruction
Subject
Primary
Philosophy
Blueprint
```

Off is not a normal MOLT content type.

Off is an exclusion state.

Future optional/meta types may include:

```text
Use
Aim
Need
IntentRefinement
Context
Memory
Policy
Tool
```

For v0, future/meta types should be handled cautiously as extension slots, not forced into the core priority order.

---

## 6. Default Priority Order

Default v0 priority order:

```text
Trigger
Directive
Instruction
Subject
Primary
Philosophy
Blueprint
```

This priority order is used mainly for conflict resolution inside an active route.

It should not be used as constant dominance over every composition event.

Governance controls route membership.

Priority resolves conflicts inside the selected route.

---

## 7. MOLT Block Contract

A v0.1 MOLT Block should follow this top-level shape:

```json
{
  "schema_version": "0.1",
  "identity": {},
  "provenance": {},
  "status": {},
  "molt": {},
  "content": {},
  "constraints": [],
  "relations": {},
  "composition": {},
  "runtime": {},
  "examples": [],
  "integrity": {},
  "notes": null
}
```

Required sections:

```text
schema_version
identity
provenance
status
molt
content
integrity
```

Recommended sections:

```text
constraints
relations
composition
runtime
examples
notes
```

---

## 8. MOLT Block Identity

MOLT Blocks should use Section 4 identity and provenance.

Example:

```json
{
  "identity": {
    "id": "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1",
    "artifact_type": "molt_block",
    "library_code": "001",
    "name": "Minimal Patch Instruction",
    "version": "1.0.0",
    "namespace": "CODING",
    "slug": "MINIMAL_PATCH"
  }
}
```

Rule:

```text
library_code is human-facing.
identity.id is machine-facing.
```

---

## 9. MOLT Block Type Declaration

The `molt` object defines role and priority behavior.

Example:

```json
{
  "molt": {
    "type": "Instruction",
    "priority_profile": "molt.default.v1",
    "stack_key": "coding.patch_scope",
    "stack_rank": 50,
    "merge_key": "coding.patch_rules",
    "merge_policy": "dedupe_append",
    "can_float": false
  }
}
```

Fields:

```text
type
priority_profile
stack_key
stack_rank
merge_key
merge_policy
can_float
```

### `can_float`

`can_float` indicates whether this MOLT Block may be active outside a NeoBlock.

Default should be:

```text
false
```

Reason:

MOLT Blocks are atomic and can become unsafe or noisy if scattered through runtime without composition.

Allowed floating cases:

```text
global overlay
temporary user-injected instruction
debug/test fixture
retrieved context block
explicit governance-approved block
```

---

## 10. MOLT Block Content

Recommended content shape:

```json
{
  "content": {
    "summary": "Prefer minimal code patches.",
    "body": "When editing code, prefer the smallest correct patch that satisfies the task.",
    "structure": null,
    "parameters": {}
  }
}
```

Fields:

```text
summary
body
structure
parameters
```

The exact content model may vary by MOLT type, but every block should expose a short summary and canonical body.

---

## 11. MOLT Type-Specific Fields

Type-specific fields should be nested under `molt.type_specific`.

Example:

```json
{
  "molt": {
    "type": "Trigger",
    "type_specific": {
      "trigger": {
        "gate_behavior": "open_route",
        "signals": ["code_patch_request"],
        "required_context": [],
        "opens": ["route.normal_code_patch"],
        "closes": []
      }
    }
  }
}
```

Recommended type-specific areas:

### Trigger

```text
gate_behavior
signals
required_context
opens
closes
blocks
```

### Directive

```text
goal
governance_links
enforcement_level
route_relevance
```

### Instruction

```text
action
expected_output
steps
scope
```

### Subject

```text
definition
key_attributes
related_subjects
domain
```

### Primary

```text
essence
core_concern
driver
target_object
```

### Philosophy

```text
core_principles
application
risks
lens_type
```

### Blueprint

```text
structure
input_contract
output_characteristics
format_rules
```

---

## 12. MOLT Block Relations

MOLT Blocks may declare allowed relations.

Example:

```json
{
  "relations": {
    "allowed_siblings": [
      "BLK.INSTRUCTION.CODING.PRESERVE_STYLE.v1"
    ],
    "preferred_parents": [
      "NB.SERVUO.PATCH_PLANNER.v1"
    ],
    "conflicts_with": [],
    "requires": [],
    "incompatible_with": []
  }
}
```

This helps snapping and compiler validation.

---

## 13. MOLT Block Runtime Hints

MOLT Blocks may include runtime hints, but should not execute tools directly.

Example:

```json
{
  "runtime": {
    "requires_capabilities": [],
    "suggested_services": [],
    "trace_level": "normal"
  }
}
```

If a block needs an actual executable tool, that should be declared at NeoBlock, NeoStack, Sleeve, or Tool Pack level unless there is a strong reason to attach it atomically.

---

## 14. NeoBlock Contract

A v0.1 NeoBlock should follow this top-level shape:

```json
{
  "schema_version": "0.1",
  "identity": {},
  "provenance": {},
  "status": {},
  "purpose": "",
  "composition": {},
  "geometry": {},
  "relations": {},
  "bundles": [],
  "merge_recipes": [],
  "overlays": [],
  "runtime_services": [],
  "capabilities": [],
  "examples": [],
  "integrity": {},
  "notes": null
}
```

Required sections:

```text
schema_version
identity
provenance
status
purpose
composition
integrity
```

Recommended sections:

```text
geometry
relations
bundles
merge_recipes
overlays
runtime_services
capabilities
examples
notes
```

---

## 15. NeoBlock Identity

Example:

```json
{
  "identity": {
    "id": "NB.SERVUO.FILE_SCAN.v1",
    "artifact_type": "neoblock",
    "library_code": "NB-SERVUO-001",
    "name": "File / Class Scanner",
    "version": "1.0.0",
    "namespace": "SERVUO",
    "slug": "FILE_SCAN"
  }
}
```

---

## 16. NeoBlock Composition

A NeoBlock composes MOLT Blocks.

Example:

```json
{
  "composition": {
    "molt_block_ids": [
      "BLK.TRIGGER.CODING.CODE_PATCH_REQUEST.v1",
      "BLK.SUBJECT.SERVUO.FILE_SYSTEM.v1",
      "BLK.INSTRUCTION.CODING.SCAN_CLASSES.v1",
      "BLK.BLUEPRINT.CODING.FILE_SCAN_REPORT.v1"
    ],
    "required_molt_types": [
      "Trigger",
      "Subject",
      "Instruction"
    ],
    "optional_molt_types": [
      "Philosophy",
      "Blueprint"
    ],
    "omitted_molt_types": [
      "Directive",
      "Primary"
    ],
    "composition_logic": {
      "sequence": [
        "BLK.TRIGGER.CODING.CODE_PATCH_REQUEST.v1",
        "BLK.SUBJECT.SERVUO.FILE_SYSTEM.v1",
        "BLK.INSTRUCTION.CODING.SCAN_CLASSES.v1"
      ],
      "parallel": [],
      "conditions": [],
      "notes": null
    }
  }
}
```

Rules:

```text
A NeoBlock may include multiple MOLT Blocks.
A NeoBlock does not need one of every MOLT type.
A NeoBlock may omit some MOLT types.
A NeoBlock must resolve into a coherent local function.
```

---

## 17. NeoBlock Geometry

NeoBlock geometry records visual/compiler relationships inside the NeoBlock.

Example:

```json
{
  "geometry": {
    "layout_hint": "vertical_authority_graph",
    "relations": [
      {
        "from": "BLK.TRIGGER.CODING.CODE_PATCH_REQUEST.v1",
        "to": "BLK.INSTRUCTION.CODING.SCAN_CLASSES.v1",
        "relation": "vertical_precedence"
      },
      {
        "from": "BLK.SUBJECT.SERVUO.FILE_SYSTEM.v1",
        "to": "BLK.BLUEPRINT.CODING.FILE_SCAN_REPORT.v1",
        "relation": "horizontal_sibling"
      }
    ]
  }
}
```

Geometry relation types:

```text
vertical_precedence
horizontal_sibling
bundle_membership
merge_input
merge_output
overlay_influence
off_exclusion
```

Rule:

```text
Geometry is compiler-relevant metadata, not merely decoration.
```

---

## 18. NeoBlock Bundles

A NeoBlock may include bundles.

Example:

```json
{
  "bundles": [
    {
      "id": "BND.SERVUO.FILE_SCAN.SAFETY.v1",
      "state": "standby",
      "members": [
        "BLK.INSTRUCTION.CODING.DO_NOT_EDIT.v1",
        "BLK.PHILOSOPHY.SAFETY.PRESERVE_USER_WORK.v1"
      ],
      "activation_condition": "route.dangerous_refactor == true"
    }
  ]
}
```

Bundle rules:

```text
Bundle groups artifacts.
Bundle can activate conditionally.
Bundle does not synthesize meaning by itself.
Merge synthesizes meaning.
```

---

## 19. NeoBlock Merge Recipes

A NeoBlock may include merge recipes.

Example:

```json
{
  "merge_recipes": [
    {
      "id": "MRG.SERVUO.FILE_SCAN.CONTEXT.v1",
      "merge_type": "same_type_merge",
      "inputs": [
        "BLK.INSTRUCTION.CODING.SCAN_CLASSES.v1",
        "BLK.INSTRUCTION.CODING.PRESERVE_SCOPE.v1"
      ],
      "target_type": "Instruction",
      "target_role": "local_instruction_synthesis",
      "target_container": "NeoBlock.instructions",
      "policy": "dedupe_append"
    }
  ]
}
```

Cross-type synthesis is allowed if typed.

```text
Every synthesis result must resolve into a target type, role, container, overlay, or RuntimeSpec slot.
```

---

## 20. NeoBlock Capabilities

A NeoBlock may declare required capabilities.

Example:

```json
{
  "capabilities": [
    {
      "id": "CAP.REPO.READ",
      "required": true,
      "reason": "File scanner must inspect repository files."
    }
  ]
}
```

Capability declarations do not execute tools.

Envoy resolves capabilities through Tool Packs.

---

## 21. NeoBlock Runtime Services

Example:

```json
{
  "runtime_services": [
    {
      "id": "SVC.CACHE",
      "required": false,
      "purpose": "Cache scanned file/class map."
    },
    {
      "id": "SVC.TRACE",
      "required": true,
      "purpose": "Trace file scan decisions."
    }
  ]
}
```

Runtime services are support systems, not MOLT Blocks.

---

## 22. NeoStack Contract

A v0.1 NeoStack should follow this top-level shape:

```json
{
  "schema_version": "0.1",
  "identity": {},
  "provenance": {},
  "status": {},
  "purpose": "",
  "composition": {},
  "activation": {},
  "governance": {},
  "geometry": {},
  "routes": [],
  "bundles": [],
  "merge_recipes": [],
  "overlays": [],
  "runtime_services": [],
  "capabilities": [],
  "examples": [],
  "integrity": {},
  "notes": null
}
```

Required sections:

```text
schema_version
identity
provenance
status
purpose
composition
activation
integrity
```

Recommended sections:

```text
governance
geometry
routes
bundles
merge_recipes
overlays
runtime_services
capabilities
examples
notes
```

---

## 23. NeoStack Identity

Example:

```json
{
  "identity": {
    "id": "NS.CODER.SERVUO.MASTER.v1",
    "artifact_type": "neostack",
    "library_code": "NS-CODER-001",
    "name": "ServUO Master Coder Stack",
    "version": "1.0.0",
    "namespace": "CODER",
    "slug": "SERVUO_MASTER"
  }
}
```

---

## 24. NeoStack Composition

NeoStacks compose NeoBlocks.

Example:

```json
{
  "composition": {
    "neoblock_ids": [
      "NB.SERVUO.REQUEST_INTAKE.v1",
      "NB.SERVUO.REPO_CONTEXT.v1",
      "NB.SERVUO.FILE_SCAN.v1",
      "NB.SERVUO.API_MAP.v1",
      "NB.SERVUO.ISSUE_LOCALIZER.v1",
      "NB.SERVUO.PATCH_PLANNER.v1",
      "NB.SERVUO.CSHARP_GENERATOR.v1",
      "NB.SERVUO.COMPILE_CHECK.v1",
      "NB.SERVUO.OUTPUT_PATCH.v1"
    ],
    "entry_neoblock": "NB.SERVUO.REQUEST_INTAKE.v1",
    "terminal_neoblocks": [
      "NB.SERVUO.OUTPUT_PATCH.v1"
    ],
    "standby_neoblocks": [
      "NB.SERVUO.COMPILE_CHECK.v1"
    ]
  }
}
```

Rules:

```text
NeoStack contains NeoBlocks.
NeoStack represents a workflow/lane/department.
NeoStack can be activated, offed, or kept standby by governance.
```

---

## 25. NeoStack Activation

Example:

```json
{
  "activation": {
    "entry": "NB.SERVUO.REQUEST_INTAKE.v1",
    "sequence": [
      "NB.SERVUO.REQUEST_INTAKE.v1",
      "NB.SERVUO.REPO_CONTEXT.v1",
      "NB.SERVUO.FILE_SCAN.v1",
      "NB.SERVUO.ISSUE_LOCALIZER.v1",
      "NB.SERVUO.PATCH_PLANNER.v1",
      "NB.SERVUO.CSHARP_GENERATOR.v1"
    ],
    "conditions": [],
    "fallback": "NB.SERVUO.RUNTIME_FEEDBACK.v1",
    "notes": null
  }
}
```

Activation describes default workflow.

Governance and route selection may override or filter active path at runtime.

---

## 26. NeoStack Governance

Example:

```json
{
  "governance": {
    "controlled_by": "OVR.GOV.CODE_ROUTER.v1",
    "route_ids": [
      "route.normal_code_patch",
      "route.docs_only",
      "route.compile_recovery"
    ],
    "can_be_offed": true,
    "default_state": "standby",
    "policy_links": []
  }
}
```

Rule:

```text
Governance may activate, off, or standby a NeoStack for a run.
```

---

## 27. NeoStack Geometry

NeoStack geometry records vertical authority and horizontal sibling structure between NeoBlocks.

Example:

```json
{
  "geometry": {
    "layout_hint": "multi_tier_authority_lattice",
    "relations": [
      {
        "from": "NB.SERVUO.REQUEST_INTAKE.v1",
        "to": "NB.SERVUO.REPO_CONTEXT.v1",
        "relation": "vertical_precedence"
      },
      {
        "from": "NB.SERVUO.FILE_SCAN.v1",
        "to": "NB.SERVUO.API_MAP.v1",
        "relation": "horizontal_sibling"
      },
      {
        "from": "NB.SERVUO.API_MAP.v1",
        "to": "NB.SERVUO.DEPENDENCY_TRACE.v1",
        "relation": "horizontal_sibling"
      }
    ]
  }
}
```

Visual geometry maps to compiler relations:

```text
Vertical = authority / sequence / precedence.
Horizontal = sibling / equal-level / parallel contribution.
```

---

## 28. Snap Compatibility

Snapping is not arbitrary.

A valid snap requires one of:

```text
same-tier sibling compatibility
parent NeoBlock allows pairing
parent NeoStack allows pairing
active route expects relation
bundle declares grouping
merge recipe declares synthesis
overlay allows influence
governance authorizes route
compatibility matrix allows relation
```

Invalid snap should produce a diagnostic.

Example:

```json
{
  "level": "warning",
  "code": "INVALID_SNAP_RELATION",
  "message": "Blueprint and Directive cannot be horizontally snapped without a parent route, bundle, or typed synthesis recipe."
}
```

---

## 29. Relation Matrix Projection

These object contracts should project cleanly into Relation Matrix.

Example:

```text
NS.CODER.SERVUO.MASTER.v1 [A]
NS.CODER.SERVUO.MASTER.v1 -V-> NB.SERVUO.REQUEST_INTAKE.v1 [A]
NB.SERVUO.REPO_CONTEXT.v1 -H- NB.SERVUO.FILE_SCAN.v1 [A]
NB.SERVUO.REPO_CONTEXT.v1 -H- NB.SERVUO.API_MAP.v1 [A]
NB.SERVUO.PATCH_PLANNER.v1 -V-> NB.SERVUO.CSHARP_GENERATOR.v1 [A]
NS.CODER.SERVUO.MASTER.v1 -C-> CAP.REPO.SEARCH [OK]
```

Stable artifact IDs must be used.

---

## 30. IR Projection

MOLT Blocks, NeoBlocks, and NeoStacks normalize into IR nodes.

Expected IR node kinds:

```text
molt_block
neoblock
neostack
bundle
overlay
capability
merge_result
```

Expected IR edge kinds:

```text
vertical_precedence
horizontal_sibling
bundle_membership
merge_input
merge_output
overlay_influence
capability_requirement
source_dependency
off_exclusion
```

---

## 31. RuntimeSpec Projection

RuntimeSpec should receive only resolved active artifacts.

It should include:

```text
active MOLT Blocks
active NeoBlocks
active NeoStacks
active bundles
active overlays
merge outputs
capability requirements
conflict decisions
warnings/errors
```

Inactive/off artifacts may appear in trace, but should not be treated as active runtime structure.

---

## 32. Trace Requirements

Trace should record:

```text
molt_block.loaded
neoblock.loaded
neostack.loaded
neostack.activated
neostack.offed
neoblock.activated
bundle.activated
merge.performed
synthesis.typed
snap.validated
snap.rejected
stack.resolved
priority.conflict_resolved
capability.required
```

Trace events should reference artifact IDs.

---

## 33. MOLT Block Floating Policy

MOLT Blocks should usually compile through NeoBlocks.

A floating block is allowed only when explicitly permitted.

Allowed cases:

```text
user-injected temporary instruction
global governance/policy overlay
retrieved context block
debug/test fixture
explicitly allowed sleeve-level block
```

Otherwise, a floating MOLT Block should produce a diagnostic.

Example:

```json
{
  "level": "warning",
  "code": "FLOATING_MOLT_BLOCK",
  "message": "MOLT Block is active without NeoBlock parent."
}
```

---

## 34. Use / Aim / Need Extension Slot

Use/Aim/Need is reserved as an optional intent-refinement band.

For v0, do not force it into every object.

Suggested representation:

```json
{
  "intent_refinement": {
    "use": null,
    "aim": null,
    "need": null,
    "priority_slot": "between:Subject,Primary"
  }
}
```

This may later become first-class MOLT or MetaMOLT if proven useful.

---

## 35. Capability Placement Rule

Capabilities may be declared at multiple layers.

Recommended hierarchy:

```text
MOLT Block: rare, only if atomic behavior directly requires capability
NeoBlock: common for local function needs
NeoStack: common for workflow-level needs
Sleeve: common for full operating configuration
Tool Pack: provides actual execution
```

Compiler records capability requirements.

Envoy resolves tool bindings.

Tools execute only through runtime.

---

## 36. Validation Rules

Validator should check:

```text
required identity fields exist
provenance exists
MOLT type is valid
NeoBlock references valid MOLT block IDs
NeoStack references valid NeoBlock IDs
geometry relations reference valid members
merge recipes have typed targets
cross-type snaps have valid parent/recipe/route
floating blocks are allowed or warned
capabilities are declared but not executed
integrity fields exist
```

---

## 37. Minimal MOLT Block Example

```json
{
  "schema_version": "0.1",
  "identity": {
    "id": "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1",
    "artifact_type": "molt_block",
    "library_code": "001",
    "name": "Minimal Patch Instruction",
    "version": "1.0.0",
    "namespace": "CODING",
    "slug": "MINIMAL_PATCH"
  },
  "provenance": {
    "origin": "core_library",
    "creator_id": "NeoMagnetar",
    "submitted_by": "NeoMagnetar",
    "parent_ids": [],
    "derived_from": [],
    "inspired_by": [],
    "created_at": "2026-04-27T00:00:00Z",
    "updated_at": "2026-04-27T00:00:00Z",
    "content_hash": "sha256:...",
    "package_hash": "sha256:...",
    "public_status": "draft",
    "review_status": "unreviewed",
    "license": "public-umg-default",
    "attribution_required": true
  },
  "status": {
    "lifecycle": "draft",
    "visibility": "public",
    "stability": "experimental"
  },
  "molt": {
    "type": "Instruction",
    "priority_profile": "molt.default.v1",
    "stack_key": "coding.patch_scope",
    "stack_rank": 50,
    "merge_key": "coding.patch_rules",
    "merge_policy": "dedupe_append",
    "can_float": false
  },
  "content": {
    "summary": "Prefer minimal code patches.",
    "body": "When editing code, prefer the smallest correct patch that satisfies the task.",
    "structure": null,
    "parameters": {}
  },
  "constraints": [],
  "relations": {},
  "composition": {},
  "runtime": {},
  "examples": [],
  "integrity": {
    "content_hash": "sha256:...",
    "package_hash": "sha256:..."
  },
  "notes": null
}
```

---

## 38. Minimal NeoBlock Example

```json
{
  "schema_version": "0.1",
  "identity": {
    "id": "NB.SERVUO.FILE_SCAN.v1",
    "artifact_type": "neoblock",
    "library_code": "NB-SERVUO-001",
    "name": "File / Class Scanner",
    "version": "1.0.0",
    "namespace": "SERVUO",
    "slug": "FILE_SCAN"
  },
  "provenance": {
    "origin": "core_library",
    "creator_id": "NeoMagnetar",
    "submitted_by": "NeoMagnetar",
    "parent_ids": [],
    "derived_from": [],
    "inspired_by": [],
    "created_at": "2026-04-27T00:00:00Z",
    "updated_at": "2026-04-27T00:00:00Z",
    "content_hash": "sha256:...",
    "package_hash": "sha256:...",
    "public_status": "draft",
    "review_status": "unreviewed",
    "license": "public-umg-default",
    "attribution_required": true
  },
  "status": {
    "lifecycle": "draft",
    "visibility": "public",
    "stability": "experimental"
  },
  "purpose": "Scan ServUO files and classes relevant to a code task.",
  "composition": {
    "molt_block_ids": [
      "BLK.TRIGGER.CODING.CODE_PATCH_REQUEST.v1",
      "BLK.SUBJECT.SERVUO.FILE_SYSTEM.v1",
      "BLK.INSTRUCTION.CODING.SCAN_CLASSES.v1"
    ],
    "required_molt_types": ["Trigger", "Subject", "Instruction"],
    "optional_molt_types": ["Blueprint"],
    "omitted_molt_types": ["Directive", "Primary", "Philosophy"],
    "composition_logic": {
      "sequence": [],
      "parallel": [],
      "conditions": [],
      "notes": null
    }
  },
  "geometry": {
    "layout_hint": "vertical_authority_graph",
    "relations": []
  },
  "relations": {},
  "bundles": [],
  "merge_recipes": [],
  "overlays": [],
  "runtime_services": [],
  "capabilities": [
    {
      "id": "CAP.REPO.READ",
      "required": true,
      "reason": "File scanner must inspect repository files."
    }
  ],
  "examples": [],
  "integrity": {
    "content_hash": "sha256:...",
    "package_hash": "sha256:..."
  },
  "notes": null
}
```

---

## 39. Minimal NeoStack Example

```json
{
  "schema_version": "0.1",
  "identity": {
    "id": "NS.CODER.SERVUO.MASTER.v1",
    "artifact_type": "neostack",
    "library_code": "NS-CODER-001",
    "name": "ServUO Master Coder Stack",
    "version": "1.0.0",
    "namespace": "CODER",
    "slug": "SERVUO_MASTER"
  },
  "provenance": {
    "origin": "core_library",
    "creator_id": "NeoMagnetar",
    "submitted_by": "NeoMagnetar",
    "parent_ids": [],
    "derived_from": [],
    "inspired_by": [],
    "created_at": "2026-04-27T00:00:00Z",
    "updated_at": "2026-04-27T00:00:00Z",
    "content_hash": "sha256:...",
    "package_hash": "sha256:...",
    "public_status": "draft",
    "review_status": "unreviewed",
    "license": "public-umg-default",
    "attribution_required": true
  },
  "status": {
    "lifecycle": "draft",
    "visibility": "public",
    "stability": "experimental"
  },
  "purpose": "Coordinate ServUO code context loading, analysis, patch planning, generation, and output.",
  "composition": {
    "neoblock_ids": [
      "NB.SERVUO.REQUEST_INTAKE.v1",
      "NB.SERVUO.REPO_CONTEXT.v1",
      "NB.SERVUO.FILE_SCAN.v1",
      "NB.SERVUO.PATCH_PLANNER.v1"
    ],
    "entry_neoblock": "NB.SERVUO.REQUEST_INTAKE.v1",
    "terminal_neoblocks": [
      "NB.SERVUO.OUTPUT_PATCH.v1"
    ],
    "standby_neoblocks": [
      "NB.SERVUO.COMPILE_CHECK.v1"
    ]
  },
  "activation": {
    "entry": "NB.SERVUO.REQUEST_INTAKE.v1",
    "sequence": [],
    "conditions": [],
    "fallback": null,
    "notes": null
  },
  "governance": {},
  "geometry": {
    "layout_hint": "multi_tier_authority_lattice",
    "relations": []
  },
  "routes": [],
  "bundles": [],
  "merge_recipes": [],
  "overlays": [],
  "runtime_services": [],
  "capabilities": [],
  "examples": [],
  "integrity": {
    "content_hash": "sha256:...",
    "package_hash": "sha256:..."
  },
  "notes": null
}
```

---

## 40. Non-Goals for v0.1

This contract does not finalize:

```text
all future MOLT/meta-MOLT types
full visual studio behavior
final schema syntax
final marketplace rules
final tool execution model
full anti-abuse model
all priority profiles
all possible geometry layouts
```

It defines the object foundation.

---

## 41. Acceptance Criteria

This section is complete when the system can represent:

```text
atomic MOLT Blocks
composed NeoBlocks
workflow NeoStacks
identity/provenance for each
MOLT type and priority metadata
NeoBlock composition from MOLT Blocks
NeoStack composition from NeoBlocks
vertical and horizontal geometry
bundle membership
typed merge participation
capability requirements
runtime service expectations
IR projection
Relation Matrix projection
RuntimeSpec projection
Trace references
```

---

## 42. Summary

MOLT Blocks, NeoBlocks, and NeoStacks are the core reusable object layers of UMG.

```text
MOLT Block = atom
NeoBlock = semantic unit
NeoStack = workflow lane
Sleeve = operating configuration
```

The compiler should not treat random atomic blocks as the normal runtime unit.

Most runtime behavior should resolve through NeoBlocks and NeoStacks.

Visual geometry should map to compiler relations.

Capability declarations should remain separate from executable tools.

All objects should carry identity, provenance, integrity, and traceable references.

This gives UMG a clean reusable object model for public libraries, private Resleever work, compiler normalization, Envoy runtime activation, visual UI, and future creator attribution.
