# Public Surface Correction Rollback Plan

Use this rollback plan if a future explicitly approved implementation lane for public-surface correction produces an unsatisfactory result.

## Rollback triggers
- staged public artifact still ships process-execution bridge surfaces
- staged public artifact loses required bundled-adapter public-safe functionality
- staged docs/security posture no longer match package reality
- patch lane accidentally widens scope beyond public-surface correction
- preservation rule is threatened

## Rollback actions
- stop before publish
- revert or discard the narrow correction branch/work lane
- restore the last known clean pre-implementation branch state
- keep bridge source preserved in repo/dev/local lane
- keep historical `v0.2.8` artifacts untouched
- return to paused review posture

## Rollback non-goals
Rollback must not:
- delete bridge source
- delete Desktop Bridge work
- delete PhaseBridge work
- mutate historical release artifacts
- force publish of a compromised staged package

## Recovery after rollback
After rollback:
- re-check scope boundaries
- re-check keep/remove boundary
- re-check staged validation logic
- decide whether a narrower correction lane should be attempted later with explicit approval
