<div align="center">

<img src="public/logo-mark.svg" width="112" alt="Gapwise Data red deer logo" />

# Gapwise Data

### The map data behind Gapwise, documented in the open.

A transparent, developer-friendly home for the campus data that powers Gapwise: what is collected, where it comes from, how it is normalized and verified, and how other projects can reuse it.

[Website](https://data.gapwise.ca) · [Gapwise](https://gapwise.ca) · [Source data](https://github.com/andrewmuratov/gapwise/tree/main/src/data/utm)

</div>

---

## What this repository is

`gapwise-data` is the public documentation and exploration layer for Gapwise's map data. The actual application data currently lives in the main Gapwise repository while this site explains its structure, provenance, collection workflow, schemas, limitations, and reuse patterns.

The goal is not just to publish files. It is to make the data understandable.

## What the site covers

- searchable dataset catalog
- campus geometry and building registries
- collection and normalization workflow
- verification and provenance model
- schema explorer
- copyable JavaScript, Python, and curl examples
- source IDs and attribution concepts
- human-readable explanations of derived and inferred data
- future-ready space for versioned downloads, changelogs, API access, validation tooling, and coverage metrics

## Data principles

1. **Explain transformations.** Published data should make clear where it came from and how it changed.
2. **Separate fact from inference.** Derived navigation data should not masquerade as direct observation.
3. **Prefer stable identifiers.** Codes and source IDs make downstream integrations more durable.
4. **Make inspection easy.** Data should be understandable by people and machines.
5. **Preserve provenance.** Source information belongs with the dataset, not in somebody's memory.

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

## Current architecture

The site is a lightweight React + Vite application designed to deploy cleanly on Vercel. It currently reads as a documentation/explorer experience and links back to the canonical data in `andrewmuratov/gapwise`.

## Status

This repository is new and intentionally designed to grow into the long-term data portal for Gapwise. The next major additions are expected to include richer live dataset previews, coverage statistics, validation reports, versioned exports, provenance timelines, and more direct machine-readable access.

---

<div align="center">
  <sub>Gapwise is an independent project and is not an official University of Toronto service.</sub>
</div>
