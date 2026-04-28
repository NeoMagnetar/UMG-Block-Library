# SLV.UMG.CORE_REFERENCE.v1

This is the pure UMG core reference sleeve.

Purpose:
- prove the UMG architecture itself first
- remain domain-neutral
- declare the minimal reference configuration for the UMG spine
- support canonical progression:
  - Library -> Sleeve -> IR -> Compiler -> RuntimeSpec + Trace -> Envoy -> Relation Matrix -> Capability Status

This sleeve is not a domain-specific pilot.

UO/ServUO is not the foundation proof.
UO/ServUO remains a later applied pilot only.

## Current posture

This sleeve is declarative.
It does not execute tools.
It declares required capabilities and preferred toolpack intent only.

## Planned primary references

- `NS.UMG.CORE.COMPILER_FLOW.v1`
- `OVR.GOV.UMG.ROUTE_CONTROLLER.v1`
- `CAP.ARTIFACT.RESOLVE`
- `CAP.IR.BUILD`
- `CAP.COMPILER.COMPILE`
- `CAP.TRACE.EMIT`
- `CAP.MATRIX.EMIT`

## Stage note

This Stage 3 sleeve is created before full Stage 4 object authoring.
Some referenced artifacts are intentionally forward-declared as the next canonical objects to author.
