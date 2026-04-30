# AI MANIFESTS

## What this section is
This section is the machine-readable manifest shelf for the UMG Block Library. It contains source-oriented indexes that help agents and tooling discover sleeves, block libraries, gates, NeoBlocks, NeoStacks, and release-approved content.

## What this section is not
This is not the public browsing shelf for humans, and it is not the same thing as the package-facing manifest lane under `sleeves/manifests/`. It should not be read as a promise that every referenced object is publicly promoted for package/runtime use.

## Who should use this
- AI agents
- package tooling
- maintainers
- future contributors
- humans who want the direct/source-oriented view

## Canonical source rule
Current status: canonical machine source for direct/source-oriented manifest discovery.

## How this maps to nearby sections
- `AI/SLEEVES/` contains the machine-readable sleeve shelf these manifests help describe.
- `HUMAN/SLEEVES/` contains readable explanations for people.
- `sleeves/manifests/` contains the public/package-facing curated sleeve catalog.
- `AI/MOLT-BLOCKS/`, `AI/NEOBLOCKS/`, and `AI/NEOSTACKS/` provide the machine-facing objects referenced by these manifests.

## Current status
- active/canonical
- machine-facing

## Two sleeve catalogs
This folder contains `sleeve-catalog.json`, which is the direct/source-oriented machine catalog.

The separate file `sleeves/manifests/catalog.json` is the public/package-facing curated catalog.

Those two catalogs may differ intentionally.

Reasons they may differ include:
- some sleeves are still source/reference material rather than public promoted artifacts
- some sleeves may be documented in `HUMAN/` but not exposed as public runnable machine sleeves
- stage5, historical, testing, compatibility, or transitional sleeves should not be confused with promoted public success-path sleeves
- catalog IDs and runtime/payload IDs may differ depending on the lane and promotion state

## source_path note
If a manifest entry includes `source_path`, read that as a locator pointing back to the source-oriented artifact location used by maintainers or machine tooling. It is not automatically a promise that the same sleeve is public, promoted, or package-facing.

## Where to go next
- `AI/MANIFESTS/sleeve-catalog.json`
- `sleeves/manifests/README.md`
- `AI/SLEEVES/README.md`
- `HUMAN/SLEEVES/README.md`
