<div align="center">

<img src="public/logo-mark.svg" width="112" alt="Gapwise Data red deer logo" />

# Gapwise Data

### The canonical open data and provenance layer behind the Gapwise ecosystem.

**A transparent, developer-friendly home for the UTM campus data that powers Gapwise: buildings, geometry, routing evidence, provenance, validation, attribution, and reuse.**

[Website](https://data.gapwise.ca) · [Data docs](https://docs.gapwise.ca/data/) · [Gapwise](https://gapwise.ca) · [API](https://api.gapwise.ca/v1) · [Status](https://status.gapwise.ca) · [GitHub org](https://github.com/Gapwise-for-UTM) · [Source data](data/utm)

</div>

---

## What Gapwise Data is

`gapwise-data` is the **canonical repository for public UTM campus facts and geometry used by Gapwise**. The checked-in dataset under [`data/utm`](data/utm) contains building identity, map geometry, entrances, routing graph inputs, indoor/outdoor graph artifacts, provenance, confidence metadata, and generated audit data.

The canonical Gapwise repositories are owned by the **Gapwise for UTM** GitHub organization (`Gapwise-for-UTM`). Andrew Muratov remains the creator and primary maintainer.

The main [`gapwise`](https://github.com/Gapwise-for-UTM/gapwise) repository remains authoritative for **student state and deterministic product behavior**: timetable semantics, route calculation, gap planning, public API orchestration, SDK contracts, and map/product presentation. It vendors a checked-in snapshot of this repository's campus data so production behavior never depends on `data.gapwise.ca` or GitHub being reachable at runtime.

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

## First-party distribution

Production builds publish the complete validated `data/utm` tree from a first-party Gapwise domain:

```text
https://data.gapwise.ca/datasets/utm/latest/
```

The machine-readable integrity manifest is:

```text
https://data.gapwise.ca/datasets/utm/latest/manifest.json
```

Each manifest entry records the artifact path, byte size, SHA-256 digest, canonical first-party URL, and organization-owned canonical repository. The schema is published at `https://data.gapwise.ca/schemas/dataset-manifest.schema.json`.

This replaces raw GitHub URLs as the preferred public distribution surface without creating a runtime dependency for the student app. `latest` is a current channel; reproducibility-sensitive consumers should pin checksums or a future immutable dataset release.

See the public [Data documentation](https://docs.gapwise.ca/data/) for API-vs-raw-data guidance, provenance, uncertainty, versioning, and contribution rules.

---

## Consumer model

The core application intentionally keeps a compatibility mirror at `gapwise/src/data/utm` because the web app, public API, routing engine, tests, and build tooling already import those paths. That mirror is **not an independent source of truth**.

The core repository provides three synchronization commands:

```bash
bun run campus-data:check
bun run campus-data:sync
bun run campus-data:publish
```

Data-writing routing/survey maintenance commands still synchronize from this repository before running and publish their resulting canonical artifacts back afterward. That generator layer remains a **transitional dependency** while validation/routing types are decoupled from core. New campus facts and source-level maintenance documentation belong here, not in downstream consumers.

Normal production requests do not perform cross-repository or `data.gapwise.ca` fetches.

---

## Maintenance documentation

Source-adjacent maintenance notes live under [`docs/maintenance`](docs/maintenance):

- source/provider boundaries;
- canonical geometry and identity rules;
- field-survey rules;
- access-audit ownership.

Public developer-facing explanations belong at **https://docs.gapwise.ca/data/**. The Data repository intentionally does not become a second public documentation site.

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

`npm run build` validates the dataset, verifies the public distribution contract, builds the portal, and publishes the raw distribution tree into the deployment output.

The independent core-consumer contract also injects candidate Data into current core and checks that the deterministic consumer still compiles/routes against it.

---

## Gapwise ecosystem

The six first-party repositories are separate execution/publication surfaces with one product identity and an explicit source-of-truth hierarchy:

| Repository | Role | Primary surface |
| --- | --- | --- |
| **[`gapwise`](https://github.com/Gapwise-for-UTM/gapwise)** | Core web/PWA, canonical student state, deterministic routing/gap-planning behavior, public API, OpenAPI contract, and SDK source; consumes a vendored `gapwise-data` snapshot | [gapwise.ca](https://gapwise.ca) / [api.gapwise.ca](https://api.gapwise.ca/v1) |
| **[`gapwise-mobile`](https://github.com/Gapwise-for-UTM/gapwise-mobile)** | Native iOS and Android client consuming Gapwise product/API contracts | Native mobile app |
| **[`gapwise-ai`](https://github.com/Gapwise-for-UTM/gapwise-ai)** | OAuth-protected MCP layer consuming deterministic Gapwise campus/API semantics and delegated student context | [ai.gapwise.ca](https://ai.gapwise.ca) |
| **[`gapwise-data`](https://github.com/Gapwise-for-UTM/gapwise-data)** | **Canonical public UTM campus facts, geometry, routing graph data, provenance, validation, and raw-data distribution** | [data.gapwise.ca](https://data.gapwise.ca) |
| **[`gapwise-docs`](https://github.com/Gapwise-for-UTM/gapwise-docs)** | Canonical public developer documentation for platform contracts, data, SDKs, security, and AI/MCP | [docs.gapwise.ca](https://docs.gapwise.ca) |
| **[`gapwise-status`](https://github.com/Gapwise-for-UTM/gapwise-status)** | Independent service-health monitoring and incident communication | [status.gapwise.ca](https://status.gapwise.ca) |

No consumer repository should recreate or silently fork UTM campus facts. Product-specific calculations and presentation remain with their product owner; source campus facts belong here.

---

## For developers

Choose the interface that matches your use case:

- **GitHub organization:** https://github.com/Gapwise-for-UTM
- **Developer hub:** https://gapwise.ca/developers
- **Developer docs:** https://docs.gapwise.ca
- **Data docs:** https://docs.gapwise.ca/data/
- **Raw Data portal:** https://data.gapwise.ca
- **Raw dataset manifest:** https://data.gapwise.ca/datasets/utm/latest/manifest.json
- **API:** https://api.gapwise.ca/v1
- **OpenAPI 3.1:** https://api.gapwise.ca/openapi.json
- **Versioned compact snapshot:** [`public/data/utm-campus-v1.json`](public/data/utm-campus-v1.json)
- **JavaScript/TypeScript SDK:** `@gapwise/sdk@0.1.1` on npm and JSR
- **Python SDK:** `gapwise==0.1.0` on PyPI

```bash
npm install @gapwise/sdk@0.1.1
python -m pip install gapwise==0.1.0
```

Applications should generally prefer the API/SDK when they want stable Gapwise semantics. Use raw distribution for research, visualization, provenance inspection, validation, or custom derivation pipelines.

Gapwise source code is MIT licensed, but upstream datasets retain their own terms. OpenStreetMap-derived records require the appropriate OpenStreetMap attribution and ODbL compliance; the MIT license does not override upstream data obligations.

---

## Local development

```bash
git clone https://github.com/Gapwise-for-UTM/gapwise-data.git
cd gapwise-data
npm install
npm run data:validate
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

The portal is a lightweight React + Vite application designed for Vercel. Dataset validation and distribution are deliberately independent of the portal UI.

---

## Project relationship

Gapwise is an independent project created by Andrew Muratov. It is not an official University of Toronto service and is not affiliated with or endorsed by the University of Toronto.
