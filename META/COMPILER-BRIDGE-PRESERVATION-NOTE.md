# Compiler Bridge Preservation Note

## Core position

The compiler bridge is useful architecture.
It should not be deleted merely because scanner friction exists around process-spawn or file-write surfaces.

## Preservation rule

The bridge should not be deleted without concrete evidence that it is unsafe or unjustified.
Even then, deletion or removal requires explicit user approval.

## Preferred order of response

1. document
2. reanalyze
3. refresh ClawHub
4. strengthen gates if needed
5. split package if needed

Deletion is the last resort.

## Why preservation matters

The bridge represents hard-built architecture and future capability value.
Removing it for optics alone would destroy design capital without proving a security improvement.

## Last-resort rule

Deletion or removal is a last resort and requires explicit user approval.
It is not the default scan-remediation response.
