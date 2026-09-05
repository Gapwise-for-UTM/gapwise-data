# UTM campus field-survey workflow

Gapwise only promotes routing/access records that can be traced to a publishable source or field survey. Do not infer corridors, entrances, accessibility, or distances from a building outline. Do not collect restricted floor plans, faces, student information, access-control details, or anything you are not allowed to publish.

## Survey rules

- Use stable lowercase IDs for nodes/edges.
- Measure route distance rather than guessing it.
- Record accessibility as `accessible`, `not_accessible`, or `unknown`; use `unknown` whenever the full connection has not been verified.
- A stairs edge cannot be marked accessible.
- Use one-way direction explicitly where appropriate.
- Keep photo references non-secret and do not commit sensitive images.

Supported node concepts include entrances, hallways, junctions, public room doors, stairs, elevators, interior doors, and outdoor path points. Indoor diagram coordinates are not routing distances; measured edge distance is the routing cost.

## Canonical output

Survey-derived graph artifacts belong in `data/utm/generated/` and must pass Data integrity validation plus the core-consumer routing contract before merge.

The survey conversion code is still coupled to deterministic core routing types and graph-integrity behavior. Until that type boundary is extracted, the legacy import command remains invoked from a sibling `gapwise` checkout. That is an explicit transitional dependency, not a reason for the generated data to be owned by core.

## Review before merge

- validate the complete input before writing;
- refuse empty production replacement;
- sort generated records deterministically;
- review deletions and coordinate changes;
- test bidirectional, disconnected, and step-free cases;
- run Data validation and the core-consumer contract;
- have a second reviewer check measurements before labeling a route verified.
