# Dangerous Exec Resolution Options

This note compares non-destructive paths for resolving or working around the ClawHub `suspicious.dangerous_exec` static analysis flag while preserving compiler bridge work.

---

## Option A — documentation / appeal

### When to use
Use when ClawHub accepts a documented bridge explanation, gating posture, and non-install/passive-load security narrative.

### Benefits
- no code changes required
- preserves current package structure
- fastest path if review accepts the explanation
- keeps bridge architecture intact

### Risks
- ClawHub may still keep the static analysis concern open
- may not be enough if static policy is strict about visible process-spawn surfaces

### Required approval
- no implementation approval required for documentation-only maintenance
- explicit user approval still required before any future publish movement

### Files likely affected
- `SECURITY.md`
- `META/SCANNER-SENSITIVE-SURFACE-EXPLANATION.md`
- `META/STATIC-ANALYSIS-DANGEROUS-EXEC-REVIEW.md`
- support / appeal packet notes

### Expected scanner impact
- may improve reviewer understanding
- may not change static engine behavior directly
- best suited to manual review or support-side reconsideration

---

## Option B — stronger gate patch

### When to use
Use when the bridge remains in the public package but reachability and execution preconditions need clearer enforcement.

### Benefits
- preserves bridge work
- strengthens the security story around disabled-by-default behavior
- may reduce reviewer concern by making non-reachability and hard gating more explicit

### Risks
- requires future code-change authorization
- may still trigger static scanners because `child_process` / `spawn` remains present in the artifact
- could add complexity without fully resolving scanner reputation friction

### Required approval
- explicit user approval for a code-change lane
- explicit future review before any publish movement

### Files likely affected
- compiler bridge/runtime gate code paths
- configuration validation paths
- diagnostics / disabled-return surfaces
- documentation explaining the stronger gate behavior

### Expected scanner impact
- may improve manual-review confidence
- may have limited effect on raw static signatures if the process-spawn surface remains visible

---

## Option C — public-safe split

### When to use
Use when the public ClawHub artifact is blocked mainly because of `child_process` / `spawn`, and packaging separation is preferable to deleting the bridge.

### Benefits
- preserves bridge work without exposing it in the public ClawHub package
- may substantially reduce scanner friction for the public artifact
- creates a cleaner separation between public-safe package scope and advanced bridge tooling scope

### Risks
- requires design and packaging work
- increases maintenance complexity
- requires future implementation authorization
- may require migration and naming decisions

### Required approval
- explicit user approval for package-structure change
- explicit future authorization before implementation or publish review

### Files likely affected
- package boundaries / packaging manifests
- bridge code placement or package extraction plan
- public package entry surfaces
- migration notes and documentation

### Expected scanner impact
- likely strongest impact on public artifact scanner friction if process-spawn code is no longer present in the public package
- does not require deleting bridge work

## Final rule
None of these options authorize immediate publish.
All destructive action remains prohibited unless concrete evidence and explicit approval justify it.
