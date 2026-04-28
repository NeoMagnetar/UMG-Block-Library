# Section 10 — Human Library and AI Library Presentation v0.1

**Document ID:** `UMG_HUMAN_AI_LIBRARY_PRESENTATION.v0.1`  
**Status:** Foundation draft  
**Layer:** Public library presentation / documentation / machine-readable artifact access / human-readable mirror  
**Depends on:** `UMG_REPOSITORY_CONTRACT.v0.1`, `UMG_ARTIFACT_IDENTITY_AND_PROVENANCE.v0.1`, `UMG_SLEEVE_PACK_CONTRACT.v0.1`, `UMG_OBJECT_CONTRACTS.MOLT_NEOBLOCK_NEOSTACK.v0.1`  
**Feeds into:** UMG Block Library cleanup, public browsing UX, AI artifact loading, Human cards, indexes, visual references, future web/library UI  

---

## 1. Purpose

This document defines the presentation contract for the two public library surfaces:

```text
AI/
  = machine-readable, compiler/loadable, schema-aligned artifact surface

HUMAN/
  = readable, browsable, public-facing explanation and reference surface
```

The purpose is to keep the public UMG Block Library usable by both:

- AI systems / Envoy / compiler tooling;
- humans browsing, learning, reviewing, comparing, and selecting artifacts.

The key rule:

```text
AI is source-facing.
HUMAN is explanation-facing.
```

The AI layer should be machine-loadable.

The HUMAN layer should be readable and navigable.

They should mirror each other conceptually without duplicating authority.

---

## 2. Existing Repository Context

The current public Block Library already has this split.

The `AI/README.md` defines the AI side as the machine-readable or machine-oriented UMG surface for doctrine, schemas, manifests, baseline block libraries, and selected structural artifacts.

The `HUMAN/README.md` defines the HUMAN side as readable explanations, glossaries, guides, and curated public-facing views of UMG concepts.

`START-HERE.md` already directs new users through README, public scope, private exclusions, content status, AI doctrine, AI schemas, and Human glossary.

This contract formalizes that split into a v0.1 presentation law.

---

## 3. Core Presentation Rule

The core rule is:

```text
AI JSON is canonical.
HUMAN Markdown explains.
Catalogs index.
Cards summarize.
Visual references illustrate.
Trace and RuntimeSpec examples demonstrate.
```

The HUMAN side must not silently redefine artifacts differently from AI source files.

If HUMAN and AI disagree:

```text
AI source wins.
HUMAN card should be corrected.
```

---

## 4. AI Layer Role

The AI layer exists for:

```text
compiler loading
Envoy sleeve loading
schema validation
manifest indexing
artifact resolution
IR normalization
fixture testing
source-map references
stable ID lookup
provenance references
future registry ingestion
```

The AI layer should be structured, deterministic, and parseable.

It should avoid overly decorative prose.

---

## 5. HUMAN Layer Role

The HUMAN layer exists for:

```text
public browsing
plain-language explanation
developer orientation
creator review
artifact comparison
library teaching
visual reference
human-readable cards
guides and glossaries
usage examples
```

The HUMAN layer should be readable, searchable, and friendly to review.

It should avoid being the only place where operational truth exists.

---

## 6. AI Layer Recommended Structure

Recommended `AI/` structure:

```text
AI/
  README.md
  DOCTRINE/
  SCHEMAS/
  MANIFESTS/
  BLOCKS/
  NEOBLOCKS/
  NEOSTACKS/
  SLEEVES/
  CAPABILITIES/
  EXAMPLES/
  FIXTURES/
  RUNTIME/
  TRACE/
```

### `AI/DOCTRINE/`

Machine-oriented doctrine/reference specs.

Examples:

```text
UMG_COMPILER_LAW.v0.3.md
UMG_IR.v0.1.md
UMG_RELATION_MATRIX.v0.1.md
```

### `AI/SCHEMAS/`

JSON schemas and template schemas.

Examples:

```text
molt-block.schema.json
neoblock.schema.json
neostack.schema.json
sleeve.schema.json
toolpack.schema.json
artifact.identity.schema.json
provenance.schema.json
```

### `AI/MANIFESTS/`

Catalogs/indexes.

Examples:

```text
block-catalog.json
neoblock-catalog.json
neostack-catalog.json
sleeve-catalog.json
toolpack-catalog.json
schema-catalog.json
```

### `AI/BLOCKS/`

Canonical MOLT Block JSON.

Recommended:

```text
AI/BLOCKS/Trigger/
AI/BLOCKS/Directive/
AI/BLOCKS/Instruction/
AI/BLOCKS/Subject/
AI/BLOCKS/Primary/
AI/BLOCKS/Philosophy/
AI/BLOCKS/Blueprint/
```

### `AI/NEOBLOCKS/`

Canonical NeoBlock JSON.

Recommended category/domain grouping:

```text
AI/NEOBLOCKS/coders/
AI/NEOBLOCKS/business/
AI/NEOBLOCKS/research/
AI/NEOBLOCKS/visual/
AI/NEOBLOCKS/governance/
```

### `AI/NEOSTACKS/`

Canonical NeoStack JSON.

### `AI/SLEEVES/`

Canonical public Sleeve Packs.

### `AI/CAPABILITIES/`

Tool Pack and capability declarations.

### `AI/EXAMPLES/`

Instructional examples.

### `AI/FIXTURES/`

Deterministic test fixtures.

### `AI/RUNTIME/`

Only public-safe RuntimeSpec examples/contracts.

Not live runtime state.

### `AI/TRACE/`

Only public-safe trace examples/contracts.

Not raw private traces.

---

## 7. HUMAN Layer Recommended Structure

Recommended `HUMAN/` structure:

```text
HUMAN/
  README.md
  GLOSSARY/
  GUIDES/
  INDEXES/
  blocks/
  neoblocks/
  neostacks/
  sleeves/
  capabilities/
  visual-cards/
  examples/
  tutorials/
```

### `HUMAN/GLOSSARY/`

Readable definitions for UMG terms.

Examples:

```text
MOLT.md
NeoBlock.md
NeoStack.md
Sleeve.md
IR.md
Relation-Matrix.md
RuntimeSpec.md
Trace.md
Governance-Overlay.md
```

### `HUMAN/GUIDES/`

Walkthroughs and conceptual guides.

Examples:

```text
How-to-read-a-sleeve.md
How-MOLT-blocks-compose.md
How-governance-routing-works.md
How-toolpacks-bind.md
```

### `HUMAN/INDEXES/`

Human-readable catalog pages.

Examples:

```text
Block-Index.md
NeoBlock-Index.md
NeoStack-Index.md
Sleeve-Index.md
ToolPack-Index.md
```

### `HUMAN/blocks/`

Human cards for MOLT Blocks.

### `HUMAN/neoblocks/`

Human cards for NeoBlocks.

### `HUMAN/neostacks/`

Human cards for NeoStacks.

### `HUMAN/sleeves/`

Human cards for Sleeve Packs.

### `HUMAN/capabilities/`

Human cards for Tool Packs and capabilities.

### `HUMAN/visual-cards/`

Visual references and image assets.

---

## 8. Source-of-Truth Rule

The source of truth is:

```text
AI artifact JSON
```

The following are projections:

```text
HUMAN cards
catalog markdown
visual cards
tutorials
rendered website pages
screenshots
Relation Matrix examples
```

If a Human card describes a sleeve route that is not in `sleeve.json`, the Human card is wrong.

If a visual card displays a capability that is not declared in `toolpack.json` or `sleeve.json`, the visual card is wrong.

---

## 9. Human Card Purpose

A Human card is a readable summary of one artifact.

It should help someone quickly answer:

```text
What is this?
What type is it?
What does it do?
Where does it fit?
What does it depend on?
What uses it?
Who created it?
What is its status?
How do I use it?
```

Human cards should not be long essays unless the artifact requires it.

---

## 10. Human Card Required Fields

A Human card should include:

```text
Artifact ID
Name
Artifact type
Library code
Version
Status
Creator
Summary
Purpose
Inputs / dependencies
Outputs / effects
Composition
Routes or activation behavior if applicable
Capabilities if applicable
Related artifacts
Source JSON path
Public status
Review status
```

Recommended card header:

```markdown
# NB.SERVUO.FILE_SCAN.v1 — File / Class Scanner

**Type:** NeoBlock  
**Library Code:** NB-SERVUO-001  
**Version:** 1.0.0  
**Status:** Draft  
**Creator:** NeoMagnetar  
**Source:** `AI/NEOBLOCKS/coders/NB.SERVUO.FILE_SCAN.v1.json`
```

---

## 11. Human Card Template — MOLT Block

```markdown
# BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1 — Minimal Patch Instruction

**Type:** MOLT Block  
**MOLT Type:** Instruction  
**Library Code:** 001  
**Version:** 1.0.0  
**Status:** Draft  
**Creator:** NeoMagnetar  
**Source JSON:** `AI/BLOCKS/Instruction/BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1.json`

## Summary

Prefer the smallest correct code patch that satisfies the task.

## Role

This block constrains code-generation behavior.

## Composition Use

Commonly used inside:

- `NB.SERVUO.PATCH_PLANNER.v1`
- `NS.CODER.SERVUO.MASTER.v1`

## Merge / Stack Behavior

- Stack key: `coding.patch_scope`
- Merge key: `coding.patch_rules`
- Merge policy: `dedupe_append`

## Notes

This card is a human-readable mirror. The JSON artifact is canonical.
```

---

## 12. Human Card Template — NeoBlock

```markdown
# NB.SERVUO.FILE_SCAN.v1 — File / Class Scanner

**Type:** NeoBlock  
**Library Code:** NB-SERVUO-001  
**Version:** 1.0.0  
**Status:** Draft  
**Creator:** NeoMagnetar  
**Source JSON:** `AI/NEOBLOCKS/coders/NB.SERVUO.FILE_SCAN.v1.json`

## Purpose

Scan ServUO files and classes relevant to a code task.

## MOLT Blocks Used

- `BLK.TRIGGER.CODING.CODE_PATCH_REQUEST.v1`
- `BLK.SUBJECT.SERVUO.FILE_SYSTEM.v1`
- `BLK.INSTRUCTION.CODING.SCAN_CLASSES.v1`

## Runtime Role

Small practical runtime unit for locating relevant files/classes before patch planning.

## Geometry

- Vertical: request/context before scan
- Horizontal: may sibling with API map or dependency trace

## Capabilities

- `CAP.REPO.READ`

## Related Artifacts

- `NS.CODER.SERVUO.MASTER.v1`
```

---

## 13. Human Card Template — NeoStack

```markdown
# NS.CODER.SERVUO.MASTER.v1 — ServUO Master Coder Stack

**Type:** NeoStack  
**Library Code:** NS-CODER-001  
**Version:** 1.0.0  
**Status:** Draft  
**Creator:** NeoMagnetar  
**Source JSON:** `AI/NEOSTACKS/coders/NS.CODER.SERVUO.MASTER.v1.json`

## Purpose

Coordinate ServUO code context loading, analysis, patch planning, generation, and output.

## Main NeoBlocks

- `NB.SERVUO.REQUEST_INTAKE.v1`
- `NB.SERVUO.REPO_CONTEXT.v1`
- `NB.SERVUO.FILE_SCAN.v1`
- `NB.SERVUO.PATCH_PLANNER.v1`

## Routes

Used by:

- `route.normal_code_patch`
- `route.compile_recovery`

## Governance

Can be activated or offed by `OVR.GOV.CODE_ROUTER.v1`.

## Capabilities

- `CAP.REPO.SEARCH`
- `CAP.REPO.READ`
- `CAP.PATCH.RENDER`
```

---

## 14. Human Card Template — Sleeve

```markdown
# SLV.CODER.SERVUO.v1 — ServUO Coder Sleeve

**Type:** Sleeve Pack  
**Library Code:** SLV-CODER-001  
**Version:** 1.0.0  
**Status:** Draft  
**Creator:** NeoMagnetar  
**Source JSON:** `AI/SLEEVES/categories/coders/SLV.CODER.SERVUO.v1/sleeve.json`

## Purpose

Configure Envoy as a ServUO-aware coding assistant.

## Main NeoStack

- `NS.CODER.SERVUO.MASTER.v1`

## Routes

- `route.normal_code_patch`
- `route.docs_only`
- `route.compile_recovery`

## Required Capabilities

- `CAP.REPO.SEARCH`
- `CAP.REPO.READ`

## Recommended Tool Packs

- `TP.REPO_ANALYSIS.v1`
- `TP.SERVUO.CODER_TOOLS.v1`

## Runtime Notes

This sleeve declares configuration. Tool execution is handled by Envoy through Tool Packs.

## Source of Truth

`sleeve.json` is canonical. This card is explanatory.
```

---

## 15. Human Card Template — Tool Pack

```markdown
# TP.REPO_ANALYSIS.v1 — Repo Analysis Tool Pack

**Type:** Tool Pack  
**Library Code:** TP-REPO-001  
**Version:** 1.0.0  
**Status:** Draft  
**Creator:** NeoMagnetar  
**Source JSON:** `AI/CAPABILITIES/toolpacks/TP.REPO_ANALYSIS.v1/toolpack.json`

## Purpose

Provide repository search and read capabilities to Envoy.

## Capabilities Provided

- `CAP.REPO.SEARCH`
- `CAP.REPO.READ`

## Tools

- `repo.search`
- `repo.readFile`

## Permissions

- `filesystem.read`

## Safety

- Fail closed: yes
- Side effects: read-only
- Trace all invocations: yes
```

---

## 16. AI Manifest Role

Manifests are machine-readable catalogs.

They should index artifacts, not redefine them.

A catalog entry should include:

```text
artifact_id
artifact_type
name
version
status
source_path
summary
tags
content_hash
public_status
review_status
```

Example:

```json
{
  "artifact_id": "NB.SERVUO.FILE_SCAN.v1",
  "artifact_type": "neoblock",
  "name": "File / Class Scanner",
  "version": "1.0.0",
  "status": "draft",
  "source_path": "AI/NEOBLOCKS/coders/NB.SERVUO.FILE_SCAN.v1.json",
  "summary": "Scans ServUO files and classes relevant to a code task.",
  "tags": ["servuo", "coder", "file-scan"],
  "content_hash": "sha256:...",
  "public_status": "draft",
  "review_status": "unreviewed"
}
```

Do not put full artifact bodies inside catalogs unless intentionally generating a special bundled index.

---

## 17. Human Index Role

Human indexes are browsable lists.

They should help humans find artifacts by:

```text
type
category
domain
status
creator
purpose
capability
sleeve
NeoStack
use case
```

Example Human index table:

```markdown
| ID | Name | Type | Status | Purpose |
|---|---|---|---|---|
| `NB.SERVUO.FILE_SCAN.v1` | File / Class Scanner | NeoBlock | Draft | Scans ServUO files/classes |
```

Human indexes should link to Human cards and source JSON.

---

## 18. AI/HUMAN Cross-Linking

Every Human card should link to source JSON.

Every AI artifact may optionally link to Human card.

Recommended AI artifact docs field:

```json
{
  "docs": {
    "human_card": "HUMAN/neoblocks/coders/NB.SERVUO.FILE_SCAN.v1.md"
  }
}
```

Recommended Human card field:

```markdown
**Source JSON:** `AI/NEOBLOCKS/coders/NB.SERVUO.FILE_SCAN.v1.json`
```

This creates two-way navigation without duplicating authority.

---

## 19. Visual Cards

Visual cards are optional presentation artifacts.

They may show:

```text
artifact type
MOLT role
geometry
active route
dependencies
capabilities
creator
status
```

Visual cards should be treated as explanatory assets.

They must not become source of truth.

If a visual card conflicts with the AI JSON, the visual card is wrong.

---

## 20. Readability Rules

Human docs should use:

```text
clear headings
stable artifact IDs
short summaries
tables where useful
plain explanations
links to source JSON
links to related artifacts
minimal hype
clear status labels
```

Avoid:

```text
unmarked speculation
untracked renamed artifacts
different IDs than AI layer
rewriting source content in conflicting ways
long unstructured prose without IDs
```

---

## 21. Machine-Readability Rules

AI artifacts should use:

```text
stable JSON shapes
stable artifact IDs
source-map compatible paths
content hashes
package hashes where needed
explicit dependency arrays
explicit capability arrays
explicit status fields
schema versions
```

Avoid:

```text
informal prose as only source of truth
missing IDs
ambiguous dependencies
unversioned artifacts
runtime logs in canonical artifacts
private paths in public JSON
```

---

## 22. Public Scope Status

The public library may be partial.

Partial is acceptable if honest.

Each folder or catalog should clarify status:

```text
draft
partial
curated
generated
provisional
promoted
deprecated
archived
```

The public library should not pretend that every planned folder is fully populated.

---

## 23. Generated vs Curated Content

Some files may be generated from source artifacts.

Generated content should say so.

Recommended generated header:

```markdown
> Generated from `AI/NEOBLOCKS/coders/NB.SERVUO.FILE_SCAN.v1.json`.
> Do not edit this card manually unless intentionally overriding generation.
```

Curated Human docs may be manually written.

If manually written, they should still point to canonical source artifacts.

---

## 24. Documentation Status Labels

Recommended labels:

```text
canonical
curated
generated
draft
provisional
historical
deprecated
archived
```

Use these labels consistently.

Example:

```markdown
**Documentation Status:** Generated  
**Artifact Status:** Draft  
**Public Status:** Submitted  
```

---

## 25. Runtime / Trace Examples

Public runtime and trace examples should live under AI examples/fixtures, not live runtime folders.

Allowed public examples:

```text
golden RuntimeSpec
golden Trace
Relation Matrix example
compile fixture
tutorial route trace
sanitized runtime example
```

Disallowed public runtime content:

```text
raw private session trace
private tool logs
personal runtime state
unredacted file paths
secrets
active local agent state
```

---

## 26. Browse Order for New Users

Recommended public browse order:

```text
README.md
START-HERE.md
META/PUBLIC-SCOPE.md
META/CONTENT-STATUS.md
HUMAN/GLOSSARY/
HUMAN/GUIDES/
HUMAN/INDEXES/
HUMAN/sleeves/
AI/SCHEMAS/
AI/MANIFESTS/
```

Humans should generally start with HUMAN.

AI/tooling should generally start with AI.

Developers should use both.

---

## 27. Browse Order for Envoy / AI

Recommended loader order:

```text
AI/SCHEMAS/
AI/MANIFESTS/
AI/SLEEVES/
AI/NEOSTACKS/
AI/NEOBLOCKS/
AI/BLOCKS/
AI/CAPABILITIES/
AI/FIXTURES/
```

Envoy should not rely on Human cards for compile behavior.

Human cards may help an LLM summarize or explain, but source JSON drives compile.

---

## 28. File Naming Rules

Use artifact IDs when practical.

Examples:

```text
AI/BLOCKS/Instruction/BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1.json
HUMAN/blocks/Instruction/BLK.INSTRUCTION.CODING.MINIMAL_PATCH.v1.md

AI/NEOBLOCKS/coders/NB.SERVUO.FILE_SCAN.v1.json
HUMAN/neoblocks/coders/NB.SERVUO.FILE_SCAN.v1.md

AI/NEOSTACKS/coders/NS.CODER.SERVUO.MASTER.v1.json
HUMAN/neostacks/coders/NS.CODER.SERVUO.MASTER.v1.md

AI/SLEEVES/categories/coders/SLV.CODER.SERVUO.v1/sleeve.json
HUMAN/sleeves/coders/SLV.CODER.SERVUO.v1.md
```

This improves lookup, source maps, trace links, and future registry behavior.

---

## 29. Source Path Stability

Public artifacts should avoid unnecessary path changes.

If paths change, catalogs/source maps should update.

Stable paths matter for:

```text
compiler references
Envoy loader
Trace
Relation Matrix
Human cards
future website routes
creator attribution
usage events
```

---

## 30. AI Library Validation

The AI layer should be validated for:

```text
schema correctness
required identity/provenance fields
stable IDs
valid dependency references
valid paths
valid content hashes if present
no private paths/secrets
catalog source paths exist
```

Human docs can be validated for:

```text
source JSON link exists
artifact ID matches source
status matches source
related artifact links exist
```

---

## 31. Human Library Generation Path

Eventually, many Human cards can be generated from AI artifacts.

Possible generation flow:

```text
AI artifact JSON
  ↓
card generator
  ↓
Human card Markdown
  ↓
Human index update
  ↓
visual card metadata
```

Manual curation can add:

```text
plain-language explanation
usage examples
domain context
visual diagram notes
```

But generated fields should remain tied to AI source.

---

## 32. Website / UI Future Path

The Human and AI split supports a future web UI.

A website can show:

```text
Human card
source JSON tab
Relation Matrix example
dependency graph
creator attribution
download/clone buttons
usage examples
related sleeves
visual geometry
tool requirements
```

This UI should read from the same artifact contracts.

Do not create a separate website-only data model unless it is a generated projection.

---

## 33. Public Submission Presentation

For future public submissions, the Human side should show:

```text
submitted by
creator
status
review state
uniqueness class
parent artifacts
dependencies
meaningful difference
usage stats later
```

The AI side should store these in provenance/uniqueness fields.

The Human side should display them clearly.

---

## 34. Creator Economy Presentation

Future creator economy presentation may include:

```text
creator profile
artifact count
downloads
clones
usage
derivative graph
upstream credit
reward eligibility
abuse review state
```

This should be display-only until reward mechanics are formally implemented.

Do not let UI display imply payout eligibility unless backend status says so.

---

## 35. Security / Privacy Presentation

Human docs should not expose:

```text
private paths
private runtime logs
tokens
keys
raw traces
private tool outputs
personal context
unreviewed Resleever contents
```

If an example requires path-like text, use generic placeholders:

```text
C:/path/to/project
/home/user/project
<workspace-root>
```

---

## 36. AI/HUMAN Consistency Checks

Recommended consistency checks:

```text
every AI artifact has optional Human card path or explicit no-card status
every Human card points to valid AI source
artifact ID in Human card matches AI source
status in Human card matches AI source
dependencies listed in Human card are subset or readable mirror of AI source
catalog entries point to valid files
no Human card invents capabilities absent in AI source
```

---

## 37. Minimal v0 Presentation Target

For v0, the public library should prioritize:

```text
AI schemas
AI manifests
baseline block JSON
one or more example NeoBlocks
one or more example NeoStacks
one or more example Sleeve Packs
Human glossary
Human indexes
Human cards for example artifacts
sanitized fixtures/examples
```

Do not try to make the whole future website immediately.

---

## 38. Non-Goals for v0.1

This section does not implement:

```text
full web UI
full marketplace
complete automatic card generator
final visual designer
creator dashboard
reward dashboard
advanced search ranking
final public submission workflow
```

It defines presentation structure and source-of-truth boundaries.

---

## 39. Acceptance Criteria

This section is complete when UMG Block Library can clearly distinguish:

```text
machine-readable AI artifacts
human-readable documentation/cards
canonical source JSON
generated/curated explanations
indexes/catalogs
visual references
examples/fixtures
public-safe traces
private/runtime exclusions
```

And when a user or tool can answer:

```text
Where is the source artifact?
Where is the human explanation?
Which one is authoritative?
How do I browse it?
How does Envoy load it?
How does the future UI render it?
```

---

## 40. Summary

The AI/HUMAN split is one of the most important public-library boundaries.

```text
AI/ stores what the system loads.
HUMAN/ stores what people read.
```

The two sides should mirror each other through stable artifact IDs and links.

The AI side is canonical.

The HUMAN side explains, indexes, teaches, and displays.

This lets UMG serve both machines and people without confusing source-of-truth authority.
