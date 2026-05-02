# SECURITY.md

## Security posture summary

This package is under active review for scanner-sensitive surfaces associated with process-spawn and file-write functionality.
That review should be interpreted carefully.
Scanner-sensitive does not automatically mean malicious.

Current standing interpretation:
- no install-time execution
- no postinstall script
- no bundled `node_modules`
- no bundled private keys
- no bundled credentials
- no bundled `.env` files
- no bundled token files
- runtime writes disabled by default
- compiler bridge disabled by default
- relation matrix emit disabled by default
- compiler bridge requires explicit configuration
- `spawn` uses `shell:false`
- scanner-sensitive strings are documented
- bridge behavior is explicit and config-gated
- the package does not execute compiler bridge during install or passive load

## Install and passive-load behavior

The package is documented to avoid install-time and passive-load execution behavior.
Specifically:
- no install-time execution is expected
- no postinstall script is expected
- compiler bridge behavior is not executed during install
- compiler bridge behavior is not executed during passive load
- scanner-sensitive process or file behaviors are not justification by themselves for a malicious interpretation

## Sensitive-file packaging expectations

This package should not be interpreted as bundling operational secrets or local environment baggage.
The expected package posture is:
- no bundled `node_modules`
- no bundled private keys
- no bundled credentials
- no bundled `.env` files
- no bundled token files

## Runtime and bridge gating posture

High-friction or scanner-sensitive runtime behaviors are expected to remain explicitly bounded.
Current intended posture:
- runtime writes disabled by default
- compiler bridge disabled by default
- relation matrix emit disabled by default
- compiler bridge requires explicit configuration
- bridge behavior is explicit and config-gated
- process spawn uses `shell:false`

These statements describe intended security posture for review and triage communication.
They do not by themselves authorize runtime execution or package publication.

## Scanner-sensitive strings and heuristics

Certain strings and APIs may attract heuristic scanner attention, including process-spawn and file-write surfaces.
That is why:
- scanner-sensitive strings are documented
- bridge behavior is explained explicitly
- configuration gates are part of the review posture
- scanner-sensitive does not automatically mean malicious

## Review boundary

This `SECURITY.md` supports ClawHub / VirusTotal / reviewer communication.
It does not:
- publish a package
- mutate release artifacts beyond this documentation file
- authorize runtime execution
- authorize compiler bridge execution
- collapse local package identity into ClawHub-scanned artifact identity
