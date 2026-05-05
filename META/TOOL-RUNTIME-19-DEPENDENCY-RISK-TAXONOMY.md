# TOOL-RUNTIME-19 Dependency Risk Taxonomy

## none
- **meaning:** No meaningful dependency risk is currently present.
- **example dependency issue:** none
- **impact on static approval:** none
- **impact on implementation candidacy:** none
- **impact on release readiness:** none by dependency risk alone
- **remediation expectation:** not required
- **escalation expectation:** none

## low
- **meaning:** Minor dependency gap or optional artifact absence with no immediate governance blocker.
- **example dependency issue:** optional dashboard example missing
- **impact on static approval:** usually no block
- **impact on implementation candidacy:** may require note but not a hard stop
- **impact on release readiness:** little or none unless coupled with higher risks
- **remediation expectation:** address during normal pack maintenance
- **escalation expectation:** none unless repeated

## medium
- **meaning:** Noticeable dependency weakness that degrades completeness or review confidence.
- **example dependency issue:** supporting report example missing from a technical review pack
- **impact on static approval:** may delay approval until clarified
- **impact on implementation candidacy:** reduces confidence and may delay candidacy review
- **impact on release readiness:** contributes to readiness hesitation
- **remediation expectation:** correct before final static signoff where feasible
- **escalation expectation:** escalate to owner if unresolved

## high
- **meaning:** Significant dependency gap that materially affects validation, reporting, or evidence posture.
- **example dependency issue:** required evidence index missing for a compliance review pack
- **impact on static approval:** likely blocks static approval
- **impact on implementation candidacy:** blocks candidacy until corrected
- **impact on release readiness:** strong release blocker if in release-facing pack
- **remediation expectation:** required before progression
- **escalation expectation:** escalate to owning reviewer/maintainer

## critical
- **meaning:** Dependency issue blocks core governance function or required review pathway.
- **example dependency issue:** signoff record missing from a release-readiness pack
- **impact on static approval:** blocks static approval
- **impact on implementation candidacy:** blocks candidacy
- **impact on release readiness:** blocks release readiness
- **remediation expectation:** immediate correction required
- **escalation expectation:** escalate to owner and governance authority

## terminal
- **meaning:** Dependency issue cannot progress without policy, trust, or security boundary change.
- **example dependency issue:** security triage resolution artifact missing while release readiness is being assessed
- **impact on static approval:** may or may not block static-only packaging depending on scope, but blocks progression beyond allowed boundary
- **impact on implementation candidacy:** blocks candidacy
- **impact on release readiness:** blocks release readiness
- **remediation expectation:** do not retry until governing condition changes
- **escalation expectation:** immediate escalation to the relevant terminal owner (security, governance, compliance, or release owner)
