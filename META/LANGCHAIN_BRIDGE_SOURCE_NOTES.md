# Source Notes

This package was generated from the public UMG Block Library structure and current LangChain documentation.

## Public UMG Block Library observations

- The repository presents itself as a public-facing UMG block-library surface for doctrine, schemas, block assets, sleeves, and human-readable references.
- It uses a curated AI/HUMAN split surface.
- It describes the navigation model as MOLT Block → NeoBlock → NeoStack → Sleeve.
- `AI/` is the machine-readable shelf and `HUMAN/` is the human-readable shelf.
- Current visible `AI/NEOSTACKS/categories/` lanes include business, coders, core, creative, finance, governance, meta-random, research, and social-communication.

Source: https://github.com/NeoMagnetar/UMG-Block-Library

## LangChain / LangGraph / MCP observations

- LangChain agents combine language models with tools and `create_agent` builds a graph-based runtime using LangGraph.
- LangChain supports static/dynamic model selection and tool selection.
- LangChain tools are callable functions or coroutines with names, descriptions, and schemas.
- LangGraph is focused on durable execution, streaming, human-in-the-loop, and stateful workflows.
- LangChain agents can use MCP server tools through `langchain-mcp-adapters`.
- Retrieval modes should be explicitly selected instead of assumed.

Sources:
- https://docs.langchain.com/oss/python/langchain/agents
- https://docs.langchain.com/oss/python/langchain/tools
- https://docs.langchain.com/oss/python/langgraph/overview
- https://docs.langchain.com/oss/python/langchain/mcp
- https://docs.langchain.com/oss/python/langchain/retrieval
- https://docs.langchain.com/oss/python/langchain/structured-output
- https://docs.langchain.com/oss/python/langchain/guardrails
