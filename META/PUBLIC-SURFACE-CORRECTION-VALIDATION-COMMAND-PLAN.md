# Public Surface Correction Validation Command Plan

This note defines the exact categories of validation commands the next explicitly approved implementation lane should run.
This phase does not execute them.

## 1. Package content listing
Goal:
- inspect staged public package contents recursively
- confirm excluded bridge runner files are absent

## 2. Sensitive string search
Goal:
- search staged public artifact for `node:child_process`
- search staged public artifact for `spawn(`
- search staged public artifact for `umg_envoy_compile_ir_bridge`
- search staged public artifact for `compile-ir-bridge`

## 3. Manifest inspection
Goal:
- inspect staged `openclaw.plugin.json`
- verify only public-safe tool surfaces remain exposed

## 4. Plugin-entry inspection
Goal:
- inspect staged plugin-entry artifact
- confirm no bridge-execution import path remains in public package entry

## 5. README / SECURITY consistency inspection
Goal:
- verify public docs match actual shipped artifact surface
- ensure no public docs imply bridge availability if it is no longer shipped publicly

## 6. Public-safe functional validation
Goal:
- validate bundled-adapter default posture still works
- validate public-safe status/list/compile/validate path still works
- confirm surface narrowing did not break public-safe package purpose

## 7. Preservation inspection
Goal:
- confirm bridge source still exists outside public artifact lane
- confirm no destructive deletion occurred in Desktop Bridge, PhaseBridge, or bridge source areas

## Final rule
Validation commands support review and staging.
They do not authorize publish.
