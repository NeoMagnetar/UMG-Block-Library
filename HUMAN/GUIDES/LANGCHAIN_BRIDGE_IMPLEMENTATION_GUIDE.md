# LangChain Bridge Implementation Guide

## Copy paths

Copy the contents of `ADD_TO_UMG_BLOCK_LIBRARY/` into the root of `UMG-Block-Library`.

Primary machine artifact:

```text
AI/NEOSTACKS/categories/core/NS.UMG.LANGCHAIN_BRIDGE.v0.1.json
```

Primary human artifact:

```text
HUMAN/NEOSTACKS/categories/core/NS.UMG.LANGCHAIN_BRIDGE.v0.1.md
```

Runtime adapter code is outside the library paths on purpose:

```text
runtime/python/langchain_bridge_runtime.py
runtime/typescript/openclaw-langchain-neostack-adapter.ts
```

The agent should decide whether runtime adapter code belongs in the UMG Envoy Agent repo, OpenClaw plugin repo, or a dedicated runtime package.

## Agent task order

1. Copy the AI/HUMAN library artifacts into the Block Library.
2. Run `python tests/validate_package.py` from this package root.
3. Verify JSON files parse.
4. Add or update category indexes if the repository requires them.
5. Add UMG plugin resolver support for `NS.UMG.LANGCHAIN_BRIDGE.v0.1`.
6. Bind `umg.neostack.invoke` to the runtime adapter.
7. Bind actual OpenClaw tool execution into the adapter seam.
8. Add a dry-run smoke test using one example payload.
9. Add a permission smoke test confirming blocked tools are never registered.
10. Add a trace smoke test confirming trace events return to UMG RuntimeSpec/Trace.

## Important integration boundary

The included runtime adapter is safe-by-default. It validates and filters, but does not call external tools unless the OpenClaw invocation seam is explicitly bound by the agent/plugin runtime.
