# OP–XY Interactive Control Atlas

Mobile-first independent control reference for Teenage Engineering OP–XY. No audio engine or simulated sequencer. Official guide revision 1.2.0 checked 2026-10-17.

## Run and build

Node 22+ and `zip` are the only build dependencies. The app itself is dependency-free ES modules with a TypeScript entity contract.

```sh
npm test
npm run build
python3 -m http.server 8080 --directory dist
```

Open http://localhost:8080 in a real browser. For offline support, deploy `dist/` to an HTTPS static host. The service worker registers on HTTPS only. Visit once while online, wait for “Offline ready”, then reopen the same URL offline. External manual links and source downloads are not cached. Private hosting may independently require an online sign-in; test the deployed URL in Safari before depending on offline use.

Install via Safari Share → Add to Home Screen where available. This workflow was not tested on a physical iPhone. Do not expect iOS Files or Quick Look to execute the standalone HTML export. `dist/opxy-atlas-standalone.html` is an optional self-contained browser export; the HTTPS application is the primary delivery.

## Browser tests

```sh
npm install
npx playwright install chromium
ATLAS_BASE_URL=https://your-host.example npm run test:browser
```

The browser suite covers 320, 375, 430, 768 and 1440px viewports, control lookup, action highlighting, tutorial navigation, search, zoom reset and offline reload. It writes screenshots to `reports/screenshots/`. The suite is included but was **not run** in the build environment because its supported browser-control capability was unavailable. Manual touch/pinch and keyboard tests, iOS Safari, and real OP–XY operation remain required. SVG evidence is not a browser screenshot.

## Project structure

- `src/geometry.mjs`: independent control inventory and measured SVG geometry; side-control locations clearly separated.
- `src/data.mjs`: sourced actions, contexts, ordered interactions, tutorial references, coverage caveats.
- `src/search.mjs`: normalized aliases, exact-match ranking, typo tolerance and priority/category defaults.
- `src/app.mjs`: UI state, details, navigation and pan/zoom.
- `src/types.ts`: entity contracts.
- `scripts/build.mjs`: reproducible static build, versioned offline cache, source archive and standalone export.
- `tests/`: executable Node tests and unexecuted Playwright suite.
- `reports/`: independent findings, fixes, verification scope and vector comparison evidence.

## Maintenance

1. Check the official guide revision and firmware release notes. The live guide and printable PDF may differ.
2. Update actions separately from rendering. Use unique control IDs; never collapse M1–M4 or tracks into generic controls.
3. Use ordered hold/press/turn/release events and explicit mode prerequisites. A generic bag of buttons is insufficient.
4. Cite the official URL, section and checked date for each mapping. Label inferred or conflicting behaviour instead of silently guessing.
5. Link related actions and reuse actions in tutorials. State any destination that might be overwritten.
6. Run Node tests, browser tests and manual physical checks; compare captures with official photography. Update review reports honestly.
7. Rebuild before deployment; content hashing changes the service-worker cache. Deploy all files atomically and do not rewrite `sw.js` to the HTML shell.

## Scope and verification

This is a substantial reference implementation, not a certification of exhaustive manual coverage. See `coverage` in `src/data.mjs` and `reports/verification.md` for remaining gaps. Simplified vector glyphs are disclosed. No real-instrument testing is claimed. Teenage Engineering trademarks remain theirs; this project is unaffiliated. Official imagery is used as inspection evidence, not as an application background.
