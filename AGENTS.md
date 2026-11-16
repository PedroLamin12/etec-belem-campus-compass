<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- School content (places, map nodes, paths from Portaria, missions, team) lives in `src/data/school.ts`; routes between any two places are derived from each node's path from the Portaria, so add new places by extending that path table.
- Store building identity and confirmed floors on map nodes; access-only nodes describe the ground-floor entry rather than inventing a destination floor. Shared location and signed floor-transition helpers keep maps, place cards, and both directions of routes consistent.
- Use verified real photos; when only an exterior or corridor is available, retain a contextual photo caption so it is not presented as the destination's interior.
- Mission progress is device-local (localStorage via `src/data/progress.ts`); no backend is used.
- Android APK uses Capacitor (`capacitor.config.ts`) pointing at the published URL, because the app is SSR and has no static export.
- Share schematic/satellite switching through `SchoolMap` and render uploaded aerial media in `SatelliteMap`; satellite points represent building footprints rather than verified indoor coordinates, so floor-aware walking directions remain authoritative.
- Keep rear-room footprint sizes in school data and reuse them in the schematic so map geometry and location rules cannot diverge.
- Render reusable environment feed cards through `PlaceFeed` so real-photo captions, numbering, and route actions stay consistent between home search and the catalog.
- Use global semantic surface, typography, and motion tokens for the clean-tech UI, and disable motion for reduced-motion preferences to keep every screen consistent and accessible.
- App launch entry points target `/`; do not restore a previously viewed tab on startup, and preserve explicit deep links for navigation and sharing.
- Derive header and install icons from `campus-mark.svg` and render the accessible wordmark in live text, so mobile contrast and branding stay consistent.
- Keep companion destination lookup in `src/data/exploration.ts` using confirmed school data, never generated answers or invented locations.
- Emit one celebration event after each new persisted check-in and preserve existing mission XP; the shared shell owns the reward dialog to prevent duplicate effects.
- GuidedWalk advances through `routeBetween` nodes and uses shared floor transitions, so guided and overview walking directions stay consistent.
- CampusMascot is an original inline SVG with semantic colors and reduced-motion support, so character interaction works offline without a generation service.
