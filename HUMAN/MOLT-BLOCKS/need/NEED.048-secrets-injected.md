# NEED.048 - Secrets injected

**Type:** NEED
**Category:** CONFIGURATION_STATE
**Group Description:** What must be true about configuration and settings before a system can operate correctly.
**Status:** active

## Definition
Credentials, keys, and tokens must be securely available to the process before it runs.

## When to use
What must be true about configuration and settings before a system can operate correctly.

## Examples
- vault secrets must be fetched before service start
- TLS keys must be mounted before HTTPS listener
- signing key must be available before token issuance

## Tags
- need
- configuration_state
- secrets-injected
