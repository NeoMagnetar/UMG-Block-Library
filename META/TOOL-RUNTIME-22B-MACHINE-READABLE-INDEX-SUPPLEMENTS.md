# TOOL-RUNTIME-22B — Machine-Readable Index Supplements

## Purpose

TOOL-RUNTIME-22B adds machine-readable supplements to the human-readable TOOL-RUNTIME-22 index and phase rollup.
It does not replace those files.
It adds agent-readable, matrix-mapped, status-oriented, and security-focused JSON reference surfaces.

## Files created

- `AI/EXAMPLES/governance/tool-runtime-static-governance-index.example.json`
- `AI/EXAMPLES/governance/tool-runtime-phase-matrix.example.json`
- `AI/EXAMPLES/governance/tool-runtime-status-snapshot.example.json`
- `AI/EXAMPLES/governance/tool-runtime-security-constraints-snapshot.example.json`

## Supplement scope

### Static governance index example
Provides a machine-readable mirror of the TOOL-RUNTIME-22 master index, including:
- governing doctrine
- preserved rules
- security context
- artifact-family map
- review entry points
- stack identity
- next safe phase

### Phase matrix example
Provides a machine-readable phase-to-family and phase-to-output mapping for TOOL-RUNTIME-1 through TOOL-RUNTIME-21.
This is intended for agent/navigation use and not as runtime authority.

### Status snapshot example
Provides a concise current-state snapshot of:
- stack posture
- allowed/disallowed state
- maturity posture
- security posture
- review posture
- next-phase recommendation

### Security constraints snapshot example
Provides a compact machine-readable carry-forward of the active Envoy v0.2.8 triage constraints and the governance interpretation rules they enforce.

## Boundary preserved

TOOL-RUNTIME-22B remains static-only.
It does not:
- execute tools
- invoke providers
- run Desktop Bridge
- run PhaseBridge
- run compiler bridge
- implement runtime behavior
- implement resolver logic
- implement a harness
- implement dashboard UI
- grant approvals
- publish packages
- alter release artifacts
- remove compiler bridge code

## Security boundary preserved

Envoy v0.2.8 ClawHub/VirusTotal triage remains active.
These supplements preserve:
- no v0.2.9 publish
- no compiler bridge removal
- no release artifact mutation
- no compiler bridge run
- no assumption that local package hash equals ClawHub hash
- scanner/security remediation remains documentation/triage work only unless explicitly authorized later

## Relationship to TOOL-RUNTIME-22

TOOL-RUNTIME-22 remains the primary human-readable index and phase rollup.
TOOL-RUNTIME-22B is a supplement layer for machine-readable navigation and governance-state packaging.

## Recommended next phase

A safe next phase is still:

### TOOL-RUNTIME-23 — Checklist-to-Packet Crosswalks + Audience Review Bundle Manifests

Potential static-only deliverables:
- checklist-to-packet crosswalk examples
- packet-to-decision traceability examples
- audience review bundle manifest examples
- prohibited-interpretation crosswalk examples
- security-triage companion review notes
