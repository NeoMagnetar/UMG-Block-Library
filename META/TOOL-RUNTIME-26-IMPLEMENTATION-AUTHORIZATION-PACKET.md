# TOOL-RUNTIME-26 — Public Surface Correction Implementation Authorization Packet

## Purpose

This packet is the final pre-implementation authorization layer for the `v0.2.9` public Envoy surface correction.
Its role is to make the next implementation lane precise, narrow, reversible, and non-destructive.

This phase authorizes nothing by itself.
It prepares the next agent to implement safely once explicit user approval is given.

## Current implementation target

The public ClawHub `umg-envoy-agent` package should stop shipping local process-execution bridge code in the public artifact.

Specifically, the next public artifact should be:
- bundled-adapter only
- public UMG sleeve/content inspection
- validation
- diagnostics
- safe runtime output checks
- no `child_process`
- no `spawn`
- no Desktop Bridge
- no PhaseBridge
- no external compiler process bridge

At the same time, dev/local/project-internal capability should preserve:
- compiler bridge source
- compiler-process source
- advanced external compiler bridge workflow
- future Desktop Bridge work
- future PhaseBridge work
- Tool Runtime governance architecture

---

# Step Tracker

## Step 1 — Confirm actual public artifact surface
**Status:** complete before this phase

Confirmed shipped surfaces in public `v0.2.8` include:
- `dist/compiler/compiler-process.js`
- `node:child_process`
- `spawn(...)`
- `dist/compiler/compiler-bridge.js`
- plugin-entry bridge reachability
- tool exposure for `umg_envoy_compile_ir_bridge`

## Step 2 — Define public Envoy keep/remove boundary
**Status:** complete before this phase

Keep/remove scope is defined in:
- `META/PUBLIC-ENVOY-KEEP-REMOVE-BOUNDARY.md`

## Step 3 — Preserve dev/local bridge source
**Status:** complete before this phase

Preservation is mandatory:
- no deletion of compiler bridge source
- no deletion of Desktop Bridge work
- no deletion of PhaseBridge work
- no removal of dev/local bridge capability from the repo

## Step 4 — Define public-surface validation checks
**Status:** complete before this phase

Validation target is defined in:
- `META/PUBLIC-ENVOY-STAGED-VALIDATION-CHECKS.md`

## Step 5 — Plan v0.2.9 patch branch
**Status:** implementation-ready in this phase

### Authorized branch intent (if later approved)
Create a narrow patch branch for public-surface correction only.

### Branch scope
Allowed scope on the future implementation branch:
- public package surface narrowing
- public plugin entry narrowing
- public manifest/tool exposure narrowing
- public package file-list narrowing
- public README/security note correction if needed for consistency

Not allowed on the future implementation branch without separate approval:
- new runtime features
- widened public tool surface
- bridge deletion
- Desktop Bridge work changes
- PhaseBridge work changes
- release publication

### Suggested branch label
- `fix/public-envoy-surface-v0.2.9`

## Step 6 — Stage package without publishing
**Status:** exact execution sequence defined in this phase

### Staging goal
Produce a non-published staged `v0.2.9` candidate for inspection only.

### Suggested staging lane
- create a fresh patch work lane from the authorized branch
- build/stage a package candidate in a non-release staging path
- keep historical `v0.2.8` artifacts untouched

### Expected staging outputs
- staged package folder
- staged packed artifact
- staged manifest snapshot
- staged plugin-entry inspection snapshot
- staged validation report

## Step 7 — Validate staged package
**Status:** exact validation sequence defined in this phase

Validation must include:
- package content inspection
- manifest inspection
- plugin-entry import/path inspection
- scanner-sensitive string search
- public README/security posture review
- public-safe bundled-adapter smoke path review
- preservation confirmation for bridge source outside the public artifact

## Step 8 — Decide publish readiness
**Status:** not authorized in this phase

Readiness may only be reviewed after:
- staged package passes validation
- staged package matches keep/remove boundary
- scan/review posture is reconsidered
- user explicitly reviews the result

## Step 9 — Publish only after explicit approval
**Status:** prohibited in this phase

This packet does not authorize publish.
Even a validated staged candidate must not be published without explicit approval.

## Step 10 — Resume sleeve/toolpack roadmap after public Envoy is clean
**Status:** future only

Once the public Envoy package is clean and explicitly approved later:
- resume sleeve/toolpack roadmap
- preserve Desktop Bridge and PhaseBridge as future governed toolpacks
- continue Tool Runtime architecture work in the proper governed lane

---

## Exact implementation targets for the next agent

If implementation is explicitly approved after this packet, the next agent should inspect and correct at least these surfaces:

### Public plugin entry targets
- `dist/plugin-entry.js` equivalent source/build path
- remove public bridge-tool registration surfaces
- remove bridge-dependent CLI command exposure from the public package

### Public manifest targets
- `openclaw.plugin.json`
- remove `umg_envoy_compile_ir_bridge`
- remove bridge-dependent relation-matrix tool if it requires external compiler execution
- keep public-safe tools only

### Public compiled artifact targets
- exclude `dist/compiler/compiler-process.js`
- exclude `dist/compiler/compiler-bridge.js`
- exclude bridge-dependent `relation-matrix-emitter.js` if it requires the external compiler bridge
- exclude any remaining public-shipped process-execution path

### Public documentation targets
- `README.md`
- `SECURITY.md`
- any public variant notes that describe public package scope
- ensure shipped docs match shipped artifact reality

### Preservation targets
- bridge source remains somewhere preserved in repo/dev/local lane
- no bridge source deletion
- no Desktop Bridge deletion
- no PhaseBridge deletion

## Exact validation commands to prepare for later execution

These are defined as future validation commands for the next explicitly approved implementation lane.
They are not to be executed by this phase.

### Static package content checks
- list staged package contents recursively
- verify absence of `dist/compiler/compiler-process.js`
- verify absence of `dist/compiler/compiler-bridge.js`
- verify absence of bridge-dependent public runner files

### String/path checks
- search staged public artifact for `node:child_process`
- search staged public artifact for `spawn(`
- search staged public artifact for `umg_envoy_compile_ir_bridge`
- search staged public artifact for `compile-ir-bridge`

### Manifest checks
- inspect staged `openclaw.plugin.json`
- verify public tool list no longer exposes external bridge tool surfaces

### Public behavior checks
- review bundled-adapter default posture
- review public-safe compile/validate/status/listing tools
- verify docs/security notes match actual surface

### Preservation checks
- verify bridge source still exists outside the public artifact lane
- verify no destructive deletion occurred

## Suggested rollback plan

If the future implementation lane produces an unsatisfactory staged result:
- discard the patch work lane or revert the narrow public-surface corrections
- retain all preserved bridge source/dev/local capability
- keep public `v0.2.8` historical artifacts untouched
- return to the current paused review posture

Rollback should restore public-surface planning state, not delete preserved bridge architecture.

## No-publish gate

The following remain hard blockers in this phase and in the next implementation lane unless explicitly lifted later:
- no publish `v0.2.9`
- no release tagging
- no mutation of existing `v0.2.8` release artifacts
- no claim ClawHub cleared the package
- no claim package is ready to publish
- no inference that a clean staged artifact equals publication approval

## Final rule

This packet prepares implementation.
It does not authorize implementation.
It does not authorize publish.
Preserve the bridge.
Narrow the public artifact only after explicit approval.
