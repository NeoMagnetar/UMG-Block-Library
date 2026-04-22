# NEED.093 - Circular dependencies absent

**Type:** NEED
**Category:** DEPENDENCY_RESOLUTION
**Group Description:** What must be true about dependencies before a component can function.
**Status:** active

## Definition
No dependency must ultimately require itself to function before the system is assembled.

## When to use
What must be true about dependencies before a component can function.

## Examples
- block must not reference itself as a dependency
- service must not depend on itself through a chain
- MOLT type must not require itself in its resolution

## Tags
- need
- dependency_resolution
- circular-dependencies-absent
