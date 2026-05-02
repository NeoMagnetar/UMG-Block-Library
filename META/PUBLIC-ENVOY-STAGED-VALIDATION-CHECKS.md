# Public Envoy Staged Validation Checks

Use this note if a future public-surface correction implementation is explicitly approved and a staged `v0.2.9` candidate is produced.

## Required staged checks

### Artifact content checks
- staged public artifact does not contain `dist/compiler/compiler-process.js`
- staged public artifact does not contain bridge-only compiled runner files intended for dev/local use only
- staged public artifact still contains public-safe bundled content and public docs

### Static surface checks
- no `node:child_process` import remains in the shipped public artifact
- no `spawn(` remains in the shipped public artifact
- public plugin-entry does not import bridge execution paths
- public manifest does not expose `umg_envoy_compile_ir_bridge`
- public manifest does not expose bridge-dependent relation-matrix tool if external compiler execution is required

### Consistency checks
- README/default-posture matches actual shipped public artifact surface
- security posture notes match actual shipped public artifact surface
- public package no longer overclaims or underclaims its execution boundary

### Functional public checks
- bundled-adapter default posture still works
- bundled public sleeves and block-library listing still work
- public-safe compile/validate tools still work
- status output still reflects public-safe configuration defaults

### Preservation checks
- bridge source still exists in repo/dev/local lane
- Desktop Bridge work still exists
- PhaseBridge work still exists
- no destructive deletion was used to achieve public-surface narrowing

## Final check rule
Passing these checks supports renewed review.
It does not by itself authorize publish.
