# Public Surface Correction Execution Checklist

Use this checklist only if the user explicitly authorizes the implementation lane after TOOL-RUNTIME-26.

## Branch setup
- [ ] Create narrow patch branch for public-surface correction only
- [ ] Confirm no unrelated feature work is included
- [ ] Confirm no publish step is included

## Public artifact narrowing
- [ ] Remove public bridge-tool registration from public plugin entry
- [ ] Remove public bridge CLI command exposure
- [ ] Remove bridge tool exposure from `openclaw.plugin.json`
- [ ] Exclude `dist/compiler/compiler-process.js` from staged public artifact
- [ ] Exclude `dist/compiler/compiler-bridge.js` from staged public artifact
- [ ] Exclude bridge-dependent relation-matrix runner if it requires external compiler execution

## Preservation checks during implementation
- [ ] Compiler bridge source remains preserved outside public artifact lane
- [ ] No compiler bridge source deletion occurred
- [ ] No Desktop Bridge work deletion occurred
- [ ] No PhaseBridge work deletion occurred

## Staging checks
- [ ] Stage package without publishing
- [ ] Capture staged artifact contents
- [ ] Capture staged manifest snapshot
- [ ] Capture staged plugin-entry snapshot

## Validation checks
- [ ] No `node:child_process` in staged public artifact
- [ ] No `spawn(` in staged public artifact
- [ ] No `umg_envoy_compile_ir_bridge` in staged public artifact
- [ ] No `compile-ir-bridge` public command in staged package
- [ ] Public README/security posture matches actual shipped surface
- [ ] Bundled-adapter public-safe behavior still works

## Release gates
- [ ] Validation passed
- [ ] Static review packet rechecked
- [ ] User reviewed the narrowed public surface
- [ ] Explicit publish approval exists before any publish step

## Final reminder
Passing this checklist does not itself authorize publish.
