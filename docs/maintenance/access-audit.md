# Campus access audit

The canonical machine-readable access audit lives at `data/utm/generated/campus-access-audit.json` and is distributed at `https://data.gapwise.ca/datasets/utm/latest/generated/campus-access-audit.json`.

The audit distinguishes verified geocoded doors, inferred approaches, graph connectivity, explicit accessibility evidence, and unresolved coverage. A verified door/building association does **not** imply ordinary public access or step-free access unless those independent fields are affirmative.

Official UTM barrier-free entrance names may establish identity without publishable coordinates. Those records remain non-routable evidence until they can be matched to publishable geometry or a field survey. Unknown remains unknown; step-free routing fails closed.

Human-readable public explanation belongs in `docs.gapwise.ca/data/`; this repository keeps the generated audit and source-adjacent maintenance rules.
