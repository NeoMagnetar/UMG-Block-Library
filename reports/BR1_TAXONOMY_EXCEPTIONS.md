# BR-1 Taxonomy Exceptions

## Baseline language misclassification

| ID | Name | Baseline lane | Baseline category | Baseline subcategory |
| --- | --- | --- | --- | --- |
| BP.001 | Python | blueprint | programming_languages | python |
| BP.002 | JavaScript | blueprint | programming_languages | javascript |
| BP.003 | Java | blueprint | programming_languages | java |
| BP.004 | C++ | blueprint | programming_languages | c |
| BP.005 | C# | blueprint | programming_languages | c |
| BP.006 | Ruby | blueprint | programming_languages | ruby |
| BP.007 | Go | blueprint | programming_languages | go |
| BP.008 | Rust | blueprint | programming_languages | rust |
| BP.009 | Swift | blueprint | programming_languages | swift |
| BP.010 | Kotlin | blueprint | programming_languages | kotlin |
| BP.011 | PHP | blueprint | programming_languages | php |
| BP.012 | TypeScript | blueprint | programming_languages | typescript |
| BP.013 | Scala | blueprint | programming_languages | scala |
| BP.014 | Haskell | blueprint | programming_languages | haskell |
| BP.015 | Erlang | blueprint | programming_languages | erlang |
| BP.016 | Elixir | blueprint | programming_languages | elixir |
| BP.017 | Clojure | blueprint | programming_languages | clojure |
| BP.018 | R | blueprint | programming_languages | r |
| BP.019 | MATLAB | blueprint | programming_languages | matlab |
| BP.020 | Julia | blueprint | programming_languages | julia |
| BP.021 | Perl | blueprint | programming_languages | perl |
| BP.022 | Lua | blueprint | programming_languages | lua |
| BP.023 | Assembly | blueprint | programming_languages | assembly |
| BP.024 | SQL | blueprint | programming_languages | sql |
| BP.025 | HTML | blueprint | programming_languages | html |
| BP.026 | CSS | blueprint | programming_languages | css |
| BP.027 | Shell/Bash | blueprint | programming_languages | shell_bash |
| BP.028 | PowerShell | blueprint | programming_languages | powershell |
| BP.029 | Dart | blueprint | programming_languages | dart |
| BP.030 | Objective-C | blueprint | programming_languages | objective_c |

All 30 records are authorized for reclassification to `Instruction > Language`. IDs remain unchanged. C++ and C# normalize to `cpp` and `csharp`.

## Structural exceptions

- Six aggregate libraries reference per-lane schema URLs whose schema files are absent from this repository.
- The existing generic `AI/SCHEMAS/molt-block.schema.json` does not describe aggregate entries or standalone `BLK.*` wrappers as stored.
- Nine standalone H4-compatible `BLK.*` artifacts remain draft candidates.
- AIM/USE/NEED are Platform extensions, not H4 compiler lanes.
- Direct aggregate Trigger source count is zero.

Baseline adapter result: **PASS**, with **30** expected language warnings.
