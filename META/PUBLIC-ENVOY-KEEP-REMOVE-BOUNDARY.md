# Public Envoy Keep / Remove Boundary

This note defines the intended public-surface boundary for the next public `umg-envoy-agent` artifact if explicit implementation approval is granted later.

## Keep in public Envoy
- bundled public content
- bundled-adapter compile path
- status tool
- compiler smoke test if it uses bundled adapter only
- bundled sleeve listing
- bundled block library listing
- bundled sleeve compile path
- runtime output validation
- sleeve comparison
- path parse / validate / render / build tools
- matrix/status tools that do not require external process execution
- docs, governance notes, and security posture notes

## Remove from public Envoy surface
- `dist/compiler/compiler-process.js`
- direct `node:child_process` import from the public artifact
- visible `spawn(` execution primitive in the public artifact
- `dist/compiler/compiler-bridge.js`
- bridge-dependent `relation-matrix-emitter.js` if it requires external compiler execution
- `umg_envoy_compile_ir_bridge`
- `umg_envoy_emit_relation_matrix` if it depends on the external compiler bridge
- CLI command `compile-ir-bridge`
- CLI command `emit-relation-matrix`
- public plugin-entry imports that reach bridge execution code

## Preserve outside the public artifact
- compiler bridge source
- dev/local bridge capability
- future governed advanced package or local package split candidate
- Desktop Bridge work
- PhaseBridge work

## Boundary rule
The goal is not to erase bridge capability from the project.
The goal is to stop shipping the compiled process-execution bridge surface in the public ClawHub artifact.
