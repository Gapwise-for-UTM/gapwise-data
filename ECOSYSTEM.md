# Gapwise ecosystem integration

`gapwise-data` is the provenance and reuse surface of the six-repository Gapwise ecosystem. It explains public campus facts, schemas, evidence, transformations, attribution, and uncertainty; it does not redefine the product/API contract.

## Connected surfaces

| Surface | Canonical location | Relationship to Gapwise Data |
| --- | --- | --- |
| Student web/PWA + public API + SDK source | `andrewmuratov/gapwise` | owns deterministic campus/product semantics and the public API contract consumed here |
| Native mobile | `andrewmuratov/gapwise-mobile` | consumes the same campus identities/semantics on iOS and Android |
| AI/MCP | `andrewmuratov/gapwise-ai` | consumes minimized canonical Gapwise context behind OAuth; it is not a data-authority replacement |
| Developer docs | `andrewmuratov/gapwise-docs` | documents released API/SDK/data contracts and links back to provenance here |
| Status | `andrewmuratov/gapwise-status` | monitors public service health independently |

## Developer-platform state

- API: `https://api.gapwise.ca/v1`
- OpenAPI: `https://api.gapwise.ca/openapi.json`
- TypeScript SDK: `@gapwise/sdk`
  - npm `0.1.0` is published with provenance
  - JSR `0.1.0` is published with provenance through GitHub Actions OIDC
  - one portable TypeScript implementation targets Node, Bun, and Deno rather than separate runtime SDKs
- Python SDK: `gapwise==0.1.0` is published on PyPI through Trusted Publishing
- Docs: `https://docs.gapwise.ca`
- Data: `https://data.gapwise.ca`
- AI/MCP: `https://ai.gapwise.ca/api/mcp`
- Status: `https://status.gapwise.ca`

TypeScript and Python are equal first-party SDK implementations. Examples in this repository should cover both when SDK examples are relevant; curl remains the language-neutral wire-contract example.

## Data-specific source-of-truth rules

1. Canonical campus records originate in the main `gapwise` repository; this repository makes their evidence and transformations inspectable.
2. Public API and SDK behavior follows OpenAPI and the core implementation; this portal must not invent fields, enum values, rate limits, or availability semantics.
3. Unknown/inferred/approximate/unverified states remain explicit in examples and schema explanations.
4. Upstream attribution and ODbL obligations remain attached to data even when the consuming Gapwise code is MIT licensed.
5. A schema/data-version change should trigger review of the core API, both SDKs, developer docs, mobile consumers, AI grounding, and any status probes that depend on the changed surface.

## Change impact

When Gapwise Data changes, check whether the change affects:

- `gapwise` canonical data imports/types/API output;
- TypeScript and Python public models/examples;
- `gapwise-docs` data/provenance/API pages;
- `gapwise-mobile` bundled/cached campus behavior;
- `gapwise-ai` grounded campus context;
- `gapwise-status` monitored data/API endpoints.

The ecosystem is intentionally interconnected, but ownership stays clear: Data explains evidence; Core owns deterministic semantics; Docs explains releases; Mobile consumes; AI receives delegated context; Status communicates health.
