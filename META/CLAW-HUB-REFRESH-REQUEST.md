# ClawHub Refresh / Reputation Requeue Request

## Title
Request to refresh/requeue ClawHub / VirusTotal file reputation for `umg-envoy-agent` v0.2.8

## Package name
- `umg-envoy-agent`

## Package version
- `0.2.8`

## ClawHub SHA-256
- `9DAF3A2E469B1E9FCE0E385327F71349B6C15877577A6D19D5172D6D4242B530`

## Local package path
- supporting local package path may exist separately from the ClawHub-scanned artifact
- if referenced in local review notes: `umg-envoy-agent` local npm/package artifact path should be recorded alongside its own hash

## Local npm package SHA-256
- known supporting local hash: `BA93BB6873BFECE60F8198ABFFEBB9FED54E68B82B47D2E74605865EA0F22639`

## Explicit hash distinction note
The local package hash is supporting evidence only.
It is **not** byte-identical proof of the ClawHub-scanned artifact.
Please do not collapse the local artifact identity into the ClawHub-scanned file identity during review.

## Package inspection summary
Current review interpretation is:
- scanner-sensitive but explainable
- likely heuristic concern around `child_process`, `spawn`, and `fs.writeFileSync`-adjacent surfaces
- no current evidence of hidden install-time malware behavior
- no postinstall script expected
- bridge behavior is treated as explicit/config-gated rather than passive install-time execution
- compiler bridge behavior should be preserved as architecture unless concrete evidence proves it unsafe

## Scanner-sensitive surface explanation
The package may contain scanner-sensitive strings or code surfaces because it participates in explicit, gated runtime/tooling architecture.
That alone should not be treated as proof of malicious behavior.
Key interpretive notes:
- process spawn surfaces are often heuristically noisy
- file-write surfaces are often heuristically noisy
- explicit bridge/config references may look suspicious out of context
- documented behavior indicates these surfaces are bounded and not install-triggered

## Request
Please refresh or requeue the ClawHub / VirusTotal reputation analysis for the ClawHub-scanned `umg-envoy-agent` v0.2.8 artifact.

Requested outcomes:
- re-evaluate file reputation with the documented behavioral context in mind
- distinguish heuristic/noisy detections from concrete malicious behavior
- preserve the artifact identity distinction between the ClawHub-scanned file and any local supporting artifact

## Important boundary statement
This request does **not** claim the local hash proves byte identity with the ClawHub-scanned artifact.
It provides supporting context only.
