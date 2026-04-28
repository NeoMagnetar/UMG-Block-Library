# Section 7 — Tool Pack / Capability Pack Contract v0.1

**Document ID:** `UMG_TOOLPACK_CAPABILITY_CONTRACT.v0.1`  
**Status:** Foundation draft  
**Layer:** Executable capability declaration / runtime binding / Envoy-OpenClaw tool lane  
**Depends on:** `UMG_COMPILER_LAW.v0.3`, `UMG_IR.v0.1`, `UMG_SLEEVE_PACK_CONTRACT.v0.1`, `UMG_OBJECT_CONTRACTS.MOLT_NEOBLOCK_NEOSTACK.v0.1`  
**Feeds into:** Envoy runtime integration, sleeve capability declarations, OpenClaw plugin/tool surfaces, RuntimeSpec, Trace, Relation Matrix, future creator economy  

---

## 1. Purpose

This document defines the contract for **Tool Packs** and **Capability Packs** in UMG.

UMG sleeves, NeoStacks, and NeoBlocks may require real executable abilities such as:

- reading files;
- searching repositories;
- scanning code;
- rendering patches;
- running compile checks;
- querying memory/RAG;
- writing logs;
- controlling UI bridges;
- calling APIs;
- interacting with OpenClaw tools;
- performing GitHub operations;
- storing runtime trace.

These executable abilities should not be hidden inside sleeves.

They should live in explicit **Tool Packs** or **Capability Packs**.

---

## 2. Core Principle

A sleeve declares what it needs.

A Tool Pack provides what can act.

Envoy binds the two.

The compiler records the requirement but does not execute the tool.

```text
Sleeve / NeoStack / NeoBlock
  declares capabilities

Envoy Runtime
  resolves installed Tool Packs

Tool Pack
  exposes executable actions

Trace
  records requirement, binding, invocation, result
```

---

## 3. Definitions

### Capability

A **Capability** is a named ability requirement.

Example:

```text
CAP.REPO.SEARCH
CAP.REPO.READ
CAP.PATCH.WRITE
CAP.COMPILE.CHECK
```

Capabilities are abstract.

They describe what must be possible.

### Tool Pack

A **Tool Pack** is an installable package that provides one or more capabilities.

Example:

```text
TP.REPO_ANALYSIS.v1
TP.SERVUO.CODER_TOOLS.v1
TP.MEMORY_RAG.v1
TP.UI_BRIDGE.v1
```

Tool Packs may contain executable code, adapters, scripts, bridge logic, input/output schemas, and permission rules.

### Tool

A **Tool** is a specific callable function/command exposed by a Tool Pack.

Example:

```text
repo.search
repo.readFile
patch.render
compile.check
memory.retrieve
ui.window.close
```

---

## 4. Boundary Rule

The separation is:

```text
Sleeve = configuration/orchestration
Capability = declared need
Tool Pack = executable provider
Tool = specific callable action
Envoy = resolver/runner
Compiler = deterministic structure resolver
```

The compiler does not run tools.

The Block Library does not run tools.

The sleeve does not run tools.

Envoy/OpenClaw runtime runs tools after validation and binding.

---

## 5. Why This Matters

Without this separation, sleeves become heavy code bundles.

That would cause:

- security risk;
- unclear permissions;
- hard-to-review public packages;
- brittle plugin behavior;
- unclear creator attribution;
- difficult tool upgrades;
- poor traceability.

The Tool Pack / Capability Pack lane keeps UMG clean:

```text
UMG content stays declarative.
Tool execution stays explicit.
Runtime authority stays in Envoy/OpenClaw.
Trace records every action.
```

---

## 6. Existing Envoy Context

The public UMG Envoy Agent is already framed as a bounded OpenClaw runtime that parses, validates, renders, and builds human-inspectable planner paths through a public-safe interface.

Its current public command surface is intentionally narrow and public-safe, with commands such as status, parse-path, validate-path, render-path, build-path, and matrix-status.

This Tool Pack contract is for the expanded/runtime lane, not for accidentally widening the current bounded public surface.

The same fail-closed posture should remain: unsupported or invalid semantics must fail closed until intentionally exposed.

---

## 7. Capability ID Format

Recommended capability ID format:

```text
CAP.<DOMAIN>.<ACTION>
```

Examples:

```text
CAP.REPO.SEARCH
CAP.REPO.READ
CAP.FILE.SCAN
CAP.PATCH.RENDER
CAP.PATCH.WRITE
CAP.COMPILE.CHECK
CAP.MEMORY.RETRIEVE
CAP.TRACE.LOG
CAP.UI.CONTROL
CAP.GITHUB.READ
CAP.GITHUB.PR_CREATE
```

Capability IDs should be:

- uppercase;
- stable;
- domain/action oriented;
- safe in JSON, IR, Relation Matrix, RuntimeSpec, and Trace.

---

## 8. Tool Pack ID Format

Recommended Tool Pack ID format:

```text
TP.<DOMAIN>.<SLUG>.v<MAJOR>
```

Examples:

```text
TP.REPO_ANALYSIS.v1
TP.SERVUO.CODER_TOOLS.v1
TP.MEMORY_RAG.v1
TP.UI_BRIDGE.v1
TP.GITHUB_ADAPTER.v1
```

Community Tool Packs may use creator namespace:

```text
TP.USER.<CREATOR_HANDLE>.<DOMAIN>.<SLUG>.v1
```

Example:

```text
TP.USER.MIRA.SERVUO.PVP_REVIEW_TOOLS.v1
```

---

## 9. Tool Pack Folder Shape

Recommended folder structure:

```text
TP.REPO_ANALYSIS.v1/
  toolpack.json
  README.md
  src/
  schemas/
  examples/
  tests/
  assets/
```

Required in v0:

```text
toolpack.json
README.md
```

Recommended:

```text
schemas/
examples/
tests/
```

Executable source may exist under `src/` or be provided by an external package reference.

---

## 10. Canonical Tool Pack Manifest Shape

Every `toolpack.json` should use this top-level shape:

```json
{
  "schema_version": "0.1",
  "identity": {},
  "provenance": {},
  "status": {},
  "runtime": {},
  "provides_capabilities": [],
  "tools": [],
  "permissions": [],
  "safety": {},
  "inputs": {},
  "outputs": {},
  "trace": {},
  "compatibility": {},
  "examples": [],
  "docs": {},
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
runtime
provides_capabilities
tools
permissions
safety
compatibility
docs
integrity
```

Recommended:

```text
inputs
outputs
trace
examples
notes
```

---

## 11. Identity

Tool Packs use the artifact identity model.

Example:

```json
{
  "identity": {
    "id": "TP.REPO_ANALYSIS.v1",
    "artifact_type": "toolpack",
    "library_code": "TP-REPO-001",
    "name": "Repo Analysis Tool Pack",
    "version": "1.0.0",
    "namespace": "REPO",
    "slug": "ANALYSIS"
  }
}
```

---

## 12. Provenance

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
    "public_status": "draft",
    "review_status": "unreviewed",
    "license": "public-umg-default",
    "attribution_required": true
  }
}
```

Tool Packs are creator-economy eligible later, because useful executable capability may become a high-value contribution.

Reward mechanics remain deferred.

---

## 13. Status

Example:

```json
{
  "status": {
    "lifecycle": "draft",
    "visibility": "public",
    "stability": "experimental",
    "security_review": "required"
  }
}
```

Recommended `security_review` values:

```text
required
pending
approved
rejected
internal_only
```

Executable tools should always carry security-review posture.

---

## 14. Runtime

Runtime declares where/how the Tool Pack can run.

Example:

```json
{
  "runtime": {
    "host": "openclaw",
    "language": "typescript",
    "entry": "dist/index.js",
    "package_manager": "npm",
    "requires_node": ">=22",
    "mode": "local_plugin"
  }
}
```

Possible host values:

```text
openclaw
node
python
browser
local_service
remote_api
github
shell
hybrid
```

Recommended rule:

```text
Tool Pack runtime must be explicit.
No implicit execution environment.
```

---

## 15. Provided Capabilities

Tool Packs declare the capabilities they satisfy.

Example:

```json
{
  "provides_capabilities": [
    {
      "id": "CAP.REPO.SEARCH",
      "required_permissions": ["filesystem.read"],
      "tools": ["repo.search"]
    },
    {
      "id": "CAP.REPO.READ",
      "required_permissions": ["filesystem.read"],
      "tools": ["repo.readFile"]
    }
  ]
}
```

One Tool Pack may satisfy multiple capabilities.

One capability may be satisfiable by multiple Tool Packs.

Envoy chooses the binding.

---

## 16. Tools

Each callable tool should be declared.

Example:

```json
{
  "tools": [
    {
      "id": "repo.search",
      "name": "Repository Search",
      "description": "Search files in a repository using bounded query parameters.",
      "capabilities": ["CAP.REPO.SEARCH"],
      "input_schema": "schemas/repo.search.input.schema.json",
      "output_schema": "schemas/repo.search.output.schema.json",
      "side_effects": "none",
      "risk_level": "low",
      "trace_events": [
        "tool.invoked",
        "repo.searched",
        "tool.completed"
      ]
    }
  ]
}
```

Required tool fields:

```text
id
name
description
capabilities
input_schema
output_schema
side_effects
risk_level
trace_events
```

---

## 17. Side Effect Levels

Tools should declare side-effect behavior.

Recommended values:

```text
none
read_only
write_patch_only
write_files
run_command
network_call
ui_control
dangerous
```

Examples:

```text
repo.search = read_only
patch.render = none or write_patch_only
compile.check = run_command
ui.window.close = ui_control
```

Envoy should use side-effect levels for permission checks.

---

## 18. Risk Levels

Recommended risk values:

```text
low
medium
high
critical
```

Examples:

```text
low = read-only search
medium = compile check
high = file write
critical = shell execution or broad UI automation
```

High and critical tools should require explicit policy approval or runtime permission.

---

## 19. Permissions

Tool Packs must declare permissions.

Example:

```json
{
  "permissions": [
    {
      "id": "filesystem.read",
      "required": true,
      "scope": "workspace",
      "reason": "Read repository files for context."
    },
    {
      "id": "filesystem.write.patch_only",
      "required": false,
      "scope": "workspace",
      "reason": "Write patch outputs only."
    }
  ]
}
```

Common permissions:

```text
filesystem.read
filesystem.write.patch_only
filesystem.write
terminal.run
network.request
github.read
github.write
browser.control
ui.control
memory.read
memory.write
trace.write
cache.write
```

---

## 20. Safety

Safety declares constraints on execution.

Example:

```json
{
  "safety": {
    "fail_closed": true,
    "requires_user_confirmation": false,
    "max_file_write_scope": "patch_only",
    "allow_shell": false,
    "allow_network": false,
    "redact_secrets": true,
    "trace_all_invocations": true
  }
}
```

Required fields:

```text
fail_closed
requires_user_confirmation
redact_secrets
trace_all_invocations
```

Recommended rule:

```text
If safety policy is missing, Envoy should treat the Tool Pack as unavailable.
```

---

## 21. Input / Output Schemas

Tool Packs should define tool input and output schemas.

Example:

```json
{
  "inputs": {
    "repo.search": "schemas/repo.search.input.schema.json"
  },
  "outputs": {
    "repo.search": "schemas/repo.search.output.schema.json"
  }
}
```

Schemas make tool use inspectable and safer.

---

## 22. Trace Events

Tool Packs must declare trace behavior.

Example:

```json
{
  "trace": {
    "events": [
      "tool.bound",
      "tool.invoked",
      "tool.completed",
      "tool.failed",
      "permission.denied",
      "capability.satisfied",
      "capability.missing"
    ],
    "include_inputs": "redacted",
    "include_outputs": "summary",
    "include_errors": true
  }
}
```

Recommended trace input policy:

```text
none
redacted
summary
full
```

Default:

```text
redacted
```

---

## 23. Compatibility

Tool Packs should declare compatible runtime and host requirements.

Example:

```json
{
  "compatibility": {
    "envoy_agent": ">=0.3.0",
    "openclaw_plugin_api": ">=1",
    "node": ">=22",
    "os": ["windows", "linux", "macos"],
    "compiler": {
      "required": false,
      "version_range": null
    }
  }
}
```

A Tool Pack may be runtime-only and not compiler-dependent.

---

## 24. Tool Pack README

Every Tool Pack should have a README explaining:

```text
what capabilities it provides
what tools it exposes
what permissions it requires
what side effects it can cause
what safety limits it follows
how Envoy binds it
how it traces actions
how to test it
```

Executable capability should not be opaque.

---

## 25. Capability Declaration in Sleeve

Sleeve example:

```json
{
  "capabilities": [
    {
      "id": "CAP.REPO.SEARCH",
      "required": true,
      "reason": "Search codebase for relevant files."
    },
    {
      "id": "CAP.COMPILE.CHECK",
      "required": false,
      "reason": "Run compile check when available."
    }
  ],
  "toolpacks": [
    {
      "id": "TP.REPO_ANALYSIS.v1",
      "required": true,
      "provides": ["CAP.REPO.SEARCH", "CAP.REPO.READ"]
    }
  ]
}
```

Sleeve declares need.

Tool Pack declares supply.

Envoy resolves.

---

## 26. Capability Declaration in NeoStack

NeoStack example:

```json
{
  "capabilities": [
    {
      "id": "CAP.REPO.SEARCH",
      "required": true,
      "reason": "ServUO Coder Stack requires repo search."
    },
    {
      "id": "CAP.PATCH.RENDER",
      "required": true,
      "reason": "Patch output renderer requires patch generation."
    }
  ]
}
```

Capabilities can live at multiple layers, but sleeve-level requirements are final for the active run.

---

## 27. Capability Declaration in NeoBlock

NeoBlock example:

```json
{
  "capabilities": [
    {
      "id": "CAP.REPO.READ",
      "required": true,
      "reason": "File scanner reads repository files."
    }
  ]
}
```

NeoBlock capability requirements roll upward into NeoStack and Sleeve compile outputs.

---

## 28. Capability Binding

Envoy creates capability bindings.

Example binding:

```json
{
  "capability_id": "CAP.REPO.SEARCH",
  "required": true,
  "status": "resolved",
  "satisfied_by": "TP.REPO_ANALYSIS.v1",
  "tool_id": "repo.search",
  "permission_status": "approved"
}
```

Missing required capability:

```json
{
  "capability_id": "CAP.COMPILE.CHECK",
  "required": true,
  "status": "missing",
  "satisfied_by": null,
  "tool_id": null,
  "permission_status": "unavailable"
}
```

---

## 29. RuntimeSpec Projection

RuntimeSpec should include capability requirements and binding status.

Example:

```json
{
  "capabilities": [
    {
      "id": "CAP.REPO.SEARCH",
      "required": true,
      "status": "resolved",
      "satisfied_by": "TP.REPO_ANALYSIS.v1"
    },
    {
      "id": "CAP.COMPILE.CHECK",
      "required": false,
      "status": "unresolved",
      "satisfied_by": null
    }
  ]
}
```

RuntimeSpec should not include raw tool implementation.

---

## 30. IR Projection

Tool Packs and capabilities normalize into IR nodes and edges.

IR nodes:

```text
capability
toolpack
service
```

IR edges:

```text
capability_requirement
tool_binding
source_dependency
diagnostic_link
```

Example Relation Matrix:

```text
NS.SERVUO.CODER -C-> CAP.REPO.SEARCH [OK]
CAP.REPO.SEARCH -T-> TP.REPO_ANALYSIS.v1 [OK]
CAP.COMPILE.CHECK [UNR]
CAP.COMPILE.CHECK -D-> DIAG.MISSING_CAPABILITY.0001 [WARN]
```

---

## 31. Trace Requirements

Trace should record:

```text
capability.required
capability.optional
capability.resolved
capability.missing
toolpack.loaded
toolpack.rejected
tool.bound
tool.invoked
tool.completed
tool.failed
permission.approved
permission.denied
safety.blocked
```

Every tool invocation should be traceable.

---

## 32. Invocation Rule

Tools should only be invoked after:

```text
1. active route selected;
2. capability required by active route/Sleeve/NeoStack/NeoBlock;
3. Tool Pack loaded;
4. permissions checked;
5. safety policy checked;
6. input schema validated;
7. trace event emitted.
```

If any step fails, invocation fails closed.

---

## 33. Fail-Closed Rule

Default behavior:

```text
Missing required capability = compile/runtime error or blocked activation.
Missing optional capability = warning and degraded behavior.
Unsafe tool = unavailable.
Unknown Tool Pack = unavailable.
Unvalidated input = no invocation.
```

This aligns with the public-safe posture already used by Envoy's bounded public lane.

---

## 34. Public vs Private Tool Packs

Public Tool Packs should be:

```text
reviewed
documented
permission-explicit
safe by default
fail-closed
traceable
```

Private Tool Packs may be experimental, but should still follow the manifest contract.

The same manifest shape should work in:

```text
public UMG Block Library
private Resleever
local user library
installed Envoy plugin folder
future registry
```

---

## 35. Tool Pack Placement

Early-stage recommended placement:

```text
umg-envoy-agent/
  capability-packs/
    TP.REPO_ANALYSIS.v1/
      toolpack.json
      README.md
      src/
```

or, for public declarations:

```text
UMG-Block-Library/
  AI/CAPABILITIES/toolpacks/TP.REPO_ANALYSIS.v1/
    toolpack.json
    README.md
```

Later, mature Tool Packs may move to:

```text
umg-capability-packs/
  TP.REPO_ANALYSIS.v1/
  TP.MEMORY_RAG.v1/
  TP.UI_BRIDGE.v1/
```

Do not create extra repos until necessary.

---

## 36. OpenClaw Plugin Surface

Tool Packs may be exposed through OpenClaw plugin surfaces.

A plugin manifest may declare package metadata, runtime entry, API version, and config schema.

For UMG purposes, Tool Pack manifests should sit above or beside plugin metadata and declare UMG-specific capabilities, permissions, safety, and trace events.

OpenClaw plugin metadata answers:

```text
How does OpenClaw load this plugin?
```

Tool Pack manifest answers:

```text
What UMG capabilities does this package provide?
```

Both can coexist.

---

## 37. Tool Pack vs OpenClaw Plugin

A Tool Pack is not always a full OpenClaw plugin.

Possible cases:

```text
Tool Pack as part of an OpenClaw plugin
Tool Pack as an internal Envoy module
Tool Pack as a local script adapter
Tool Pack as a remote API adapter
Tool Pack as a GitHub connector adapter
Tool Pack as a memory/RAG adapter
```

The contract should support all of these.

---

## 38. Security Notes

Executable tools are higher risk than declarative blocks.

Therefore:

```text
Tool Packs require explicit permissions.
Tool Packs require safety metadata.
Tool Packs require trace events.
Tool Packs should fail closed.
Tool Packs should not silently broaden runtime authority.
```

Never allow a sleeve to smuggle executable behavior as if it were ordinary block content.

---

## 39. Minimal Tool Pack Example

```json
{
  "schema_version": "0.1",
  "identity": {
    "id": "TP.REPO_ANALYSIS.v1",
    "artifact_type": "toolpack",
    "library_code": "TP-REPO-001",
    "name": "Repo Analysis Tool Pack",
    "version": "1.0.0",
    "namespace": "REPO",
    "slug": "ANALYSIS"
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
    "security_review": "required"
  },
  "runtime": {
    "host": "openclaw",
    "language": "typescript",
    "entry": "dist/index.js",
    "package_manager": "npm",
    "requires_node": ">=22",
    "mode": "local_plugin"
  },
  "provides_capabilities": [
    {
      "id": "CAP.REPO.SEARCH",
      "required_permissions": ["filesystem.read"],
      "tools": ["repo.search"]
    },
    {
      "id": "CAP.REPO.READ",
      "required_permissions": ["filesystem.read"],
      "tools": ["repo.readFile"]
    }
  ],
  "tools": [
    {
      "id": "repo.search",
      "name": "Repository Search",
      "description": "Search files in a repository using bounded query parameters.",
      "capabilities": ["CAP.REPO.SEARCH"],
      "input_schema": "schemas/repo.search.input.schema.json",
      "output_schema": "schemas/repo.search.output.schema.json",
      "side_effects": "read_only",
      "risk_level": "low",
      "trace_events": [
        "tool.invoked",
        "repo.searched",
        "tool.completed"
      ]
    }
  ],
  "permissions": [
    {
      "id": "filesystem.read",
      "required": true,
      "scope": "workspace",
      "reason": "Read repository files for context."
    }
  ],
  "safety": {
    "fail_closed": true,
    "requires_user_confirmation": false,
    "max_file_write_scope": "none",
    "allow_shell": false,
    "allow_network": false,
    "redact_secrets": true,
    "trace_all_invocations": true
  },
  "inputs": {
    "repo.search": "schemas/repo.search.input.schema.json"
  },
  "outputs": {
    "repo.search": "schemas/repo.search.output.schema.json"
  },
  "trace": {
    "events": [
      "tool.bound",
      "tool.invoked",
      "tool.completed",
      "tool.failed",
      "permission.denied",
      "capability.satisfied",
      "capability.missing"
    ],
    "include_inputs": "redacted",
    "include_outputs": "summary",
    "include_errors": true
  },
  "compatibility": {
    "envoy_agent": ">=0.3.0",
    "openclaw_plugin_api": ">=1",
    "node": ">=22",
    "os": ["windows", "linux", "macos"]
  },
  "examples": [],
  "docs": {
    "readme": "README.md",
    "changelog": null
  },
  "integrity": {
    "content_hash": "sha256:...",
    "package_hash": "sha256:...",
    "manifest_hash": "sha256:..."
  },
  "notes": null
}
```

---

## 40. Non-Goals for v0.1

This section does not define:

```text
final OpenClaw plugin API implementation
final package registry
final public marketplace
final security scanner
final smart contract/token logic
full remote API adapter design
all possible permission classes
final UI for tool consent
complete sub-agent orchestration
```

It defines the Tool Pack / Capability Pack contract.

---

## 41. Acceptance Criteria

This contract is acceptable when the system can represent:

```text
capability requirements
toolpack providers
tool manifests
tool input/output schemas
tool permissions
side-effect levels
risk levels
safety rules
trace events
Envoy binding records
RuntimeSpec capability status
Relation Matrix capability/tool lines
fail-closed behavior
public/private toolpack lanes
```

---

## 42. Summary

Tool Packs and Capability Packs keep UMG executable ability cleanly separated from UMG semantic configuration.

```text
Sleeve declares need.
Capability names ability.
Tool Pack provides ability.
Tool exposes callable action.
Envoy resolves and runs.
Compiler records structure.
Trace explains action.
```

This lets UMG sleeves orchestrate real tools without becoming unsafe code bundles.

Tool Packs are the executable instrument layer.

Sleeves are the score.

Envoy is the performer.

Compiler is the resolver.

Trace is the record.
