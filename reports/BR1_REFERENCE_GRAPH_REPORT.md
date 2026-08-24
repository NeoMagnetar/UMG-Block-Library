# BR-1 Reference Graph Report

## Summary

- Definitions indexed: **2322**
- Resolved machine references: **114**
- Baseline canonical failures: **0**
- Baseline reference warnings: **24**
- Current canonical failures: **0**
- Current reference warnings: **24**
- Malformed JSON files: **0**
- New canonical failures introduced: **0**
- Preexisting canonical failures repaired: **0**

Hard failure applies only to promoted/current canonical artifacts. Drafts, samples, historical records, compatibility records, and documentation produce warnings.

## Warning sample

| Source | Field | Unresolved target | Posture |
| --- | --- | --- | --- |
| AI/NEOBLOCKS/categories/core/NB.UMG.ARTIFACT_RESOLUTION.v1.json | neoblock.composition.molt_block_ids | BLK.INSTRUCTION.UMG.RESOLVE_ARTIFACTS.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.ARTIFACT_RESOLUTION.v1.json | neoblock.composition.ordered_steps.0.uses | BLK.INSTRUCTION.UMG.RESOLVE_ARTIFACTS.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.ARTIFACT_RESOLUTION.v1.json | neoblock.molt_roles | BLK.INSTRUCTION.UMG.RESOLVE_ARTIFACTS.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.CAPABILITY_STATUS.v1.json | neoblock.composition.molt_block_ids | BLK.SUBJECT.UMG.ARTIFACT_LIBRARY.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.CAPABILITY_STATUS.v1.json | neoblock.composition.ordered_steps.0.uses | BLK.SUBJECT.UMG.ARTIFACT_LIBRARY.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.CAPABILITY_STATUS.v1.json | neoblock.molt_roles | BLK.SUBJECT.UMG.ARTIFACT_LIBRARY.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.COMPILER_EXECUTION.v1.json | neoblock.composition.molt_block_ids | BLK.INSTRUCTION.UMG.RUN_COMPILER.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.COMPILER_EXECUTION.v1.json | neoblock.composition.ordered_steps.0.uses | BLK.INSTRUCTION.UMG.RUN_COMPILER.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.COMPILER_EXECUTION.v1.json | neoblock.molt_roles | BLK.INSTRUCTION.UMG.RUN_COMPILER.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.IR_NORMALIZATION.v1.json | neoblock.composition.molt_block_ids | BLK.INSTRUCTION.UMG.BUILD_IR.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.IR_NORMALIZATION.v1.json | neoblock.composition.ordered_steps.0.uses | BLK.INSTRUCTION.UMG.BUILD_IR.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.IR_NORMALIZATION.v1.json | neoblock.molt_roles | BLK.INSTRUCTION.UMG.BUILD_IR.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.RELATION_MATRIX_EMIT.v1.json | neoblock.composition.molt_block_ids | BLK.INSTRUCTION.UMG.EMIT_RELATION_MATRIX.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.RELATION_MATRIX_EMIT.v1.json | neoblock.composition.ordered_steps.0.uses | BLK.INSTRUCTION.UMG.EMIT_RELATION_MATRIX.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.RELATION_MATRIX_EMIT.v1.json | neoblock.molt_roles | BLK.INSTRUCTION.UMG.EMIT_RELATION_MATRIX.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.REQUEST_INTAKE.v1.json | neoblock.composition.molt_block_ids | BLK.TRIGGER.UMG.COMPILE_REQUEST.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.REQUEST_INTAKE.v1.json | neoblock.composition.ordered_steps.0.uses | BLK.TRIGGER.UMG.COMPILE_REQUEST.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.REQUEST_INTAKE.v1.json | neoblock.molt_roles | BLK.TRIGGER.UMG.COMPILE_REQUEST.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.RUNTIME_SPEC_TRACE.v1.json | neoblock.composition.molt_block_ids | BLK.BLUEPRINT.UMG.RUNTIME_SPEC_TRACE_OUTPUT.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.RUNTIME_SPEC_TRACE.v1.json | neoblock.composition.molt_block_ids | BLK.INSTRUCTION.UMG.EMIT_TRACE.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.RUNTIME_SPEC_TRACE.v1.json | neoblock.composition.ordered_steps.0.uses | BLK.BLUEPRINT.UMG.RUNTIME_SPEC_TRACE_OUTPUT.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.RUNTIME_SPEC_TRACE.v1.json | neoblock.composition.ordered_steps.1.uses | BLK.INSTRUCTION.UMG.EMIT_TRACE.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.RUNTIME_SPEC_TRACE.v1.json | neoblock.molt_roles | BLK.BLUEPRINT.UMG.RUNTIME_SPEC_TRACE_OUTPUT.v1 | warning |
| AI/NEOBLOCKS/categories/core/NB.UMG.RUNTIME_SPEC_TRACE.v1.json | neoblock.molt_roles | BLK.INSTRUCTION.UMG.EMIT_TRACE.v1 | warning |
