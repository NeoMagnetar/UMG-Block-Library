# TOOL-RUNTIME-25 — Public Envoy v0.2.9 Surface Correction Plan

## Purpose

This phase defines a precise, non-destructive plan for narrowing the next public ClawHub `umg-envoy-agent` package so that the public artifact no longer ships the compiled process-execution bridge surface that triggered `suspicious.dangerous_exec` review.

This phase is planning only.
It does not patch code, split packages, stage a release mutation, or authorize publish.

## Current confirmed facts

### Public artifact under review
- package: `umg-envoy-agent`
- version: `0.2.8`
- public artifact hash: `9DAF3A2E469B1E9FCE0E385327F71349B6C15877577A6D19D5172D6D4242B530`

### ClawHub status
- external reputation verdict: `stale`
- static analysis verdict: `Review`
- static analysis reason: `suspicious.dangerous_exec`

### Flagged evidence
- `dist/compiler/compiler-process.js:25`
- `const child = spawn(invocation.command, invocation.args, {`

### Audit-confirmed public artifact surface
- full compiler repo does not appear to ship
- compiled compiler bridge runner does ship
- `node:child_process` import ships
- `spawn(...)` ships
- plugin entry reaches `compiler-process` through `compiler-bridge`
- `openclaw.plugin.json` exposes `umg_envoy_compile_ir_bridge`
- `dist/plugin-entry.js` registers `umg_envoy_compile_ir_bridge`
- bridge is default-disabled by config, but still present in the public artifact surface

## Core distinction
- Desktop Bridge is not part of public Envoy
- PhaseBridge is not part of public Envoy
- full compiler repo is not part of public Envoy
- compiled Envoy compiler process runner is currently part of public Envoy v0.2.8
- that compiled process runner is the surface to correct

---

# Running Step Tracker

## Step 1 — Confirm actual public artifact surface
**Status:** complete

Confirmed public v0.2.8 ships:
- `dist/compiler/compiler-process.js`
- `dist/compiler/compiler-bridge.js`
- `dist/compiler/relation-matrix-emitter.js`
- `node:child_process` import
- `spawn(...)` execution primitive
- plugin tool exposure for `umg_envoy_compile_ir_bridge`
- plugin registration for the bridge tool in `dist/plugin-entry.js`

Confirmed public v0.2.8 does not appear to ship:
- the full compiler repo
- Desktop Bridge
- PhaseBridge

## Step 2 — Define public Envoy keep/remove boundary
**Status:** planned in this phase

### Public Envoy keep boundary
The public package should keep:
- bundled public content
- bundled-adapter compilation path
- sleeve/block listing tools
- runtime validation tools
- path parse / validate / render / build tools
- status / matrix status tools that do not invoke external process execution
- docs / security / governance / public variant notes

### Public Envoy remove boundary
The public package should stop shipping or exposing:
- compiled external compiler process runner
- `dist/compiler/compiler-process.js`
- `dist/compiler/compiler-bridge.js`
- `dist/compiler/relation-matrix-emitter.js` if it depends on bridge execution
- public tool exposure for `umg_envoy_compile_ir_bridge`
- public tool exposure for `umg_envoy_emit_relation_matrix` if it requires bridge execution
- CLI commands `compile-ir-bridge` and `emit-relation-matrix` from the public package
- public plugin-entry registration paths that import bridge execution code

## Step 3 — Preserve dev/local bridge source
**Status:** planned in this phase

Preservation rule:
- do not delete compiler bridge source
- do not delete Desktop Bridge work
- do not delete PhaseBridge work
- do not remove dev/local bridge capability from the repo

Preservation plan:
- bridge source remains in source/dev/local lane
- public package surface is narrowed
- dev/local or advanced package surface continues to retain bridge capability for future governed use

## Step 4 — Define public-surface validation checks
**Status:** planned in this phase

A staged public-safe candidate should be checked for all of the following:
- `dist/compiler/compiler-process.js` absent from staged public artifact
- no `node:child_process` import in shipped public artifact
- no `spawn(` in shipped public artifact
- public `plugin-entry` does not import or reach compiler bridge code
- `openclaw.plugin.json` no longer exposes `umg_envoy_compile_ir_bridge`
- `openclaw.plugin.json` no longer exposes bridge-dependent relation-matrix surface if it requires external compiler execution
- public README/security posture matches actual shipped surface
- bundled-adapter default posture still works

## Step 5 — Plan v0.2.9 patch branch
**Status:** planned in this phase

Proposed patch-branch intent:
- create a public-surface-correction lane for `v0.2.9`
- limit scope to packaging/surface correction only
- do not add new runtime behavior
- do not delete bridge source from the repo
- do not widen public feature scope during correction

Expected high-level change themes once implementation is explicitly approved:
- public plugin entry stops importing/registering bridge execution surfaces
- public manifest stops exposing bridge tools
- public package file list excludes compiled bridge runner outputs
- dev/local bridge capability is preserved outside the public package surface

## Step 6 — Stage package without publishing
**Status:** planned in this phase

When implementation is explicitly approved later:
- build a non-published staged public artifact
- verify staged contents against the keep/remove boundary
- do not publish during staging
- do not overwrite historical release artifacts

## Step 7 — Validate staged package
**Status:** planned in this phase

Validation should include:
- artifact content inspection
- manifest inspection
- plugin-entry surface inspection
- scanner-sensitive string/path inspection
- README/default-posture consistency check
- confirmation that public-safe tools remain usable
- confirmation that bridge source still exists in dev/local/source lane

## Step 8 — Decide publish readiness
**Status:** not authorized now

Publish readiness should only be considered after:
- staged public artifact passes validation
- static review packet is re-checked
- ClawHub/scan posture is reviewed again
- user explicitly reviews the narrowed public surface

## Step 9 — Publish only after explicit approval
**Status:** prohibited now

Even if staged validation succeeds:
- do not publish without explicit approval
- do not infer approval from package cleanliness alone

## Step 10 — Resume sleeve/toolpack roadmap after public Envoy is clean
**Status:** future only

Once the public Envoy artifact is clean and explicitly approved:
- resume sleeve/toolpack roadmap work in the proper governed lane
- keep Desktop Bridge and PhaseBridge as future governed toolpacks, not public Envoy package contents
- keep bridge capability preserved in dev/local/advanced surfaces as applicable

---

## Recommended planning direction

Given the confirmed artifact audit, the most precise non-destructive direction is:
- preserve all bridge source and dev/local capability
- narrow the public package so the compiled process-execution runner and exposed bridge tool no longer ship in the public ClawHub artifact
- keep the public package aligned with its bundled-adapter default posture

## Final rule
Preserve the bridge.
Narrow the public artifact.
Do not publish, patch, or split until explicitly approved.
