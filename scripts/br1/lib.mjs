import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

export const SOURCE_BASE_COMMIT = "6df902d8e6c0e77d14bec850a971f36d42f90d5d";
export const COMPILER_H4_COMMIT = "c505f9a7f23010574733c8c03c4162af5317a5eb";
export const H4_TYPES = ["trigger", "directive", "instruction", "subject", "primary", "philosophy", "blueprint"];
export const CLASSIFICATIONS = [
  "H4_CANONICAL_MOLT",
  "H4_CANDIDATE_MOLT",
  "PLATFORM_EXTENSION",
  "DERIVED_EXPORT",
  "LEGACY_COMPATIBILITY",
  "EXPERIMENTAL",
  "HISTORICAL_REFERENCE",
];

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(scriptDir, "..", "..");

export const LANGUAGE_MAP = [
  ["BP.001", "Python", "python"],
  ["BP.002", "JavaScript", "javascript"],
  ["BP.003", "Java", "java"],
  ["BP.004", "C++", "cpp"],
  ["BP.005", "C#", "csharp"],
  ["BP.006", "Ruby", "ruby"],
  ["BP.007", "Go", "go"],
  ["BP.008", "Rust", "rust"],
  ["BP.009", "Swift", "swift"],
  ["BP.010", "Kotlin", "kotlin"],
  ["BP.011", "PHP", "php"],
  ["BP.012", "TypeScript", "typescript"],
  ["BP.013", "Scala", "scala"],
  ["BP.014", "Haskell", "haskell"],
  ["BP.015", "Erlang", "erlang"],
  ["BP.016", "Elixir", "elixir"],
  ["BP.017", "Clojure", "clojure"],
  ["BP.018", "R", "r"],
  ["BP.019", "MATLAB", "matlab"],
  ["BP.020", "Julia", "julia"],
  ["BP.021", "Perl", "perl"],
  ["BP.022", "Lua", "lua"],
  ["BP.023", "Assembly", "assembly"],
  ["BP.024", "SQL", "sql"],
  ["BP.025", "HTML", "html"],
  ["BP.026", "CSS", "css"],
  ["BP.027", "Shell/Bash", "shell_bash"],
  ["BP.028", "PowerShell", "powershell"],
  ["BP.029", "Dart", "dart"],
  ["BP.030", "Objective-C", "objective_c"],
].map(([old_id, name, subcategory]) => ({ old_id, name, subcategory }));

const languageById = new Map(LANGUAGE_MAP.map((item) => [item.old_id, item]));

export const BLUEPRINT_CATEGORY_LABELS = {
  poetry_verse_forms: "Poetry Forms",
  academic_writing: "Academic Writing",
  business_professional: "Business Documents",
  content_formats: "Content Formats",
  formatting_styles: "Citation & Layout",
  specialized_structures: "Specialized Formats",
  sales_execution: "Sales Frameworks",
  marketing_strategy: "Marketing Frameworks",
  product_management: "Product Frameworks",
  operations_frameworks: "Operations Frameworks",
  financial_models: "Financial Models",
  hr_people_systems: "HR Templates",
  strategic_frameworks: "Strategy Frameworks",
  customer_success: "Customer Success",
  legal_compliance: "Legal & Risk",
  digital_technology: "Technology Frameworks",
};

const aggregateSources = [
  ["directive", "AI/MOLT-BLOCKS/directives/library.v1.0.0.json"],
  ["instruction", "AI/MOLT-BLOCKS/instructions/library.v1.0.0.json"],
  ["subject", "AI/MOLT-BLOCKS/subjects/library.v1.0.0.json"],
  ["primary", "AI/MOLT-BLOCKS/primary/library.v1.0.0.json"],
  ["philosophy", "AI/MOLT-BLOCKS/philosophy/library.v1.0.0.json"],
  ["blueprint", "AI/MOLT-BLOCKS/blueprints/library.v1.0.0.json"],
];

const extensionSources = [
  "AI/MOLT-BLOCKS/aim.library.v1.0.0.json",
  "AI/MOLT-BLOCKS/aim.business.library.v1.0.0.json",
  "AI/MOLT-BLOCKS/aim.coding.library.v1.0.0.json",
  "AI/MOLT-BLOCKS/use.library.v1.0.0.json",
  "AI/MOLT-BLOCKS/use.business.library.v1.0.0.json",
  "AI/MOLT-BLOCKS/use.coding.library.v1.0.0.json",
  "AI/MOLT-BLOCKS/need.library.v1.0.0.json",
  "AI/MOLT-BLOCKS/need.business.library.v1.0.0.json",
  "AI/MOLT-BLOCKS/need.coding.library.v1.0.0.json",
];

const derivedSources = [
  "blocks/molt/subjects/aim.library.v1.0.0.json",
  "blocks/molt/subjects/use.library.v1.0.0.json",
  "blocks/molt/subjects/need.library.v1.0.0.json",
];

export function toPosix(value) {
  return value.split(path.sep).join("/");
}

export function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8").replace(/^\uFEFF/, ""));
}

export function writeJson(relativePath, value) {
  const fullPath = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function writeText(relativePath, value) {
  const fullPath = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, value.endsWith("\n") ? value : `${value}\n`, "utf8");
}

export function sha256Bytes(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

export function rawFileSha256(relativePath) {
  return sha256Bytes(fs.readFileSync(path.join(ROOT, relativePath)));
}

export function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  }
  return value;
}

export function canonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}

export function canonicalSha256(value) {
  return sha256Bytes(Buffer.from(canonicalJson(value), "utf8"));
}

function schemaTypeMatches(value, expected) {
  if (expected === "null") return value === null;
  if (expected === "array") return Array.isArray(value);
  if (expected === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
  if (expected === "integer") return Number.isInteger(value);
  if (expected === "number") return typeof value === "number" && Number.isFinite(value);
  return typeof value === expected;
}

export function validateJsonSchema(value, schema, instancePath = "$") {
  const issues = [];
  const allowedTypes = schema.type === undefined ? [] : Array.isArray(schema.type) ? schema.type : [schema.type];
  if (allowedTypes.length && !allowedTypes.some((type) => schemaTypeMatches(value, type))) {
    issues.push({ keyword: "type", instance_path: instancePath, expected: allowedTypes, actual: value === null ? "null" : Array.isArray(value) ? "array" : typeof value });
    return issues;
  }
  if (schema.enum && !schema.enum.some((candidate) => canonicalJson(candidate) === canonicalJson(value))) {
    issues.push({ keyword: "enum", instance_path: instancePath, allowed: schema.enum, actual: value });
  }
  if (typeof value === "string") {
    if (schema.minLength !== undefined && value.length < schema.minLength) issues.push({ keyword: "minLength", instance_path: instancePath, expected: schema.minLength, actual: value.length });
    if (schema.pattern && !(new RegExp(schema.pattern)).test(value)) issues.push({ keyword: "pattern", instance_path: instancePath, expected: schema.pattern, actual: value });
  }
  if (Array.isArray(value)) {
    if (schema.uniqueItems) {
      const serialized = value.map((item) => canonicalJson(item));
      if (new Set(serialized).size !== serialized.length) issues.push({ keyword: "uniqueItems", instance_path: instancePath });
    }
    if (schema.items) value.forEach((item, index) => issues.push(...validateJsonSchema(item, schema.items, `${instancePath}[${index}]`)));
  }
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const required of schema.required ?? []) {
      if (!Object.hasOwn(value, required)) issues.push({ keyword: "required", instance_path: instancePath, missing: required });
    }
    const properties = schema.properties ?? {};
    for (const [key, item] of Object.entries(value)) {
      if (properties[key]) issues.push(...validateJsonSchema(item, properties[key], `${instancePath}.${key}`));
      else if (schema.additionalProperties === false) issues.push({ keyword: "additionalProperties", instance_path: instancePath, property: key });
      else if (schema.additionalProperties && typeof schema.additionalProperties === "object") issues.push(...validateJsonSchema(item, schema.additionalProperties, `${instancePath}.${key}`));
    }
  }
  return issues;
}

let normalizedRecordSchema;
let h4ProjectionSchema;

function br1Schemas() {
  normalizedRecordSchema ??= readJson("AI/SCHEMAS/BR1_NORMALIZED_RECORD_SCHEMA.json");
  h4ProjectionSchema ??= readJson("AI/SCHEMAS/BR1_H4_PROJECTION_SCHEMA.json");
  return { normalizedRecordSchema, h4ProjectionSchema };
}

function lifecycle(value) {
  const normalized = String(value ?? "draft").toLowerCase();
  if (normalized.includes("deprecated")) return "deprecated";
  if (normalized.includes("historical")) return "historical";
  if (normalized.includes("archived")) return "archived";
  if (normalized.includes("draft") || normalized.includes("candidate")) return "draft";
  return "active";
}

function machineLabel(value) {
  return String(value ?? "uncategorized")
    .split("_")
    .map((part) => part ? `${part[0].toUpperCase()}${part.slice(1)}` : part)
    .join(" ");
}

function categoryLabel(h4Type, category) {
  if (category === "language") return "Language";
  if (category === "persona") return "Persona";
  if (h4Type === "blueprint" && BLUEPRINT_CATEGORY_LABELS[category]) return BLUEPRINT_CATEGORY_LABELS[category];
  return machineLabel(category);
}

function addLine(lines, fields, label, fieldName, value) {
  if (value === null || value === undefined || value === "") return;
  const rendered = Array.isArray(value) ? value.join("; ") : typeof value === "object" ? canonicalJson(value) : String(value);
  lines.push(`${label}: ${rendered}`);
  fields.push(fieldName);
}

export function projectAggregate(entry, h4Type) {
  const lines = [];
  const fields = [];
  if (languageById.has(entry.id)) {
    addLine(lines, fields, "Language", "name", entry.name);
    addLine(lines, fields, "Structure", "structure", entry.structure);
    addLine(lines, fields, "Conventions", "conventions", entry.conventions);
    addLine(lines, fields, "Output characteristics", "output_characteristics", entry.output_characteristics);
    return { strategy: "language_fields_v1", source_fields: fields, content: lines.join("\n") };
  }
  if (h4Type === "directive" || h4Type === "instruction") {
    addLine(lines, fields, "Summary", "content.summary", entry.content?.summary ?? entry.name);
    addLine(lines, fields, "Details", "content.details", entry.content?.details);
    addLine(lines, fields, "Structure", "content.structure", entry.content?.structure);
    addLine(lines, fields, h4Type === "directive" ? "Scope" : "Action", h4Type === "directive" ? "scope" : "action", h4Type === "directive" ? entry.scope : entry.action);
    addLine(lines, fields, h4Type === "directive" ? "Constraints" : "Expected output", h4Type === "directive" ? "constraints" : "expected_output", h4Type === "directive" ? entry.constraints : entry.expected_output);
    return { strategy: `${h4Type}_fields_v1`, source_fields: fields, content: lines.join("\n") };
  }
  if (h4Type === "subject") {
    addLine(lines, fields, "Subject", "name", entry.name);
    addLine(lines, fields, "Definition", "definition", entry.definition);
    addLine(lines, fields, "Examples", "examples", entry.examples);
    return { strategy: "subject_fields_v1", source_fields: fields, content: lines.join("\n") };
  }
  if (h4Type === "primary") {
    addLine(lines, fields, "Primary", "name", entry.name);
    addLine(lines, fields, "Essence", "essence", entry.essence);
    addLine(lines, fields, "Core concern", "core_concern", entry.core_concern);
    return { strategy: "primary_fields_v1", source_fields: fields, content: lines.join("\n") };
  }
  if (h4Type === "philosophy") {
    addLine(lines, fields, "Philosophy", "name", entry.name);
    addLine(lines, fields, "Core principles", "core_principles", entry.core_principles);
    addLine(lines, fields, "Application", "application", entry.application);
    addLine(lines, fields, "Key values", "key_values", entry.key_values);
    return { strategy: "philosophy_fields_v1", source_fields: fields, content: lines.join("\n") };
  }
  addLine(lines, fields, "Blueprint", "name", entry.name);
  addLine(lines, fields, "Structure", "structure", entry.structure);
  addLine(lines, fields, "Conventions", "conventions", entry.conventions);
  addLine(lines, fields, "Output characteristics", "output_characteristics", entry.output_characteristics);
  return { strategy: "blueprint_fields_v1", source_fields: fields, content: lines.join("\n") };
}

function withHashes(record, rawHash) {
  const payload = { ...record };
  return {
    ...record,
    hashes: {
      raw_file_sha256: rawHash,
      canonical_record_sha256: canonicalSha256(payload),
    },
  };
}

function normalizeAggregateRecord(entry, sourcePath, rawHash) {
  const h4Type = String(entry.type).toLowerCase();
  const language = languageById.get(entry.id);
  return withHashes({
    id: entry.id,
    h4_type: h4Type,
    category: entry.category,
    category_label: categoryLabel(h4Type, entry.category),
    subcategory: entry.subcategory ?? null,
    name: entry.name,
    classification: "H4_CANONICAL_MOLT",
    lifecycle_status: lifecycle(entry.status),
    not_h4_molt: false,
    source_format: `aggregate_${path.basename(path.dirname(sourcePath)).replace(/s$/, "")}_v1`,
    source_path: sourcePath,
    former_lane: language ? "blueprint" : null,
    former_category: language ? "programming_languages" : null,
    content_projection: projectAggregate(entry, h4Type),
    provenance: entry.source ?? {},
  }, rawHash);
}

function walkFiles(startPath = ROOT) {
  const output = [];
  const stack = [startPath];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name === ".git") continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else output.push(full);
    }
  }
  return output.sort();
}

function collectIdObjects(node, groupPath = [], output = []) {
  if (Array.isArray(node)) {
    for (const item of node) collectIdObjects(item, groupPath, output);
    return output;
  }
  if (!node || typeof node !== "object") return output;
  if (typeof node.id === "string") output.push({ item: node, groupPath });
  for (const [key, value] of Object.entries(node)) {
    if (key === "blocks" && Array.isArray(value)) collectIdObjects(value, groupPath, output);
    else if (value && typeof value === "object") collectIdObjects(value, [...groupPath, key], output);
  }
  return output;
}

function extensionFamily(sourcePath) {
  const basename = path.basename(sourcePath);
  if (basename.startsWith("aim")) return "aim";
  if (basename.startsWith("use")) return "use";
  return "need";
}

function extensionDomain(sourcePath) {
  if (sourcePath.includes(".business.")) return "business";
  if (sourcePath.includes(".coding.")) return "coding";
  return "general";
}

function extensionProjection(item, family) {
  const lines = [];
  const fields = [];
  const preferred = family === "aim" ? ["aim", "outcome", "examples"] : family === "use" ? ["use", "function", "examples"] : ["need", "condition", "examples"];
  for (const field of preferred) addLine(lines, fields, machineLabel(field), field, item[field]);
  return { strategy: "platform_extension_fields_v1", source_fields: fields, content: lines.join("\n") || item.id };
}

function normalizeExtensionFile(sourcePath, classification) {
  const document = readJson(sourcePath);
  const rawHash = rawFileSha256(sourcePath);
  const family = extensionFamily(sourcePath);
  const domain = extensionDomain(sourcePath);
  const headerProvenance = Object.fromEntries(Object.entries(document).filter(([key, value]) => !["aims", "uses", "needs"].includes(key) && (value === null || typeof value !== "object")));
  return collectIdObjects(document).map(({ item, groupPath }) => {
    const group = groupPath.at(-1) ?? domain;
    return withHashes({
      id: item.id,
      h4_type: null,
      category: family,
      category_label: machineLabel(family),
      subcategory: String(group).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || domain,
      name: item[family] ?? item.name ?? item.id,
      classification,
      lifecycle_status: "active",
      not_h4_molt: true,
      source_format: classification === "DERIVED_EXPORT" ? "derived_platform_export_v1" : `platform_${family}_${domain}_v1`,
      source_path: sourcePath,
      former_lane: null,
      former_category: null,
      content_projection: extensionProjection(item, family),
      provenance: headerProvenance,
    }, rawHash);
  });
}

function standaloneFiles() {
  return walkFiles(path.join(ROOT, "AI", "MOLT-BLOCKS"))
    .map((full) => toPosix(path.relative(ROOT, full)))
    .filter((relative) => /\/BLK\..*\.json$/.test(relative));
}

function normalizeStandalone(sourcePath) {
  const document = readJson(sourcePath);
  const rawHash = rawFileSha256(sourcePath);
  const h4Type = String(document.identity?.molt_type ?? "").toLowerCase();
  return withHashes({
    id: document.identity?.artifact_id,
    h4_type: h4Type,
    category: document.block?.category ?? "uncategorized",
    category_label: categoryLabel(h4Type, document.block?.category ?? "uncategorized"),
    subcategory: null,
    name: document.block?.label ?? document.identity?.artifact_id,
    classification: "H4_CANDIDATE_MOLT",
    lifecycle_status: lifecycle(document.provenance?.review_state),
    not_h4_molt: false,
    source_format: "standalone_blk_artifact_v1",
    source_path: sourcePath,
    former_lane: null,
    former_category: null,
    content_projection: {
      strategy: "standalone_block_text_v1",
      source_fields: ["block.text"],
      content: document.block?.text ?? "",
    },
    provenance: document.provenance ?? {},
  }, rawHash);
}

export function loadNormalizedRecords() {
  const aggregate = [];
  const rawSourceFiles = {};
  for (const [, sourcePath] of aggregateSources) {
    const document = readJson(sourcePath);
    const rawHash = rawFileSha256(sourcePath);
    rawSourceFiles[sourcePath] = rawHash;
    for (const entry of document.entries) aggregate.push(normalizeAggregateRecord(entry, sourcePath, rawHash));
  }
  const candidates = standaloneFiles().map((sourcePath) => {
    rawSourceFiles[sourcePath] = rawFileSha256(sourcePath);
    return normalizeStandalone(sourcePath);
  });
  const platformExtensions = extensionSources.flatMap((sourcePath) => {
    rawSourceFiles[sourcePath] = rawFileSha256(sourcePath);
    return normalizeExtensionFile(sourcePath, "PLATFORM_EXTENSION");
  });
  const derivedExports = derivedSources.flatMap((sourcePath) => {
    rawSourceFiles[sourcePath] = rawFileSha256(sourcePath);
    return normalizeExtensionFile(sourcePath, "DERIVED_EXPORT");
  });
  return { aggregate, candidates, platformExtensions, derivedExports, rawSourceFiles };
}

export function countBy(records, selector) {
  const counts = {};
  for (const record of records) {
    const key = selector(record) ?? "null";
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

export function buildManifest(records, validationStatus = "UNVALIDATED") {
  const canonicalLaneCounts = countBy(records.aggregate, (record) => record.h4_type);
  return {
    schema: "umg.h4-block-library-manifest.v1",
    manifest_version: "1.0.0-br1",
    source_repository: "NeoMagnetar/UMG-Block-Library",
    source_base_commit: SOURCE_BASE_COMMIT,
    compiler_authority_commit: COMPILER_H4_COMMIT,
    compiler_molt_types: H4_TYPES,
    classification_contract: {
      authority_classes: CLASSIFICATIONS,
      lifecycle_statuses: ["active", "draft", "deprecated", "historical", "archived"],
      note: "Classification and lifecycle are independent. This manifest is a library truth surface, not compiler semantic authority.",
    },
    counts: {
      aggregate_h4_lane_records: records.aggregate.length,
      promoted_h4_canonical_records: records.aggregate.filter((record) => record.classification === "H4_CANONICAL_MOLT").length,
      source_backed_h4_candidates: records.aggregate.length + records.candidates.length,
      standalone_h4_candidates: records.candidates.length,
      platform_extension_records: records.platformExtensions.length,
      derived_export_records: records.derivedExports.length,
    },
    canonical_lane_counts: canonicalLaneCounts,
    canonical_category_counts: countBy(records.aggregate, (record) => `${record.h4_type}:${record.category}`),
    candidate_lane_counts: countBy(records.candidates, (record) => record.h4_type),
    platform_extension_counts: countBy(records.platformExtensions, (record) => record.category),
    raw_source_file_hashes: records.rawSourceFiles,
    records: {
      promoted_h4_canonical: records.aggregate,
      h4_candidates: records.candidates,
      platform_extensions: records.platformExtensions,
      derived_exports: records.derivedExports,
    },
    excluded_source_classes: [
      { source_class: "HUMAN documentation", reason: "Readable mirror; not a machine canonical source." },
      { source_class: "AI/GATES", reason: "Governance gates are not promoted as H4 Trigger records." },
      { source_class: "samples", reason: "Samples are validated as references but are not promoted MOLT records." },
    ],
    migration_map: "reports/BR1_LANGUAGE_MIGRATION_MAP.json",
    validation_status: validationStatus,
  };
}

export function h4Projection(record) {
  if (!record.h4_type || !record.content_projection?.content) return null;
  return {
    id: record.id,
    type: record.h4_type,
    content: record.content_projection.content,
    title: record.name,
    provenance: {
      sourceId: record.id,
      sourceVersion: String(record.provenance?.library_version ?? record.provenance?.source_library_version ?? "unknown"),
      sourceUri: record.source_path,
      notes: `Block Library ${record.classification}; projection ${record.content_projection.strategy}`,
    },
  };
}

function validateNormalizedRecord(record, issues) {
  const schemas = br1Schemas();
  for (const detail of validateJsonSchema(record, schemas.normalizedRecordSchema)) {
    issues.push({ severity: "error", code: "NORMALIZED_SCHEMA_VIOLATION", id: record.id ?? null, detail });
  }
  if (!CLASSIFICATIONS.includes(record.classification)) issues.push({ severity: "error", code: "UNKNOWN_CLASSIFICATION", id: record.id, value: record.classification });
  if (["H4_CANONICAL_MOLT", "H4_CANDIDATE_MOLT"].includes(record.classification)) {
    if (!H4_TYPES.includes(record.h4_type)) issues.push({ severity: "error", code: "UNKNOWN_H4_TYPE", id: record.id, value: record.h4_type });
    if (record.not_h4_molt) issues.push({ severity: "error", code: "H4_RECORD_MARKED_NOT_H4", id: record.id });
    if (!record.content_projection?.content) issues.push({ severity: "error", code: "MISSING_H4_CONTENT_PROJECTION", id: record.id });
    const projection = h4Projection(record);
    if (!projection) issues.push({ severity: "error", code: "INVALID_H4_PROJECTION_SHAPE", id: record.id });
    else {
      for (const detail of validateJsonSchema(projection, schemas.h4ProjectionSchema)) {
        issues.push({ severity: "error", code: "H4_PROJECTION_SCHEMA_VIOLATION", id: record.id, detail });
      }
    }
  }
  if (["PLATFORM_EXTENSION", "DERIVED_EXPORT"].includes(record.classification)) {
    if (record.h4_type !== null || record.not_h4_molt !== true) issues.push({ severity: "error", code: "EXTENSION_H4_LEAK", id: record.id });
  }
  const payload = { ...record };
  delete payload.hashes;
  if (record.hashes?.canonical_record_sha256 !== canonicalSha256(payload)) issues.push({ severity: "error", code: "CANONICAL_HASH_MISMATCH", id: record.id });
  if (record.hashes?.raw_file_sha256 !== rawFileSha256(record.source_path)) issues.push({ severity: "error", code: "RAW_HASH_MISMATCH", id: record.id });
}

export function validateState(records, { phase = "final", references = null } = {}) {
  const issues = [];
  const all = [...records.aggregate, ...records.candidates, ...records.platformExtensions, ...records.derivedExports];
  for (const record of all) validateNormalizedRecord(record, issues);
  const canonicalIds = new Map();
  for (const record of [...records.aggregate, ...records.candidates]) {
    const prior = canonicalIds.get(record.id);
    if (prior) issues.push({ severity: "error", code: "DUPLICATE_H4_ID", id: record.id, paths: [prior, record.source_path] });
    else canonicalIds.set(record.id, record.source_path);
  }
  const laneCounts = countBy(records.aggregate, (record) => record.h4_type);
  if (records.aggregate.length !== 1370) issues.push({ severity: "error", code: "AGGREGATE_COUNT", actual: records.aggregate.length, expected: 1370 });
  if (records.candidates.length !== 9) issues.push({ severity: "error", code: "CANDIDATE_COUNT", actual: records.candidates.length, expected: 9 });
  if (records.platformExtensions.length !== 900) issues.push({ severity: "error", code: "PLATFORM_EXTENSION_COUNT", actual: records.platformExtensions.length, expected: 900 });
  if (records.derivedExports.length !== 300) issues.push({ severity: "error", code: "DERIVED_EXPORT_COUNT", actual: records.derivedExports.length, expected: 300 });
  const languages = records.aggregate.filter((record) => languageById.has(record.id));
  if (languages.length !== 30) issues.push({ severity: "error", code: "LANGUAGE_COUNT", actual: languages.length, expected: 30 });
  for (const record of languages) {
    const expected = languageById.get(record.id);
    if (record.name !== expected.name) issues.push({ severity: "error", code: "LANGUAGE_NAME", id: record.id, actual: record.name, expected: expected.name });
    if (record.content_projection?.strategy !== "language_fields_v1") issues.push({ severity: "error", code: "LANGUAGE_PROJECTION", id: record.id });
    if (phase === "final") {
      if (record.h4_type !== "instruction" || record.category !== "language" || record.subcategory !== expected.subcategory) {
        issues.push({ severity: "error", code: "LANGUAGE_TAXONOMY", id: record.id, actual: { h4_type: record.h4_type, category: record.category, subcategory: record.subcategory }, expected: { h4_type: "instruction", category: "language", subcategory: expected.subcategory } });
      }
    } else if (record.h4_type !== "instruction") {
      issues.push({ severity: "warning", code: "BASELINE_LANGUAGE_MISCLASSIFIED", id: record.id, actual: record.h4_type });
    }
  }
  if (phase === "final") {
    if (laneCounts.blueprint !== 170) issues.push({ severity: "error", code: "BLUEPRINT_FINAL_COUNT", actual: laneCounts.blueprint, expected: 170 });
    if (laneCounts.instruction !== 330) issues.push({ severity: "error", code: "INSTRUCTION_FINAL_COUNT", actual: laneCounts.instruction, expected: 330 });
    const blueprintCategories = countBy(records.aggregate.filter((record) => record.h4_type === "blueprint"), (record) => record.category);
    for (const category of Object.keys(BLUEPRINT_CATEGORY_LABELS)) {
      const expected = category === "poetry_verse_forms" ? 20 : 10;
      if (blueprintCategories[category] !== expected) issues.push({ severity: "error", code: "BLUEPRINT_CATEGORY_COUNT", category, actual: blueprintCategories[category] ?? 0, expected });
    }
    if (Object.keys(blueprintCategories).length !== 16) issues.push({ severity: "error", code: "BLUEPRINT_CATEGORY_FAMILY_COUNT", actual: Object.keys(blueprintCategories).length, expected: 16 });
  } else {
    if (laneCounts.blueprint !== 200) issues.push({ severity: "error", code: "BLUEPRINT_BASELINE_COUNT", actual: laneCounts.blueprint, expected: 200 });
    if (laneCounts.instruction !== 300) issues.push({ severity: "error", code: "INSTRUCTION_BASELINE_COUNT", actual: laneCounts.instruction, expected: 300 });
  }
  const personas = records.aggregate.filter((record) => record.id.startsWith("PERS."));
  if (personas.length !== 100 || personas.some((record) => record.h4_type !== "instruction" || record.category !== "persona")) issues.push({ severity: "error", code: "PERSONA_TAXONOMY" });
  const extensionCounts = countBy(records.platformExtensions, (record) => record.category);
  for (const family of ["aim", "use", "need"]) if (extensionCounts[family] !== 300) issues.push({ severity: "error", code: "PLATFORM_FAMILY_COUNT", family, actual: extensionCounts[family] ?? 0, expected: 300 });
  if (references?.canonical_failures?.length) {
    for (const failure of references.canonical_failures) issues.push({ severity: "error", code: "BROKEN_CANONICAL_REFERENCE", ...failure });
  }
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  return { phase, status: errors.length ? "FAIL" : "PASS", errors, warnings, summary: { errors: errors.length, warnings: warnings.length } };
}

function jsonFilesForReferenceScan() {
  return walkFiles(ROOT)
    .map((full) => toPosix(path.relative(ROOT, full)))
    .filter((relative) => relative.endsWith(".json"))
    .filter((relative) => !relative.startsWith("reports/BR1_"))
    .filter((relative) => relative !== "AI/MANIFESTS/h4-block-library-manifest.json");
}

export function artifactDefinitionIds(relativePath, document) {
  const output = new Set();
  if (!document || typeof document !== "object" || Array.isArray(document)) return output;
  const identity = document.identity;
  if (identity && typeof identity === "object" && !Array.isArray(identity)) {
    if (typeof identity.artifact_id === "string") output.add(identity.artifact_id);
    else if (typeof identity.id === "string" && (identity.kind || identity.artifact_type || relativePath.startsWith("AI/NEOBLOCKS/") || relativePath.startsWith("AI/NEOSTACKS/"))) output.add(identity.id);
  }
  if (typeof document.artifact_id === "string" && typeof document.artifact_type === "string") output.add(document.artifact_id);
  const basename = path.posix.basename(relativePath).toLowerCase();
  if (typeof document.sleeve_id === "string" && !basename.includes("lock") && !relativePath.includes("/manifests/")) output.add(document.sleeve_id);
  if (typeof document.id === "string" && basename === "manifest.json" && typeof document.name === "string" && typeof document.status === "string") output.add(document.id);
  return output;
}

const referenceKeys = new Set([
  "molt_block_ids", "directive_ids", "neoblock_ids", "block_id", "block_ids", "primary_shell_block_id",
  "parent_artifact_ids", "members", "uses", "target", "entry", "fallback", "refs", "required_neoblocks",
]);

function extractIdLike(value, output) {
  if (Array.isArray(value)) {
    for (const item of value) extractIdLike(item, output);
    return;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) extractIdLike(item, output);
    return;
  }
  if (typeof value !== "string") return;
  const matches = value.match(/[A-Za-z][A-Za-z0-9_-]*(?:\.[A-Za-z0-9_-]+)+/g) ?? [];
  for (const match of matches) {
    if (!match.endsWith(".json") && !match.includes("/")) output.push(match);
  }
}

function collectReferencesFromJson(node, trail, output) {
  if (Array.isArray(node)) {
    node.forEach((item, index) => collectReferencesFromJson(item, [...trail, String(index)], output));
    return;
  }
  if (!node || typeof node !== "object") return;
  for (const [key, value] of Object.entries(node)) {
    const isReferenceKey = referenceKeys.has(key) || key.endsWith("_ids") || key === "molt_roles";
    const isCollectionNamedUses = key === "uses" && value && typeof value === "object" && !Array.isArray(value);
    if (isReferenceKey && !isCollectionNamedUses) {
      const ids = [];
      extractIdLike(value, ids);
      for (const id of ids) output.push({ id, field: [...trail, key].join(".") });
    }
    collectReferencesFromJson(value, [...trail, key], output);
  }
}

export function artifactPosture(relativePath, document) {
  const reviewState = String(document?.provenance?.review_state ?? "").toLowerCase();
  const status = String(document?.neoblock?.status ?? document?.neostack?.status ?? document?.sleeve?.status ?? document?.status ?? document?.resolution_state ?? "").toLowerCase();
  const warningPathSegments = ["/sample/", "/archive/", "/history/", "/historical/", "/legacy/", "/experimental/", "/derived/"];
  const warningStates = ["draft", "historical", "archived", "deprecated", "legacy", "experimental"];
  if (warningPathSegments.some((segment) => relativePath.includes(segment)) || warningStates.some((state) => reviewState.includes(state) || status.includes(state))) return "warning";
  if (relativePath.startsWith("AI/NEOBLOCKS/") || relativePath.startsWith("AI/NEOSTACKS/")) return "canonical";
  if (relativePath.startsWith("sleeves/") || relativePath.startsWith("AI/SLEEVES/") || relativePath.startsWith("packages/") || relativePath.startsWith("AI/PACKAGES/")) return "canonical";
  return "warning";
}

export function buildReferenceGraph(records) {
  const definitions = new Set([...records.aggregate, ...records.candidates, ...records.platformExtensions, ...records.derivedExports].map((record) => record.id));
  const documents = [];
  const malformed = [];
  for (const relativePath of jsonFilesForReferenceScan()) {
    try {
      const document = readJson(relativePath);
      for (const id of artifactDefinitionIds(relativePath, document)) definitions.add(id);
      documents.push({ relativePath, document });
    } catch (error) {
      malformed.push({ path: relativePath, error: error.message });
    }
  }
  const resolved = [];
  const canonicalFailures = [];
  const warnings = [];
  for (const { relativePath, document } of documents) {
    const refs = [];
    collectReferencesFromJson(document, [], refs);
    const posture = artifactPosture(relativePath, document);
    for (const ref of refs) {
      const item = { source_path: relativePath, source_posture: posture, field: ref.field, target_id: ref.id };
      if (definitions.has(ref.id)) resolved.push(item);
      else if (posture === "canonical") canonicalFailures.push(item);
      else warnings.push(item);
    }
  }
  const key = (item) => `${item.source_path}|${item.field}|${item.target_id}`;
  canonicalFailures.sort((a, b) => key(a).localeCompare(key(b)));
  warnings.sort((a, b) => key(a).localeCompare(key(b)));
  return {
    summary: { definitions: definitions.size, resolved: resolved.length, canonical_failures: canonicalFailures.length, warnings: warnings.length, malformed_json: malformed.length },
    canonical_failures: canonicalFailures,
    warnings,
    malformed_json: malformed,
  };
}

export function buildIdReferenceIndex(records) {
  const definitionMap = new Map();
  for (const record of [...records.aggregate, ...records.candidates, ...records.platformExtensions, ...records.derivedExports]) {
    if (!definitionMap.has(record.id)) definitionMap.set(record.id, []);
    definitionMap.get(record.id).push({ source_path: record.source_path, classification: record.classification });
  }
  const knownIds = new Set(definitionMap.keys());
  const index = Object.fromEntries([...knownIds].sort().map((id) => [id, { definitions: definitionMap.get(id), references: [] }]));
  const textExtensions = new Set([".json", ".md", ".txt", ".mjs", ".js", ".ts", ".yaml", ".yml"]);
  for (const fullPath of walkFiles(ROOT)) {
    const relativePath = toPosix(path.relative(ROOT, fullPath));
    if (relativePath.startsWith("reports/BR1_") || relativePath === "AI/MANIFESTS/h4-block-library-manifest.json") continue;
    if (!textExtensions.has(path.extname(fullPath).toLowerCase())) continue;
    const lines = fs.readFileSync(fullPath, "utf8").split(/\r?\n/);
    lines.forEach((line, offset) => {
      const tokens = line.match(/[A-Za-z][A-Za-z0-9_-]*(?:\.[A-Za-z0-9_-]+)+/g) ?? [];
      for (const token of new Set(tokens)) {
        if (!knownIds.has(token)) continue;
        const isSource = definitionMap.get(token).some((definition) => definition.source_path === relativePath);
        if (!isSource) index[token].references.push({ source_path: relativePath, line: offset + 1, reference_kind: relativePath.startsWith("HUMAN/") || relativePath.endsWith(".md") ? "documentation" : "machine" });
      }
    });
  }
  return index;
}

export function inventoryRepository(records, referenceGraph) {
  const files = walkFiles(ROOT)
    .map((full) => toPosix(path.relative(ROOT, full)))
    .filter((relative) => !relative.startsWith("reports/BR1_"))
    .filter((relative) => !relative.startsWith("scripts/br1/"))
    .filter((relative) => !relative.startsWith("tests/br1-"))
    .filter((relative) => !["AI/SCHEMAS/BR1_NORMALIZED_RECORD_SCHEMA.json", "AI/SCHEMAS/BR1_H4_PROJECTION_SCHEMA.json", "AI/MANIFESTS/h4-block-library-manifest.json"].includes(relative));
  const jsonFiles = files.filter((item) => item.endsWith(".json"));
  const malformed = [];
  for (const relativePath of jsonFiles) {
    try { readJson(relativePath); } catch (error) { malformed.push({ path: relativePath, error: error.message }); }
  }
  let priorityFields = 0;
  let primaryShellReferences = 0;
  let compilerV0References = 0;
  for (const relativePath of files.filter((item) => /\.(json|md|txt|js|mjs|ts)$/i.test(item))) {
    const content = fs.readFileSync(path.join(ROOT, relativePath), "utf8");
    priorityFields += (content.match(/"priority"\s*:/gi) ?? []).length;
    primaryShellReferences += (content.match(/primaryshell/gi) ?? []).length;
    compilerV0References += content.split(/\r?\n/).filter((line) => /compiler[-_ ]?v0/i.test(line)).length;
  }
  const currentTypes = countBy(records.aggregate, (record) => record.h4_type);
  const duplicateCanonical = Object.entries(countBy([...records.aggregate, ...records.candidates], (record) => record.id)).filter(([, count]) => count > 1).map(([id, count]) => ({ id, count }));
  return {
    schema: "umg.br1-baseline-inventory.v1",
    source_base_commit: SOURCE_BASE_COMMIT,
    total_files: files.length,
    total_json_files: jsonFiles.length,
    count_vocabulary: {
      aggregate_h4_lane_records: records.aggregate.length,
      source_backed_h4_candidates: records.aggregate.length + records.candidates.length,
      platform_extension_records: records.platformExtensions.length,
      derived_export_records: records.derivedExports.length,
    },
    molt_counts_by_current_type: currentTypes,
    category_counts_by_type: countBy(records.aggregate, (record) => `${record.h4_type}:${record.category}`),
    duplicate_canonical_ids: duplicateCanonical,
    malformed_records: malformed,
    persona_as_type_count: records.aggregate.filter((record) => record.h4_type === "persona").length,
    language_as_type_count: records.aggregate.filter((record) => record.h4_type === "language").length,
    use_as_type_count: records.aggregate.filter((record) => record.h4_type === "use").length,
    aim_as_type_count: records.aggregate.filter((record) => record.h4_type === "aim").length,
    need_as_type_count: records.aggregate.filter((record) => record.h4_type === "need").length,
    off_as_type_count: records.aggregate.filter((record) => record.h4_type === "off").length,
    priority_fields_count: priorityFields,
    primaryshell_references: primaryShellReferences,
    compiler_v0_references: compilerV0References,
    direct_trigger_source_count: records.aggregate.filter((record) => record.h4_type === "trigger").length,
    reference_graph_summary: referenceGraph.summary,
    raw_source_file_hashes: records.rawSourceFiles,
    records: [...records.aggregate, ...records.candidates, ...records.platformExtensions, ...records.derivedExports],
  };
}

export function compactIssue(issue) {
  return `${issue.severity.toUpperCase()} ${issue.code}${issue.id ? ` ${issue.id}` : ""}`;
}
