# Post-Refresh Decision Note

Use this note after refreshed ClawHub evidence becomes visible.

## Possible post-refresh decisions

### Refreshed clean
If the refreshed state is clean/undetected and the stale verdict is resolved:
- consider documentation-only patch later if useful and explicitly approved
- or choose no publish if there is still no user-approved release need
- preserve bridge work

### Refreshed stale remains
If refreshed evidence still effectively leaves the reputation state stale or unresolved:
- continue release deferral
- continue support follow-up
- preserve bridge work
- do not publish

### Refreshed generic detections
If refreshed evidence shows generic/noisy detections only:
- document the detections exactly
- assess documentation-only path and review Option C if scanner friction persists structurally
- preserve bridge work

### Refreshed concrete detections
If refreshed evidence shows concrete detections:
- pause and inspect exact flagged behavior
- preserve bridge work during inspection
- consider stronger gates before any split if future authorization is granted
- do not publish

### Scanner friction persists
If scanner friction persists primarily because of process-spawn surfaces or similar architecture-linked primitives:
- consider stronger gates later if explicitly authorized
- consider a public-safe split later if explicitly authorized
- do not use persistence of scanner friction as a reason to delete bridge work by default

## Final rule
A refreshed state may support renewed review.
It does not automatically authorize publish.
