# Section 4 — UMG Artifact Identity and Provenance v0.1

**Document ID:** `UMG_ARTIFACT_IDENTITY_AND_PROVENANCE.v0.1`  
**Status:** Foundation draft  
**Layer:** Library / schema / attribution / provenance / future creator-economy readiness  
**Depends on:** `UMG_COMPILER_LAW.v0.3`, `UMG_IR.v0.1`, `UMG_RELATION_MATRIX.v0.1`  
**Feeds into:** Block schemas, NeoBlock schemas, NeoStack schemas, sleeve manifests, toolpack manifests, public catalogs, future usage ledger, future creator economy  

---

## 1. Purpose

This document defines identity, provenance, hashing, uniqueness, duplicate handling, and attribution rules for UMG artifacts.

It exists so UMG can support:

- clean human-readable library numbering;
- stable machine-readable artifact IDs;
- deterministic source references;
- creator attribution;
- derivative lineage;
- exact duplicate rejection;
- meaningful variant handling;
- public submission review;
- future usage tracking;
- future creator-economy and token/reward systems.

This document does **not** define final token economics.

It defines the artifact identity layer that token/reward systems can later depend on.

---

## 2. Core Principle

UMG artifacts need multiple identity layers.

A single `001` style number is useful for humans, but it is not enough for public submissions, creator attribution, dependency graphs, derivatives, clones, usage statistics, and future rewards.

UMG should use a layered identity model:

```text
Human Library Code
  = readable catalog/order code

Artifact ID
  = stable machine-readable identity

Content Hash
  = normalized fingerprint of meaningful content

Package Hash
  = fingerprint of packaged/released artifact state

Provenance
  = creator, origin, parentage, lineage, and review state
```

These layers must not be collapsed into one field.

---

## 3. Artifact Types Covered

This identity/provenance model applies to all public or packageable UMG artifacts:

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
```

The main artifact classes are:

| Artifact | Meaning |
|---|---|
| MOLT Block | Atomic semantic/governance/content unit |
| NeoBlock | Composed runtime unit made from MOLT blocks |
| NeoStack | Workflow/lane/department made from NeoBlocks |
| Sleeve Pack | Full operating configuration package |
| Tool Pack / Capability Pack | Executable capability package or tool binding package |
| Bundle | Grouped artifacts for reuse, route activation, or packaging |
| Overlay | Influence layer such as governance, philosophy, blueprint, memory, or context |

---

## 4. Human Library Code

The existing numeric codes such as:

```text
001
002
003
```

should be preserved.

These are useful for:

- human browsing;
- visual cards;
- catalog ordering;
- legacy continuity;
- library inventory;
- teaching and examples;
- simple discussion.

But they should be treated as **library codes**, not permanent global identities.

Example:

```json
{
  "library_code": "001",
  "id": "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1"
}
```

### Rule

```text
library_code is human-facing.
id is machine-facing.
hash is content-facing.
provenance is attribution-facing.
```

---

## 5. Artifact ID

Every public or packageable artifact must have a stable artifact ID.

The artifact ID should be:

- unique within the UMG ecosystem;
- readable;
- namespaced;
- type-aware;
- version-aware;
- stable across references;
- safe in JSON, file names, matrix lines, and trace events.

### Recommended ID forms

MOLT Block:

```text
BLK.<MOLT_TYPE>.<CATEGORY>.<SLUG>.v<MAJOR>
```

Example:

```text
BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1
BLK.PHILOSOPHY.STRATEGY.ART_OF_WAR.v1
BLK.BLUEPRINT.BUSINESS.INVESTOR_PLAN.v1
```

NeoBlock:

```text
NB.<DOMAIN>.<SLUG>.v<MAJOR>
```

Example:

```text
NB.SERVUO.FILE_SCAN.v1
NB.SERVUO.API_MAP.v1
```

NeoStack:

```text
NS.<DOMAIN>.<SLUG>.v<MAJOR>
```

Example:

```text
NS.CODER.SERVUO.MASTER.v1
```

Sleeve:

```text
SLV.<DOMAIN>.<SLUG>.v<MAJOR>
```

Example:

```text
SLV.CODER.SERVUO.v1
```

Tool Pack:

```text
TP.<DOMAIN>.<SLUG>.v<MAJOR>
```

Example:

```text
TP.SERVUO.CODER_TOOLS.v1
TP.REPO_ANALYSIS.v1
```

Capability:

```text
CAP.<DOMAIN>.<ACTION>
```

Example:

```text
CAP.REPO.SEARCH
CAP.COMPILE.CHECK
CAP.PATCH.WRITE
```

Community-created artifacts may include a creator namespace:

```text
BLK.USER.<CREATOR_HANDLE>.<CATEGORY>.<SLUG>.v1
NB.USER.<CREATOR_HANDLE>.<DOMAIN>.<SLUG>.v1
NS.USER.<CREATOR_HANDLE>.<DOMAIN>.<SLUG>.v1
SLV.USER.<CREATOR_HANDLE>.<DOMAIN>.<SLUG>.v1
TP.USER.<CREATOR_HANDLE>.<DOMAIN>.<SLUG>.v1
```

---

## 6. Versioning

Artifact IDs may include a major version suffix:

```text
.v1
.v2
.v3
```

The artifact metadata should also include semantic versioning when appropriate:

```json
{
  "version": "1.0.0"
}
```

Recommended distinction:

```text
Artifact ID major suffix = identity-level breaking version
Semantic version = release/package version
```

Example:

```json
{
  "id": "NB.SERVUO.FILE_SCAN.v1",
  "version": "1.2.3"
}
```

A non-breaking improvement may change `version` from `1.2.3` to `1.2.4`.

A breaking semantic change should create:

```text
NB.SERVUO.FILE_SCAN.v2
```

---

## 7. Content Hash

A content hash is a fingerprint of meaningful normalized content.

It answers:

```text
Is this artifact's meaningful content the same as another artifact?
```

Recommended field:

```json
{
  "content_hash": "sha256:..."
}
```

### Content hash should include

For a MOLT block:

- artifact type;
- MOLT type;
- title/name;
- canonical content text;
- role-specific fields;
- semantic parameters;
- compatibility-affecting fields.

For a NeoBlock:

- included MOLT block IDs;
- local composition logic;
- bundle references;
- merge recipes;
- route behavior;
- declared roles.

For a NeoStack:

- included NeoBlock IDs;
- vertical/horizontal relations;
- route logic;
- governance hooks;
- capability declarations.

For a Sleeve:

- sleeve manifest content;
- referenced NeoStacks;
- referenced NeoBlocks;
- referenced blocks;
- overlays;
- activation defaults;
- capability requirements;
- compatibility declarations.

### Content hash should exclude

- created_at;
- updated_at;
- download count;
- clone count;
- usage count;
- creator profile display name;
- temporary review comments;
- local file paths;
- trace history;
- runtime session state;
- private machine data;
- generated thumbnails;
- non-semantic formatting differences when normalization permits.

---

## 8. Package Hash

A package hash fingerprints the complete packaged artifact state.

Recommended field:

```json
{
  "package_hash": "sha256:..."
}
```

Package hash may include:

- manifest file;
- local artifact files;
- README;
- lockfile;
- package metadata;
- asset hashes;
- dependency lock references.

A package hash is especially important for:

- sleeve packs;
- tool packs;
- published releases;
- imported ZIP/folder packages;
- reproducible compile fixtures.

### Difference

```text
content_hash = meaningful artifact sameness
package_hash = released package state
```

---

## 9. Normalization

Before creating a content hash, the artifact should be normalized.

Normalization avoids false uniqueness from meaningless changes.

Recommended normalization:

```text
trim leading/trailing whitespace
normalize line endings to LF
collapse repeated non-semantic spaces where allowed
sort JSON object keys
sort unordered arrays when semantics permit
exclude runtime counters
exclude timestamps
exclude local paths
exclude volatile metadata
preserve meaningful casing and wording unless field policy says otherwise
```

Important:

Do not over-normalize natural-language fields if small wording changes may be meaningful.

UMG allows small changes to matter depending on role and placement.

So normalization should remove noise, not erase intent.

---

## 10. Provenance Object

Every public artifact should include provenance metadata.

Recommended object:

```json
{
  "provenance": {
    "origin": "core_library",
    "creator_id": "NeoMagnetar",
    "submitted_by": "NeoMagnetar",
    "parent_ids": [],
    "derived_from": [],
    "inspired_by": [],
    "created_at": "2026-04-27T00:00:00Z",
    "updated_at": "2026-04-27T00:00:00Z",
    "content_hash": "sha256:...",
    "package_hash": "sha256:...",
    "public_status": "promoted",
    "review_status": "approved",
    "license": "public-umg-default",
    "attribution_required": true
  }
}
```

### Required fields

```text
origin
creator_id
submitted_by
parent_ids
derived_from
created_at
updated_at
content_hash
package_hash
public_status
review_status
license
attribution_required
```

---

## 11. Origin Types

Recommended `origin` values:

```text
core_library
community_submission
imported
forked
remixed
generated
private_promoted
system_generated
example_fixture
legacy_migrated
```

### Meaning

| Origin | Meaning |
|---|---|
| `core_library` | Created as part of official UMG seed/canon library |
| `community_submission` | Submitted by external/public creator |
| `imported` | Imported from outside source |
| `forked` | Based on an existing artifact with lineage |
| `remixed` | Combines or adapts multiple existing artifacts |
| `generated` | Generated by AI/tooling and accepted after review |
| `private_promoted` | Promoted from private Resleever/testbed |
| `system_generated` | Produced automatically by UMG tooling |
| `example_fixture` | Example/test artifact |
| `legacy_migrated` | Imported from earlier library structure |

---

## 12. Public Status

Recommended `public_status` values:

```text
draft
submitted
under_review
promoted
rejected
deprecated
archived
private
compatibility_reference
historical_reference
```

### Meaning

| Status | Meaning |
|---|---|
| `draft` | Not ready for public use |
| `submitted` | Submitted but not reviewed |
| `under_review` | Being evaluated |
| `promoted` | Accepted as public artifact |
| `rejected` | Not accepted |
| `deprecated` | Superseded but still referenceable |
| `archived` | Kept for history |
| `private` | Not public |
| `compatibility_reference` | Kept for compatibility |
| `historical_reference` | Kept for historical context |

---

## 13. Review Status

Recommended `review_status` values:

```text
unreviewed
pending
approved
needs_changes
duplicate
near_duplicate
rejected
deprecated
```

Review status is not the same as public status.

A public artifact can be promoted and later deprecated.

A submitted artifact can be rejected as duplicate.

---

## 14. Uniqueness Object

Every submitted artifact should eventually receive a uniqueness classification.

Recommended object:

```json
{
  "uniqueness": {
    "class": "original",
    "duplicate_of": null,
    "similar_to": [],
    "similarity_score": null,
    "review_notes": "",
    "meaningful_difference": []
  }
}
```

Required fields:

```text
class
duplicate_of
similar_to
similarity_score
review_notes
meaningful_difference
```

---

## 15. Uniqueness Classes

Recommended uniqueness classes:

```text
original
exact_duplicate
near_duplicate
variant
derivative
remix
composite_original
compatibility_copy
historical_copy
```

### Meaning

| Class | Meaning | Typical Action |
|---|---|---|
| `original` | New artifact with no meaningful known parent | Accept if useful/valid |
| `exact_duplicate` | Same normalized content as existing artifact | Reject as new artifact |
| `near_duplicate` | Highly similar; difference unclear | Review required |
| `variant` | Similar but meaningfully adapted | Accept with lineage |
| `derivative` | Based on parent artifact | Accept with parent attribution |
| `remix` | Combines multiple existing artifacts | Accept with dependency graph |
| `composite_original` | New composition of existing artifacts | Accept as new NeoBlock/NeoStack/Sleeve |
| `compatibility_copy` | Copy retained for compatibility | No originality claim |
| `historical_copy` | Copy retained for archive/history | No new reward claim |

---

## 16. Duplicate Rule

Exact normalized duplicates should not be promoted as new original artifacts.

Formal rule:

```text
If normalized content_hash matches an existing promoted artifact,
the submission may not receive a new original artifact claim.
```

Possible actions:

```text
reject as duplicate
link as clone/use
mark as compatibility copy
allow private copy only
```

Duplicate submitter may still be recognized as a user/curator/remixer if they later build something meaningful from the artifact, but not as the original creator of the duplicate artifact.

---

## 17. Near-Duplicate Rule

A near-duplicate requires review.

Near-duplicates may be accepted only if they show meaningful difference.

Meaningful difference may include:

```text
different MOLT role/function
different route behavior
different activation condition
different merge behavior
different bundle placement
different target domain
different safety constraint
different output role
different capability/tool interaction
substantial wording that changes behavior
proved usefulness in a NeoBlock/NeoStack/Sleeve
```

The rule is:

```text
Similar is allowed.
Meaningless duplication is not.
```

---

## 18. Composite Originality Rule

A creator can create a new artifact by assembling existing artifacts in a meaningful way.

This is critical to UMG.

A sleeve, NeoStack, or NeoBlock may be original even if many underlying blocks were created by others.

Formal rule:

```text
A composition can be original when its structure, route behavior, overlay design,
merge design, tool integration, or practical use is meaningfully distinct.
```

This supports the Lego model.

Atomic blocks can be reused.

New structures can still be valuable.

---

## 19. Dependency Graph Credit

Every composite artifact should retain a dependency graph.

Example sleeve dependency graph:

```json
{
  "dependencies": {
    "blocks": [
      "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1",
      "BLK.PHILOSOPHY.SAFETY.PRESERVE_USER_WORK.v1"
    ],
    "neoblocks": [
      "NB.SERVUO.FILE_SCAN.v1",
      "NB.SERVUO.PATCH_PLANNER.v1"
    ],
    "neostacks": [
      "NS.CODER.SERVUO.MASTER.v1"
    ],
    "toolpacks": [
      "TP.REPO_ANALYSIS.v1"
    ]
  }
}
```

This lets usage of a sleeve credit:

- the sleeve creator;
- the NeoStack creator;
- the NeoBlock creators;
- the atomic block creators;
- the toolpack creators.

Reward math is deferred.

Dependency graph recording is not deferred.

---

## 20. Creator Credit Layers

Credit can attach at multiple levels:

| Layer | Credit Type |
|---|---|
| MOLT Block | Atomic semantic contribution |
| NeoBlock | Functional composition contribution |
| NeoStack | Workflow architecture contribution |
| Sleeve | Orchestration/package contribution |
| Tool Pack | Executable capability contribution |
| Maintainer/Reviewer | Quality-control contribution |
| Curator | Discovery/catalog contribution |

This allows different creator types to participate.

---

## 21. Usage Event Readiness

Future usage tracking should attach to stable artifact IDs and hashes.

A usage event may eventually record:

```json
{
  "event": "artifact.used",
  "artifact_id": "SLV.CODER.SERVUO.v1",
  "artifact_type": "sleeve",
  "version": "1.0.0",
  "content_hash": "sha256:...",
  "package_hash": "sha256:...",
  "creator_id": "creator_123",
  "dependency_ids": [
    "NS.CODER.SERVUO.MASTER.v1",
    "NB.SERVUO.FILE_SCAN.v1",
    "TP.REPO_ANALYSIS.v1"
  ],
  "use_context": "runtime_activation",
  "timestamp": "2026-04-27T00:00:00Z",
  "anti_abuse_status": "unscored"
}
```

This document does not define reward math.

It reserves the data needed for future reward math.

---

## 22. Reward Eligibility Hook

Add future-safe fields:

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

Default for early v0 artifacts:

```json
{
  "eligible_for_tracking": true,
  "eligible_for_rewards": false
}
```

This lets UMG track usefulness before enabling reward mechanics.

---

## 23. Anti-Abuse Hooks

Do not implement full anti-abuse economics in v0.

But reserve fields:

```json
{
  "anti_abuse": {
    "requires_review": true,
    "duplicate_checked": false,
    "similarity_checked": false,
    "self_use_weight": "limited",
    "same_community_weight": "dampened",
    "suspicious_activity": false,
    "notes": ""
  }
}
```

This supports later protection against:

- copy spam;
- duplicate submissions;
- fake clone rings;
- same-community inflation;
- bot downloads;
- low-value remix spam;
- reward farming.

---

## 24. Canonical Artifact Identity Object

Recommended reusable identity object:

```json
{
  "identity": {
    "id": "NB.SERVUO.FILE_SCAN.v1",
    "artifact_type": "neoblock",
    "library_code": "NB-001",
    "name": "File / Class Scanner",
    "version": "1.0.0",
    "namespace": "SERVUO",
    "slug": "FILE_SCAN"
  }
}
```

Required fields:

```text
id
artifact_type
library_code
name
version
namespace
slug
```

---

## 25. Full Minimal Artifact Metadata

Recommended minimal metadata for any public artifact:

```json
{
  "identity": {
    "id": "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1",
    "artifact_type": "molt_block",
    "library_code": "001",
    "name": "Minimal Patch Instruction",
    "version": "1.0.0",
    "namespace": "CODING",
    "slug": "MINIMAL_PATCH"
  },
  "provenance": {
    "origin": "core_library",
    "creator_id": "NeoMagnetar",
    "submitted_by": "NeoMagnetar",
    "parent_ids": [],
    "derived_from": [],
    "inspired_by": [],
    "created_at": "2026-04-27T00:00:00Z",
    "updated_at": "2026-04-27T00:00:00Z",
    "content_hash": "sha256:...",
    "package_hash": "sha256:...",
    "public_status": "promoted",
    "review_status": "approved",
    "license": "public-umg-default",
    "attribution_required": true
  },
  "uniqueness": {
    "class": "original",
    "duplicate_of": null,
    "similar_to": [],
    "similarity_score": null,
    "review_notes": "",
    "meaningful_difference": []
  },
  "reward": {
    "eligible_for_tracking": true,
    "eligible_for_rewards": false,
    "reward_policy": null,
    "abuse_review_required": true
  }
}
```

---

## 26. File Naming

Recommended file naming should use artifact IDs where practical.

Examples:

```text
AI/BLOCKS/Instruction/BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1.json
AI/NEOBLOCKS/coders/NB.SERVUO.FILE_SCAN.v1.json
AI/NEOSTACKS/coders/NS.CODER.SERVUO.MASTER.v1.json
AI/SLEEVES/categories/coders/SLV.CODER.SERVUO.v1/sleeve.json
AI/CAPABILITIES/toolpacks/TP.REPO_ANALYSIS.v1/toolpack.json
```

Human-readable cards may mirror the IDs:

```text
HUMAN/blocks/Instruction/BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1.md
HUMAN/neoblocks/coders/NB.SERVUO.FILE_SCAN.v1.md
HUMAN/neostacks/coders/NS.CODER.SERVUO.MASTER.v1.md
HUMAN/sleeves/coders/SLV.CODER.SERVUO.v1.md
```

---

## 27. Relationship to Source Map

The IR source map should reference identity/provenance fields.

Example:

```json
{
  "ir_node_id": "NB.SERVUO.FILE_SCAN.v1",
  "artifact_id": "NB.SERVUO.FILE_SCAN.v1",
  "artifact_type": "neoblock",
  "source_path": "AI/NEOBLOCKS/coders/NB.SERVUO.FILE_SCAN.v1.json",
  "source_origin": "UMG-Block-Library",
  "content_hash": "sha256:..."
}
```

This connects:

```text
artifact identity
provenance
IR node
Trace event
Relation Matrix line
RuntimeSpec entry
future usage event
```

---

## 28. Relationship to Relation Matrix

Relation Matrix should use artifact IDs, not display names.

Good:

```text
NB.SERVUO.FILE_SCAN.v1 [A]
```

Bad:

```text
File Scanner [A]
```

Reason:

- stable reference;
- trace compatibility;
- source-map compatibility;
- usage ledger compatibility;
- provenance compatibility.

---

## 29. Relationship to RuntimeSpec and Trace

RuntimeSpec should carry artifact IDs and resolved versions.

Trace should reference artifact IDs and source-map entries.

Example Trace event:

```json
{
  "event": "artifact.activated",
  "artifact_id": "NS.CODER.SERVUO.MASTER.v1",
  "artifact_type": "neostack",
  "content_hash": "sha256:...",
  "reason": "Selected by route.normal_code_patch"
}
```

This supports debugging and future usage accounting.

---

## 30. Submission Review Flow

A future public submission flow should roughly be:

```text
1. Receive artifact submission.
2. Validate schema.
3. Normalize meaningful content.
4. Generate content hash.
5. Check exact duplicate.
6. Check near-duplicate/similarity.
7. Assign or verify artifact ID.
8. Record provenance.
9. Classify uniqueness.
10. Review safety/quality.
11. Promote, reject, or request changes.
12. If promoted, publish to catalog.
```

This can be manual at first.

It does not require full automation in v0.

---

## 31. Exact Duplicate Handling

If exact duplicate:

```text
do not create new original artifact ID
do not assign original creator credit
mark as duplicate
optionally record as clone/use/private copy
```

Example:

```json
{
  "uniqueness": {
    "class": "exact_duplicate",
    "duplicate_of": "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1"
  },
  "provenance": {
    "review_status": "duplicate",
    "public_status": "rejected"
  }
}
```

---

## 32. Derivative Handling

If derivative:

```text
allow new artifact ID if meaningful difference exists
require parent lineage
preserve upstream attribution
classify as derivative/variant/remix
```

Example:

```json
{
  "identity": {
    "id": "BLK.USER.ALEX.CODING.MINIMAL_PATCH_STRICT.v1"
  },
  "provenance": {
    "origin": "community_submission",
    "creator_id": "alex",
    "parent_ids": [
      "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1"
    ],
    "derived_from": [
      "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1"
    ]
  },
  "uniqueness": {
    "class": "variant",
    "meaningful_difference": [
      "adds stricter file-scope constraint",
      "changes activation context to dangerous-refactor route"
    ]
  }
}
```

---

## 33. Composite Handling

If composite original:

```text
allow new artifact ID
preserve dependencies
credit composition creator
preserve upstream artifact creators
```

Example:

```json
{
  "identity": {
    "id": "SLV.USER.MIRA.SERVUO.PVP_PATCH_REVIEW.v1",
    "artifact_type": "sleeve"
  },
  "provenance": {
    "origin": "community_submission",
    "creator_id": "mira",
    "parent_ids": [],
    "derived_from": []
  },
  "uniqueness": {
    "class": "composite_original",
    "meaningful_difference": [
      "new ServUO PvP patch review route",
      "custom safety guard bundle",
      "unique compile-check recovery stack"
    ]
  },
  "dependencies": {
    "blocks": [
      "BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1"
    ],
    "neoblocks": [
      "NB.SERVUO.FILE_SCAN.v1"
    ],
    "toolpacks": [
      "TP.REPO_ANALYSIS.v1"
    ]
  }
}
```

---

## 34. Public Library Founder/Core Set

The initial UMG core set may include many small foundational blocks created by the system founder.

This is acceptable.

Those blocks should still receive identity and provenance metadata.

However, future reward/usage weighting may distinguish:

```text
foundational core artifact
high-impact composite artifact
high-usage sleeve
high-value toolpack
domain-specific original contribution
```

The identity layer should record authorship.

Reward weighting is deferred.

---

## 35. Non-Goals for v0.1

This document does not define:

- final token supply;
- wallet architecture;
- smart contracts;
- reward equations;
- marketplace UI;
- anti-fraud scoring implementation;
- legal terms;
- exact license text;
- final similarity algorithm;
- final creator verification process.

It defines the identity and provenance substrate.

---

## 36. Acceptance Criteria

This section is complete when UMG artifacts can record:

- stable ID;
- human library code;
- artifact type;
- version;
- namespace;
- creator;
- origin;
- parent lineage;
- content hash;
- package hash;
- public status;
- review status;
- duplicate/variant/remix classification;
- dependency graph;
- reward-readiness flags.

That is enough for v0 foundation.

---

## 37. Summary

UMG artifact identity must support both simple library browsing and future public provenance.

The system should preserve clean `001`, `002`, `003` style human codes, but not rely on them as global identity.

Every artifact should receive:

```text
library_code
artifact_id
version
content_hash
package_hash
provenance
uniqueness classification
dependency graph
future reward hooks
```

The practical rule:

```text
Exact copies do not become new originals.
Meaningful variants can be derivatives.
Meaningful compositions can be original.
Usage can later credit every meaningful upstream artifact.
```

This lets UMG become a public modular library, a creator-attribution system, and eventually a creator economy without forcing crypto mechanics into v0.
