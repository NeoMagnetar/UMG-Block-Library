# Scanner-Sensitive Surface Explanation

## Purpose

This note explains why certain APIs and strings may attract heuristic scanner attention in `umg-envoy-agent` while still being legitimate in project context.

## Why scanners flag `child_process`

Scanners often flag `child_process` because process-launch capability can be used for command execution, downloader behavior, persistence setup, or secondary-stage automation in malicious software.
That makes it a common heuristic trigger even when used for bounded tooling.

## Why scanners flag `spawn`

Scanners often flag `spawn` because spawning external processes can resemble automation or execution chains that malware families also use.
Heuristic engines do not always distinguish legitimate developer/runtime orchestration from abuse without richer context.

## Why scanners flag `writeFileSync`

Scanners often flag `writeFileSync` or similar write surfaces because writing files can be associated with payload drops, persistence artifacts, or mutation of local state.
Again, the existence of a file-write API call is not by itself proof of malicious behavior.

## Why those surfaces are legitimate in this project

In this project, those surfaces are connected to explicit architecture and tooling concerns rather than hidden install-time execution.
The project has a documented tool/runtime lane, explicit bridge concepts, and bounded orchestration doctrine.
The current interpretation remains:
- scanner-sensitive but explainable
- no current evidence of hidden install-time malware behavior
- no justification for deleting compiler bridge work merely because scanners are noisy

## What gates currently exist

Documented/currently expected gates include:
- runtime writes disabled by default
- compiler bridge disabled by default
- relation matrix emit disabled by default
- compiler bridge requires explicit configuration
- bridge behavior is explicit/config-gated
- `spawn` uses `shell:false`
- no install-time execution
- no postinstall script
- no compiler bridge execution during install or passive load

## What future hardening may be considered

If additional future work is explicitly authorized, possible hardening directions may include:
- stronger runtime-gate return paths
- explicit external-CLI mode requirements
- explicit configured compiler path requirements
- tighter timeout requirements
- package split strategies that preserve bridge work while reducing public-package scanner friction

These are future review options, not current implementation instructions.

## Why scanner-sensitive does not automatically mean malicious

Heuristic scanners are designed to notice patterns that sometimes appear in malware.
That means they can also flag legitimate software that uses powerful primitives in bounded, transparent ways.
The correct interpretation path is:
1. inspect behavior
2. inspect install/load triggers
3. inspect gates and defaults
4. inspect identity and packaging boundaries
5. decide based on evidence

The correct interpretation path is **not**:
- assume maliciousness from a sensitive API alone
- delete architecture work to reduce optics without evidence
- treat noisy detection as conclusive proof
