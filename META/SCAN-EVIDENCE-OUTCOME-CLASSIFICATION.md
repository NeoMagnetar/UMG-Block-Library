# Scan Evidence Outcome Classification

Use this classification only after actual scan evidence returns.
Until then, publish remains paused.

## Outcome A
### Condition
VirusTotal clean / ClawHub refresh succeeds.

### Action
- keep bridge
- preserve documentation packet
- consider documentation-only v0.2.9 later if useful and explicitly approved

### Prohibited
- no automatic publish
- no bridge deletion
- no release movement without explicit approval

---

## Outcome B
### Condition
VirusTotal clean / ClawHub stale remains.

### Action
- submit or maintain refresh request
- pause publish
- preserve the identity distinction and supporting packet

### Prohibited
- no stale-state publish assumption
- no bridge deletion

---

## Outcome C
### Condition
Generic / noisy heuristic detections only.

### Action
- document detections exactly
- record engines and names in the VT evidence log
- consider `SECURITY.md` + release note path later if explicitly approved
- preserve bridge work

### Prohibited
- no claim that heuristic means harmless without reviewing exact detections
- no publish without explicit approval

---

## Outcome D
### Condition
Multiple concrete detections.

### Action
- pause publish
- inspect exact flagged behavior
- preserve bridge work while reviewing exact signal
- consider stronger gates before any split if future authorization is granted

### Prohibited
- no panic deletion of bridge work
- no identity-collapse claims
- no publish while unresolved

---

## Outcome E
### Condition
Scanner friction persists only because of `child_process` / `spawn`.

### Action
- consider public-safe split later
- preserve bridge work
- keep documentation and gate-strengthening options active

### Prohibited
- do not delete bridge work
- do not treat process-spawn presence alone as proof of malicious behavior
- do not publish without explicit approval
