# UMG v0 Build Roadmap Amendment — Pure UMG Reference Slice v0.1

**Document ID:** `UMG_V0_BUILD_ROADMAP_AMENDMENT.PURE_UMG_REFERENCE_SLICE.v0.1` 
**Status:** Foundation amendment 
**Applies to:** `UMG_V0_BUILD_ROADMAP.v0.1` 
**Purpose:** Correct the v0 reference slice from a domain-specific ServUO/UO sleeve to a domain-neutral UMG core reference sleeve.

---

## 1. Amendment Summary

The v0 build roadmap should not use a domain-specific UO/ServUO coder sleeve as the foundation reference slice.

The foundation reference slice should be pure UMG.

The UO/ServUO coder sleeve remains valuable, but it should be treated as the first applied domain pilot, not the core foundation slice.

---

## 2. Correct v0 Spine

The v0 spine remains:

```text
Library
 → Sleeve
 → IR
 → Compiler
 → RuntimeSpec + Trace
 → Envoy
 → Relation Matrix
 → Capability Status
```

This should be proven with a domain-neutral UMG reference sleeve before any domain-specific sleeve is used as a stress test.

---

## 3. Replace the Reference Slice

Replace:

```text
Recommended first slice:
SLV.CODER.SERVUO.v1
```

With:

```text
Recommended first slice:
SLV.UMG.CORE_REFERENCE.v1
```

---

## 4. Pure UMG Reference Slice

Recommended foundation objects:

```text
SLV.UMG.CORE_REFERENCE.v1

NS.UMG.CORE.COMPILER_FLOW.v1

NB.UMG.REQUEST_INTAKE.v1
NB.UMG.ARTIFACT_RESOLUTION.v1
NB.UMG.IR_NORMALIZATION.v1
NB.UMG.COMPILER_EXECUTION.v1
NB.UMG.RUNTIME_SPEC_TRACE.v1
NB.UMG.RELATION_MATRIX_EMIT.v1
NB.UMG.CAPABILITY_STATUS.v1

OVR.GOV.UMG.ROUTE_CONTROLLER.v1

CAP.ARTIFACT.RESOLVE
CAP.IR.BUILD
CAP.COMPILER.COMPILE
CAP.TRACE.EMIT
CAP.MATRIX.EMIT
```

---

## 5. Optional Applied Pilot

The UO/ServUO coder sleeve should be retained as an applied pilot:

```text
SLV.CODER.SERVUO.v1
```

But its status should be:

```text
Pilot Domain Sleeve
```

not:

```text
Foundation Reference Slice
```

---

## 6. Correct Build Sequence

The corrected sequence is:

```text
1. Build pure UMG core reference sleeve.
2. Prove Library → Sleeve → IR → Compiler → RuntimeSpec + Trace → Envoy → Relation Matrix → Capability Status.
3. Use the UO/ServUO coder sleeve as the first applied domain test.
4. Use future sleeves to prove generality across domains.
```

---

## 7. Binding Rule

Add this rule to the v0 roadmap:

```text
The first deterministic reference slice must be domain-neutral.
It should prove that UMG can compile and explain itself before testing applied domain sleeves.
Domain-specific sleeves are pilots, not foundation proof.
```

---

## 8. Summary

UMG first.

Domain sleeves second.

The foundation should prove the architecture itself:

```text
Library → Sleeve → IR → Compiler → RuntimeSpec + Trace → Envoy → Relation Matrix → Capability Status
```

The UO/ServUO coder sleeve remains useful as the first applied stress test, but it should not define the foundation.
