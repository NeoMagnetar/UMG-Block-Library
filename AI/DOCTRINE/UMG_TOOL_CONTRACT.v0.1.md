# UMG Tool Contract v0.1

**Document ID:** `UMG_TOOL_CONTRACT.v0.1`  
**Status:** Decision-stage doctrine  
**Layer:** Capability declaration / toolpack provider / runtime binding / execution gating  
**Depends on:** `UMG_SLEEVE_PACK_CONTRACT.v0.1`, `UMG_TOOLPACK_CAPABILITY_CONTRACT.v0.1`, `UMG_ENVOY_RUNTIME_INTEGRATION.v0.1`, `UMG_REPOSITORY_CONTRACT.v0.1`  
**Feeds into:** future capability registry policy, future tool-binding schema, Envoy resolver policy, RuntimeSpec capability status, Relation Matrix capability lines, future toolpack artifacts  

---

## 1. Summary

UMG sleeves may declare the capabilities they need.

Toolpacks provide one or more capabilities.

Envoy validates the declared requirements against known capability/toolpack information and carries the status forward into preview, compile-prep, RuntimeSpec, trace, and relation-matrix surfaces.

OpenClaw remains the final execution and permission gate.

Core rule:

```text
Sleeves declare.
Toolpacks provide.
Envoy validates.
OpenClaw gates execution.
```

This document exists to define that contract before any capability artifacts, toolpack artifacts, resolver logic, schema patches, or runtime behavior changes are made.

---

## 2. Separation Principle

The UMG tool model must remain explicitly layered.

### Sleeve
A sleeve is the declaration layer.

A sleeve may say:
- what runtime services it expects
- what capabilities it requires
- what toolpacks it prefers or allows
- what strictness posture applies to activation

A sleeve does **not** execute tools.

### Capability
A capability is a named permission or functional requirement.

Examples:
- `CAP.ARTIFACT.RESOLVE`
- `CAP.IR.BUILD`
- `CAP.COMPILER.COMPILE`
- `CAP.TRACE.EMIT`
- `CAP.MATRIX.EMIT`

A capability names what must be possible.
It is not itself the executing thing.

### Toolpack
A toolpack is a provider package.

A toolpack provides one or more capability IDs and describes:
- tools
- bindings
- permissions
- runtime constraints
- compatibility
- safety posture

A toolpack is the concrete provider layer.

### Tool binding
A tool binding is the concrete executable mapping between:
- declared capability
- selected provider toolpack
- callable OpenClaw or runtime surface
- permission state
- execution policy

### Envoy
Envoy is the validation, resolution, and runtime-spec layer.

Envoy may:
- collect declarations
- preview capability state
- resolve provider candidates
- record missing requirements
- carry capability state into RuntimeSpec / trace / relation matrix

Envoy does **not** gain blanket permission to execute anything merely because a sleeve declares a capability.

### OpenClaw
OpenClaw is the execution and permission gate.

OpenClaw decides whether a concrete tool invocation is allowed according to:
- available tool surface
- safety rules
- runtime permission posture
- human approval requirements
- environment policy

Core rule repeated:

```text
Sleeves declare.
Toolpacks provide.
Envoy validates.
OpenClaw gates execution.
```

---

## 3. Current Hybrid State

The current UMG ecosystem is in a hybrid state.

Current tension:
- sleeve/neostack/neoblock schemas currently treat capabilities as string declarations
- sleeve schemas currently treat toolpacks as string declarations
- `toolpack.schema.json` already exists and clearly describes toolpacks as concrete executable provider artifacts
- `artifact.identity.schema.json` already includes `capability` and `toolpack` artifact types
- the Envoy resolver already attempts concrete artifact lookup for `CAP.*`
- the Envoy resolver also defines a concrete path model for `toolpack`
- the concrete capability/toolpack artifact lane is not fully populated in the active Block Library surface

This means the system currently mixes two ideas:

```text
capabilities as declarations
and
capabilities/toolpacks as resolvable artifacts
```

That hybrid state explains why read-only preview can honestly report missing `CAP.*` artifacts even when the sleeve itself is not necessarily malformed.

---

## 4. Capability Model Decision

### Preferred decision: hybrid staged model

The preferred model is a staged hybrid model.

Decision:
- `CAP.*` may exist first as logical IDs
- `CAP.*` may later have optional registry artifacts
- capability declaration remains valid even if a concrete capability registry artifact does not yet exist
- capability registry artifacts are useful for visibility, doctrine, provenance, and future runtime/status reporting, but are not required for early declaration legitimacy

Implications:
- a sleeve may declare `CAP.*` before a registry artifact is authored
- a preview may treat undeclared/unknown capability IDs as unresolved metadata, but should not automatically treat them as proof of malformed sleeve structure
- concrete provider validation should happen primarily at the toolpack/binding stage

Recommended preview posture:
- missing `CAP.*` registry artifact in preview = warning-level unless policy explicitly requires concrete registry presence

Recommended activation posture:
- missing required provider binding for a required capability = activation/runtime block

In short:

```text
Capability = requirement first
Registry artifact = optional structured metadata first, potentially required later by policy
```

---

## 5. Toolpack Model Decision

Toolpack model decision:
- a toolpack is a concrete artifact
- a toolpack provides one or more `CAP.*` IDs
- a toolpack should declare tools, bindings, permissions, runtime constraints, compatibility, and safety notes

Minimum conceptual toolpack shape:
- identity
- provenance
- toolpack metadata
- provided capabilities
- tools
- bindings
- permissions
- compatibility
- runtime constraints
- safety notes

Toolpack decision rule:

```text
Capability names need.
Toolpack provides executable supply.
```

A sleeve may prefer or allow a toolpack, but the sleeve still does not execute it.

---

## 6. Canonical Path Options

This document compares path options but does not implement any of them.

### Option 1
```text
AI/TOOLPACKS/<TP_ID>.json
AI/CAPABILITIES/<CAP_ID>.json
```

Pros:
- short and simple
- easy resolver mapping
- flat artifact lookup

Cons:
- weak support for multi-file toolpack packages
- awkward fit for `toolpack.json`-style package layout
- capability and toolpack lanes become visually inconsistent with other package-shaped artifacts

### Option 2
```text
AI/CAPABILITIES/toolpacks/<TP_ID>/toolpack.json
AI/CAPABILITIES/registry/<CAP_ID>.json
```

Pros:
- keeps capability and toolpack concerns in one umbrella lane
- matches existing doctrine that treats toolpacks as capability-provider artifacts
- supports package-shaped toolpacks cleanly
- supports future README/examples/tests beside toolpack manifest
- makes `registry` vs `provider` distinction explicit

Cons:
- deeper path shape
- requires resolver path update later
- not yet aligned with current Envoy preview path assumptions

### Option 3
```text
AI/TOOLS/toolpacks/<TP_ID>/toolpack.json
AI/TOOLS/capabilities/<CAP_ID>.json
```

Pros:
- makes execution/tooling intent visually obvious
- separates tool runtime lane from semantic library lanes

Cons:
- shifts away from current doctrine emphasis on capabilities as part of the UMG declaration layer
- risks conflating execution surface with declaration surface too early
- weaker continuity with existing `AI/CAPABILITIES/` references in doctrine

### Recommended canonical path

Recommended decision-stage path:

```text
AI/CAPABILITIES/toolpacks/<TP_ID>/toolpack.json
AI/CAPABILITIES/registry/<CAP_ID>.json
```

Reason:
- it preserves the distinction between capability declaration and concrete provider package
- it matches the already documented idea that toolpacks are executable capability providers
- it supports future multi-file toolpack packages cleanly
- it gives capability registry artifacts a clear non-provider lane

Important boundary:
- this is a **decision-stage recommendation only**
- it is **not implemented by this document**

---

## 7. Resolver Policy Recommendation

Future Envoy behavior should separate preview-time declaration handling from activation-time execution gating.

### Preview mode
Preview mode should:
- accept capability declarations as valid declaration-layer content
- classify missing `CAP.*` registry artifacts as warnings when capabilities are declaration-only
- report missing `TP.*` provider artifacts distinctly from missing `CAP.*` registry metadata
- avoid treating every undeclared capability registry file as malformed sleeve structure by default

### Compile-prep mode
Compile-prep mode should:
- carry declared required capabilities forward
- carry declared preferred/allowed toolpacks forward
- record capability state clearly
- avoid direct tool execution
- avoid implicit provider assumption

### Activation/runtime mode
Activation/runtime mode should:
- require provider binding for required capabilities
- require toolpack/provider validation before execution
- block execution if required provider binding is absent
- block execution if policy/permission validation fails

### Provider-blocking rule
Recommended rule:

```text
missing required capability provider blocks execution/activation
missing capability registry metadata does not necessarily block preview
```

### No direct sleeve execution rule
No sleeve should directly execute tools.

The sleeve may:
- declare capability need
- express preferred provider intent
- request strictness posture

The sleeve may not:
- bypass binding
- bypass permissions
- bypass OpenClaw tool gating

---

## 8. Runtime State Model

Capability/tool execution state should be modeled explicitly.

Recommended states:
- `declared`
- `unresolved`
- `registry_known`
- `provider_available`
- `binding_validated`
- `permission_granted`
- `executable`

Meaning:

### declared
The capability is named by sleeve/neostack/neoblock/runtime declaration.

### unresolved
No registry entry or provider binding is currently confirmed.

### registry_known
A capability registry entry exists and the capability is known/documented.

### provider_available
At least one candidate toolpack/provider declares that it can satisfy the capability.

### binding_validated
Envoy selected or validated a concrete provider binding.

### permission_granted
OpenClaw/runtime policy has allowed the relevant execution surface.

### executable
The capability is both bound and permission-gated for actual runtime use.

State progression example:

```text
declared
  -> registry_known
  -> provider_available
  -> binding_validated
  -> permission_granted
  -> executable
```

A capability may remain:
- declared but unresolved
- declared and registry-known but with no provider
- provider-available but not permission-granted

This separation is intentional.

---

## 9. Security Boundary

The security boundary must stay explicit.

Rules:
- no tool executes from sleeve text alone
- capability declaration is not permission
- toolpack presence is not permission
- Envoy validation is not execution permission
- OpenClaw must gate actual execution
- dangerous actions require explicit bindings and runtime approval

Security principle:

```text
Declaration is not authority.
Presence is not approval.
Binding is not permission.
Execution requires runtime gate approval.
```

A dangerous or high-risk tool must never become executable solely because:
- a sleeve asked for it
- a toolpack exists on disk
- a capability name appears in RuntimeSpec

---

## 10. Required Future Artifacts

The following artifacts are future work and are **not created by this document**:

- `capability.schema.json`
- `tool-binding.schema.json`
- capability registry docs
- `TP.UMG.CORE_RUNTIME.v1` toolpack artifact
- optional `CAP.*` registry artifacts
- resolver/path implementation updates aligned to the final path decision
- runtime capability-status projection refinements

Potential future examples:
- `AI/CAPABILITIES/registry/CAP.ARTIFACT.RESOLVE.json`
- `AI/CAPABILITIES/registry/CAP.IR.BUILD.json`
- `AI/CAPABILITIES/toolpacks/TP.UMG.CORE_RUNTIME.v1/toolpack.json`

These are future implementation targets, not current outputs.

---

## 11. Impact on TEST-3 / TEST-4

### TEST-3 impact
TEST-3 showed missing `CAP.*` refs in local read-only preview.

This document interprets that result as:
- a maturity gap in the capability/toolpack registry lane
- not automatic proof that the sleeve is malformed

### TEST-4 impact
TEST-4 classified the current state as hybrid.

This document accepts that classification and turns it into policy:
- capability declarations remain valid as declarations
- toolpacks are the preferred concrete provider artifacts
- concrete capability registry artifacts are optional in early stages, though useful and likely desirable later

### Resolver interpretation
This means the current resolver is ahead of content population.

That is not inherently wrong.
It just means preview-time diagnostics should eventually distinguish between:
- declaration exists
- registry metadata missing
- provider missing
- binding unavailable
- execution blocked

---

## 12. No-Implementation Boundary

This document does **not**:
- create capability artifact files
- create toolpack artifact files
- patch `sleeve.json`
- patch schemas
- patch Envoy resolver behavior
- modify plugin code
- modify compiler code
- approve tool execution
- approve external compiler bridge execution
- approve sleeve workflow execution
- approve BL-6 structural normalization

This is a doctrine and decision document only.

It defines the intended contract before implementation.

---

## 13. Decision Summary

The preferred v0.1 doctrine is:

```text
Sleeves declare needed capabilities.
Capabilities name required ability.
Toolpacks provide concrete executable capability supply.
Envoy validates declarations and provider state.
OpenClaw gates actual execution.
```

Short-form policy:

```text
Capability = requirement first
Toolpack = provider artifact
Binding = executable mapping
Execution = gated runtime act
```

Recommended next implementation planning stage after approval:
- define capability registry artifact shape
- define tool-binding artifact/schema shape
- decide canonical path implementation
- adjust Envoy preview vs activation diagnostics accordingly
