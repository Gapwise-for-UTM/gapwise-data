# Campus data sources and integration boundaries

Canonical campus data records source URL, observation/publication time, freshness policy, and verification state. Remote text is untrusted data and is never treated as HTML. A source failure is `unavailable`, not a negative fact.

## Sources used by the shipped snapshot

- **UTM Facilities building directory:** https://www.utm.utoronto.ca/facilities/buildings — stable identity evidence; it does not justify live occupancy or indoor routes.
- **UTM snow and ice removal strategy:** https://www.utm.utoronto.ca/facilities/utm-strategy-snow-and-ice-removal — named barrier-free entrance evidence. Without publishable coordinates it remains identity-only and cannot make a step-free route verified.
- **UTM maps and directions:** https://www.utm.utoronto.ca/visitors/maps-and-directions — campus/building identity context. Gapwise does not extract coordinates from the visual map.
- **OpenStreetMap:** https://www.openstreetmap.org/ — reviewed exterior geometry under ODbL; attribution is preserved. It is not fetched while routing.

Place hours and amenities are included only when an official public UTM page supports the exact claim and the snapshot records the source and review date. Published hours are not a live guarantee.

## Provider boundaries not represented as live facts

- **MiWay:** production activation requires confirming official GTFS/GTFS-Realtime URLs, redistribution/attribution terms, cadence, and payload limits. Until then transit state is unavailable rather than fabricated.
- **UTM shuttle / GO Transit:** may use the same normalized provider contract only after a supported public feed and terms are verified.
- **UTM events / CLNx:** only an official public feed/API with stable terms may be ingested. Authenticated CLNx pages are not crawled.
- **Campus status, elevators, construction:** public notices can be normalized when an official supported feed exists. Absence of a feed does not mean a route is accessible.
- **Facilities issue reporting:** Gapwise may link to official reporting surfaces but does not call undocumented endpoints or claim to have submitted tickets.
- **Quercus/Canvas:** Gapwise does not scrape authenticated pages, accept UTORid passwords, or retain university session cookies. A future connector requires an approved or explicitly student-controlled interface.

Publisher infrastructure does not imply partnership. A publisher must be explicitly approved and scoped and cannot assign itself official verification state.
