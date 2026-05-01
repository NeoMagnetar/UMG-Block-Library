# UMG Governance Maintainer Guide

## Purpose
This guide explains how maintainers should use the governance registry before approving any normalization work in the public UMG Block Library.

## Status
- public-safe governance guidance
- maintainer-facing doctrine support document

## Authority class
- compatibility/reference

## Provenance
- direct governance guidance based on the current registry and audit work
- not a machine/runtime authority file

## Category maturity
- applies across all categories
- especially important in transitional and governance-required categories

## Navigation path
```text
CATEGORY → SLEEVE → NEOSTACK → NEOBLOCK → MOLT BLOCK
```

## Source path
- `META/UMG-GOVERNANCE-MAINTAINER-GUIDE.md`
- companion registry: [UMG Governance Registry](./UMG-GOVERNANCE-REGISTRY.md)

## Placeholder/deferred note
This guide governs decision-making. It does not itself approve structural normalization.

## How to use the governance registry
When reviewing a lane, category, or artifact family:
1. identify the lane in the governance registry
2. confirm its current authority class
3. confirm its provenance class
4. confirm whether the category is mature, transitional, placeholder, governance-required, or unresolved
5. decide whether the proposed change is docs-only or structure-affecting
6. stop and require governance approval before any structural normalization

## How to classify new lanes
Use the smallest truthful label:
- canonical source
- package-facing
- export-facing
- compatibility/reference
- transitional
- unresolved

If a lane could be read two ways, do not silently choose the stronger claim. Mark it unresolved or transitional until maintainers approve doctrine.

## How to classify categories
Use:
- mature
- transitional
- placeholder
- governance-required
- unresolved

Recommended rule:
- choose mature only when human and machine-facing structure align with low ambiguity
- choose governance-required when placement or authority is materially disputed

## How to classify provenance
Use:
- direct source-backed
- inferred
- placeholder/deferred
- compatibility/reference
- historical/non-promoted
- unresolved

Never present inferred continuity as direct source-backed doctrine.

## When normalization is allowed
Normalization is allowed only after maintainers approve:
- lane authority
- source vs export distinction
- category placement policy
- public vs compatibility posture
- any affected machine-facing consequences

## Governance approval workflow
1. audit current evidence
2. classify lane/category/provenance
3. document ambiguity
4. compare possible doctrine choices
5. record maintainer decision
6. only then authorize normalization work

## Inference restrictions
Do not:
- promote inferred continuity into canon
- move categories based only on naming intuition
- treat HUMAN explanatory strength as machine authority
- assume package-facing lanes are automatically canonical authoring lanes

## Structural safety rules
Before any structural change, confirm:
- no machine JSON changes are being smuggled into a docs pass
- no schema changes are involved
- no folder moves/renames/deletes are hidden in cleanup work
- no unresolved lane is being silently reclassified as canonical

## Backlinks
- [Governance registry](./UMG-GOVERNANCE-REGISTRY.md)
- [Content status](./CONTENT-STATUS.md)
- [README](../README.md)

## Future normalization note
Use this guide to gate BL-6 and later normalization. If doctrine is still disputed, continue hardening docs rather than restructuring lanes.

