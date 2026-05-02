# ClawHub Refresh Request Packet

## Purpose

This packet is prepared for support-facing use to request refresh or requeue of ClawHub / VirusTotal reputation analysis for the ClawHub-scanned `umg-envoy-agent` v0.2.8 artifact.

## Package name
- `umg-envoy-agent`

## Package version
- `0.2.8`

## ClawHub SHA-256
- `9DAF3A2E469B1E9FCE0E385327F71349B6C15877577A6D19D5172D6D4242B530`

## Local hash distinction
- known supporting local hash: `BA93BB6873BFECE60F8198ABFFEBB9FED54E68B82B47D2E74605865EA0F22639`
- the local hash is supporting evidence only
- it is **not** byte-identical proof of the ClawHub-scanned artifact
- local and ClawHub-scanned artifact identities must remain distinct in review and reporting

## Package inspection summary
Current review interpretation is:
- scanner-sensitive but explainable
- likely heuristic concern around `child_process`, `spawn`, and `fs.writeFileSync`-adjacent surfaces
- no current evidence of hidden install-time malware behavior
- no postinstall script expected
- runtime writes are documented as disabled by default
- compiler bridge is documented as disabled by default
- relation matrix emit is documented as disabled by default
- bridge behavior is explicit/config-gated
- package does not execute compiler bridge during install or passive load

## Scanner-sensitive surface explanation
Supporting explanation should be read with:
- `SECURITY.md`
- `META/SCANNER-SENSITIVE-SURFACE-EXPLANATION.md`

Key explanation points:
- `child_process` and `spawn` often attract heuristic concern because they can be used for command execution
- `writeFileSync` often attracts heuristic concern because file-write behavior can resemble persistence or payload staging patterns
- in this project, those surfaces are interpreted as bounded/tooling-related and not by themselves proof of malicious behavior
- bridge behavior is documented as explicit and configuration-gated rather than install-triggered or passive-load-triggered

## Refresh / requeue request
Please refresh or requeue the ClawHub / VirusTotal reputation analysis for the ClawHub-scanned `umg-envoy-agent` v0.2.8 artifact.

Requested review posture:
- distinguish generic/noisy heuristic detections from concrete malicious findings
- preserve the explicit identity distinction between the ClawHub-scanned artifact and the local supporting artifact
- review the supporting package-security posture documented in `SECURITY.md`

## Boundary statement
This packet does not claim the package is cleared.
It does not authorize publication.
It does not authorize deletion of compiler bridge work.
It requests evidence refresh only.
