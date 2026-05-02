# Compiler Bridge Gating Requirements

Use this note if Option B — stronger gate patch is ever explicitly approved.
This document defines the intended hard requirements only.
It does not implement them.

## Required gating rules

### 1. Bridge disabled unless explicit config is true
The compiler bridge must remain disabled unless a dedicated explicit configuration flag is set true.
Disabled must be the default posture.

### 2. compilerMode must be `external-cli`
The bridge path should only be reachable when the compiler mode is explicitly set to `external-cli`.
No implicit fallback should activate the bridge path.

### 3. Compiler path must be explicit and allowed
The compiler executable path must be explicitly configured and validated against the allowed execution policy.
No ambient command discovery should be treated as sufficient.

### 4. Timeout required
Bridge invocation should require an explicit timeout.
No unbounded spawn path should be considered acceptable.

### 5. `shell:false` preserved
Any process-spawn path must preserve `shell:false`.
No relaxation to shell-based invocation should be introduced as part of hardening.

### 6. No canonical IR write before bridge gate passes
No canonical IR or related output should be written before all bridge gate requirements have passed.
Fail closed before write/spawn behavior begins.

### 7. Emit disabled diagnostic instead of writing/spawning when disabled
When the bridge is disabled or preconditions fail, the system should emit a disabled diagnostic or explicit not-enabled return path rather than attempting write/spawn behavior.

## Purpose
These requirements exist to strengthen the argument that bridge behavior is explicit, bounded, and disabled by default.
They do not by themselves guarantee that static scanners will stop flagging visible process-spawn code.

## Boundary
This note is a requirement definition only.
No code change is authorized by this document alone.
