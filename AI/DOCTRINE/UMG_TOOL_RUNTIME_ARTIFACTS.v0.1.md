# UMG Tool Runtime Artifacts v0.1

**Document ID:** `UMG_TOOL_RUNTIME_ARTIFACTS.v0.1`  
**Status:** Static artifact design stage  
**Layer:** Capability manifest / toolpack manifest / binding manifest / business sleeve runtime template / governance scaffolding  
**Depends on:** `UMG_TOOL_CONTRACT.v0.1`, `UMG_TOOL_RUNTIME_ARCHITECTURE.v0.1`, `UMG_TOOLPACK_CAPABILITY_CONTRACT.v0.1`, `UMG_SLEEVE_PACK_CONTRACT.v0.1`  
**Feeds into:** TOOL-RUNTIME-2B schema drafting, TOOL-RUNTIME-3 resolver preview state model, future non-executing sample artifacts  

---

## 1. Summary

This document converts the approved runtime architecture into implementation-neutral static artifact structures.

These artifacts are:
- non-executing
- preview-safe
- resolver-ready
- governance-first
- implementation-neutral

They are intended to lock:
- structure
- governance
- provider logic
- approval logic
- auditability

without enabling:
- live execution
- implicit permissions
- runtime authority widening
- plugin/compiler mutation

Core rule remains:

```text
Sleeves declare.
Toolpacks provide.
Envoy validates.
OpenClaw gates execution.
```

---

## 2. Capability Manifest Model

Capability manifests should be treated as static registry metadata, not as executable authority.

Recommended top-level shape:

```json
{
  "identity": {},
  "provenance": {},
  "capability": {
    "name": "",
    "description": "",
    "status": "active",
    "category": "framework_specific",
    "risk_level": "",
    "blocked_by_default": true,
    "requires_human_approval": false,
    "allowed_modes": [],
    "provided_by_toolpacks": [],
    "side_effect_level": "",
    "trust_tier": "",
    "audit_required": true,
    "execution_notes": null,
    "diagnostics": []
  },
  "metadata": null
}
```

### Static capability manifests

#### CAP.DESKTOP.UI.READ
```json
{
  "identity": {
    "artifact_id": "CAP.DESKTOP.UI.READ.v1",
    "artifact_type": "capability",
    "version": "1.0.0"
  },
  "capability": {
    "name": "Desktop UI Read",
    "description": "Read visible desktop UI state through capture, OCR, or focused read-only inspection.",
    "status": "active",
    "category": "framework_specific",
    "risk_level": "medium",
    "blocked_by_default": false,
    "requires_human_approval": false,
    "allowed_modes": ["preview", "dry_run", "assisted", "approved_execute"],
    "provided_by_toolpacks": ["TP.OPENCLAW.DESKTOP_BRIDGE.v1"],
    "side_effect_level": "read_only",
    "trust_tier": "trusted_local_read",
    "audit_required": true,
    "execution_notes": "May be elevated by tenant policy for sensitive windows.",
    "diagnostics": ["target_window_missing", "ocr_failed", "capture_failed"]
  }
}
```

#### CAP.DESKTOP.UI.CLICK
```json
{
  "identity": {
    "artifact_id": "CAP.DESKTOP.UI.CLICK.v1",
    "artifact_type": "capability",
    "version": "1.0.0"
  },
  "capability": {
    "name": "Desktop UI Click",
    "description": "Perform a bounded click against an allowed desktop target.",
    "status": "active",
    "category": "framework_specific",
    "risk_level": "high",
    "blocked_by_default": true,
    "requires_human_approval": true,
    "allowed_modes": ["assisted", "approved_execute"],
    "provided_by_toolpacks": ["TP.OPENCLAW.DESKTOP_BRIDGE.v1"],
    "side_effect_level": "interactive",
    "trust_tier": "trusted_local_interactive",
    "audit_required": true,
    "execution_notes": "Must require target constraints and explicit approval.",
    "diagnostics": ["target_window_not_allowed", "approval_missing", "coordinate_out_of_bounds"]
  }
}
```

#### CAP.DESKTOP.UI.TYPE
```json
{
  "identity": {
    "artifact_id": "CAP.DESKTOP.UI.TYPE.v1",
    "artifact_type": "capability",
    "version": "1.0.0"
  },
  "capability": {
    "name": "Desktop UI Type",
    "description": "Type text or send bounded key input into an allowed desktop target.",
    "status": "active",
    "category": "framework_specific",
    "risk_level": "high",
    "blocked_by_default": true,
    "requires_human_approval": true,
    "allowed_modes": ["assisted", "approved_execute"],
    "provided_by_toolpacks": ["TP.OPENCLAW.DESKTOP_BRIDGE.v1"],
    "side_effect_level": "interactive",
    "trust_tier": "trusted_local_interactive",
    "audit_required": true,
    "execution_notes": "Should be blocked for sensitive fields unless tenant policy explicitly permits.",
    "diagnostics": ["target_window_not_allowed", "approval_missing", "text_blocked_by_policy"]
  }
}
```

#### CAP.DESKTOP.APP.LAUNCH
```json
{
  "identity": {
    "artifact_id": "CAP.DESKTOP.APP.LAUNCH.v1",
    "artifact_type": "capability",
    "version": "1.0.0"
  },
  "capability": {
    "name": "Desktop App Launch",
    "description": "Launch or foreground a bounded target application/window context.",
    "status": "active",
    "category": "framework_specific",
    "risk_level": "high",
    "blocked_by_default": true,
    "requires_human_approval": true,
    "allowed_modes": ["assisted", "approved_execute"],
    "provided_by_toolpacks": ["TP.OPENCLAW.DESKTOP_BRIDGE.v1"],
    "side_effect_level": "interactive",
    "trust_tier": "trusted_local_interactive",
    "audit_required": true,
    "execution_notes": "Target app constraints should be validated before launch/focus actions.",
    "diagnostics": ["target_app_not_found", "target_window_not_allowed", "approval_missing"]
  }
}
```

#### CAP.DESKTOP.WINDOW.INSPECT
```json
{
  "identity": {
    "artifact_id": "CAP.DESKTOP.WINDOW.INSPECT.v1",
    "artifact_type": "capability",
    "version": "1.0.0"
  },
  "capability": {
    "name": "Desktop Window Inspect",
    "description": "Enumerate and inspect candidate windows without mutating UI state.",
    "status": "active",
    "category": "framework_specific",
    "risk_level": "low",
    "blocked_by_default": false,
    "requires_human_approval": false,
    "allowed_modes": ["preview", "dry_run", "assisted", "approved_execute"],
    "provided_by_toolpacks": ["TP.OPENCLAW.DESKTOP_BRIDGE.v1"],
    "side_effect_level": "read_only",
    "trust_tier": "trusted_local_read",
    "audit_required": true,
    "execution_notes": "Read-only capability used to establish preconditions for guarded desktop actions.",
    "diagnostics": ["window_not_found", "window_match_ambiguous"]
  }
}
```

#### CAP.PHASE.RUN
```json
{
  "identity": {
    "artifact_id": "CAP.PHASE.RUN.v1",
    "artifact_type": "capability",
    "version": "1.0.0"
  },
  "capability": {
    "name": "Phase Run",
    "description": "Advance a PhaseBridge ledger through controlled execution transitions.",
    "status": "active",
    "category": "framework_specific",
    "risk_level": "high",
    "blocked_by_default": true,
    "requires_human_approval": true,
    "allowed_modes": ["dry_run", "assisted", "approved_execute"],
    "provided_by_toolpacks": ["TP.OPENCLAW.PHASEBRIDGE.v1"],
    "side_effect_level": "workflow_state_change",
    "trust_tier": "trusted_local_workflow",
    "audit_required": true,
    "execution_notes": "Ledger validation and legal-next-step checks should precede any transition.",
    "diagnostics": ["invalid_ledger", "illegal_next_step", "approval_missing"]
  }
}
```

#### CAP.PHASE.STATUS
```json
{
  "identity": {
    "artifact_id": "CAP.PHASE.STATUS.v1",
    "artifact_type": "capability",
    "version": "1.0.0"
  },
  "capability": {
    "name": "Phase Status",
    "description": "Inspect PhaseBridge ledger status, stop reason, and legal next-step state.",
    "status": "active",
    "category": "framework_specific",
    "risk_level": "low",
    "blocked_by_default": false,
    "requires_human_approval": false,
    "allowed_modes": ["preview", "dry_run", "assisted", "approved_execute"],
    "provided_by_toolpacks": ["TP.OPENCLAW.PHASEBRIDGE.v1"],
    "side_effect_level": "read_only",
    "trust_tier": "trusted_local_read",
    "audit_required": true,
    "execution_notes": "Status inspection is read-only and should be available before any run decision.",
    "diagnostics": ["invalid_ledger", "status_unavailable"]
  }
}
```

#### CAP.PHASE.RELAY
```json
{
  "identity": {
    "artifact_id": "CAP.PHASE.RELAY.v1",
    "artifact_type": "capability",
    "version": "1.0.0"
  },
  "capability": {
    "name": "Phase Relay",
    "description": "Relay a validated PhaseBridge step into an external target window or human handoff surface.",
    "status": "active",
    "category": "framework_specific",
    "risk_level": "critical",
    "blocked_by_default": true,
    "requires_human_approval": true,
    "allowed_modes": ["approved_execute"],
    "provided_by_toolpacks": ["TP.OPENCLAW.PHASEBRIDGE.v1"],
    "side_effect_level": "privileged_handoff",
    "trust_tier": "trusted_local_privileged",
    "audit_required": true,
    "execution_notes": "Relay remains disabled by default and should require explicit runtime and plugin-level allowance.",
    "diagnostics": ["relay_disabled", "approval_missing", "target_window_not_allowed"]
  }
}
```

#### CAP.FILE.READ
```json
{
  "identity": {
    "artifact_id": "CAP.FILE.READ.v1",
    "artifact_type": "capability",
    "version": "1.0.0"
  },
  "capability": {
    "name": "File Read",
    "description": "Read local files required for preview, planning, validation, or runtime preparation.",
    "status": "active",
    "category": "framework_specific",
    "risk_level": "low",
    "blocked_by_default": false,
    "requires_human_approval": false,
    "allowed_modes": ["preview", "dry_run", "assisted", "approved_execute"],
    "provided_by_toolpacks": ["TP.UMG.CORE_RUNTIME.v1"],
    "side_effect_level": "read_only",
    "trust_tier": "trusted_workspace_read",
    "audit_required": true,
    "execution_notes": "Scope must remain bounded to approved library, workspace, or tenant paths.",
    "diagnostics": ["path_not_allowed", "file_not_found"]
  }
}
```

#### CAP.FILE.WRITE_CONTROLLED
```json
{
  "identity": {
    "artifact_id": "CAP.FILE.WRITE_CONTROLLED.v1",
    "artifact_type": "capability",
    "version": "1.0.0"
  },
  "capability": {
    "name": "File Write Controlled",
    "description": "Write or patch files only within an explicitly bounded, audited, and approved scope.",
    "status": "active",
    "category": "framework_specific",
    "risk_level": "high",
    "blocked_by_default": true,
    "requires_human_approval": true,
    "allowed_modes": ["dry_run", "assisted", "approved_execute"],
    "provided_by_toolpacks": ["TP.UMG.CORE_RUNTIME.v1"],
    "side_effect_level": "bounded_write",
    "trust_tier": "trusted_workspace_write",
    "audit_required": true,
    "execution_notes": "Write scope should be path-bounded and rollback-aware.",
    "diagnostics": ["path_not_allowed", "approval_missing", "rollback_plan_missing"]
  }
}
```

#### CAP.APP.WORKFLOW.PREVIEW
```json
{
  "identity": {
    "artifact_id": "CAP.APP.WORKFLOW.PREVIEW.v1",
    "artifact_type": "capability",
    "version": "1.0.0"
  },
  "capability": {
    "name": "App Workflow Preview",
    "description": "Preview multi-step workflow state, preconditions, and action plan without execution.",
    "status": "active",
    "category": "framework_specific",
    "risk_level": "low",
    "blocked_by_default": false,
    "requires_human_approval": false,
    "allowed_modes": ["preview", "dry_run", "assisted", "approved_execute"],
    "provided_by_toolpacks": ["TP.UMG.CORE_RUNTIME.v1", "TP.OPENCLAW.PHASEBRIDGE.v1"],
    "side_effect_level": "read_only",
    "trust_tier": "trusted_workflow_read",
    "audit_required": true,
    "execution_notes": "Preview is the mandatory precursor to any approved execution flow.",
    "diagnostics": ["precondition_failed", "provider_missing", "mode_not_allowed"]
  }
}
```

#### CAP.APP.WORKFLOW.EXECUTE_APPROVED
```json
{
  "identity": {
    "artifact_id": "CAP.APP.WORKFLOW.EXECUTE_APPROVED.v1",
    "artifact_type": "capability",
    "version": "1.0.0"
  },
  "capability": {
    "name": "App Workflow Execute Approved",
    "description": "Execute a previously previewed and approved bounded application workflow.",
    "status": "active",
    "category": "framework_specific",
    "risk_level": "critical",
    "blocked_by_default": true,
    "requires_human_approval": true,
    "allowed_modes": ["approved_execute"],
    "provided_by_toolpacks": ["TP.UMG.CORE_RUNTIME.v1"],
    "side_effect_level": "privileged_execution",
    "trust_tier": "trusted_workflow_privileged",
    "audit_required": true,
    "execution_notes": "Requires approved bindings, approval token, audit policy, and rollback/manual override posture.",
    "diagnostics": ["approval_missing", "binding_unvalidated", "audit_policy_missing", "rollback_plan_missing"]
  }
}
```

---

## 3. Toolpack Manifest Model

Toolpack manifests remain concrete provider artifacts but still non-executing in this stage.

Recommended top-level shape:

```json
{
  "identity": {},
  "provenance": {},
  "toolpack": {
    "name": "",
    "description": "",
    "status": "active",
    "version": "1.0.0",
    "category": "framework_specific",
    "provides_capabilities": [],
    "tools": [],
    "bindings": {},
    "permissions": {},
    "compatibility": {},
    "runtime_constraints": {},
    "diagnostics": [],
    "notes": null
  },
  "metadata": null
}
```

### TP.OPENCLAW.DESKTOP_BRIDGE.v1
```json
{
  "identity": {
    "artifact_id": "TP.OPENCLAW.DESKTOP_BRIDGE.v1",
    "artifact_type": "toolpack",
    "version": "1.0.0"
  },
  "toolpack": {
    "name": "OpenClaw Desktop Bridge Toolpack",
    "description": "Concrete provider package for bounded desktop inspection and guarded UI interaction.",
    "status": "active",
    "version": "1.0.0",
    "category": "framework_specific",
    "provides_capabilities": [
      "CAP.DESKTOP.UI.READ.v1",
      "CAP.DESKTOP.UI.CLICK.v1",
      "CAP.DESKTOP.UI.TYPE.v1",
      "CAP.DESKTOP.APP.LAUNCH.v1",
      "CAP.DESKTOP.WINDOW.INSPECT.v1"
    ],
    "tools": [
      {
        "tool_id": "desktop_list_windows",
        "surface": "openclaw",
        "description": "Enumerate visible windows.",
        "safe_mode": "read_only",
        "requires_human_approval": false
      },
      {
        "tool_id": "desktop_focus_capture_ocr",
        "surface": "openclaw",
        "description": "Focus a target window, capture, and OCR read-only state.",
        "safe_mode": "read_only",
        "requires_human_approval": false
      },
      {
        "tool_id": "desktop_click_xy",
        "surface": "openclaw",
        "description": "Perform bounded click against approved target.",
        "safe_mode": "interactive",
        "requires_human_approval": true
      },
      {
        "tool_id": "desktop_type_text",
        "surface": "openclaw",
        "description": "Perform bounded text input into approved target.",
        "safe_mode": "interactive",
        "requires_human_approval": true
      }
    ],
    "bindings": {
      "runtime_surface": "openclaw-desktop-bridge",
      "host_kinds": ["windows_local"],
      "transport_modes": ["inprocess_plugin"]
    },
    "permissions": {
      "trust_level": "developer_local",
      "required_approvals": ["human_explicit_for_side_effects"],
      "restricted_contexts": ["sensitive_windows_without_allowlist", "unmatched_target_window"]
    },
    "compatibility": {
      "runtime_profiles": ["desktop_local"],
      "plugin_versions": [">=0.0.1"],
      "schema_versions": ["0.1"]
    },
    "runtime_constraints": {
      "fail_closed": true,
      "allowed_lanes": ["preview", "dry_run", "assisted", "approved_execute"],
      "notes": "Side-effect tools remain blocked unless plugin config and runtime policy both permit them."
    },
    "diagnostics": [
      "target_window_not_allowed",
      "window_match_required",
      "allow_side_effect_tools_disabled",
      "approval_missing"
    ]
  }
}
```

### TP.OPENCLAW.PHASEBRIDGE.v1
```json
{
  "identity": {
    "artifact_id": "TP.OPENCLAW.PHASEBRIDGE.v1",
    "artifact_type": "toolpack",
    "version": "1.0.0"
  },
  "toolpack": {
    "name": "OpenClaw PhaseBridge Toolpack",
    "description": "Concrete provider package for ledger-driven phased execution and preview-safe workflow state inspection.",
    "status": "active",
    "version": "1.0.0",
    "category": "framework_specific",
    "provides_capabilities": [
      "CAP.PHASE.RUN.v1",
      "CAP.PHASE.STATUS.v1",
      "CAP.PHASE.RELAY.v1",
      "CAP.APP.WORKFLOW.PREVIEW.v1"
    ],
    "tools": [
      {
        "tool_id": "phasebridge_validate",
        "surface": "openclaw",
        "description": "Validate ledger shape and state.",
        "safe_mode": "read_only",
        "requires_human_approval": false
      },
      {
        "tool_id": "phasebridge_select_next_step",
        "surface": "openclaw",
        "description": "Inspect next legal transition.",
        "safe_mode": "read_only",
        "requires_human_approval": false
      },
      {
        "tool_id": "phasebridge_resume",
        "surface": "openclaw",
        "description": "Advance a parked ledger into the next legal state.",
        "safe_mode": "interactive",
        "requires_human_approval": true
      },
      {
        "tool_id": "phasebridge_relay_to_chatgpt",
        "surface": "openclaw",
        "description": "Relay a validated step into a target desktop window when explicitly permitted.",
        "safe_mode": "privileged",
        "requires_human_approval": true
      }
    ],
    "bindings": {
      "runtime_surface": "openclaw-phasebridge",
      "host_kinds": ["windows_local"],
      "transport_modes": ["inprocess_plugin"]
    },
    "permissions": {
      "trust_level": "developer_local",
      "required_approvals": ["human_explicit_for_phase_run", "human_explicit_for_relay"],
      "restricted_contexts": ["relay_disabled", "invalid_ledger", "illegal_transition"]
    },
    "compatibility": {
      "runtime_profiles": ["phasebridge_local"],
      "plugin_versions": [">=0.1.0"],
      "schema_versions": ["0.1"]
    },
    "runtime_constraints": {
      "fail_closed": true,
      "allowed_lanes": ["preview", "dry_run", "assisted", "approved_execute"],
      "notes": "Relay remains opt-in and blocked by default unless explicit runtime and plugin approval exists."
    },
    "diagnostics": [
      "invalid_ledger",
      "illegal_next_step",
      "relay_disabled",
      "approval_missing"
    ]
  }
}
```

### TP.UMG.CORE_RUNTIME.v1
```json
{
  "identity": {
    "artifact_id": "TP.UMG.CORE_RUNTIME.v1",
    "artifact_type": "toolpack",
    "version": "1.0.0"
  },
  "toolpack": {
    "name": "UMG Core Runtime Toolpack",
    "description": "Meta-provider package for UMG runtime policy, file safety, workflow preview, approval-state handling, and audit posture.",
    "status": "active",
    "version": "1.0.0",
    "category": "framework_specific",
    "provides_capabilities": [
      "CAP.FILE.READ.v1",
      "CAP.FILE.WRITE_CONTROLLED.v1",
      "CAP.APP.WORKFLOW.PREVIEW.v1",
      "CAP.APP.WORKFLOW.EXECUTE_APPROVED.v1"
    ],
    "tools": [
      {
        "tool_id": "runtime.binding.preview",
        "surface": "umg-runtime-meta",
        "description": "Assemble non-executing workflow and binding preview state.",
        "safe_mode": "read_only",
        "requires_human_approval": false
      },
      {
        "tool_id": "runtime.audit.validate",
        "surface": "umg-runtime-meta",
        "description": "Validate that a workflow has adequate audit policy before execution.",
        "safe_mode": "read_only",
        "requires_human_approval": false
      }
    ],
    "bindings": {
      "runtime_surface": "umg-envoy-runtime-policy",
      "host_kinds": ["local_workspace"],
      "transport_modes": ["runtime_policy"]
    },
    "permissions": {
      "trust_level": "developer_local",
      "required_approvals": ["human_explicit_for_write", "human_explicit_for_execute"],
      "restricted_contexts": ["missing_provider_binding", "audit_policy_missing", "rollback_model_missing"]
    },
    "compatibility": {
      "runtime_profiles": ["umg_preview_runtime"],
      "plugin_versions": [">=0.2.8"],
      "schema_versions": ["0.1"]
    },
    "runtime_constraints": {
      "fail_closed": true,
      "allowed_lanes": ["preview", "dry_run", "assisted", "approved_execute"],
      "notes": "This meta-provider may aggregate policy but must not widen authority beyond underlying provider toolpacks."
    },
    "diagnostics": [
      "provider_missing",
      "binding_unvalidated",
      "mode_not_allowed",
      "approval_missing",
      "audit_policy_missing"
    ]
  }
}
```

---

## 4. Tool Binding Manifest Template

Required fields:
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

Recommended template:

```json
{
  "capability_id": "CAP.DESKTOP.UI.CLICK.v1",
  "tool_provider": "TP.OPENCLAW.DESKTOP_BRIDGE.v1",
  "openclaw_tool_id": "desktop_click_xy",
  "allowed_modes": ["assisted", "approved_execute"],
  "approval_required": true,
  "audit_required": true,
  "dry_run_supported": false,
  "rollback_policy": "human_reversal_only",
  "trust_tier": "trusted_local_interactive",
  "risk_level": "high",
  "target_constraints": {
    "window_match_required": true,
    "allowlisted_window_titles": true,
    "coordinate_scope": "approved_target_only"
  },
  "failure_policy": "fail_closed",
  "notes": "Binding template only. Does not authorize execution."
}
```

Suggested rollback policy values:
- `none`
- `human_reversal_only`
- `workflow_stop_and_escalate`
- `bounded_auto_rollback`
- `ledger_state_rewind_only`

Suggested trust tier values:
- `trusted_local_read`
- `trusted_local_interactive`
- `trusted_local_workflow`
- `trusted_local_privileged`
- `trusted_workspace_read`
- `trusted_workspace_write`
- `trusted_workflow_read`
- `trusted_workflow_privileged`

---

## 5. Business Sleeve Runtime Template

A business sleeve runtime template should encode operational constraints without enabling execution.

```json
{
  "identity": {
    "artifact_id": "SLV.BUSINESS.RUNTIME_TEMPLATE.v1",
    "artifact_type": "sleeve",
    "version": "1.0.0"
  },
  "sleeve": {
    "name": "Business Runtime Template Sleeve",
    "status": "staged",
    "version": "1.0.0",
    "category": "framework_specific",
    "description": "Template for tenant-specific business workflow sleeves using governed tool runtime declarations.",
    "capabilities": {
      "required": [
        "CAP.FILE.READ.v1",
        "CAP.APP.WORKFLOW.PREVIEW.v1"
      ],
      "optional": [
        "CAP.DESKTOP.WINDOW.INSPECT.v1",
        "CAP.PHASE.STATUS.v1"
      ]
    },
    "toolpacks": {
      "preferred": [
        "TP.UMG.CORE_RUNTIME.v1"
      ],
      "allowed": [
        "TP.OPENCLAW.DESKTOP_BRIDGE.v1",
        "TP.OPENCLAW.PHASEBRIDGE.v1"
      ]
    },
    "runtime": {
      "services": [
        "trace",
        "approval_gate",
        "audit_policy",
        "tenant_scope"
      ],
      "notes": "Runtime template only. Provider binding and approval state remain unresolved until validated."
    },
    "activation": {
      "default_state": "standby",
      "strict_capabilities": true,
      "notes": "Business sleeves default to preview-safe standby posture."
    },
    "notes": "Non-executing runtime template."
  },
  "metadata": {
    "business_profile": {
      "tenant_id": "TENANT.EXAMPLE.v1",
      "business_domain": "example_domain",
      "operator_roles": ["reviewer", "approver", "operator"],
      "automation_posture": "preview_first"
    },
    "software_inventory": {
      "target_apps": ["Example App"],
      "target_windows": ["Example Window"],
      "plugin_dependencies": [
        "openclaw-desktop-bridge",
        "openclaw-phasebridge",
        "umg-envoy-agent"
      ]
    },
    "approved_capabilities": {
      "baseline": [
        "CAP.FILE.READ.v1",
        "CAP.APP.WORKFLOW.PREVIEW.v1"
      ],
      "high_risk_blocked_by_default": [
        "CAP.DESKTOP.UI.CLICK.v1",
        "CAP.DESKTOP.UI.TYPE.v1",
        "CAP.PHASE.RELAY.v1",
        "CAP.APP.WORKFLOW.EXECUTE_APPROVED.v1"
      ]
    },
    "trust_boundaries": {
      "tenant_isolation_required": true,
      "cross_tenant_execution": "forbidden",
      "window_allowlist_required": true,
      "path_scope": "tenant_workspace_only"
    },
    "approval_checkpoints": {
      "required_stages": [
        "preview_review",
        "binding_review",
        "execution_approval",
        "post_run_review"
      ],
      "approval_token_required_for_execute": true
    },
    "rollback_model": {
      "required": true,
      "default_policy": "workflow_stop_and_escalate",
      "manual_override_required": true
    },
    "audit_policy": {
      "required": true,
      "trace_level": "summary",
      "retain_bindings": true,
      "retain_approval_tokens": true,
      "retain_failure_reasons": true
    },
    "escalation_path": {
      "on_policy_failure": "human_reviewer",
      "on_runtime_block": "human_approver",
      "on_unrecoverable_error": "manual_override_owner"
    }
  }
}
```

---

## 6. Governance Extensions

### Trust registry model

Purpose:
- represent which providers, windows, paths, tenants, and workflow lanes are trusted for which modes

Example shape:

```json
{
  "registry_id": "TRUST.REGISTRY.RUNTIME.v1",
  "tenants": [
    {
      "tenant_id": "TENANT.EXAMPLE.v1",
      "allowed_toolpacks": [
        "TP.UMG.CORE_RUNTIME.v1",
        "TP.OPENCLAW.DESKTOP_BRIDGE.v1"
      ],
      "allowed_modes": ["preview", "dry_run", "assisted"],
      "blocked_capabilities": [
        "CAP.PHASE.RELAY.v1",
        "CAP.APP.WORKFLOW.EXECUTE_APPROVED.v1"
      ],
      "window_allowlist": ["Example Window"],
      "path_scope": ["C:\\TenantWorkspace\\Example"]
    }
  ]
}
```

### Approval token model

Purpose:
- represent explicit approval state without implying permanent execution authority

Example shape:

```json
{
  "approval_token_id": "APR.EXAMPLE.RUNTIME.0001",
  "tenant_id": "TENANT.EXAMPLE.v1",
  "granted_for": {
    "capability_ids": ["CAP.DESKTOP.UI.CLICK.v1"],
    "tool_provider": "TP.OPENCLAW.DESKTOP_BRIDGE.v1",
    "allowed_modes": ["approved_execute"],
    "target_constraints": {
      "window_title": "Example Window"
    }
  },
  "approval_state": "granted",
  "granted_by": "human_approver",
  "expires_at": "2026-05-01T00:00:00Z",
  "revocable": true,
  "single_use": true
}
```

### Rollback taxonomy

Purpose:
- normalize rollback expectation by capability and tool class

Suggested values:
- `none`
- `human_reversal_only`
- `state_resume_only`
- `bounded_auto_rollback`
- `workflow_stop_and_escalate`
- `manual_override_required`

Example shape:

```json
{
  "rollback_taxonomy_id": "ROLLBACK.RUNTIME.v1",
  "policies": [
    {
      "capability_id": "CAP.DESKTOP.UI.CLICK.v1",
      "rollback_policy": "human_reversal_only"
    },
    {
      "capability_id": "CAP.PHASE.RUN.v1",
      "rollback_policy": "state_resume_only"
    },
    {
      "capability_id": "CAP.APP.WORKFLOW.EXECUTE_APPROVED.v1",
      "rollback_policy": "workflow_stop_and_escalate"
    }
  ]
}
```

### Tenant isolation scaffolding

Purpose:
- prevent capability, toolpack, audit, and approval bleed across business sleeves or customers

Example shape:

```json
{
  "tenant_isolation": {
    "required": true,
    "tenant_id": "TENANT.EXAMPLE.v1",
    "workspace_scope": ["C:\\TenantWorkspace\\Example"],
    "window_allowlist": ["Example Window"],
    "ledger_scope": ["C:\\TenantWorkspace\\Example\\Ledgers"],
    "audit_namespace": "tenant.example.runtime",
    "approval_namespace": "tenant.example.approvals",
    "cross_tenant_binding": "forbidden"
  }
}
```

---

## 7. Governance Boundary

These static artifacts do **not**:
- authorize execution
- patch runtime schema
- patch resolver behavior
- create permanent approvals
- widen authority beyond explicit runtime gating

Their purpose is to make future resolver and runtime work legible and governable before any execution is enabled.

---

## 8. Next Phase

After these static structures, the next planned phases are:
- **TOOL-RUNTIME-2B:** formal schema drafting
- **TOOL-RUNTIME-3:** resolver preview state model
