# Section 12 — Future Creator Economy Hooks v0.1

**Document ID:** `UMG_CREATOR_ECONOMY_HOOKS.v0.1`  
**Status:** Foundation draft  
**Layer:** Future public ecosystem / attribution / usage ledger / anti-abuse hooks / reward-readiness  
**Depends on:** `UMG_ARTIFACT_IDENTITY_AND_PROVENANCE.v0.1`, `UMG_REPOSITORY_CONTRACT.v0.1`, `UMG_HUMAN_AI_LIBRARY_PRESENTATION.v0.1`, `UMG_SLEEVE_PACK_CONTRACT.v0.1`  
**Feeds into:** future registry, public submissions, creator attribution, usage tracking, public artifact catalogs, provenance graph, anti-abuse systems, future token/reward design  

---

## 1. Purpose

This document defines the **future creator economy hooks** for UMG.

It does not define final token mechanics.

It defines the data structures, attribution rules, event types, and anti-abuse hooks needed so future reward systems can be built without redesigning the foundation.

The goal is to let UMG eventually support:

- public creator submissions;
- reusable public blocks;
- NeoBlock / NeoStack / Sleeve composition;
- creator attribution;
- dependency-graph credit;
- clone/download/use tracking;
- derivative lineage;
- meaningful remix recognition;
- duplicate rejection;
- public review states;
- anti-abuse dampening;
- future token or reward eligibility.

The immediate v0 goal is not payout.

The immediate v0 goal is clean measurement and attribution.

---

## 2. Non-Token Scope

This document deliberately does **not** define:

```text
token supply
wallet mechanics
smart contracts
exchange listings
token price
staking
airdrop rules
final payout equations
investment claims
legal compliance model
```

Those are later concerns.

This section only defines the foundation required before such systems can responsibly exist.

Core rule:

```text
Measure first.
Reward later.
```

---

## 3. Public Library Boundary

The public UMG Block Library should remain a curated, public-safe artifact surface.

It should not become a live runtime dump, private trace store, or uncontrolled marketplace.

Future creator-economy features should build on:

```text
public-safe artifacts
validated schemas
artifact identity
provenance metadata
dependency graphs
sanitized usage events
review status
anti-abuse status
```

The public library can display creator-economy information later, but it should not contain private operational state.

---

## 4. Core Philosophy

The creator economy should reward:

```text
useful artifacts
meaningful composition
clear attribution
real adoption
public utility
problem-solving
high-quality reusable design
```

It should not reward:

```text
spam uploads
exact duplicates
fake clones
bot downloads
closed-loop self-promotion
influencer grifting
low-value remix farms
speculative hype without usefulness
```

The design goal is an anti-meme-coin pattern:

```text
value from usefulness, not hype
```

---

## 5. Core Credit Model

UMG uses **dependency-graph credit**.

A useful sleeve may depend on:

```text
atomic MOLT Blocks
NeoBlocks
NeoStacks
Bundles
Overlays
Tool Packs
Schemas
Examples
```

When the sleeve is used, the sleeve creator receives credit, but upstream creators also retain attribution.

Example:

```text
Sleeve used
  → sleeve creator receives orchestration credit
  → NeoStack creators receive workflow architecture credit
  → NeoBlock creators receive functional composition credit
  → MOLT Block creators receive atomic contribution credit
  → Tool Pack creators receive executable capability credit
```

This is the UMG Lego model.

A creator can win by making a great block.

A creator can also win by assembling existing blocks into a great sleeve.

---

## 6. Credit Is Not Ownership Lock

Public UMG artifacts should remain usable, downloadable, cloneable, and learnable according to the public license/policy chosen later.

Credit does not mean hard paywall.

Recommended principle:

```text
Public artifacts stay usable.
Creators receive attribution and possible future reward from adoption.
```

This keeps the ecosystem open while still recognizing contribution.

---

## 7. Artifact Classes Eligible for Tracking

Future usage tracking may apply to:

```text
molt_block
neoblock
neostack
sleeve
bundle
overlay
toolpack
capability
schema
example
fixture
guide
human_card
```

Reward eligibility may be narrower than tracking eligibility.

Example:

```json
{
  "reward": {
    "eligible_for_tracking": true,
    "eligible_for_rewards": false,
    "reward_policy": null,
    "abuse_review_required": true
  }
}
```

Tracking can begin before rewards are activated.

---

## 8. Creator Roles

UMG should support multiple creator roles.

```text
original_creator
remix_creator
sleeve_assembler
toolpack_creator
schema_author
maintainer
reviewer
curator
verified_creator
recognized_creator
moderator
team_member
community_contributor
```

These roles should not all receive the same credit weight.

They should be recorded distinctly.

Example:

```json
{
  "creator_roles": [
    {
      "creator_id": "NeoMagnetar",
      "role": "original_creator",
      "artifact_id": "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1"
    },
    {
      "creator_id": "mira",
      "role": "sleeve_assembler",
      "artifact_id": "SLV.USER.MIRA.SERVUO.PVP_PATCH_REVIEW.v1"
    }
  ]
}
```

---

## 9. Dependency Graph

Every composite artifact should declare dependency graph data.

Example:

```json
{
  "dependency_graph": {
    "blocks": [
      "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1"
    ],
    "neoblocks": [
      "NB.SERVUO.FILE_SCAN.v1"
    ],
    "neostacks": [
      "NS.CODER.SERVUO.MASTER.v1"
    ],
    "bundles": [],
    "overlays": [
      "OVR.GOV.CODE_ROUTER.v1"
    ],
    "toolpacks": [
      "TP.REPO_ANALYSIS.v1"
    ],
    "schemas": []
  }
}
```

The dependency graph supports:

```text
traceability
upstream attribution
usage credit propagation
duplicate detection
remix lineage
creator impact scoring
future rewards
```

---

## 10. Contribution Credit Types

Recommended credit types:

```text
atomic_credit
composition_credit
workflow_credit
orchestration_credit
capability_credit
curation_credit
review_credit
maintenance_credit
documentation_credit
```

### Atomic Credit

For MOLT Block creators.

### Composition Credit

For NeoBlock creators.

### Workflow Credit

For NeoStack creators.

### Orchestration Credit

For Sleeve creators.

### Capability Credit

For Tool Pack creators.

### Curation Credit

For people who organize, review, and promote useful sets.

### Review Credit

For quality-control work.

### Maintenance Credit

For updates, fixes, deprecations, and compatibility work.

### Documentation Credit

For useful examples, guides, and Human cards.

---

## 11. Credit Weight Hook

Do not finalize reward math now.

But reserve a weight object.

Example:

```json
{
  "credit_weights": {
    "sleeve_creator": 1.0,
    "neostack_creator": 0.35,
    "neoblock_creator": 0.2,
    "molt_block_creator": 0.05,
    "toolpack_creator": 0.4,
    "reviewer": 0.02,
    "curator": 0.03
  }
}
```

These numbers are placeholders only.

The hook matters more than the final numbers.

Rule:

```text
Do not hardcode economy math into v0 artifacts.
```

---

## 12. Usage Event Model

A usage event records that an artifact was used, cloned, downloaded, activated, referenced, remixed, or depended on.

Recommended base event:

```json
{
  "event_id": "USE.000000001",
  "event_type": "artifact.used",
  "artifact_id": "SLV.CODER.SERVUO.v1",
  "artifact_type": "sleeve",
  "artifact_version": "1.0.0",
  "content_hash": "sha256:...",
  "package_hash": "sha256:...",
  "creator_id": "NeoMagnetar",
  "dependency_ids": [
    "NS.CODER.SERVUO.MASTER.v1",
    "NB.SERVUO.FILE_SCAN.v1",
    "TP.REPO_ANALYSIS.v1"
  ],
  "source": "envoy_runtime",
  "context": "runtime_activation",
  "timestamp": "2026-04-27T00:00:00Z",
  "weight": 1.0,
  "anti_abuse_status": "unscored",
  "privacy": "sanitized"
}
```

Usage events should reference artifact IDs and hashes, not display names.

---

## 13. Event Types

Recommended event types:

```text
artifact.viewed
artifact.downloaded
artifact.cloned
artifact.imported
artifact.activated
artifact.used
artifact.dependency_used
artifact.remixed
artifact.forked
artifact.submitted
artifact.reviewed
artifact.promoted
artifact.deprecated
artifact.archived
artifact.flagged
artifact.reward_locked
artifact.reward_eligible
```

### Important distinction

```text
downloaded ≠ used
cloned ≠ useful
activated ≠ successful
dependency_used ≠ direct adoption
```

The system should avoid rewarding shallow events too heavily.

---

## 14. Event Source Types

Recommended event sources:

```text
public_library
envoy_runtime
compiler_fixture
local_import
registry
manual_review
toolpack_runtime
visual_studio
api
```

Events from different sources may receive different trust weights.

Example:

```text
envoy_runtime activation > public page view
external independent use > same-community clone
successful compile fixture > unverified download
```

---

## 15. Event Privacy

Usage events must not leak private runtime state.

Public usage events should be sanitized.

A public-safe event should not contain:

```text
private file paths
tokens
API keys
private repo contents
raw user prompts
raw tool outputs
local machine identifiers
personal context
```

Use:

```text
artifact_id
version
hash
event type
sanitized source
timestamp
trust status
aggregate counters
```

Do not publish raw private traces.

---

## 16. Public Counters

Public counters may include:

```text
views
downloads
clones
imports
activations
verified_uses
remixes
dependents
favorites/nominations
review_score
external_adoption_count
```

Counters should distinguish:

```text
raw count
trusted count
weighted count
dampened count
reward-eligible count
```

Example:

```json
{
  "usage_stats": {
    "downloads_raw": 1200,
    "downloads_trusted": 840,
    "clones_raw": 340,
    "activations_verified": 91,
    "dependent_artifacts": 17,
    "external_adoption_count": 42,
    "reward_eligible_uses": 36
  }
}
```

---

## 17. Proof-of-Use

Proof-of-Use should mean more than a click.

Possible proof signals:

```text
runtime activation
compile success
used in promoted sleeve
used by external creator
referenced by independent dependency graph
successful Tool Pack binding
positive review/nominated artifact
used across multiple unrelated communities
manual maintainer confirmation
```

Proof-of-Use should combine multiple signals.

Do not rely on one count type.

---

## 18. Public Submission Flow

Future public submission flow:

```text
1. Creator submits artifact.
2. Schema validation runs.
3. Identity/provenance fields checked.
4. Normalized content hash generated.
5. Exact duplicate check runs.
6. Near-duplicate/similarity check runs.
7. Dependency graph checked.
8. Safety/public-scope review runs.
9. Uniqueness class assigned.
10. Artifact status set.
11. Human card generated or requested.
12. Artifact promoted, rejected, or returned for changes.
```

This can be manual at first.

Automation can come later.

---

## 19. Submission Status

Recommended submission statuses:

```text
draft
submitted
under_review
needs_changes
approved
promoted
rejected
duplicate
near_duplicate
deprecated
archived
reward_locked
```

`reward_locked` means the artifact may be public but not reward-eligible yet.

---

## 20. Duplicate Policy

Exact normalized duplicates do not receive a new original artifact claim.

Rule:

```text
If content_hash matches an existing promoted artifact,
the submission cannot become a new original artifact.
```

Possible outcomes:

```text
reject as duplicate
mark as clone/private copy
link to existing artifact
allow as compatibility copy
allow as historical copy
```

Duplicate submitter may still get credit later for a meaningful composition using that artifact.

---

## 21. Near-Duplicate Policy

Near duplicates require review.

A near duplicate may be accepted only if it shows meaningful difference.

Meaningful differences may include:

```text
new MOLT role behavior
new domain adaptation
new route behavior
new activation condition
new merge behavior
new bundle placement
new tool/capability interaction
new safety constraint
new output behavior
new useful composition role
```

Rule:

```text
Similar is allowed.
Meaningless duplication is not.
```

---

## 22. Derivative / Remix Policy

Derivative artifacts are allowed when lineage is declared.

Example:

```json
{
  "uniqueness": {
    "class": "variant",
    "duplicate_of": null,
    "similar_to": [
      "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1"
    ],
    "meaningful_difference": [
      "adds stricter dangerous-refactor scope",
      "adds compile-check route condition"
    ]
  },
  "provenance": {
    "parent_ids": [
      "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1"
    ],
    "derived_from": [
      "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1"
    ]
  }
}
```

Derivative rule:

```text
Declared lineage protects both upstream creator and derivative creator.
```

---

## 23. Composite Original Policy

A composite artifact can be original even if its components are not.

This applies especially to:

```text
NeoBlocks
NeoStacks
Sleeves
Tool Pack bundles
route systems
governance overlays
```

Rule:

```text
Composition can be original when the arrangement, route behavior, overlay structure,
merge strategy, tool integration, or practical use is meaningfully distinct.
```

Composite artifacts should credit their own creator and all upstream dependencies.

---

## 24. Creator Verification Hook

Future creator accounts may have verification states.

Recommended states:

```text
unverified
email_verified
social_verified
recognized_creator
industry_verified
team_verified
moderator_verified
system_steward
```

Verification should not automatically equal reward dominance.

Verification may improve trust and onboarding speed.

Proof-of-Use still matters.

---

## 25. Recognized Creator Fast Onboarding

Externally recognized creators may receive faster onboarding.

Examples:

```text
known public creator
verified social account
YouTuber
Twitch streamer
industry expert
open-source maintainer
community leader
```

Recommended safeguards:

```text
separate imported reputation from UMG proof-of-use
cap initial reward weight
probation period
category-specific recognition
manual review for high-impact publishing
anti-abuse monitoring
```

Recognition should help onboarding.

It should not allow instant domination.

---

## 26. Verified Community / Team Onboarding

Recognized creators may bring verified collaborators, moderators, or team members.

Recommended statuses:

```text
creator_invited_member
team_member
community_moderator
project_collaborator
verified_contributor
```

Safeguards:

```text
secondary trust bump only
no automatic full reward multiplier
community-affinity dampening applies
proof-of-use required for major reward eligibility
```

This supports real communities without enabling easy manipulation.

---

## 27. Community-Affinity Dampening

Interactions from the same onboarded community should count less until independent adoption appears.

Reason:

```text
same-community activity can seed discovery
but should not dominate Proof-of-Use
```

Dampening targets:

```text
downloads
clones
activations
nominations
reviews
dependent artifacts
```

Example field:

```json
{
  "affinity": {
    "same_creator_network": true,
    "same_community_cluster": true,
    "dampening_applied": true,
    "dampening_reason": "Interactions primarily from creator-onboarded group."
  }
}
```

---

## 28. Dirty Flow Detection

Dirty flow patterns include:

```text
same cluster repeatedly downloading same artifacts
many new accounts cloning same bundle
identical interaction order across accounts
closed-loop remix rings
self-owned accounts inflating usage
same-community nomination spikes
high clone count with no independent runtime activation
download bursts without downstream dependency use
```

Dirty flow should cause:

```text
reward lock
manual review
weight dampening
public warning flag if severe
temporary promotion hold
```

Do not automatically punish all community activity.

Flag patterns, not isolated events.

---

## 29. No-Infinite Mechanics

Future publishing/reward systems should avoid infinite spam.

Recommended hooks:

```text
daily public submission cap
progressive extra submission cost
category-specific publishing windows
quality threshold for promotion
review queue limits
reward lock for suspicious bursts
cooldown after rejected duplicates
```

If a token/coin system is later used, it should avoid unlimited output farming.

Core principle:

```text
scarcity should encourage intention, not pay-to-win spam
```

---

## 30. Public Publishing Limits

Possible fields:

```json
{
  "publishing_limits": {
    "daily_free_public_submissions": 3,
    "extra_submission_cost_policy": "progressive",
    "cooldown_after_duplicate_rejection": "24h",
    "category_window": "monthly",
    "hard_cap_enabled": true
  }
}
```

These are future hooks.

Do not enforce in v0 unless needed.

---

## 31. Community Approval Signals

Avoid generic likes as the main ranking signal.

Better signals:

```text
monthly nominations
category awards
creator-to-creator votes
no self-voting
external-reference boosts
verified-use nominations
reviewer endorsements
artifact inclusion in promoted sleeves
```

Voting should be one Proof-of-Use input, not the entire ranking system.

---

## 32. Nomination Event

Example nomination event:

```json
{
  "event_id": "NOM.000001",
  "event_type": "artifact.nominated",
  "artifact_id": "NB.SERVUO.FILE_SCAN.v1",
  "category": "coder.neoblock.monthly",
  "nominator_id": "creator_456",
  "self_vote": false,
  "creator_network_relation": "independent",
  "timestamp": "2026-04-27T00:00:00Z",
  "weight": 1.0,
  "anti_abuse_status": "unscored"
}
```

---

## 33. Reward Eligibility State

Reward state should be separate from public status.

An artifact may be public but not reward eligible.

Recommended states:

```text
not_tracked
tracked_only
eligible_pending_review
eligible
reward_locked
suspended
retired
```

Example:

```json
{
  "reward": {
    "tracking_state": "tracked_only",
    "eligibility_state": "eligible_pending_review",
    "reward_policy": null,
    "abuse_review_required": true
  }
}
```

---

## 34. Token / Coin Readiness

If a token or coin system is later added, it should attach to:

```text
artifact_id
creator_id
usage event
dependency graph
anti-abuse status
reward eligibility state
review status
```

It should not attach to raw upload count.

Rule:

```text
No reward from upload alone.
Reward should require accepted artifact + proof-of-use + anti-abuse clearance.
```

---

## 35. Dependency Credit Propagation

When a composite artifact is used, credit may propagate upstream.

Example:

```text
SLV.USER.MIRA.SERVUO.PVP_PATCH_REVIEW.v1 used
  → Mira gets sleeve/orchestration credit
  → NS.CODER.SERVUO.MASTER.v1 creator gets workflow credit
  → NB.SERVUO.FILE_SCAN.v1 creator gets composition credit
  → BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1 creator gets atomic credit
  → TP.REPO_ANALYSIS.v1 creator gets capability credit
```

Propagation must respect:

```text
duplicate policy
reward eligibility
anti-abuse dampening
dependency depth
artifact status
license/policy
```

---

## 36. Dependency Depth Hook

Do not finalize depth math.

But record depth.

Example:

```json
{
  "dependency_credit_path": [
    {
      "artifact_id": "SLV.USER.MIRA.SERVUO.PVP_PATCH_REVIEW.v1",
      "depth": 0,
      "credit_type": "orchestration_credit"
    },
    {
      "artifact_id": "NS.CODER.SERVUO.MASTER.v1",
      "depth": 1,
      "credit_type": "workflow_credit"
    },
    {
      "artifact_id": "NB.SERVUO.FILE_SCAN.v1",
      "depth": 2,
      "credit_type": "composition_credit"
    },
    {
      "artifact_id": "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1",
      "depth": 3,
      "credit_type": "atomic_credit"
    }
  ]
}
```

Depth allows future reward policies to avoid over-crediting huge dependency trees.

---

## 37. Maintainer and Reviewer Credit

Useful ecosystems need maintainers.

Reviewer/maintainer actions may include:

```text
schema review
public safety review
duplicate review
similarity review
dependency review
security review
toolpack permission review
documentation improvement
deprecation maintenance
compatibility migration
```

These may receive future recognition or credit.

They should be tracked separately from creator credit.

---

## 38. Moderation Actions

Recommended moderation event types:

```text
artifact.flagged
artifact.hidden
artifact.reward_locked
artifact.restored
artifact.deprecated
artifact.removed
creator.warned
creator.suspended
creator.verified
creator.verification_revoked
```

All moderation should be traceable.

---

## 39. Public Display Fields

Future public artifact pages may show:

```text
artifact ID
creator
status
version
public status
review status
uniqueness class
parent artifacts
dependencies
downloads
clones
verified uses
remixes
nominations
reward eligibility state
abuse review state
```

Avoid showing speculative payout values unless legally and operationally ready.

---

## 40. Private / Hidden Fields

Do not publicly expose:

```text
raw suspicious-cluster details
private user identifiers
private runtime trace
raw tool outputs
internal moderation notes if sensitive
security exploit details
private wallet details
personal information
```

Public display should be transparent enough for trust without exposing abuse-detection internals.

---

## 41. Data Model Summary

Recommended future artifact economy object:

```json
{
  "economy": {
    "tracking_enabled": true,
    "reward_enabled": false,
    "usage_stats": {},
    "dependency_credit": {},
    "anti_abuse": {},
    "community_signals": {},
    "reward_state": "tracked_only"
  }
}
```

Keep this separate from core artifact content.

Do not let economy metadata alter compiler behavior.

---

## 42. Compiler Boundary

Creator-economy metadata should not affect the compiler's semantic output unless explicitly used by a governance/policy overlay.

The compiler should not prefer a block because it is popular.

Compiler selection should be based on:

```text
sleeve configuration
route selection
artifact references
priority rules
merge rules
compatibility
governance
```

Popularity may help discovery in UI or registry, not hidden runtime semantics.

---

## 43. Envoy Boundary

Envoy may record usage events.

Envoy may read reward/tracking flags.

Envoy may emit sanitized telemetry if configured.

Envoy should not:

```text
silently publish private usage
silently expose private traces
execute token logic inside normal compile
reward unverified events
```

User consent/configuration should control telemetry.

---

## 44. Registry Boundary

A future registry may:

```text
accept submissions
validate artifacts
index public artifacts
display creators
aggregate usage stats
track clones/downloads
manage reviews
compute reward eligibility
publish public API
```

Registry should not replace:

```text
compiler
Envoy runtime
Block Library source artifacts
Tool Pack safety review
```

---

## 45. Minimum v0 Hooks

For v0, add or reserve only:

```text
identity
provenance
content_hash
package_hash
uniqueness
dependencies
reward.eligible_for_tracking
reward.eligible_for_rewards
anti_abuse.requires_review
usage_stats placeholder
```

Do not implement final reward logic yet.

---

## 46. Future v1 Hooks

For v1, add:

```text
submission review flow
duplicate checker
near-duplicate review fields
dependency graph visualization
download/clone counters
manual usage event import
public creator profile fields
reward_locked state
community nomination events
```

---

## 47. Future v2 Hooks

For v2, add:

```text
verified runtime usage events
Envoy telemetry opt-in
weighted Proof-of-Use
community-affinity dampening
creator verification
reviewer/maintainer credit
public API
registry dashboards
```

---

## 48. Future v3 Hooks

For v3, consider:

```text
token/coin reward mechanics
smart contract integration if appropriate
limited publishing mechanics
creator competitions
category reward pools
advanced anti-abuse systems
external reputation import
proof-of-use reward distribution
```

Only after the data ledger and anti-abuse systems are stable.

---

## 49. Non-Goals for v0.1

This document does not implement:

```text
tokenomics
smart contracts
wallet login
reward equations
public marketplace
automated anti-abuse scoring
verified creator onboarding workflow
legal terms
final license
financial claims
```

It defines the hooks.

---

## 50. Acceptance Criteria

This section is complete when UMG can represent:

```text
public artifact creator attribution
usage event readiness
download/clone/use tracking placeholders
dependency-graph credit
duplicate rejection
near-duplicate review
derivative/remix lineage
composite originality
reward eligibility state
anti-abuse placeholders
community-affinity dampening hook
creator verification hook
public/private display boundaries
compiler/runtime boundary for economy metadata
```

---

## 51. Summary

UMG's future creator economy should be built on provenance, dependency graphs, and real use.

The foundation should track:

```text
who made it
what it depends on
who reused it
how it was used
whether it was meaningfully original
whether usage was trustworthy
whether it is reward-eligible
```

The reward layer can come later.

The immediate rule is:

```text
Attribution now.
Measurement next.
Rewards last.
```

This gives UMG a path toward a creator economy without turning the v0 system into a speculative or brittle marketplace.
