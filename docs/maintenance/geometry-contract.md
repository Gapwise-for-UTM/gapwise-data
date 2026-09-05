# UTM campus geometry contract

Gapwise treats campus geography as canonical product data, not as a property of whichever basemap happens to be rendered.

## Canonical identity

`data/utm/building-footprints.ts` plus the source-linked `data/utm/footprints/` geometry define recognized building footprints. Each polygon belongs to one explicit building code. Basemap buildings are visual context only; entrance coordinates are routing/navigation data only.

A consumer must fail closed when a point belongs to zero or multiple canonical footprints. Ambiguity is a data-quality problem, not permission to choose the nearest building or first rendered feature.

## Current geometry sources

Footprint fragments come from reviewed OpenStreetMap geometry with explicit source identifiers. Complex buildings may use reviewed multipolygon relations. Derived geometry must preserve provenance and must not be assigned by proximity when identity is ambiguous.

## Camera and rendering are consumer behavior

The canonical dataset supplies campus geometry. MapLibre camera constraints, search focus, hover/click interaction, reduced-motion behavior, and visual styling belong to the core `gapwise` consumer and are tested there.

## 3D is appearance, never identity

Optional GLB/GLTF models must never participate in building hit-testing. A missing or broken visual model must not change which building a location resolves to. Model provenance, licensing, transforms, and verification should remain explicit.

The preferred model pipeline uses redistribution-compatible source geometry and open tooling, exports optimized local assets, verifies transforms against canonical footprints, and avoids scraping proprietary Concept3D assets.

## Routing geometry contract

Exterior points distinguish published entrances from inferred approaches. Verified association does not silently establish public access, direction, or accessibility. Step-free routing accepts only affirmative accessible evidence and fails closed otherwise.

Canonical route graph artifacts preserve oriented edge geometry and explicit accessibility/evidence metadata. The deterministic pathfinding algorithm and route preference behavior belong to `gapwise`, while graph facts belong here.

## Review checklist

A geometry change is not complete until:

- source ID/provenance is explicit;
- the registry code is exact;
- no proximity-based identity assignment is introduced;
- representative interior points resolve to the intended code;
- sampled overlap cannot cross-resolve to another code;
- consumer routing/map contract tests pass against the candidate dataset;
- inferred access is never promoted merely because it improves connectivity.
