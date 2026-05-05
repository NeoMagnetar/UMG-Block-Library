# TOOL-RUNTIME-2A Static Artifacts

## Purpose
This note records the static, non-executing artifact set for the first governed UMG tool runtime lane.

Primary doctrine:

```text
Sleeves declare.
Toolpacks provide.
Envoy validates.
OpenClaw gates execution.
```

## Capability set
- `CAP.DESKTOP.UI.READ.v1`
- `CAP.DESKTOP.UI.CLICK.v1`
- `CAP.DESKTOP.UI.TYPE.v1`
- `CAP.DESKTOP.APP.LAUNCH.v1`
- `CAP.DESKTOP.WINDOW.INSPECT.v1`
- `CAP.PHASE.RUN.v1`
- `CAP.PHASE.STATUS.v1`
- `CAP.PHASE.RELAY.v1`
- `CAP.FILE.READ.v1`
- `CAP.FILE.WRITE_CONTROLLED.v1`
- `CAP.APP.WORKFLOW.PREVIEW.v1`
- `CAP.APP.WORKFLOW.EXECUTE_APPROVED.v1`

## Toolpacks
- `TP.OPENCLAW.DESKTOP_BRIDGE.v1`
- `TP.OPENCLAW.PHASEBRIDGE.v1`
- `TP.UMG.CORE_RUNTIME.v1`

## Binding manifest required fields
- `capability_id`
- `tool_provider`
- `openclaw_tool_id`
- `allowed_modes`
- `approval_required`
- `audit_required`
- `dry_run_supported`
- `rollback_policy`
- `trust_tier`
- `risk_level`

## Business sleeve runtime template
Must include:
- business profile
- software inventory
- approved capabilities
- trust boundaries
- approval checkpoints
- rollback model
- audit policy
- escalation path

## Governance extensions
- trust registry model
- approval token model
- rollback taxonomy
- tenant isolation scaffolding

## Not approved
- tool execution
- runtime authority widening
- live business sleeves
- resolver implementation changes
- plugin/compiler changes
