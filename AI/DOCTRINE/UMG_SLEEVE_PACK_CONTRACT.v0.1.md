# Section 5 — UMG Sleeve Pack Contract v0.1

**Document ID:** `UMG_SLEEVE_PACK_CONTRACT.v0.1`  
**Status:** Foundation draft  
**Layer:** Packaging / library / compiler input / Envoy runtime configuration  
**Depends on:** `UMG_COMPILER_LAW.v0.3`, `UMG_IR.v0.1`, `UMG_ARTIFACT_IDENTITY_AND_PROVENANCE.v0.1`  
**Feeds into:** Sleeve schemas, public Block Library, private Resleever mirror, Envoy Agent sleeve loader, compiler bridge, runtime activation, Relation Matrix, Trace  

---

## 1. Purpose

A **UMG Sleeve Pack** is a portable, manifest-driven package that declares a named operating configuration for UMG.

A sleeve pack tells the Envoy Agent and compiler:

- what the sleeve is;
- what blocks, NeoBlocks, NeoStacks, bundles, and overlays it uses;
- what route defaults it declares;
- what runtime services and tool capabilities it requires;
- what compiler/IR/priority profile it expects;
- what local additions it includes;
- how to validate, load, compile, trace, and activate it.

A sleeve pack is not the compiler.

A sleeve pack is not the full block library.

A sleeve pack is not executable tool code.

A sleeve pack is a structured configuration package.

---

## 2. Sleeve Pack Definition

A UMG Sleeve Pack is:

```text
manifest + README + references + optional local deltas + optional assets + optional lockfile
```

More formally:

```text
SleevePack =
  sleeve.json
  README.md
  optional local blocks/
  optional local neoblocks/
  optional local neostacks/
  optional local bundles/
  optional local overlays/
  optional assets/
  optional examples/
  optional sleeve.lock.json
```

The manifest says what the sleeve wants.

The lockfile says what resolved.

The README explains the sleeve to humans and agents.

---

## 3. Repository Role

The public UMG Block Library is the natural home for public sleeve packs.

The public library already describes itself as a curated public block-library surface for readable doctrine, baseline block libraries, public schemas, and selected examples. It also defines itself as a public-facing UMG block-library repo with a curated AI/HUMAN split and schema/example surface. The sleeve pack contract should align with that role.

The private Resleever can mirror this same sleeve-pack structure as a private superset and testbed.

Envoy Agent can then load sleeve packs from:

- UMG Block Library;
- private Resleever;
- local user library;
- imported folder;
- imported ZIP/package;
- future web/registry source.

---

## 4. Existing Sleeve Schema Context

The existing public sleeve schema already includes fields such as:

```text
id
name
purpose
category
subcategory
status
version
tags
neostack_ids
governance
runtime
activation_notes
examples
source
notes
```

This is a good descriptive beginning.

But for a compiler-loadable and Envoy-loadable sleeve pack, v0.1 needs stronger fields for:

```text
identity
provenance
compatibility
dependencies
composition
routes
governance overlays
runtime services
capabilities/toolpacks
activation defaults
local deltas
lockfile linkage
diagnostics expectations
```

This section defines that fuller contract.

---

## 5. Standard Folder Shape

Recommended sleeve pack folder:

```text
SLV.CODER.SERVUO.v1/
  sleeve.json
  README.md
  sleeve.lock.json
  blocks/
  neoblocks/
  neostacks/
  bundles/
  overlays/
  assets/
  examples/
```

Only `sleeve.json` and `README.md` should be required in early v0.

`sleeve.lock.json` is strongly recommended for packaged or promoted sleeves.

Local folders may be empty or omitted if the sleeve only references canonical library artifacts.

---

## 6. Canonical Public Location

Recommended public location:

```text
AI/SLEEVES/categories/<category>/<sleeve-id>/
```

Example:

```text
AI/SLEEVES/categories/coders/SLV.CODER.SERVUO.v1/
  sleeve.json
  README.md
  sleeve.lock.json
  neostacks/
  neoblocks/
  blocks/
  assets/
```

Human-readable mirror:

```text
HUMAN/sleeves/coders/SLV.CODER.SERVUO.v1.md
```

Catalog entry:

```text
AI/MANIFESTS/sleeve-catalog.json
```

---

## 7. Canonical Manifest Top-Level Shape

Every `sleeve.json` should follow this top-level shape:

```json
{
  "schema_version": "0.1",
  "identity": {},
  "provenance": {},
  "status": {},
  "compatibility": {},
  "dependencies": {},
  "composition": {},
  "routes": [],
  "governance": {},
  "overlays": [],
  "runtime_services": [],
  "capabilities": [],
  "toolpacks": [],
  "activation": {},
  "local_deltas": {},
  "examples": [],
  "docs": {},
  "integrity": {},
  "notes": null
}
```

Top-level fields should remain stable even when some sections are empty.

This makes validation and loader logic easier.

---

## 8. Identity

A sleeve should use the artifact identity model from Section 4.

Example:

```json
{
  "identity": {
    "id": "SLV.CODER.SERVUO.v1",
    "artifact_type": "sleeve",
    "library_code": "SLV-CODER-001",
    "name": "ServUO Coder Sleeve",
    "version": "1.0.0",
    "namespace": "CODER",
    "slug": "SERVUO"
  }
}
```

Required fields:

```text
id
artifact_type
library_code
name
version
namespace
slug
```

Rule:

```text
The sleeve ID must be stable and must be used by RuntimeSpec, Trace, Relation Matrix, catalogs, and usage events.
```

---

## 9. Provenance

Sleeves must support creator attribution and future lineage.

Example:

```json
{
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
    "public_status": "promoted",
    "review_status": "approved",
    "license": "public-umg-default",
    "attribution_required": true
  }
}
```

Composite sleeves may be original even when they depend on blocks and NeoBlocks made by other creators.

The sleeve creator receives composition/orchestration credit.

Upstream artifacts retain dependency credit.

---

## 10. Status

A sleeve should explicitly declare release/use state.

Example:

```json
{
  "status": {
    "lifecycle": "draft",
    "visibility": "public",
    "stability": "experimental",
    "promotion_level": "reference_candidate"
  }
}
```

Recommended lifecycle values:

```text
draft
submitted
under_review
promoted
deprecated
archived
rejected
```

Recommended visibility values:

```text
public
private
local
internal
compatibility_reference
historical_reference
```

Recommended stability values:

```text
experimental
staged
stable
locked
legacy
```

---

## 11. Compatibility

Compatibility defines where the sleeve can run.

Example:

```json
{
  "compatibility": {
    "compiler": {
      "target": "umg-compiler-v0",
      "version_range": ">=0.1.0 <1.0.0"
    },
    "ir": {
      "version": "0.1"
    },
    "runtime": {
      "envoy_agent": ">=0.3.0",
      "openclaw": ">=2026.3.23"
    },
    "block_library": {
      "name": "UMG-Block-Library",
      "version_range": ">=0.1.0"
    },
    "priority_profile": "molt.default.v1",
    "strictness_profile": "compile.dev.v1"
  }
}
```

Required fields for v0:

```text
compiler.target
ir.version
priority_profile
strictness_profile
```

Compatibility should be checked before compile.

---

## 12. Dependencies

Dependencies declare external/canonical artifacts the sleeve references.

Example:

```json
{
  "dependencies": {
    "blocks": [
      "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1"
    ],
    "neoblocks": [
      "NB.SERVUO.FILE_SCAN.v1"
    ],
    "neostacks": [
      "NS.CODER.SERVUO.MASTER.v1"
    ],
    "bundles": [],
    "overlays": [
      "OVR.GOV.CODE_ROUTER.v1"
    ],
    "toolpacks": [
      "TP.REPO_ANALYSIS.v1"
    ],
    "schemas": [
      "UMG_IR.v0.1"
    ]
  }
}
```

Dependencies should usually reference canonical artifacts instead of duplicating them.

---

## 13. Composition

Composition declares the main UMG objects included in or activated by the sleeve.

Example:

```json
{
  "composition": {
    "primary_neostack": "NS.CODER.SERVUO.MASTER.v1",
    "available_neostacks": [
      "NS.CODER.SERVUO.MASTER.v1",
      "NS.CODER.DOCS.v1",
      "NS.CODER.RECOVERY.v1"
    ],
    "default_neoblocks": [
      "NB.SERVUO.REQUEST_INTAKE.v1",
      "NB.SERVUO.REPO_CONTEXT.v1",
      "NB.SERVUO.FILE_SCAN.v1"
    ],
    "optional_neoblocks": [],
    "global_blocks": [],
    "standby_blocks": []
  }
}
```

Rule:

```text
A sleeve can reference many possible objects, but route/governance decides what is active for a given run.
```

---

## 14. Routes

Routes define possible active paths.

Example:

```json
{
  "routes": [
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
      "notes": "Default route for code patch requests."
    }
  ]
}
```

Rules:

```text
Routes select active paths.
Governance controls route selection.
Priority resolves conflicts inside selected routes.
Priority can challenge route selection but cannot silently reroute.
```

---

## 15. Governance

Governance declares routing authority.

Example:

```json
{
  "governance": {
    "overlay_id": "OVR.GOV.CODE_ROUTER.v1",
    "route_selector": "intent_classification",
    "default_route": "route.normal_code_patch",
    "route_challenge_policy": "diagnose_then_confirm_or_reroute",
    "off_policy": "exclude_non_route_stacks",
    "notes": "Governance selects code, docs, recovery, or refactor route."
  }
}
```

Governance should be explicit because it can turn stacks, bundles, and blocks on or off for a run.

---

## 16. Overlays

Overlays influence interpretation, routing, context, output, or tool availability.

Example:

```json
{
  "overlays": [
    {
      "id": "OVR.GOV.CODE_ROUTER.v1",
      "overlay_type": "governance",
      "state": "active",
      "targets": [
        "route.normal_code_patch",
        "route.docs_only"
      ]
    },
    {
      "id": "OVR.BLUEPRINT.PATCH_OUTPUT.v1",
      "overlay_type": "blueprint",
      "state": "active",
      "targets": [
        "OUT.PATCH_RENDERER"
      ]
    }
  ]
}
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

## 17. Runtime Services

Runtime services are support systems expected by the sleeve.

They are not ordinary MOLT blocks.

Example:

```json
{
  "runtime_services": [
    {
      "id": "SVC.TRACE",
      "required": true,
      "purpose": "Record compiler/runtime trace events."
    },
    {
      "id": "SVC.CACHE",
      "required": false,
      "purpose": "Cache resolved repo context and repeated lookups."
    },
    {
      "id": "SVC.MEMORY",
      "required": false,
      "purpose": "Retrieve relevant long-term context."
    }
  ]
}
```

Common services:

```text
SVC.MEMORY
SVC.CACHE
SVC.CONTEXT
SVC.TRACE
SVC.LOG
SVC.GUARD
SVC.IO
SVC.STORE
```

---

## 18. Capabilities

Capabilities declare what the sleeve needs to do.

Example:

```json
{
  "capabilities": [
    {
      "id": "CAP.REPO.SEARCH",
      "required": true,
      "reason": "The sleeve must search project files."
    },
    {
      "id": "CAP.COMPILE.CHECK",
      "required": false,
      "reason": "Compile check is preferred after patch generation."
    }
  ]
}
```

Capabilities are declarations.

They are resolved by Envoy through installed Tool Packs.

The sleeve does not execute them directly.

---

## 19. Toolpacks

Toolpacks declare recommended or required executable packages.

Example:

```json
{
  "toolpacks": [
    {
      "id": "TP.REPO_ANALYSIS.v1",
      "required": true,
      "provides": [
        "CAP.REPO.SEARCH",
        "CAP.REPO.READ"
      ]
    },
    {
      "id": "TP.SERVUO.CODER_TOOLS.v1",
      "required": false,
      "provides": [
        "CAP.COMPILE.CHECK",
        "CAP.PATCH.WRITE"
      ]
    }
  ]
}
```

Rule:

```text
Sleeve declares desired capabilities.
Envoy resolves installed toolpacks.
Compiler records requirements.
Tools run only through runtime.
```

---

## 20. Activation Defaults

Activation describes what happens when the sleeve is loaded.

Example:

```json
{
  "activation": {
    "default_route": "route.normal_code_patch",
    "default_neostack": "NS.CODER.SERVUO.MASTER.v1",
    "default_relation_matrix": true,
    "emit_trace": true,
    "emit_runtime_spec": true,
    "strictness": "dev",
    "tool_resolution": "validate_required_only"
  }
}
```

Recommended fields:

```text
default_route
default_neostack
default_relation_matrix
emit_trace
emit_runtime_spec
strictness
tool_resolution
```

---

## 21. Local Deltas

Local deltas are sleeve-specific artifacts included inside the sleeve pack.

Example:

```json
{
  "local_deltas": {
    "blocks_path": "blocks/",
    "neoblocks_path": "neoblocks/",
    "neostacks_path": "neostacks/",
    "bundles_path": "bundles/",
    "overlays_path": "overlays/",
    "assets_path": "assets/",
    "examples_path": "examples/"
  }
}
```

Rules:

```text
Canonical reusable artifacts should live in the Block Library.
Sleeve-local artifacts should live inside the sleeve pack.
Do not duplicate the entire block library into each sleeve.
```

---

## 22. Examples

Examples help humans and agents understand how to use the sleeve.

Example:

```json
{
  "examples": [
    {
      "id": "EX.SERVUO.NORMAL_PATCH.001",
      "title": "Normal patch request",
      "input": "Fix this ServUO compile error.",
      "expected_route": "route.normal_code_patch",
      "expected_neostack": "NS.CODER.SERVUO.MASTER.v1"
    }
  ]
}
```

Examples can later become compile fixtures.

---

## 23. Docs

The manifest should reference documentation.

Example:

```json
{
  "docs": {
    "readme": "README.md",
    "human_card": "HUMAN/sleeves/coders/SLV.CODER.SERVUO.v1.md",
    "visual_card": "assets/sleeve-card.png",
    "changelog": "CHANGELOG.md"
  }
}
```

`README.md` is required.

Human cards and visual cards are optional but recommended for public sleeves.

---

## 24. Integrity

Integrity supports deterministic packaging.

Example:

```json
{
  "integrity": {
    "content_hash": "sha256:...",
    "package_hash": "sha256:...",
    "lockfile": "sleeve.lock.json",
    "manifest_hash": "sha256:...",
    "resolved": false
  }
}
```

`content_hash` should reflect meaningful sleeve manifest content.

`package_hash` should reflect package/release state.

`lockfile` links to resolved dependency snapshot.

---

## 25. Sleeve Lockfile

`sleeve.lock.json` records what actually resolved.

The manifest says:

```text
what the sleeve wants
```

The lockfile says:

```text
what the sleeve got
```

A v0 lockfile should include:

```json
{
  "lock_version": "0.1",
  "sleeve_id": "SLV.CODER.SERVUO.v1",
  "sleeve_version": "1.0.0",
  "resolved_at": "2026-04-27T00:00:00Z",
  "compiler": {
    "target": "umg-compiler-v0",
    "version": "0.1.0"
  },
  "resolved_artifacts": {
    "blocks": [],
    "neoblocks": [],
    "neostacks": [],
    "toolpacks": []
  },
  "hashes": {
    "manifest_hash": "sha256:...",
    "package_hash": "sha256:..."
  }
}
```

Resolved artifacts should include artifact ID, version, source path, source origin, and content hash.

---

## 26. Required v0 Manifest Fields

For v0, a sleeve manifest should require:

```text
schema_version
identity
provenance
status
compatibility
dependencies
composition
routes
governance
activation
docs
integrity
```

Recommended but optional:

```text
overlays
runtime_services
capabilities
toolpacks
local_deltas
examples
notes
```

---

## 27. Minimal Valid Sleeve

```json
{
  "schema_version": "0.1",
  "identity": {
    "id": "SLV.CODER.SERVUO.v1",
    "artifact_type": "sleeve",
    "library_code": "SLV-CODER-001",
    "name": "ServUO Coder Sleeve",
    "version": "1.0.0",
    "namespace": "CODER",
    "slug": "SERVUO"
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
    "stability": "experimental",
    "promotion_level": "reference_candidate"
  },
  "compatibility": {
    "compiler": {
      "target": "umg-compiler-v0",
      "version_range": ">=0.1.0 <1.0.0"
    },
    "ir": {
      "version": "0.1"
    },
    "priority_profile": "molt.default.v1",
    "strictness_profile": "compile.dev.v1"
  },
  "dependencies": {
    "blocks": [],
    "neoblocks": [],
    "neostacks": [
      "NS.CODER.SERVUO.MASTER.v1"
    ],
    "bundles": [],
    "overlays": [],
    "toolpacks": []
  },
  "composition": {
    "primary_neostack": "NS.CODER.SERVUO.MASTER.v1",
    "available_neostacks": [
      "NS.CODER.SERVUO.MASTER.v1"
    ],
    "default_neoblocks": [],
    "optional_neoblocks": [],
    "global_blocks": [],
    "standby_blocks": []
  },
  "routes": [
    {
      "id": "route.normal_code_patch",
      "label": "Normal Code Patch",
      "entry_gate": "TRG.CODE_PATCH",
      "activate": [
        "NS.CODER.SERVUO.MASTER.v1"
      ],
      "disable": [],
      "standby": [],
      "default": true,
      "notes": "Default route for code patch requests."
    }
  ],
  "governance": {
    "overlay_id": "OVR.GOV.CODE_ROUTER.v1",
    "route_selector": "intent_classification",
    "default_route": "route.normal_code_patch",
    "route_challenge_policy": "diagnose_then_confirm_or_reroute",
    "off_policy": "exclude_non_route_stacks",
    "notes": null
  },
  "overlays": [],
  "runtime_services": [],
  "capabilities": [],
  "toolpacks": [],
  "activation": {
    "default_route": "route.normal_code_patch",
    "default_neostack": "NS.CODER.SERVUO.MASTER.v1",
    "default_relation_matrix": true,
    "emit_trace": true,
    "emit_runtime_spec": true,
    "strictness": "dev",
    "tool_resolution": "validate_required_only"
  },
  "local_deltas": {
    "blocks_path": "blocks/",
    "neoblocks_path": "neoblocks/",
    "neostacks_path": "neostacks/",
    "bundles_path": "bundles/",
    "overlays_path": "overlays/",
    "assets_path": "assets/",
    "examples_path": "examples/"
  },
  "examples": [],
  "docs": {
    "readme": "README.md",
    "human_card": null,
    "visual_card": null,
    "changelog": null
  },
  "integrity": {
    "content_hash": "sha256:...",
    "package_hash": "sha256:...",
    "lockfile": "sleeve.lock.json",
    "manifest_hash": "sha256:...",
    "resolved": false
  },
  "notes": null
}
```

---

## 28. README Requirements

Each public sleeve pack should include `README.md`.

README should explain:

```text
what the sleeve does
when to use it
what NeoStacks it activates
what routes it supports
what tools/capabilities it needs
what outputs it expects
what safety/governance behavior it uses
what examples are included
what is local vs canonical
```

A good README makes the sleeve understandable without opening every JSON file.

---

## 29. Human Card Requirements

Human card should summarize:

```text
ID
name
category
purpose
creator
status
active NeoStacks
main routes
capabilities
toolpacks
governance behavior
example usage
public status
```

The Human card is a browsing artifact, not source of truth.

---

## 30. Loader Rules

Envoy sleeve loader should:

```text
1. Read sleeve.json.
2. Validate manifest schema.
3. Validate identity/provenance fields.
4. Check compatibility.
5. Resolve dependencies from library sources.
6. Load local deltas.
7. Validate routes and governance.
8. Validate required capabilities/toolpacks.
9. Build UMG IR.
10. Call compiler.
11. Receive RuntimeSpec + Trace.
12. Optionally emit Relation Matrix.
13. Activate runtime state.
```

---

## 31. Compiler Rules

Compiler should:

```text
accept normalized sleeve input or IR
validate route/gate/merge/priority logic
emit RuntimeSpec
emit Trace
avoid tool execution
avoid hidden inference
avoid runtime side effects
```

The compiler does not install sleeves.

The compiler does not fetch missing tools.

The compiler does not run OpenClaw actions.

---

## 32. Envoy Rules

Envoy should:

```text
load sleeves
resolve artifacts
call/import compiler
store RuntimeSpec
store Trace
emit Relation Matrix
resolve Tool Packs
run tools through OpenClaw/runtime
record runtime/tool trace
```

Envoy is the vehicle.

Sleeve is the configuration.

Compiler is the resolver.

Tool Pack is the executable capability.

---

## 33. Public vs Private

Public UMG Block Library:

```text
curated public sleeve packs
schemas
manifests
examples
human cards
sanitized fixtures
```

Private Resleever:

```text
same structure
private sleeves
experimental sleeves
local runtime state
private traces
promotion candidates
personal blocks
```

They may mirror shape, but not necessarily identical content.

---

## 34. Non-Goals for v0.1

This contract does not implement:

- full marketplace;
- final creator economy;
- crypto mechanics;
- visual studio editing;
- advanced multi-agent orchestration;
- final package registry;
- automatic trust scoring;
- final tool execution model;
- complete anti-abuse workflow.

It defines sleeve package shape.

---

## 35. Acceptance Criteria

The sleeve pack contract is acceptable when a sleeve can:

```text
identify itself
declare provenance
declare compatibility
reference blocks/NeoBlocks/NeoStacks
declare routes
declare governance behavior
declare overlays
declare runtime services
declare capabilities and toolpacks
declare activation defaults
include local deltas
link docs/readme
link lockfile
be loaded by Envoy
be normalized into IR
be compiled into RuntimeSpec + Trace
emit Relation Matrix projection
```

---

## 36. Summary

A UMG Sleeve Pack is a portable operating configuration for the UMG runtime.

It does not contain the entire system.

It declares how to assemble, route, activate, and validate a UMG configuration.

In short:

```text
Block Library supplies artifacts.
Sleeve Pack declares configuration.
Envoy loads and resolves.
Compiler structures cognition.
RuntimeSpec operates.
Trace explains.
Tool Packs execute capabilities.
```

The sleeve pack is the bridge between the library and the runtime.
