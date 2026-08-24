import fs from "node:fs";
import path from "node:path";
import {
  BLUEPRINT_CATEGORY_LABELS,
  LANGUAGE_MAP,
  ROOT,
  projectAggregate,
  readJson,
  writeJson,
  writeText,
} from "./lib.mjs";

const blueprintPath = "AI/MOLT-BLOCKS/blueprints/library.v1.0.0.json";
const instructionPath = "AI/MOLT-BLOCKS/instructions/library.v1.0.0.json";
const blueprintHumanDir = path.join(ROOT, "HUMAN", "MOLT-BLOCKS", "blueprints");
const instructionHumanDir = path.join(ROOT, "HUMAN", "MOLT-BLOCKS", "instructions");
const languageHumanDir = path.join(instructionHumanDir, "language");
const expectedById = new Map(LANGUAGE_MAP.map((item) => [item.old_id, item]));

function humanFilename(item) {
  return `${item.old_id}-${item.subcategory.replaceAll("_", "-")}.md`;
}

function findExistingHumanFile(id) {
  return fs.readdirSync(blueprintHumanDir).find((name) => name.startsWith(`${id}-`) && name.endsWith(".md"));
}

function assertSource(record, expected) {
  if (!record) throw new Error(`Missing source record ${expected.old_id}`);
  if (record.name !== expected.name) throw new Error(`Name mismatch for ${expected.old_id}: ${record.name}`);
  if (!record.structure || !record.conventions || !record.output_characteristics) throw new Error(`Missing language_fields_v1 source field for ${expected.old_id}`);
}

function migratedRecord(record, expected) {
  return {
    ...record,
    type: "INSTRUCTION",
    category: "language",
    subcategory: expected.subcategory,
    tags: ["instruction", "language", expected.subcategory.replaceAll("_", "-")],
  };
}

function renderLanguagePage(record, expected) {
  const projection = projectAggregate(record, "instruction");
  return `# ${record.id} - ${record.name}

**Type:** INSTRUCTION  
**Category:** language  
**Category label:** Language  
**Subcategory:** ${record.subcategory}  
**Status:** ${record.status}

## Migration provenance

- Historical ID retained: \`${record.id}\`
- Former lane: \`blueprint\`
- Former category: \`programming_languages\`
- BR-1 ID rename: **NO**
- Projection strategy: \`language_fields_v1\`

## Source-backed language fields

**Structure:** ${record.structure}

**Conventions:** ${record.conventions}

**Output characteristics:** ${record.output_characteristics}

## Compiler-facing projection

\`\`\`text
${projection.content}
\`\`\`

## Tags

${record.tags.join(", ")}
`;
}

function renderCompatibilityStub(record, targetFilename) {
  return `# ${record.id} - Historical Blueprint path

This ID is retained, but the record is now classified as **Instruction > Language**.

- Current page: [${record.name}](../instructions/language/${targetFilename})
- Former lane: \`blueprint\`
- Former category: \`programming_languages\`
- ID renamed: **NO**
- Compatibility classification: \`LEGACY_COMPATIBILITY\`
`;
}

function fileById(directory) {
  const map = new Map();
  for (const name of fs.readdirSync(directory)) {
    const match = name.match(/^([A-Z]+\.[0-9]{3})-/);
    if (match) map.set(match[1], name);
  }
  return map;
}

function renderBlueprintIndex(records) {
  const files = fileById(blueprintHumanDir);
  const groups = new Map();
  for (const record of records) {
    const label = BLUEPRINT_CATEGORY_LABELS[record.category] ?? record.category;
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(record);
  }
  const preferredOrder = Object.values(BLUEPRINT_CATEGORY_LABELS);
  const lines = [
    "# Blueprint Blocks",
    "",
    "Total blocks: **170**",
    "",
    "Programming-language records are classified under [Instruction > Language](../instructions/language/INDEX.md). Historical `BP.*` IDs are retained.",
    "",
  ];
  for (const label of preferredOrder) {
    const group = groups.get(label) ?? [];
    if (!group.length) continue;
    lines.push(`## ${label}`, "");
    for (const record of group.sort((a, b) => a.id.localeCompare(b.id))) {
      const filename = files.get(record.id);
      if (!filename) throw new Error(`Missing HUMAN Blueprint page for ${record.id}`);
      lines.push(`- [${record.id} - ${record.name}](./${filename})`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function renderLanguageIndex(records) {
  const lines = [
    "# Instruction Language Blocks",
    "",
    "Total blocks: **30**",
    "",
    "These records use H4 type `instruction`, category `language`, and retain their historical `BP.*` identities for compatibility.",
    "",
  ];
  for (const record of records.sort((a, b) => a.id.localeCompare(b.id))) {
    const expected = expectedById.get(record.id);
    lines.push(`- [${record.id} - ${record.name}](./${humanFilename(expected)})`);
  }
  return lines.join("\n");
}

function updateInstructionIndex(languageRecords) {
  const indexPath = path.join(instructionHumanDir, "INDEX.md");
  let current = fs.readFileSync(indexPath, "utf8").replace(/^\uFEFF/, "");
  current = current.replace("Total blocks: **300**", "Total blocks: **330**");
  current = current.replace(/\n## Language\n[\s\S]*?\n## /, "\n## ");
  const section = [
    "## Language",
    "",
    ...languageRecords.sort((a, b) => a.id.localeCompare(b.id)).map((record) => {
      const expected = expectedById.get(record.id);
      return `- [${record.id} - ${record.name}](./language/${humanFilename(expected)})`;
    }),
    "",
  ].join("\n");
  const insertionPoint = current.indexOf("\n## ");
  if (insertionPoint < 0) throw new Error("Instruction index has no insertion point");
  current = `${current.slice(0, insertionPoint + 1)}${section}\n${current.slice(insertionPoint + 1)}`;
  fs.writeFileSync(indexPath, current.endsWith("\n") ? current : `${current}\n`, "utf8");
}

function main() {
  const blueprint = readJson(blueprintPath);
  const instruction = readJson(instructionPath);
  const sourceRecords = new Map(blueprint.entries.map((record) => [record.id, record]));
  const alreadyMigrated = LANGUAGE_MAP.every((expected) => instruction.entries.some((record) => record.id === expected.old_id));
  if (alreadyMigrated) {
    console.log(JSON.stringify({ status: "ALREADY_MIGRATED", blueprint: blueprint.entries.length, instruction: instruction.entries.length }, null, 2));
    return;
  }
  const migrated = LANGUAGE_MAP.map((expected) => {
    const source = sourceRecords.get(expected.old_id);
    assertSource(source, expected);
    return migratedRecord(source, expected);
  });
  blueprint.entries = blueprint.entries.filter((record) => !expectedById.has(record.id));
  instruction.entries = [...instruction.entries, ...migrated];
  blueprint.library.entry_count = blueprint.entries.length;
  instruction.library.entry_count = instruction.entries.length;
  if (blueprint.entries.length !== 170 || instruction.entries.length !== 330) throw new Error(`Unexpected post-migration counts: ${blueprint.entries.length}/${instruction.entries.length}`);
  writeJson(blueprintPath, blueprint);
  writeJson(instructionPath, instruction);

  fs.mkdirSync(languageHumanDir, { recursive: true });
  for (const record of migrated) {
    const expected = expectedById.get(record.id);
    const targetFilename = humanFilename(expected);
    const oldFilename = findExistingHumanFile(record.id);
    if (!oldFilename) throw new Error(`Missing historical HUMAN page for ${record.id}`);
    writeText(`HUMAN/MOLT-BLOCKS/instructions/language/${targetFilename}`, renderLanguagePage(record, expected));
    writeText(`HUMAN/MOLT-BLOCKS/blueprints/${oldFilename}`, renderCompatibilityStub(record, targetFilename));
  }
  writeText("HUMAN/MOLT-BLOCKS/instructions/language/INDEX.md", renderLanguageIndex(migrated));
  writeText("HUMAN/MOLT-BLOCKS/instructions/language/README.md", `# Instruction > Language

This is the human-readable shelf for the 30 BR-1 programming-language records.

- H4 lane: \`instruction\`
- Category: \`language\`
- Historical IDs: \`BP.001\` through \`BP.030\` (retained)
- Compiler projection: \`language_fields_v1\`
- ID aliases or replacements: none
`);
  writeText("HUMAN/MOLT-BLOCKS/blueprints/INDEX.md", renderBlueprintIndex(blueprint.entries));
  writeText("HUMAN/MOLT-BLOCKS/blueprints/README.md", `# Blueprint

The aggregate Blueprint shelf contains 170 structural/output-form records across 16 reviewed presentation categories.

Programming-language records were reclassified by BR-1 to [Instruction > Language](../instructions/language/README.md) without changing their historical \`BP.*\` IDs. Compatibility stubs remain at their former HUMAN paths.
`);
  updateInstructionIndex(migrated);
  writeText("HUMAN/MOLT-BLOCKS/instructions/README.md", `# Instruction

The aggregate Instruction shelf contains 330 records after BR-1:

- 200 \`INST.*\` instruction records;
- 100 \`PERS.*\` Persona-category instruction records;
- 30 historical \`BP.*\` Language-category instruction records.

Persona and Language are categories under Instruction, not additional compiler MOLT lanes.

- [Instruction index](./INDEX.md)
- [Language category](./language/README.md)
`);
  console.log(JSON.stringify({ status: "MIGRATED", records: migrated.length, ids_renamed: 0, blueprint_after: blueprint.entries.length, instruction_after: instruction.entries.length }, null, 2));
}

main();
