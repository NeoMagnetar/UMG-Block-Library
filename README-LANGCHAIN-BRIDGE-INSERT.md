# UMG LangChain Bridge NeoStack Package

This package creates `NS.UMG.LANGCHAIN_BRIDGE.v0.1`, a reusable UMG NeoStack for LangChain/LangGraph/MCP/OpenClaw integration.

## Contents

```text
ADD_TO_UMG_BLOCK_LIBRARY/  # files intended to be copied into NeoMagnetar/UMG-Block-Library
runtime/                   # Python + TypeScript adapter skeletons for plugin/runtime binding
examples/                  # standalone example call payloads
tests/                     # package validation script
AGENT-HANDOFF-INSTRUCTIONS.md
SOURCE-NOTES.md
PACKAGE-MANIFEST.json
```

## Core identity

- NeoStack ID: `NS.UMG.LANGCHAIN_BRIDGE.v0.1`
- Category: `core`
- Status: `draft_active_candidate`
- Purpose: reusable execution bridge for sleeves that need LangChain-style tool orchestration.

## Non-negotiable rule

LangChain does not outrank UMG. The active sleeve, MOLT hierarchy, permission contract, and OpenClaw runtime policy remain above the bridge.

## Install into Block Library

Copy:

```text
ADD_TO_UMG_BLOCK_LIBRARY/*
```

into the root of the UMG Block Library repository.

Then validate:

```bash
python tests/validate_package.py
```

## Runtime note

The included adapters are safe skeletons. They validate payloads and filter tools. The OpenClaw agent/plugin must bind actual OpenClaw tool execution and optional LangChain/LangGraph/MCP runtime execution.

## Additional runtime helper files

```text
runtime/python/langchain_execution_optional.py   # optional real create_agent execution adapter
runtime/python/mcp_loader_optional.py            # optional MCP discovery helper
runtime/typescript/umg-neostack-plugin-entrypoints.ts
```

These helpers are intentionally separated from the library artifacts. Keep library JSON in `UMG-Block-Library`; place runtime helpers in the UMG Envoy Agent/OpenClaw plugin runtime after review.
