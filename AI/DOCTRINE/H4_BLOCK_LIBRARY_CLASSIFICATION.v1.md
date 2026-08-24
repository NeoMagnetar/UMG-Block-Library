# H4 Block Library Classification v1

## Authority

Compiler semantic authority is `NeoMagnetar/umg-compiler-vnext` commit `c505f9a7f23010574733c8c03c4162af5317a5eb`, tagged `compiler-vnext-v0.1.0-experimental-h4-qualified`.

The only H4 MOLT lanes are:

```text
trigger
directive
instruction
subject
primary
philosophy
blueprint
```

The Block Library manifest is a classification and provenance surface. It does not replace compiler authority.

## Category rules

- Language is `Instruction > Language`.
- Persona is `Instruction > Persona`.
- AIM, USE, and NEED are Platform extensions and are explicitly `NOT_H4_MOLT`.
- OFF is a Governance prohibition, not a MOLT lane.
- Priority/weights and compiler-v0 routing semantics are legacy/historical unless explicitly carried as compatibility metadata.

## Authority class and lifecycle

Authority classification and lifecycle status are independent.

Current classes include `H4_CANONICAL_MOLT`, `H4_CANDIDATE_MOLT`, `PLATFORM_EXTENSION`, `DERIVED_EXPORT`, `LEGACY_COMPATIBILITY`, `EXPERIMENTAL`, and `HISTORICAL_REFERENCE`.

Lifecycle values include `active`, `draft`, `deprecated`, `historical`, and `archived`.

## BR-1 language identity rule

The 30 language records retain `BP.001` through `BP.030`. Their former Blueprint identity history is recorded in the migration map. BR-1 does not create replacement IDs or aliases.

Compiler-facing content is projected deterministically with `language_fields_v1`:

```text
Language: {name}
Structure: {structure}
Conventions: {conventions}
Output characteristics: {output_characteristics}
```

Source values are copied verbatim in fixed field order. No language instruction is generated or paraphrased.

## Trigger status

Direct aggregate Trigger source count is zero. Trigger canon remains unresolved. Gates, samples, Website counts, and unverified historical material are not substitutes for provenance-backed Trigger records.
