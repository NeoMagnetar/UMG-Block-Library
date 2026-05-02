# Public-Safe Split Plan

Use this note if Option C — public-safe split is ever explicitly approved.
This is a preservation-first planning document only.

## Goal
Reduce scanner friction in the public ClawHub package while preserving compiler bridge work in a separate advanced/dev/private distribution lane.

## Public ClawHub package scope
The public package should contain:
- static governance surfaces
- public-safe runtime validation surfaces
- tool/runtime doctrine and documentation
- any non-bridge behavior suitable for broad public distribution

It should exclude direct external compiler process code if that code is the main trigger for persistent static scanner blocking.

## Advanced bridge package scope
The advanced bridge package should contain:
- external compiler process orchestration surfaces
- advanced compiler bridge logic
- advanced/dev/private usage notes
- any explicitly gated integration surfaces that are inappropriate for the public artifact

## What moves
Potential move candidates:
- direct compiler process invocation logic
- bridge-specific orchestration code
- bridge-only configuration surfaces
- bridge-only diagnostic and invocation layers

## What stays
Potential stay candidates in the public package:
- doctrine
- security posture documentation
- non-bridge static/runtime governance structures
- public-safe validation or packaging layers
- any interfaces or stubs that do not expose the scanner-sensitive implementation path

## How bridge is preserved
Bridge work is preserved by relocation or extraction, not deletion.
The public-safe split must keep the bridge available in an advanced package or adjacent private/dev package rather than destroying the architecture.

## Migration notes
If a split is implemented later, migration planning should include:
- package naming decision
- dependency boundary decision
- user/operator documentation update
- compatibility note for existing consumers
- explicit statement that bridge removal did not occur; packaging scope changed instead

## Naming options
Example naming patterns to consider later:
- `umg-envoy-agent` + `umg-envoy-agent-bridge`
- `umg-envoy-agent-public` + `umg-envoy-agent-advanced`
- `umg-envoy-agent` + scoped advanced companion package

These are examples only, not approved names.

## Release implications
A split may improve public scanner posture, but it adds release and maintenance complexity.
It should only be pursued if documentation/appeal and stronger gate framing are insufficient.

## Scanner impact
Expected scanner impact may be stronger than Option B if the public artifact no longer contains the direct process-spawn implementation path.
However, this should be treated as a packaging decision, not proof that the preserved bridge was malicious.

## Boundary
This note does not authorize a split.
It defines a preservation-first option for later explicit review.
