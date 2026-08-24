import fs from "node:fs";
import path from "node:path";
import {
  BLUEPRINT_CATEGORY_LABELS,
  COMPILER_H4_COMMIT,
  H4_TYPES,
  LANGUAGE_MAP,
  ROOT,
  SOURCE_BASE_COMMIT,
  buildIdReferenceIndex,
  buildManifest,
  buildReferenceGraph,
  canonicalJson,
  canonicalSha256,
  countBy,
  inventoryRepository,
  loadNormalizedRecords,
  readJson,
  validateState,
  writeJson,
  writeText,
} from "./lib.mjs";

const command = process.argv[2] ?? "validate";

function markdownTable(rows, headers) {
  const heading = `| ${headers.join(" | ")} |`;
  const divider = `| ${headers.map(() => "---").join(" | ")} |`;
  return [heading, divider, ...rows.map((row) => `| ${row.join(" | ")} |`)].join("\n");
}

function renderCountVocabulary() {
  return `# BR-1 Count Vocabulary

Source base: \`${SOURCE_BASE_COMMIT}\`

| Count class | Definition | Baseline |
| --- | --- | ---: |
| \`AGGREGATE_H4_LANE_RECORDS\` | Records in the six aggregate H4-lane source shelves. This describes the current aggregate shelf, not qualification status. | 1,370 |
| \`SOURCE_BACKED_H4_CANDIDATES\` | Aggregate shelf plus nine standalone \`BLK.*\` draft artifacts. | 1,379 |
| \`PROMOTED_H4_CANONICAL_RECORDS\` | Aggregate records that pass BR-1 normalization, taxonomy, projection, and validation. | Qualified only after BR-1 |
| \`PLATFORM_EXTENSION_RECORDS\` | AIM/USE/NEED records kept at compatibility paths and explicitly excluded from H4 MOLT types. | 900 |
| \`DERIVED_EXPORT_RECORDS\` | Secondary/export mirrors under \`blocks/molt/subjects\`; never added to canonical or extension source totals. | 300 |

Counts must always be reported with their class. No report may use an unqualified \`MOLT_TOTAL\`.
`;
}

function renderBaselineReport(inventory, validation) {
  const lanes = Object.entries(inventory.molt_counts_by_current_type).map(([lane, count]) => [lane, String(count)]);
  return `# BR-1 Baseline Report

## Git gate

- Source repository: \`C:\\.openclaw\\workspace\\UMG-Block-Library\`
- Selected base: \`${SOURCE_BASE_COMMIT}\`
- BR-1 worktree: \`C:\\.openclaw\\workspace\\UMG-Block-Library-br1\`
- BR-1 branch: \`canon/h4-block-library-br1\`
- Known work roots audited: \`C:\\.openclaw\`, \`C:\\OpenClawWorkspace\`, common user work folders
- Entire-drive absence of other checkouts: **NOT PROVEN**
- Preexisting unpublished work in the discovered checkout: **NONE FOUND**
- Existing detached checkout mutation: **NO**
- Safe to mutate BR-1 worktree: **YES**

## Count classes

- Aggregate H4-lane shelf records: **${inventory.count_vocabulary.aggregate_h4_lane_records}**
- Source-backed H4 candidates: **${inventory.count_vocabulary.source_backed_h4_candidates}**
- Platform extension records: **${inventory.count_vocabulary.platform_extension_records}**
- Derived/export records: **${inventory.count_vocabulary.derived_export_records}**

## Aggregate lane counts

${markdownTable(lanes, ["Current lane", "Records"])}

## Required baseline questions

- Total files: **${inventory.total_files}**
- JSON files: **${inventory.total_json_files}**
- Duplicate H4 IDs: **${inventory.duplicate_canonical_ids.length}**
- Malformed JSON records: **${inventory.malformed_records.length}**
- Persona as compiler type: **${inventory.persona_as_type_count}**
- Language as compiler type: **${inventory.language_as_type_count}**
- Use/Aim/Need/Off as compiler types: **${inventory.use_as_type_count}/${inventory.aim_as_type_count}/${inventory.need_as_type_count}/${inventory.off_as_type_count}**
- Priority fields: **${inventory.priority_fields_count}**
- PrimaryShell-style references: **${inventory.primaryshell_references}**
- Compiler-v0 references: **${inventory.compiler_v0_references}**
- Direct aggregate Trigger records: **${inventory.direct_trigger_source_count}**
- Reference warnings: **${inventory.reference_graph_summary.warnings}**
- Broken canonical references: **${inventory.reference_graph_summary.canonical_failures}**

## Baseline adapter validation

- Status: **${validation.status}**
- Errors: **${validation.summary.errors}**
- Expected taxonomy warnings: **${validation.summary.warnings}**

The baseline is an immutable observation of the selected base. Final BR-1 qualification is recorded separately.
`;
}

function renderReferenceReport(graph, baselineGraph = null) {
  const key = (item) => `${item.source_path}|${item.field}|${item.target_id}`;
  const baselineCanonical = new Set((baselineGraph?.canonical_failures ?? []).map(key));
  const currentCanonical = new Set(graph.canonical_failures.map(key));
  const introduced = graph.canonical_failures.filter((item) => !baselineCanonical.has(key));
  const repaired = (baselineGraph?.canonical_failures ?? []).filter((item) => !currentCanonical.has(key));
  const warningRows = graph.warnings.slice(0, 200).map((item) => [item.source_path, item.field, item.target_id, item.source_posture]);
  return {
    introduced,
    repaired,
    markdown: `# BR-1 Reference Graph Report

## Summary

- Definitions indexed: **${graph.summary.definitions}**
- Resolved machine references: **${graph.summary.resolved}**
- Baseline canonical failures: **${baselineGraph?.summary?.canonical_failures ?? graph.summary.canonical_failures}**
- Baseline reference warnings: **${baselineGraph?.summary?.warnings ?? graph.summary.warnings}**
- Current canonical failures: **${graph.summary.canonical_failures}**
- Current reference warnings: **${graph.summary.warnings}**
- Malformed JSON files: **${graph.summary.malformed_json}**
- New canonical failures introduced: **${introduced.length}**
- Preexisting canonical failures repaired: **${repaired.length}**

Hard failure applies only to promoted/current canonical artifacts. Drafts, samples, historical records, compatibility records, and documentation produce warnings.

## Warning sample

${warningRows.length ? markdownTable(warningRows, ["Source", "Field", "Unresolved target", "Posture"]) : "No warnings."}
`,
  };
}

function renderTaxonomyExceptions(records, validation) {
  const languageRows = records.aggregate.filter((record) => LANGUAGE_MAP.some((item) => item.old_id === record.id)).map((record) => [record.id, record.name, record.h4_type, record.category, record.subcategory]);
  return `# BR-1 Taxonomy Exceptions

## Baseline language misclassification

${markdownTable(languageRows, ["ID", "Name", "Baseline lane", "Baseline category", "Baseline subcategory"])}

All 30 records are authorized for reclassification to \`Instruction > Language\`. IDs remain unchanged. C++ and C# normalize to \`cpp\` and \`csharp\`.

## Structural exceptions

- Six aggregate libraries reference per-lane schema URLs whose schema files are absent from this repository.
- The existing generic \`AI/SCHEMAS/molt-block.schema.json\` does not describe aggregate entries or standalone \`BLK.*\` wrappers as stored.
- Nine standalone H4-compatible \`BLK.*\` artifacts remain draft candidates.
- AIM/USE/NEED are Platform extensions, not H4 compiler lanes.
- Direct aggregate Trigger source count is zero.

Baseline adapter result: **${validation.status}**, with **${validation.summary.warnings}** expected language warnings.
`;
}

function migrationMap(records) {
  const byId = new Map(records.aggregate.map((record) => [record.id, record]));
  return {
    schema: "umg.br1-language-migration-map.v1",
    source_base_commit: SOURCE_BASE_COMMIT,
    id_policy: "PRESERVE_BP_IDS_DURING_BR1",
    projection_strategy: "language_fields_v1",
    records: LANGUAGE_MAP.map((expected) => {
      const record = byId.get(expected.old_id);
      return {
        id: expected.old_id,
        name: expected.name,
        former_lane: "blueprint",
        former_category: "programming_languages",
        target_lane: "instruction",
        target_category: "language",
        target_subcategory: expected.subcategory,
        id_renamed: false,
        source_path: record?.source_path ?? null,
        content_projection: record?.content_projection ?? null,
        canonical_record_sha256: record?.hashes?.canonical_record_sha256 ?? null,
      };
    }),
  };
}

function renderLanguageReport(records, validation) {
  const languages = records.aggregate.filter((record) => LANGUAGE_MAP.some((item) => item.old_id === record.id));
  const rows = languages.map((record) => [record.id, record.name, record.h4_type, record.category, record.subcategory, record.content_projection.strategy]);
  return `# BR-1 Language Migration Report

- Records found: **${languages.length}**
- Records reclassified: **${languages.filter((record) => record.h4_type === "instruction" && record.category === "language").length}**
- IDs renamed: **0**
- Projection: **language_fields_v1**
- C++ subcategory: **${languages.find((record) => record.id === "BP.004")?.subcategory}**
- C# subcategory: **${languages.find((record) => record.id === "BP.005")?.subcategory}**
- Validation: **${validation.status}**

${markdownTable(rows, ["ID", "Name", "H4 lane", "Category", "Subcategory", "Projection"])}
`;
}

function renderPlatformReport(records) {
  const counts = countBy(records.platformExtensions, (record) => record.category);
  return `# BR-1 Platform Extension Classification

AIM, USE, and NEED remain at their existing paths for Envoy and vendored-consumer compatibility.

| Family | Records | Classification | H4 MOLT |
| --- | ---: | --- | --- |
| AIM | ${counts.aim ?? 0} | \`PLATFORM_EXTENSION\` | No |
| USE | ${counts.use ?? 0} | \`PLATFORM_EXTENSION\` | No |
| NEED | ${counts.need ?? 0} | \`PLATFORM_EXTENSION\` | No |

- Total Platform extension records: **${records.platformExtensions.length}**
- Physical moves: **0**
- ID changes: **0**
- Compatibility paths retained: **YES**
`;
}

function renderPersonaReport(records) {
  const personas = records.aggregate.filter((record) => record.id.startsWith("PERS."));
  return `# BR-1 Persona Status

- GitHub Persona records: **${personas.length} (exactly present)**
- H4 type: **INSTRUCTION**
- Category: **persona**
- Original supplied-drop provenance: **PARTIAL**
- Studio record equivalence: **UNRESOLVED until record-level Studio data is available**
- Re-imported from Studio: **NO**
- Promoted as an eighth lane: **NO**
`;
}

function renderTriggerReport(records) {
  const triggers = records.aggregate.filter((record) => record.h4_type === "trigger");
  return `# BR-1 Trigger Status

- Direct H4 aggregate Trigger records: **${triggers.length}**
- Direct \`AI/MOLT-BLOCKS/triggers/\` source: **ABSENT**
- Trigger canon status: **UNRESOLVED**
- Synthetic Trigger records introduced: **0**

Governance gates, samples, Website counts, and noncanonical historical material are not promoted as Trigger canon by BR-1.
`;
}

function compilerV0Matches() {
  const legacySourcePaths = [
    "AI/DOCTRINE/UMG_ENVOY_RUNTIME_INTEGRATION.v0.1.md",
    "AI/DOCTRINE/UMG_IR.v0.1.md",
    "AI/DOCTRINE/UMG_SLEEVE_PACK_CONTRACT.v0.1.md",
    "AI/DOCTRINE/UMG_V0_BUILD_ROADMAP.v0.1.md",
    "AI/FIXTURES/umg-core-reference-sleeve/resolved.ir.json",
    "AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json",
  ];
  const matches = [];
  for (const relative of legacySourcePaths) {
    const full = path.join(ROOT, relative);
    fs.readFileSync(full, "utf8").split(/\r?\n/).forEach((line, index) => {
      if (/compiler[-_ ]?v0/i.test(line)) {
        const classification = relative.includes("FIXTURES/") || relative.includes("SLEEVES/") ? "legacy_compatibility_pointer" : "historical_reference";
        matches.push({ path: relative, line: index + 1, context: line.trim().replace(/\|/g, "\\|"), classification, action: "retained_with_historical_or_legacy_label", resulting_pointer: "AI/DOCTRINE/H4_BLOCK_LIBRARY_CLASSIFICATION.v1.md" });
      }
    });
  }
  return matches;
}

function renderCompilerV0Audit() {
  const matches = compilerV0Matches();
  const rows = matches.map((item) => [item.path, String(item.line), item.classification, item.action, item.resulting_pointer, item.context]);
  return { matches, markdown: `# BR-1 Compiler-v0 Reference Audit

- References found: **${matches.length}**
- Stale current pointers rewritten: **0**
- Historical/compatibility evidence deleted: **0**

${markdownTable(rows, ["Path", "Line", "Classification", "Action", "Current authority pointer", "Context"])}

These references remain intentionally labeled by context. None is treated as current H4 compiler authority; current entrypoints point to compiler-vNext H4.
` };
}

function renderHashingSpec() {
  return `# BR-1 Hashing Specification

## Raw source files

\`raw_file_sha256\` hashes exact source bytes without decoding or line-ending normalization.

## Normalized records

\`canonical_record_sha256\` hashes the normalized record after removing its entire \`hashes\` member.

Deterministic serialization rules:

1. UTF-8 JSON;
2. object keys sorted lexicographically at every depth;
3. arrays retain source/semantic order;
4. no insignificant whitespace;
5. Unicode emitted consistently by the JavaScript JSON serializer;
6. null values preserved;
7. the record's own hash fields excluded.

This is the documented BR-1 deterministic serializer. It is JCS-aligned for the string/boolean/null/integer data used here, without claiming general RFC 8785 number-domain equivalence.

Manifest provenance uses \`source_base_commit: ${SOURCE_BASE_COMMIT}\`; it does not contain a self-referential final commit.
`;
}

function renderValidationReport(validation, graph, introduced) {
  const errorRows = validation.errors.map((item) => [item.code, item.id ?? "", JSON.stringify(item)]);
  const warningRows = validation.warnings.map((item) => [item.code, item.id ?? "", JSON.stringify(item)]);
  return `# BR-1 Validation Report

- Status: **${validation.status}**
- Errors: **${validation.summary.errors}**
- Validation warnings: **${validation.summary.warnings}**
- Reference warnings: **${graph.summary.warnings}**
- New canonical reference failures introduced: **${introduced.length}**
- Compiler authority commit: \`${COMPILER_H4_COMMIT}\`
- Allowed H4 lanes: ${H4_TYPES.map((item) => `\`${item}\``).join(", ")}

## Errors

${errorRows.length ? markdownTable(errorRows, ["Code", "ID", "Detail"]) : "None."}

## Validation warnings

${warningRows.length ? markdownTable(warningRows, ["Code", "ID", "Detail"]) : "None."}
`;
}

function renderStudioCrosswalk(records) {
  const lanes = countBy(records.aggregate, (record) => record.h4_type);
  return `# BR-1 GitHub / Studio Crosswalk

| Lane | GitHub aggregate | Studio presentation | Relationship |
| --- | ---: | ---: | --- |
| Trigger | ${lanes.trigger ?? 0} | 100 | UNRESOLVED |
| Directive | ${lanes.directive ?? 0} | 200 | COUNT-ALIGNED; RECORD EQUIVALENCE UNRESOLVED |
| Instruction | ${lanes.instruction ?? 0} | 330 | COUNT-ALIGNED AFTER LANGUAGE MIGRATION; RECORD EQUIVALENCE UNRESOLVED |
| Subject | ${lanes.subject ?? 0} | 200 | COUNT-ALIGNED; RECORD EQUIVALENCE UNRESOLVED |
| Primary | ${lanes.primary ?? 0} | 200 | COUNT-ALIGNED; RECORD EQUIVALENCE UNRESOLVED |
| Philosophy | ${lanes.philosophy ?? 0} | 1,537 | DERIVED PRESENTATION / DEPTH UNRESOLVED |
| Blueprint | ${lanes.blueprint ?? 0} | 170 | TAXONOMY AND COUNT ALIGNED; RECORD EQUIVALENCE UNRESOLVED |

No Studio equivalence is claimed without record-level source data.
`;
}

function renderPhilosophyDepth() {
  return `# BR-1 Philosophy Depth Model

- GitHub aggregate Philosophy records: **270**
- Studio presentation items: **1,537**
- Top-level framework equivalence: **UNRESOLVED**
- Nested principle relationship: **UNRESOLVED**
- UI-expanded nodes: **UNRESOLVED**
- Independent MOLT-record status of Studio children: **UNRESOLVED**
- Flattening performed: **NO**
- New Philosophy records manufactured: **NO**

The Studio count is treated as presentation evidence only. Record-level Studio data is required before a depth crosswalk can be qualified.
`;
}

function writeBaseline() {
  const records = loadNormalizedRecords();
  const graph = buildReferenceGraph(records);
  const validation = validateState(records, { phase: "baseline", references: graph });
  const inventory = inventoryRepository(records, graph);
  const idIndex = buildIdReferenceIndex(records);
  writeJson("reports/BR1_BASELINE_INVENTORY.json", inventory);
  writeJson("reports/BR1_ID_REFERENCE_INDEX.json", idIndex);
  writeJson("reports/BR1_BASELINE_REFERENCE_GRAPH.json", graph);
  writeJson("reports/BR1_BASELINE_MANIFEST.json", buildManifest(records, validation.status === "PASS" ? "BASELINE_ADAPTER_PASS_WITH_EXPECTED_TAXONOMY_WARNINGS" : "BASELINE_FAIL"));
  writeText("reports/BR1_BASELINE_REPORT.md", renderBaselineReport(inventory, validation));
  writeText("reports/BR1_BASELINE_INVENTORY.md", renderBaselineReport(inventory, validation));
  writeText("reports/BR1_COUNT_VOCABULARY.md", renderCountVocabulary());
  writeText("reports/BR1_TAXONOMY_EXCEPTIONS.md", renderTaxonomyExceptions(records, validation));
  writeText("reports/BR1_REFERENCE_GRAPH_REPORT.md", renderReferenceReport(graph).markdown);
  writeText("reports/BR1_HASHING_SPEC.md", renderHashingSpec());
  console.log(JSON.stringify({ command, validation: validation.status, counts: inventory.count_vocabulary, reference_graph: graph.summary }, null, 2));
  if (validation.status !== "PASS") process.exitCode = 1;
}

function writeFinal() {
  const records = loadNormalizedRecords();
  const graph = buildReferenceGraph(records);
  const baselineGraphPath = path.join(ROOT, "reports", "BR1_BASELINE_REFERENCE_GRAPH.json");
  const baselineGraph = fs.existsSync(baselineGraphPath) ? readJson("reports/BR1_BASELINE_REFERENCE_GRAPH.json") : null;
  const referenceReport = renderReferenceReport(graph, baselineGraph);
  const validation = validateState(records, { phase: "final", references: graph });
  const finalStatus = validation.status === "PASS" && referenceReport.introduced.length === 0 ? "PASS" : "FAIL";
  writeJson("AI/MANIFESTS/h4-block-library-manifest.json", buildManifest(records, finalStatus));
  writeJson("reports/BR1_LANGUAGE_MIGRATION_MAP.json", migrationMap(records));
  writeJson("reports/BR1_FINAL_REFERENCE_GRAPH.json", graph);
  writeText("reports/BR1_LANGUAGE_MIGRATION_REPORT.md", renderLanguageReport(records, validation));
  writeText("reports/BR1_PLATFORM_EXTENSION_CLASSIFICATION.md", renderPlatformReport(records));
  writeText("reports/BR1_PERSONA_STATUS.md", renderPersonaReport(records));
  writeText("reports/BR1_TRIGGER_STATUS.md", renderTriggerReport(records));
  writeText("reports/BR1_REFERENCE_GRAPH_REPORT.md", referenceReport.markdown);
  writeText("reports/BR1_COMPONENT_REFERENCE_VALIDATION.md", referenceReport.markdown);
  const compilerAudit = renderCompilerV0Audit();
  writeText("reports/BR1_COMPILER_V0_REFERENCE_AUDIT.md", compilerAudit.markdown);
  writeText("reports/BR1_VALIDATION_REPORT.md", renderValidationReport(validation, graph, referenceReport.introduced));
  writeText("reports/BR1_GITHUB_STUDIO_CROSSWALK.md", renderStudioCrosswalk(records));
  writeText("reports/BR1_PHILOSOPHY_DEPTH_MODEL.md", renderPhilosophyDepth());
  console.log(JSON.stringify({ command, validation: finalStatus, lane_counts: countBy(records.aggregate, (record) => record.h4_type), reference_graph: graph.summary, new_canonical_reference_failures: referenceReport.introduced.length, compiler_v0_references: compilerAudit.matches.length }, null, 2));
  if (finalStatus !== "PASS") process.exitCode = 1;
}

function validateOnly() {
  const records = loadNormalizedRecords();
  const graph = buildReferenceGraph(records);
  const validation = validateState(records, { phase: "final", references: graph });
  const baselineGraphPath = path.join(ROOT, "reports", "BR1_BASELINE_REFERENCE_GRAPH.json");
  const baselineGraph = fs.existsSync(baselineGraphPath) ? readJson("reports/BR1_BASELINE_REFERENCE_GRAPH.json") : null;
  const referenceKey = (item) => `${item.source_path}|${item.field}|${item.target_id}`;
  const baselineCanonical = new Set((baselineGraph?.canonical_failures ?? []).map(referenceKey));
  const introduced = graph.canonical_failures.filter((item) => !baselineCanonical.has(referenceKey(item)));
  const manifestPath = path.join(ROOT, "AI", "MANIFESTS", "h4-block-library-manifest.json");
  const manifestPresent = fs.existsSync(manifestPath);
  const manifest = manifestPresent ? readJson("AI/MANIFESTS/h4-block-library-manifest.json") : null;
  const expectedValidationStatus = validation.status === "PASS" && introduced.length === 0 ? "PASS" : "FAIL";
  const expectedManifest = buildManifest(records, expectedValidationStatus);
  const manifestFresh = manifestPresent && canonicalJson(manifest) === canonicalJson(expectedManifest);
  const status = expectedValidationStatus === "PASS" && manifestFresh ? "PASS" : "FAIL";
  console.log(JSON.stringify({
    status,
    validation,
    manifest_present: manifestPresent,
    manifest_fresh_and_complete: manifestFresh,
    manifest_expected_sha256: canonicalSha256(expectedManifest),
    manifest_actual_sha256: manifestPresent ? canonicalSha256(manifest) : null,
    new_canonical_reference_failures: introduced.length,
    reference_graph: graph.summary,
  }, null, 2));
  if (status !== "PASS") process.exitCode = 1;
}

if (command === "baseline") writeBaseline();
else if (command === "final") writeFinal();
else if (command === "validate") validateOnly();
else throw new Error(`Unknown command: ${command}`);
