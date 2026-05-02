# Static Analysis Dangerous Exec Review

## Observed static analysis verdict
- verdict: `Review`
- summary: Detected `suspicious.dangerous_exec`
- reason code: `suspicious.dangerous_exec`

## Hash
- `9DAF3A2E469B1E9FCE0E385327F71349B6C15877577A6D19D5172D6D4242B530`

## Package / version
- package: `umg-envoy-agent`
- version: `0.2.8`

## Flagged file and line
- `dist/compiler/compiler-process.js:25`
- observed evidence line:
  - `const child = spawn(invocation.command, invocation.args, {`

## Scanner interpretation
The static analysis engine appears to treat this process-spawn surface as a potentially dangerous execution primitive and therefore routes it to manual review under `suspicious.dangerous_exec`.

## Project interpretation
Project interpretation remains:
- scanner-sensitive but explainable
- process-spawn surfaces are expected to attract heuristic/static concern
- this is not by itself proof of malware
- current doctrine and security notes describe compiler bridge behavior as explicit/config-gated and disabled by default
- bridge work should be preserved unless concrete evidence and explicit approval support a destructive action

## Why this is scanner-sensitive
This is scanner-sensitive because:
- `spawn(...)` is an execution primitive
- static analyzers often treat process-launch capability as high-friction even before runtime context is applied
- compiler bridge and orchestration concepts can look risky when evaluated without gate/default posture

## Why this is not automatically malware
This is not automatically malware because:
- static analysis reason codes identify review surfaces, not final maliciousness conclusions
- there is no install-time execution claim in the current package posture
- no postinstall script is part of the documented posture
- bridge execution is documented as explicit/config-gated rather than passive-load behavior
- `shell:false` is preserved in the documented posture
- vendor evidence previously observed as readable did not show visible malware labels

## Current default posture
- publish remains paused
- ClawHub reputation remains stale
- static analysis issue remains under review
- bridge remains preserved
- no runtime patch or split is authorized yet

## Next available paths
### Path A — documentation / appeal
Use when ClawHub accepts a documented explanation of the bridge, gating posture, and non-install behavior.

### Path B — stronger gate patch
Use when stronger hard preconditions are needed around the bridge path, while preserving the bridge.
Requires future explicit approval before implementation.

### Path C — public-safe split
Use when the static scanner blocks the public artifact because of `child_process` / `spawn`, and a packaging split is preferable to deletion.
Requires future explicit approval before implementation.

## Final rule
This static analysis flag requires review.
It does not by itself authorize publish, deletion, or a malware conclusion.
