# TOOL-RUNTIME-1 Architecture Notes

## Purpose
This note condenses the first implementation-ready runtime architecture decisions for UMG sleeves that will eventually orchestrate real OpenClaw tools.

It is a companion summary to:
- `AI/DOCTRINE/UMG_TOOL_RUNTIME_ARCHITECTURE.v0.1.md`

## Core rule

```text
Sleeves declare.
Toolpacks provide.
Envoy validates.
OpenClaw gates execution.
```

## Initial real-tool capability set
- `CAP.DESKTOP.UI.READ`
- `CAP.DESKTOP.UI.CLICK`
- `CAP.DESKTOP.UI.TYPE`
- `CAP.DESKTOP.APP.LAUNCH`
- `CAP.DESKTOP.WINDOW.INSPECT`
- `CAP.PHASE.RUN`
- `CAP.PHASE.STATUS`
- `CAP.FILE.READ`
- `CAP.FILE.WRITE_CONTROLLED`
- `CAP.APP.WORKFLOW.PREVIEW`
- `CAP.APP.WORKFLOW.EXECUTE_APPROVED`

## Initial toolpacks
- `TP.OPENCLAW.DESKTOP_BRIDGE.v1`
- `TP.OPENCLAW.PHASEBRIDGE.v1`
- `TP.UMG.CORE_RUNTIME.v1`

## First execution modes
- `preview`
- `dry_run`
- `assisted`
- `approved_execute`
- `blocked`

## First design boundary
No capability declaration is permission.
No toolpack presence is permission.
No sleeve executes tools directly.

## Immediate next planning outputs
- capability registry shape
- tool-binding manifest/schema shape
- sample toolpack artifacts
- sample non-executing business sleeve skeleton
- resolver preview state differentiation

## Not approved by this note
- live tool execution
- desktop bridge side effects
- phasebridge execution
- schema implementation changes
- resolver implementation changes
- business pilot sleeve execution
