<div align="center">

<img src="public/logo-mark.svg" width="112" alt="Gapwise Data red deer logo" />

# Gapwise Data

### The canonical open data and provenance layer behind the Gapwise ecosystem.

**A transparent, developer-friendly home for the UTM campus data that powers Gapwise: buildings, geometry, routing evidence, provenance, validation, attribution, and reuse.**

[Website](https://data.gapwise.ca) · [Gapwise](https://gapwise.ca) · [Docs](https://docs.gapwise.ca) · [Status](https://status.gapwise.ca) · [AI](https://ai.gapwise.ca) · [Source data](data/utm)

</div>

---

## What Gapwise Data is

`gapwise-data` is the **canonical repository for public UTM campus facts and geometry used by Gapwise**. The checked-in dataset under [`data/utm`](data/utm) contains building identity, map geometry, entrances, routing graph inputs, indoor/outdoor graph artifacts, provenance, confidence metadata, and generated audit data.

The main [`gapwise`](https://github.com/andrewmuratov/gapwise) repository remains authoritative for **student state and deterministic product behavior**: timetable semantics, route calculation, gap planning, public API orchestration, SDK contracts, and map/product presentation. It vendors a checked-in snapshot of this repository's campus data so production behavior never depends on `data.gapwise.ca` or GitHub being reachable at runtime.

In short:

> **`gapwise-data` knows what UTM is. `gapwise` knows what to do with that knowledge.**

The initial canonical tree was bootstrapped byte-for-byte from the former `gapwise/src/data/utm` source. [`data/utm-source.json`](data/utm-source.json) records that migration provenance. [`data/utm/SHA256SUMS`](data/utm/SHA256SUMS) makes the current canonical tree independently integrity-checkable.

---

## What the data layer covers

- canonical UTM building and facility identities;
- campus geometry and building footprints;
- mapped, inferred, and evidence-only entrances;
- outdoor routing nodes and edges;
- available indoor graph data;
- routing coverage and route-evidence states;
- accessibility evidence and explicit uncertainty;
- provenance and source identifiers;
- generated routing/access audits;
- validation and dataset integrity checks;
- attribution and reuse requirements;
- versioned privacy-safe public data.

The current public Gapwise campus snapshot contains **30 canonical UTM buildings/facilities** and is consumed through the same deterministic platform semantics used by Gapwise web, mobile, API, SDK, and AI-facing surfaces.

## Data principles

1. **One canonical source.** Public campus facts and geometry are changed here first; downstream repositories consume snapshots or contracts.
2. **Explain transformations.** Published data should make clear where it came from and how it changed.
3. **Separate fact from inference.** Derived navigation data must not masquerade as direct observation.
4. **Prefer stable identifiers.** Codes and source IDs make downstream integrations more durable.
5. **Preserve uncertainty.** Unknown or unverified facts stay visible as unknown or unverified.
6. **Preserve provenance.** Source information belongs with the dataset, not in somebody's memory.
7. **No runtime coupling.** Consumer applications vendor or build against a pinned snapshot; a data-site or GitHub outage must not break campus routing.

---

## Consumer model

The core application intentionally keeps a compatibility mirror at `gapwise/src/data/utm` because the web app, public API, routing engine, tests, and build tooling already import those paths. That mirror is **not an independent source of truth**.

The core repository provides three maintenance commands:

```bash
bun run campus-data:check    # fail if the core mirror differs from this repo
bun run campus-data:sync     # copy canonical data -> core mirror
bun run campus-data:publish  # explicit tooling path for generated core artifacts -> canonical repo
```

Data-writing routing/survey maintenance commands synchronize from this repository before running and explicitly publish the generated dataset back afterward. CI independently compares the core mirror against this canonical tree.

Normal production requests do not perform cross-repository or `data.gapwise.ca` fetches.

---

## Validation

Run the integrity validator with:

```bash
npm run data:validate
```

It verifies, among other things:

- canonical ownership metadata;
- required building/entrance/routing graph files;
- JSON and GeoJSON parseability;
- the 30-building public snapshot and unique building codes;
- SHA-256 integrity for every checked-in canonical campus file.

`npm run build` runs this validation before building the portal.

---

## Gapwise ecosystem

The six first-party repositories are separate execution/publication surfaces with one product identity and an explicit source-of-truth hierarchy:

| Repository | Role | Primary surface |
| --- | --- | --- |
| **[`gapwise`](https://github.com/andrewmuratov/gapwise)** | Core web/PWA, canonical student state, deterministic routing/gap-planning behavior, public API, OpenAPI contract, and SDK source; consumes a vendored `gapwise-data` snapshot | [gapwise.ca](https://gapwise.ca) / [api.gapwise.ca](https://api.gapwise.ca/v1) |
| **[`gapwise-mobile`](https://github.com/andrewmuratov/gapwise-mobile)** | Native iOS and Android client consuming Gapwise product/API contracts | Native mobile app |
| **[`gapwise-ai`](https://github.com/andrewmuratov/gapwise-ai)** | OAuth-protected MCP layer consuming deterministic Gapwise campus/API semantics and delegated student context | [ai.gapwise.ca](https://ai.gapwise.ca) |
| **[`gapwise-data`](https://github.com/andrewmuratov/gapwise-data)** | **Canonical public UTM campus facts, geometry, routing graph data, provenance, validation, and reuse portal** | [data.gapwise.ca](https://data.gapwise.ca) |
| **[`gapwise-docs`](https://github.com/andrewmuratov/gapwise-docs)** | Canonical public developer documentation for platform contracts | [docs.gapwise.ca](https://docs.gapwise.ca) |
| **[`gapwise-status`](https://github.com/andrewmuratov/gapwise-status)** | Independent service-health monitoring and incident communication | [status.gapwise.ca](https://status.gapwise.ca) |

No consumer repository should recreate or silently fork UTM campus facts. Product-specific calculations and presentation remain with their product owner; source campus facts belong here.

---

## For developers

Use the public Gapwise developer platform when you want a stable machine-readable **campus intelligence contract** instead of depending directly on repository internals:

- **Developer hub:** https://gapwise.ca/developers
- **Developer docs:** https://docs.gapwise.ca
- **API:** https://api.gapwise.ca/v1
- **OpenAPI 3.1:** https://api.gapwise.ca/openapi.json
- **Versioned UTM snapshot:** [`public/data/utm-campus-v1.json`](public/data/utm-campus-v1.json)
- **JavaScript/TypeScript SDK:** `@gapwise/sdk@0.1.1` on npm and JSR
- **Python SDK:** `gapwise==0.1.0` on PyPI

```bash
npm install @gapwise/sdk@0.1.1
python -m pip install gapwise==0.1.0
```

The repository-level dataset is appropriate for inspection, provenance work, validation, and contributing campus facts. Applications should generally prefer the API/SDK contract unless they specifically need the raw source dataset.

Gapwise source code is MIT licensed, but upstream datasets retain their own terms. OpenStreetMap-derived records require the appropriate OpenStreetMap attribution and ODbL compliance; the MIT license does not override upstream data obligations.

---

## Local development

```bash
npm install
npm run data:validate
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

The portal is a lightweight React + Vite application designed for Vercel. Dataset validation is deliberately independent of the portal UI.

---

## Project relationship

Gapwise is an independent project created by Andrew Muratov. It is not an official University of Toronto service and is not affiliated with or endorsed by the University of Toronto.
