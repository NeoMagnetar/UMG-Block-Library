# UMG Tool Runtime Architecture v0.1

**Document ID:** `UMG_TOOL_RUNTIME_ARCHITECTURE.v0.1`  
**Status:** Design-stage doctrine  
**Layer:** Runtime tool orchestration / capability registry / toolpack provider / execution-mode policy  
**Depends on:** `UMG_TOOL_CONTRACT.v0.1`, `UMG_TOOLPACK_CAPABILITY_CONTRACT.v0.1`, `UMG_SLEEVE_PACK_CONTRACT.v0.1`, `UMG_ENVOY_RUNTIME_INTEGRATION.v0.1`  
**Feeds into:** future capability registry artifacts, future tool-binding schema, future toolpack artifacts, Envoy resolver preview support, controlled dry-run validation, business sleeve runtime policy  

---

## 1. Summary

This document defines the first implementation-ready architecture for UMG sleeves that can safely declare and orchestrate real OpenClaw tools such as Desktop Bridge and PhaseBridge.

The governing rule remains:

```text
Sleeves declare.
Toolpacks provide.
Envoy validates.
OpenClaw gates execution.
```

This architecture is designed to make real tool orchestration possible without collapsing the separation between:
- declarative sleeve intent
- provider/tool availability
- binding validation
- runtime approval
- actual execution

This document does **not** approve tool execution.
It defines the architecture required before execution can be allowed safely.

---

## 2. Current Tool Contract Baseline

The current accepted Tool Contract baseline is:

- sleeves declare capability needs
- toolpacks provide concrete executable provider packages
- Envoy validates declaration and provider state
- OpenClaw remains the final execution and permission gate

Current known runtime surfaces relevant to this architecture include:

### OpenClaw Desktop Bridge
Loaded plugin surface includes tools such as:
- `desktop_list_windows`
- `desktop_focus_window`
- `desktop_click_xy`
- `desktop_type_text`
- `desktop_press_keys`
- `desktop_capture_screen`
- `desktop_ocr_image`
- `desktop_focus_capture_ocr`

Observed boundary signals:
- side-effect tools may be gated by `allowSideEffectTools`
- window matching can be required
- allowed target window titles can be constrained

### OpenClaw PhaseBridge
Loaded plugin surface provides a phased execution bridge with ledger-driven state.

Observed boundary signals:
- relay is configurable and disabled by default through `allowRelay: false`
- execution is organized through ledger/control transitions rather than hidden ad hoc actions

These real plugin surfaces provide enough grounding to define a concrete capability/toolpack runtime model.

---

## 3. Proposed Capability Registry

The first CAP set for real OpenClaw orchestration should be explicit, narrow, and safety-aware.

### CAP.DESKTOP.UI.READ
- **description:** Inspect visible desktop UI state through screenshot capture, OCR, or focused read-only window inspection.
- **risk level:** medium
- **allowed modes:** `preview`, `dry_run`, `assisted`, `approved_execute`
- **requires human approval?:** no for read-only use; yes if policy elevates for sensitive windows
- **provided by:** `TP.OPENCLAW.DESKTOP_BRIDGE.v1`
- **blocked by default?:** no, but bounded by configured plugin/window constraints

### CAP.DESKTOP.UI.CLICK
- **description:** Perform a bounded mouse click against an allowed desktop target.
- **risk level:** high
- **allowed modes:** `assisted`, `approved_execute`
- **requires human approval?:** yes
- **provided by:** `TP.OPENCLAW.DESKTOP_BRIDGE.v1`
- **blocked by default?:** yes

### CAP.DESKTOP.UI.TYPE
- **description:** Type text or send keystroke content into an allowed desktop target.
- **risk level:** high
- **allowed modes:** `assisted`, `approved_execute`
- **requires human approval?:** yes
- **provided by:** `TP.OPENCLAW.DESKTOP_BRIDGE.v1`
- **blocked by default?:** yes

### CAP.DESKTOP.APP.LAUNCH
- **description:** Launch or foreground a target desktop application or window context needed by a workflow.
- **risk level:** high
- **allowed modes:** `assisted`, `approved_execute`
- **requires human approval?:** yes
- **provided by:** `TP.OPENCLAW.DESKTOP_BRIDGE.v1`
- **blocked by default?:** yes

### CAP.DESKTOP.WINDOW.INSPECT
- **description:** Enumerate windows, match target windows, and inspect target availability without mutating UI state.
- **risk level:** low
- **allowed modes:** `preview`, `dry_run`, `assisted`, `approved_execute`
- **requires human approval?:** no
- **provided by:** `TP.OPENCLAW.DESKTOP_BRIDGE.v1`
- **blocked by default?:** no

### CAP.PHASE.RUN
- **description:** Advance a PhaseBridge ledger through controlled orchestration transitions.
- **risk level:** high
- **allowed modes:** `dry_run`, `assisted`, `approved_execute`
- **requires human approval?:** yes
- **provided by:** `TP.OPENCLAW.PHASEBRIDGE.v1`
- **blocked by default?:** yes

### CAP.PHASE.STATUS
- **description:** Inspect current PhaseBridge ledger state, legal next step, validation state, or stop reason.
- **risk level:** low
- **allowed modes:** `preview`, `dry_run`, `assisted`, `approved_execute`
- **requires human approval?:** no
- **provided by:** `TP.OPENCLAW.PHASEBRIDGE.v1`
- **blocked by default?:** no

### CAP.FILE.READ
- **description:** Read local files required for workflow preview, planning, or validation.
- **risk level:** low
- **allowed modes:** `preview`, `dry_run`, `assisted`, `approved_execute`
- **requires human approval?:** no
- **provided by:** `TP.UMG.CORE_RUNTIME.v1`
- **blocked by default?:** no

### CAP.FILE.WRITE_CONTROLLED
- **description:** Write or patch files only within an explicitly bounded and audited scope.
- **risk level:** high
- **allowed modes:** `dry_run`, `assisted`, `approved_execute`
- **requires human approval?:** yes
- **provided by:** `TP.UMG.CORE_RUNTIME.v1`
- **blocked by default?:** yes

### CAP.APP.WORKFLOW.PREVIEW
- **description:** Preview workflow state, phase sequence, target application preconditions, and likely action plan without execution.
- **risk level:** low
- **allowed modes:** `preview`, `dry_run`, `assisted`, `approved_execute`
- **requires human approval?:** no
- **provided by:** `TP.UMG.CORE_RUNTIME.v1`
- **blocked by default?:** no

### CAP.APP.WORKFLOW.EXECUTE_APPROVED
- **description:** Execute a previously previewed and approved multi-step application workflow under explicit runtime gating.
- **risk level:** critical
- **allowed modes:** `approved_execute`
- **requires human approval?:** yes
- **provided by:** `TP.UMG.CORE_RUNTIME.v1`
- **blocked by default?:** yes

---

## 4. Proposed Toolpacks

### TP.OPENCLAW.DESKTOP_BRIDGE.v1

**identity**
- provider package for Windows desktop inspection and bounded UI interaction

**provided capabilities**
- `CAP.DESKTOP.UI.READ`
- `CAP.DESKTOP.UI.CLICK`
- `CAP.DESKTOP.UI.TYPE`
- `CAP.DESKTOP.APP.LAUNCH`
- `CAP.DESKTOP.WINDOW.INSPECT`

**tool bindings**
- `desktop_list_windows` -> `CAP.DESKTOP.WINDOW.INSPECT`
- `desktop_focus_window` -> `CAP.DESKTOP.APP.LAUNCH` and `CAP.DESKTOP.WINDOW.INSPECT`
- `desktop_capture_screen` -> `CAP.DESKTOP.UI.READ`
- `desktop_ocr_image` -> `CAP.DESKTOP.UI.READ`
- `desktop_focus_capture_ocr` -> `CAP.DESKTOP.UI.READ` and `CAP.DESKTOP.WINDOW.INSPECT`
- `desktop_click_xy` -> `CAP.DESKTOP.UI.CLICK`
- `desktop_type_text` -> `CAP.DESKTOP.UI.TYPE`
- `desktop_press_keys` -> `CAP.DESKTOP.UI.TYPE`

**permission requirements**
- allowed target window constraint
- optional human approval for side-effect tools
- audit requirement for all side-effect actions

**execution modes**
- read/inspect tools: `preview`, `dry_run`, `assisted`, `approved_execute`
- side-effect tools: `assisted`, `approved_execute`

**safety notes**
- side-effect tools should remain blocked unless plugin-side config and sleeve/runtime policy both allow them
- window matching should be treated as a required guard, not a convenience
- direct coordinate actions should be preceded by target verification in approved modes

**diagnostics emitted**
- window target missing
- target window not allowed
- side-effect tool blocked by policy
- human approval missing
- OCR/read success or failure summary

### TP.OPENCLAW.PHASEBRIDGE.v1

**identity**
- provider package for local-first phased execution using visible ledger state

**provided capabilities**
- `CAP.PHASE.RUN`
- `CAP.PHASE.STATUS`
- `CAP.APP.WORKFLOW.PREVIEW`

**tool bindings**
- `phasebridge_validate` -> `CAP.PHASE.STATUS`
- `phasebridge_select_next_step` -> `CAP.PHASE.STATUS`
- `phasebridge_resume` -> `CAP.PHASE.RUN`
- `phasebridge_runner` -> `CAP.PHASE.RUN`
- `phasebridge_stop` -> `CAP.PHASE.RUN`
- `phasebridge_relay_to_chatgpt` -> `CAP.APP.WORKFLOW.EXECUTE_APPROVED` and `CAP.PHASE.RUN`

**permission requirements**
- ledger-root scope constraint
- relay disabled unless explicitly allowed by runtime and plugin config
- human approval for resume/runner/relay actions

**execution modes**
- status tools: `preview`, `dry_run`, `assisted`, `approved_execute`
- phase transition tools: `dry_run`, `assisted`, `approved_execute`
- relay tools: `approved_execute` only

**safety notes**
- read-only ledger inspection should be distinct from state transition
- relay remains opt-in and high-risk
- phase transitions should be audit-logged with explicit stop/reason tracking

**diagnostics emitted**
- invalid ledger
- illegal next step
- stop reason present
- relay blocked by policy
- approval missing

### TP.UMG.CORE_RUNTIME.v1

**identity**
- meta-provider package for common UMG runtime orchestration, preview, file safety, and approval-state handling

**provided capabilities**
- `CAP.FILE.READ`
- `CAP.FILE.WRITE_CONTROLLED`
- `CAP.APP.WORKFLOW.PREVIEW`
- `CAP.APP.WORKFLOW.EXECUTE_APPROVED`

**tool bindings**
- no single direct external tool requirement
- acts as the orchestration/runtime policy toolpack that binds UMG runtime decisions to available OpenClaw provider surfaces

**permission requirements**
- workspace/path scoping
- explicit execution mode validation
- explicit approval-state validation for write/execute actions

**execution modes**
- preview-only orchestration allowed in `preview`
- dry-run assembly allowed in `dry_run`
- write/execute paths only allowed in `assisted` or `approved_execute` when all subordinate provider rules pass

**safety notes**
- this toolpack should never silently widen authority beyond the underlying provider toolpacks
- it should aggregate provider/tool policy, not override it
- it is the preferred place to express workflow-level audit and rollback requirements

**diagnostics emitted**
- missing provider capability
- incompatible execution mode
- missing approval token/state
- blocked workflow transition
- audit requirement missing

---

## 5. Tool Binding Manifest Design

A future tool-binding manifest should use a shape like:

```yaml
capability_id:
tool_provider:
openclaw_tool_id:
allowed_modes:
input_schema:
output_schema:
approval_required:
dry_run_supported:
audit_log_required:
failure_policy:
```

Expanded conceptual shape:

```yaml
capability_id: CAP.DESKTOP.UI.CLICK
tool_provider: TP.OPENCLAW.DESKTOP_BRIDGE.v1
openclaw_tool_id: desktop_click_xy
allowed_modes:
  - assisted
  - approved_execute
input_schema: schemas/desktop_click_xy.input.schema.json
output_schema: schemas/desktop_click_xy.output.schema.json
approval_required: true
dry_run_supported: false
audit_log_required: true
failure_policy: fail_closed
```

Recommended additional optional fields:
- `preconditions`
- `target_constraints`
- `plugin_config_dependencies`
- `human_confirmation_prompt`
- `trace_events`
- `risk_level`
- `side_effect_level`

Failure policy values should include:
- `fail_closed`
- `warn_and_skip_optional`
- `defer_to_human`
- `stop_workflow`

---

## 6. Sleeve Declaration Pattern

A sleeve should declare tool/runtime needs without becoming the executor.

Recommended declaration pattern:

```yaml
capabilities:
  required:
    - CAP.FILE.READ
    - CAP.APP.WORKFLOW.PREVIEW
  optional:
    - CAP.DESKTOP.UI.READ
    - CAP.PHASE.STATUS

toolpacks:
  preferred:
    - TP.UMG.CORE_RUNTIME.v1
    - TP.OPENCLAW.DESKTOP_BRIDGE.v1
  allowed:
    - TP.OPENCLAW.PHASEBRIDGE.v1

execution:
  mode: preview
  approval_mode: explicit_runtime_gate
  blocked_tools:
    - desktop_click_xy
    - desktop_type_text
    - phasebridge_runner
  audit:
    required: true
    trace_level: summary
    retain_bindings: true
```

Recommended sleeve tool declaration fields:
- required capabilities
- optional capabilities
- preferred toolpacks
- allowed toolpacks
- execution mode
- approval mode
- blocked tools
- audit requirements
- rollback/manual override expectation
- target environment assumptions

Key rule:
- sleeve declarations express requirement and policy intent
- provider/tool selection and permission gating happen later

---

## 7. Execution Mode Model

The first execution-mode model should be explicit and simple.

### preview
- no tool execution
- declaration validation only
- provider availability preview
- workflow and target-state preview
- capability gaps reported

### dry_run
- no side-effect tool execution
- may run read-only inspection if policy permits
- may produce compiler-prep, binding-prep, or workflow-plan objects
- should simulate approval and failure paths without acting

### assisted
- human stays in the loop
- side-effect tools may be proposed one step at a time
- each high-risk action requires explicit approval
- useful for desktop and phase-ledger workflows

### approved_execute
- runtime has explicit approval to execute a bounded workflow
- only approved bindings/capabilities are active
- audit logging required
- rollback/manual override path required for business sleeves

### blocked
- execution prohibited
- used when capability/provider/approval/policy preconditions fail

Mode ordering:

```text
preview -> dry_run -> assisted -> approved_execute
```

No workflow should jump to execution without passing through a validation/approval boundary.

---

## 8. Business Custom Sleeve Pattern

A client-specific or business-specific sleeve should be built as a constrained runtime policy package, not as a bag of direct commands.

Recommended components:

### business profile
- business name
- workflow domain
- operator roles
- trust boundary
- acceptable automation level

### software inventory
- target apps
- target windows
- target ledgers/workspaces
- plugin dependencies
- supported host constraints

### available OpenClaw tools
- desktop bridge surfaces allowed
- phasebridge surfaces allowed
- file/path scopes allowed
- tools explicitly disallowed

### approved capabilities
- baseline required capabilities
- optional capabilities by workflow phase
- blocked-by-default high-risk capabilities

### workflow phases
- intake
- precondition inspection
- dry-run preview
- assisted execution
- approval checkpoint
- post-run verification
- rollback/manual handoff

### safety constraints
- no hidden execution
- no cross-app context drift without approval
- no high-risk desktop actions outside allowed windows
- no relay or external handoff unless business policy allows it

### rollback/manual override
- stop condition
- human takeover path
- rollback notes
- safe abort behavior

### audit trail
- who approved
- what mode ran
- what bindings were active
- what tools were called
- what failed or was skipped
- what outputs or ledger states changed

Business sleeves should behave like operational playbooks with executable gating, not like unbounded macros.

---

## 9. Example Non-Executing Artifacts

These are examples only. They do not authorize runtime execution.

### Example desktop bridge toolpack

```yaml
identity:
  id: TP.OPENCLAW.DESKTOP_BRIDGE.v1
  artifact_type: toolpack
  name: OpenClaw Desktop Bridge Toolpack
provided_capabilities:
  - CAP.DESKTOP.UI.READ
  - CAP.DESKTOP.UI.CLICK
  - CAP.DESKTOP.UI.TYPE
  - CAP.DESKTOP.APP.LAUNCH
  - CAP.DESKTOP.WINDOW.INSPECT
tools:
  - tool_id: desktop_list_windows
    capability_ids: [CAP.DESKTOP.WINDOW.INSPECT]
    safe_mode: read_only
  - tool_id: desktop_focus_capture_ocr
    capability_ids: [CAP.DESKTOP.UI.READ, CAP.DESKTOP.WINDOW.INSPECT]
    safe_mode: read_only
  - tool_id: desktop_click_xy
    capability_ids: [CAP.DESKTOP.UI.CLICK]
    safe_mode: interactive
    approval_required: true
runtime_constraints:
  blocked_by_default:
    - desktop_click_xy
    - desktop_type_text
    - desktop_press_keys
```

### Example phasebridge toolpack

```yaml
identity:
  id: TP.OPENCLAW.PHASEBRIDGE.v1
  artifact_type: toolpack
  name: OpenClaw PhaseBridge Toolpack
provided_capabilities:
  - CAP.PHASE.RUN
  - CAP.PHASE.STATUS
  - CAP.APP.WORKFLOW.PREVIEW
tools:
  - tool_id: phasebridge_validate
    capability_ids: [CAP.PHASE.STATUS]
    safe_mode: read_only
  - tool_id: phasebridge_select_next_step
    capability_ids: [CAP.PHASE.STATUS]
    safe_mode: read_only
  - tool_id: phasebridge_resume
    capability_ids: [CAP.PHASE.RUN]
    safe_mode: interactive
    approval_required: true
  - tool_id: phasebridge_relay_to_chatgpt
    capability_ids: [CAP.APP.WORKFLOW.EXECUTE_APPROVED]
    safe_mode: privileged
    approval_required: true
runtime_constraints:
  relay_default: blocked
```

### Example business sleeve skeleton

```yaml
identity:
  id: SLV.BUSINESS.DESKTOP_PHASE_WORKFLOW.v1
  artifact_type: sleeve
sleeve:
  name: Business Desktop Phase Workflow Sleeve
  status: staged
  version: 1.0.0
  category: framework_specific
  capabilities:
    required:
      - CAP.FILE.READ
      - CAP.APP.WORKFLOW.PREVIEW
      - CAP.PHASE.STATUS
    optional:
      - CAP.DESKTOP.UI.READ
      - CAP.DESKTOP.WINDOW.INSPECT
  toolpacks:
    preferred:
      - TP.UMG.CORE_RUNTIME.v1
      - TP.OPENCLAW.PHASEBRIDGE.v1
    allowed:
      - TP.OPENCLAW.DESKTOP_BRIDGE.v1
  runtime:
    services:
      - trace
      - relation_matrix
      - approval_gate
  activation:
    default_mode: preview
    strict_capabilities: true
  execution:
    approval_mode: explicit_runtime_gate
    blocked_tools:
      - desktop_click_xy
      - desktop_type_text
      - phasebridge_runner
    audit:
      required: true
      trace_level: summary
```

---

## 10. Implementation Roadmap

### Phase 1 — design docs
- finalize runtime architecture doctrine
- finalize capability/toolpack model for real OpenClaw tools
- finalize execution mode model

### Phase 2 — schema draft
- draft `capability.schema.json`
- draft `tool-binding.schema.json`
- refine toolpack schema fields for OpenClaw runtime bindings
- draft sleeve execution/tool policy extension shape

### Phase 3 — sample artifacts
- create sample capability registry artifacts
- create sample toolpack artifacts
- create example non-business and business sleeve skeletons
- keep all samples non-executing at first

### Phase 4 — resolver preview support
- teach Envoy preview to classify CAP registry vs TP provider vs binding state distinctly
- keep preview non-executing
- emit runtime state model values

### Phase 5 — dry-run validation
- allow read-only binding and workflow-plan previews
- validate plugin config dependencies
- validate blocked-by-default policy behavior

### Phase 6 — controlled local execution
- enable narrow approved tool execution for a small trusted sample sleeve
- require audit logging and explicit approval
- keep desktop side effects and phase transitions constrained

### Phase 7 — business pilot sleeve
- design a client-specific sleeve with software inventory, approval model, rollback, and audit trail
- start in preview and assisted modes only
- move to approved execution only after real operator review

---

## 11. Risks / Open Questions

Key risks:
- capability declarations being mistaken for approval
- meta-toolpack (`TP.UMG.CORE_RUNTIME.v1`) silently broadening authority beyond provider toolpacks
- desktop coordinate actions being too brittle without stronger target constraints
- relay-style phasebridge actions crossing the line from orchestration into unsafe automation without enough review
- business sleeves becoming hidden automation scripts instead of auditable operational policies

Open questions:
- should `CAP.DESKTOP.APP.LAUNCH` remain separate from window focus/inspect, or be narrowed further?
- should `CAP.FILE.WRITE_CONTROLLED` live in the core runtime toolpack or a separate filesystem provider toolpack?
- how should approval state be represented in RuntimeSpec and relation matrices?
- should PhaseBridge relay remain modeled under `CAP.APP.WORKFLOW.EXECUTE_APPROVED` only, or also under a dedicated relay capability?
- how should rollback semantics be standardized for non-file side effects such as desktop interactions?

---

## 12. No-Implementation Boundary

This document does **not**:
- execute tools
- run desktop bridge actions
- run phasebridge actions
- create live business sleeves
- patch Envoy resolver
- modify plugin code
- modify compiler code
- publish to ClawHub
- move folders
- perform BL-6 structural normalization

This is a design-stage doctrine only.
