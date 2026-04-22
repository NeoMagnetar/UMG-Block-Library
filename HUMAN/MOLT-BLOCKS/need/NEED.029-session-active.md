# NEED.029 - Session active

**Type:** NEED
**Category:** ACCESS_AUTHORIZATION
**Group Description:** What must be true about identity and permission before action is permitted.
**Status:** active

## Definition
A valid authenticated session must be in place and unexpired.

## When to use
What must be true about identity and permission before action is permitted.

## Examples
- OAuth session must be valid before protected call
- active user session must exist before state mutation
- compilation session must be open before CIR is written

## Tags
- need
- access_authorization
- session-active
