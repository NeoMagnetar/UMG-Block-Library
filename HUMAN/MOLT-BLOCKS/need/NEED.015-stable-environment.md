# NEED.015 - Stable environment

**Type:** NEED
**Category:** SYSTEM_PREREQUISITES
**Group Description:** What must be true about infrastructure and environment before a system can operate.
**Status:** active

## Definition
The system environment must not be in a transitional, degraded, or actively failing state.

## When to use
What must be true about infrastructure and environment before a system can operate.

## Examples
- deployment must not be in progress before traffic shift
- database must not be in recovery before query
- governance pass must complete before trigger pass starts

## Tags
- need
- system_prerequisites
- stable-environment
