# TOOL-RUNTIME-2B Schema Drafts

## Purpose
This note records the formal static schema draft set for UMG Tool Runtime governance.

Schemas define structure only.
Schemas do not grant permission.
Schemas do not authorize execution.
Schemas do not imply provider availability.
Schemas do not imply OpenClaw approval.

## Drafted schema files
- `AI/SCHEMAS/capability.schema.json`
- `AI/SCHEMAS/toolpack.schema.json`
- `AI/SCHEMAS/tool-binding.schema.json`
- `AI/SCHEMAS/sleeve-runtime-governance.schema.json`
- `AI/SCHEMAS/trust-registry.schema.json`
- `AI/SCHEMAS/approval-token.schema.json`
- `AI/SCHEMAS/rollback-taxonomy.schema.json`

## Governance constraints encoded
- critical capability manifests require approval + blocked-by-default posture
- blocked trust tier cannot expose execution modes
- experimental trust tier cannot expose approved_execute
- business-verified trust requires tenant binding
- high/critical bindings require approval and audit
- critical bindings must allow approved_execute mode
- approved_execute sleeve governance requires approval + audit + rollback
- approval tokens cannot be for blocked execution mode
- reusable approvals require max_uses or expiration
- rollback none is constrained to none/read_only side effects

## Still not implemented
- resolver preview state model
- runtime code changes
- provider availability logic
- execution permission logic
- Desktop Bridge execution
- PhaseBridge execution
