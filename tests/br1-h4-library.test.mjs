import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  H4_TYPES,
  LANGUAGE_MAP,
  artifactDefinitionIds,
  artifactPosture,
  buildManifest,
  canonicalJson,
  canonicalSha256,
  sha256Bytes,
  loadNormalizedRecords,
  h4Projection,
  buildReferenceGraph,
  validateState,
  readJson,
  ROOT,
  validateJsonSchema,
} from "../scripts/br1/lib.mjs";

test("BR-1 schemas are self-contained JSON Schema documents", () => {
  const normalized = readJson("AI/SCHEMAS/BR1_NORMALIZED_RECORD_SCHEMA.json");
  const projection = readJson("AI/SCHEMAS/BR1_H4_PROJECTION_SCHEMA.json");
  assert.equal(normalized.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(projection.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.deepEqual(projection.properties.type.enum, H4_TYPES);
  assert.deepEqual(projection.required, ["id", "type", "content"]);
});

test("normalized records and H4 projections conform to their complete schemas", () => {
  const normalizedSchema = readJson("AI/SCHEMAS/BR1_NORMALIZED_RECORD_SCHEMA.json");
  const projectionSchema = readJson("AI/SCHEMAS/BR1_H4_PROJECTION_SCHEMA.json");
  const records = loadNormalizedRecords();
  const all = [...records.aggregate, ...records.candidates, ...records.platformExtensions, ...records.derivedExports];
  for (const record of all) {
    assert.deepEqual(validateJsonSchema(record, normalizedSchema), [], `normalized schema failed for ${record.id}`);
    if (["H4_CANONICAL_MOLT", "H4_CANDIDATE_MOLT"].includes(record.classification)) {
      assert.deepEqual(validateJsonSchema(h4Projection(record), projectionSchema), [], `projection schema failed for ${record.id}`);
    }
  }
  const missingRequired = structuredClone(all[0]);
  delete missingRequired.provenance;
  assert.ok(validateJsonSchema(missingRequired, normalizedSchema).some((issue) => issue.keyword === "required" && issue.missing === "provenance"));
  const extraProperty = { ...all[0], unexpected: true };
  assert.ok(validateJsonSchema(extraProperty, normalizedSchema).some((issue) => issue.keyword === "additionalProperties" && issue.property === "unexpected"));
});

test("deterministic canonical serialization sorts object keys and preserves array order", () => {
  const left = { z: [3, 2, 1], a: { y: "two", x: "one" } };
  const right = { a: { x: "one", y: "two" }, z: [3, 2, 1] };
  assert.equal(canonicalJson(left), '{"a":{"x":"one","y":"two"},"z":[3,2,1]}');
  assert.equal(canonicalSha256(left), canonicalSha256(right));
});

test("source adapters reproduce all locked count vocabularies", () => {
  const records = loadNormalizedRecords();
  assert.equal(records.aggregate.length, 1376);
  assert.equal(records.aggregate.length + records.candidates.length, 1385);
  assert.equal(records.candidates.length, 9);
  assert.equal(records.platformExtensions.length, 900);
  assert.equal(records.derivedExports.length, 300);
  assert.ok(records.candidates.every((record) => record.classification === "H4_CANDIDATE_MOLT" && record.lifecycle_status === "draft"));
  assert.ok(records.platformExtensions.every((record) => record.classification === "PLATFORM_EXTENSION" && record.not_h4_molt && record.h4_type === null));
});

test("language_fields_v1 is exact, deterministic, and source preserving", () => {
  const records = loadNormalizedRecords();
  const languages = records.aggregate.filter((record) => LANGUAGE_MAP.some((item) => item.old_id === record.id));
  assert.equal(languages.length, 30);
  const python = languages.find((record) => record.id === "BP.001");
  assert.equal(python.content_projection.strategy, "language_fields_v1");
  assert.deepEqual(python.content_projection.source_fields, ["name", "structure", "conventions", "output_characteristics"]);
  assert.match(python.content_projection.content, /^Language: Python\nStructure: /);
  assert.match(python.content_projection.content, /\nConventions: /);
  assert.match(python.content_projection.content, /\nOutput characteristics: /);
  assert.equal(languages.find((record) => record.id === "BP.004").name, "C++");
  assert.equal(languages.find((record) => record.id === "BP.005").name, "C#");
  const projection = h4Projection(python);
  assert.deepEqual(Object.keys(projection), ["id", "type", "content", "title", "provenance"]);
  assert.equal(projection.type, "instruction");
  assert.equal(projection.content, python.content_projection.content);
});

test("baseline or final taxonomy validates with no canonical reference failures", () => {
  const records = loadNormalizedRecords();
  const languageRecords = records.aggregate.filter((record) => LANGUAGE_MAP.some((item) => item.old_id === record.id));
  const phase = languageRecords.every((record) => record.h4_type === "instruction" && record.category === "language") ? "final" : "baseline";
  const graph = buildReferenceGraph(records);
  const validation = validateState(records, { phase, references: graph });
  assert.equal(graph.canonical_failures.length, 0);
  assert.equal(validation.status, "PASS", JSON.stringify(validation.errors, null, 2));
  if (phase === "baseline") assert.equal(validation.warnings.filter((item) => item.code === "BASELINE_LANGUAGE_MISCLASSIFIED").length, 30);
  else assert.equal(validation.warnings.length, 0);
});

test("reference definitions are artifact-root-only and executable packages fail closed", () => {
  const ids = artifactDefinitionIds("AI/NEOBLOCKS/categories/test/NB.TEST.json", {
    identity: { artifact_id: "NB.TEST", artifact_type: "neoblock" },
    composition: { id: "MISSING.SHOULD.NOT.DEFINE.ITSELF", artifact_id: "ALSO.NOT.A.DEFINITION" },
  });
  assert.deepEqual([...ids], ["NB.TEST"]);
  assert.equal(artifactPosture("sleeves/current-sleeve.json", { status: "active" }), "canonical");
  assert.equal(artifactPosture("AI/SLEEVES/categories/current/sleeve.json", { sleeve: { status: "active" } }), "canonical");
  assert.equal(artifactPosture("AI/SLEEVES/categories/draft/sleeve.json", { provenance: { review_state: "draft" }, sleeve: { status: "active" } }), "warning");
  assert.equal(artifactPosture("AI/SLEEVES/categories/current/sleeve.json", { provenance: { review_state: "historical" }, sleeve: { status: "active" } }), "warning");
  assert.equal(artifactPosture("AI/SLEEVES/legacy/sleeve.json", { sleeve: { status: "active" } }), "warning");
  assert.equal(artifactPosture("AI/NEOBLOCKS/sample/example.json", { neoblock: { status: "active" } }), "warning");
});

test("committed manifest is a complete deterministic rebuild", () => {
  const records = loadNormalizedRecords();
  const actual = readJson("AI/MANIFESTS/h4-block-library-manifest.json");
  const expected = buildManifest(records, "PASS");
  assert.equal(canonicalJson(actual), canonicalJson(expected));
  assert.equal(canonicalSha256(actual), canonicalSha256(expected));
  assert.equal(
    sha256Bytes(fs.readFileSync(path.join(ROOT, "AI", "MANIFESTS", "h4-block-library-manifest.json"))),
    "1bcff6bc517fb1575e7478e37f1e7a338a3b45cab87f0203d99f605a8f6ff5b3",
    "RAW_FILE_BYTES_SHA256 contract changed",
  );
  assert.equal(
    canonicalSha256(actual),
    "0ed0454d5a75171ed4115a2234d9a965becfd3a049af3b5b42429dccddf0409e",
    "CANONICAL_KEY_SORTED_COMPACT_JSON_SHA256 contract changed",
  );
  const stale = structuredClone(actual);
  stale.records.promoted_h4_canonical[0].category = "tampered";
  assert.notEqual(canonicalJson(stale), canonicalJson(expected));
});

test("final migration preserves extension paths and normalized source content", () => {
  const records = loadNormalizedRecords();
  const finalLanguages = records.aggregate.filter((record) => LANGUAGE_MAP.some((item) => item.old_id === record.id));
  if (!finalLanguages.every((record) => record.h4_type === "instruction")) return;
  const baseline = readJson("reports/BR1_BASELINE_INVENTORY.json");
  const baselineById = new Map(baseline.records.map((record) => [`${record.classification}|${record.id}|${record.source_path}`, record]));
  for (const record of finalLanguages) {
    const baselineRecord = baseline.records.find((item) => item.classification === "H4_CANONICAL_MOLT" && item.id === record.id);
    assert.ok(baselineRecord, `missing baseline ${record.id}`);
    assert.equal(record.name, baselineRecord.name);
    assert.equal(record.content_projection.content, baselineRecord.content_projection.content);
    assert.deepEqual(record.provenance, baselineRecord.provenance);
  }
  for (const record of records.platformExtensions) {
    const baselineRecord = baselineById.get(`${record.classification}|${record.id}|${record.source_path}`);
    assert.ok(baselineRecord, `missing extension baseline ${record.id} at ${record.source_path}`);
    assert.equal(
      record.hashes.canonical_record_sha256,
      baselineRecord.hashes.canonical_record_sha256,
      `extension normalized content moved or changed: ${record.source_path}`,
    );
  }
});

test("human language pages and compatibility stubs are complete", () => {
  const languageDir = path.join(ROOT, "HUMAN", "MOLT-BLOCKS", "instructions", "language");
  const blueprintDir = path.join(ROOT, "HUMAN", "MOLT-BLOCKS", "blueprints");
  const languagePages = fs.readdirSync(languageDir).filter((name) => /^BP\.[0-9]{3}-.*\.md$/.test(name));
  assert.equal(languagePages.length, 30);
  for (const item of LANGUAGE_MAP) {
    const currentPage = languagePages.find((name) => name.startsWith(`${item.old_id}-`));
    const oldPage = fs.readdirSync(blueprintDir).find((name) => name.startsWith(`${item.old_id}-`));
    assert.ok(currentPage, `missing current HUMAN page ${item.old_id}`);
    assert.ok(oldPage, `missing compatibility stub ${item.old_id}`);
    assert.match(fs.readFileSync(path.join(languageDir, currentPage), "utf8"), /\*\*Type:\*\* INSTRUCTION/);
    assert.match(fs.readFileSync(path.join(blueprintDir, oldPage), "utf8"), /LEGACY_COMPATIBILITY/);
  }
});
