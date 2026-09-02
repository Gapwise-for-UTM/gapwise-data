<div align="center">

<img src="public/logo-mark.svg" width="112" alt="Gapwise Data red deer logo" />

# Gapwise Data

### The open data and provenance layer behind the Gapwise ecosystem.

**A transparent, developer-friendly home for the UTM campus data that powers Gapwise: buildings, geometry, routing evidence, provenance, schemas, validation, attribution, and reuse.**

[Website](https://data.gapwise.ca) · [Gapwise](https://gapwise.ca) · [Docs](https://docs.gapwise.ca) · [Status](https://status.gapwise.ca) · [AI](https://ai.gapwise.ca) · [Source data](https://github.com/andrewmuratov/gapwise/tree/main/src/data/utm)

</div>

---

## What Gapwise Data is

`gapwise-data` is the public data documentation and exploration layer of **Gapwise**, a multi-surface campus-intelligence ecosystem created and engineered by **Andrew Muratov**.

Gapwise is not only a timetable website. Its first-party ecosystem spans a student web/PWA experience, native mobile client, deterministic public campus API and SDKs, permissioned AI/MCP integration, an open data/provenance portal, developer documentation, and an independent operational status surface.

Andrew's work on the ecosystem spans **full-stack software engineering, cybersecurity and privacy engineering, platform architecture, API and SDK design, data engineering, developer infrastructure, mobile engineering, and permissioned AI integration**.

The canonical application data currently lives in the main [`andrewmuratov/gapwise`](https://github.com/andrewmuratov/gapwise) repository. This repository exists to make that data inspectable and reusable: what was collected, where it came from, how it was normalized, how confidence is represented, and what downstream developers may safely infer from it.

---

## What the data layer covers

- canonical UTM building and facility identities;
- campus geometry and mapped/inferred entrances;
- routing coverage and route-evidence states;
- accessibility evidence and explicit uncertainty;
- provenance and source identifiers;
- schema documentation and dataset exploration;
- normalization and validation workflows;
- attribution and reuse requirements;
- copyable JavaScript, Python, and curl examples;
- versioned public data and machine-readable access through the Gapwise platform.

The current public Gapwise campus snapshot contains **30 canonical UTM buildings/facilities** and is consumed by the same deterministic platform semantics used by Gapwise web, mobile, API, and AI-facing surfaces.

## Data principles

1. **Explain transformations.** Published data should make clear where it came from and how it changed.
2. **Separate fact from inference.** Derived navigation data must not masquerade as direct observation.
3. **Prefer stable identifiers.** Codes and source IDs make downstream integrations more durable.
4. **Preserve uncertainty.** Unknown or unverified facts stay visible as unknown or unverified.
5. **Make inspection easy.** Data should be understandable by both people and machines.
6. **Preserve provenance.** Source information belongs with the dataset, not in somebody's memory.
7. **Reuse one source of truth.** Product, mobile, API, docs, and AI should consume canonical Gapwise facts instead of recreating them independently.

---

## Gapwise ecosystem

The six first-party repositories are separate execution and publication surfaces with one product identity and source-of-truth hierarchy:

| Repository | Role | Primary surface |
| --- | --- | --- |
| **[`gapwise`](https://github.com/andrewmuratov/gapwise)** | Core web/PWA product, canonical student-state behavior, deterministic campus intelligence, public API, OpenAPI contract, and SDK source | [gapwise.ca](https://gapwise.ca) / [api.gapwise.ca](https://api.gapwise.ca/v1) |
| **[`gapwise-mobile`](https://github.com/andrewmuratov/gapwise-mobile)** | Native iOS and Android client consuming canonical Gapwise product and platform semantics | Native mobile app |
| **[`gapwise-ai`](https://github.com/andrewmuratov/gapwise-ai)** | OAuth-protected MCP layer for explicitly delegated student context and bounded AI actions | [ai.gapwise.ca](https://ai.gapwise.ca) |
| **[`gapwise-data`](https://github.com/andrewmuratov/gapwise-data)** | Open campus-data, schema, provenance, validation, and reuse portal | [data.gapwise.ca](https://data.gapwise.ca) |
| **[`gapwise-docs`](https://github.com/andrewmuratov/gapwise-docs)** | Canonical public developer documentation for the platform, SDKs, security model, and AI/MCP integration | [docs.gapwise.ca](https://docs.gapwise.ca) |
| **[`gapwise-status`](https://github.com/andrewmuratov/gapwise-status)** | Independent service-health monitoring and incident-communication surface | [status.gapwise.ca](https://status.gapwise.ca) |

`gapwise` remains authoritative for deterministic timetable, routing, gap-planning, campus, API, and primary student-state semantics. `gapwise-data` explains and exposes the evidence behind the campus-data layer; the other repositories consume or document those contracts rather than becoming parallel sources of truth.

---

## For developers

Use the developer platform when you want machine-readable campus intelligence rather than copying data out of this site:

- **Developer hub:** https://gapwise.ca/developers
- **Developer docs:** https://docs.gapwise.ca
- **API:** https://api.gapwise.ca/v1
- **OpenAPI 3.1:** https://api.gapwise.ca/openapi.json
- **Versioned UTM snapshot:** https://gapwise.ca/data/utm-campus-v1.json
- **JavaScript/TypeScript SDK:** `@gapwise/sdk`
- **Python SDK source:** https://github.com/andrewmuratov/gapwise/tree/main/sdk/python

Gapwise source code is MIT licensed, but upstream datasets retain their own terms. OpenStreetMap-derived records require the appropriate OpenStreetMap attribution and ODbL compliance; the MIT license does not override upstream data obligations.

---

## Local development

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

The site is a lightweight React + Vite application designed for Vercel.

---

## Project relationship

Gapwise is an independent project created by Andrew Muratov. It is not an official University of Toronto service and is not affiliated with or endorsed by the University of Toronto.
