# TOOL-RUNTIME-24 — Static Analysis Review

## Files created
- `META/STATIC-ANALYSIS-DANGEROUS-EXEC-REVIEW.md`
- `META/DANGEROUS-EXEC-RESOLUTION-OPTIONS.md`
- `META/COMPILER-BRIDGE-GATING-REQUIREMENTS.md`
- `META/PUBLIC-SAFE-SPLIT-PLAN.md`

## Static analysis issue
ClawHub static analysis still routes the package to review with:
- verdict: `Review`
- summary: `suspicious.dangerous_exec`
- reason code: `suspicious.dangerous_exec`
- evidence surface: `dist/compiler/compiler-process.js:25`
- observed line: `const child = spawn(invocation.command, invocation.args, {`

## Decision options
This phase defines a non-destructive decision framework:
- Option A — documentation / appeal
- Option B — stronger gate patch
- Option C — public-safe split

No option is authorized for implementation by this phase alone.

## Preservation rule
Preserve the bridge.
Do not delete compiler bridge work merely because static analysis flags a process-spawn surface for review.
A static analysis flag is a review signal, not automatic proof of malware.

## Recommended next action
The recommended next action remains documentation-first review:
- use the dangerous-exec review note to explain the flag
- use the resolution options note to choose a path only after explicit approval
- keep publish paused
- keep bridge preserved

## Security boundary preserved
This phase does not:
- publish v0.2.9
- mutate release artifacts
- remove compiler bridge code
- delete bridge work
- run compiler bridge
- invoke providers
- patch runtime code
- patch resolver code
- implement harness code
- claim ClawHub cleared the package
- assume static analysis flag equals malware
