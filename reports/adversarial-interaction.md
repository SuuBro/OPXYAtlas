# Final independent interaction source re-review — 2026-10-17

**Scoped verdict:** I1–I8 have source-level remediations; no additional confirmed defect remains in those reviewed paths. This is a source-review result, not a browser or accessibility test pass. I9 remains an unverified short-viewport layout concern; new responsive rules mitigate it but only rendering can close it.

The reviewer reopened `app.mjs`, `state.mjs`, `search.mjs`, `style.css`, `geometry.mjs` and the build script. The Node suite passed all 14 tests at this checkpoint, including symbol search, corrupt-state handling, independent progress and pinch midpoint tests.

| Finding | Re-review outcome |
|---|---|
| I1 virtual click | Resolved in source: detail-zero hardware clicks select controls. VoiceOver validation remains unexecuted. |
| I2 navigation state | Resolved in source: queries/filters persist, control browsing temporarily pauses the query, workflow progress is stored independently and Restart is explicit. |
| I3 pinch translation | Resolved in source and pure-function test: current midpoint translation participates in the transform. |
| I4 focus | Resolved for reviewed tutorial/detail navigation: step heading focus and trigger return paths exist. Browser focus behaviour remains untested. |
| I5 saved state | Resolved: sanitizeState validates types, IDs, enums and progress; active step is bounded before lookup. |
| I6 symbol searches | Resolved: standalone plus/minus and trailing combination target symbols survive normalization; regressions pass. |
| I7 target zoom | Resolved for 320px minimum: actual target dimensions drive reveal zoom, side targets are now 28 model units high. Additional max-zoom guard prevents repeat-zoom traps on even smaller windows. |
| I8 interface targets | Resolved in CSS source: chips/map controls have 44px minima; tutorial buttons wrap. Geometry hit regions remain nonoverlapping in unit checks. |
| I9 short viewport | Mitigated with short-height map rules and non-sticky hardware at <=500px height; still unverified visually. |

A late concern calculated against old 20-unit side targets was rechecked against current geometry and withdrawn: both side targets are 28 units high. Do not report that obsolete calculation as an outstanding 320px defect.

Build packaging now exists, generating service worker, manifest, icon, source archive, evidence JSON and standalone export. The worker precaches application assets as one install operation, uses a content-derived cache name and removes previous atlas caches. No offline install/reload was executed; reports and external manual links are not part of the precached application core. The optional standalone export must be opened by a JavaScript-capable browser, not iOS Quick Look.

Browser tests still require execution. Source inspection cannot prove touch hit accuracy, clipping, actual VoiceOver behaviour, iPhone safe areas, installability or offline delivery. These are explicit acceptance limitations, not hidden passes. Whole-product completion therefore remains blocked on browser/device evidence and the separately documented coverage gap.

## Historical first-pass findings

# Independent interaction source review

2026-10-17. Scope: `src/app.mjs`, `src/search.mjs`, `src/style.css`, `src/index.html`, and delivered browser-test definitions. No browser was run; no simulated touch, screenshot, offline, screen-reader or physical-device pass is claimed. Findings below follow from code paths; browser reproduction remains required. The prior Common-ranking inversion is fixed in the current source.

## Actionable findings

### I1 — High: virtual click does not select hardware controls

Hardware selection exists only in `keydown` and stage pointer-up handlers. Document click delegation has no `[data-control]` branch. A screen-reader activation dispatching click without pointer coordinates therefore does nothing on an individually exposed SVG button. Add a click path for non-pointer/assistive activation, guarding duplicate activation after normal pointer-up; retain keyboard Enter/Space support. Test actual VoiceOver activation when available and a synthetic detail-zero click regression meanwhile.

### I2 — High: navigation destroys retained state

`selectControl` clears query and category, removes tutorial; `selectAction` removes tutorial; `selectTutorial` always resets step to zero. A user on step 6 who inspects a hardware button cannot resume the workflow. This contradicts navigation retention requirements. Store tutorial progress independently by tutorial ID and retain search query/filter state separately from control browsing. Provide Resume versus Restart explicitly; only deliberate clearing should delete the query.

### I3 — Medium: pinch translation ignored

Two-pointer movement uses `gesture.center` captured at pointerdown, never the current midpoint. Keeping finger distance fixed while moving both fingers cannot pan the map; pinch-centre movement also causes the content to drift away from the fingers. Compute current midpoint and add its translation to the anchored scale transform. Test simultaneous two-pointer movement, then transition to one remaining finger.

### I4 — Medium: focus destroyed by detail re-render

Next, Previous and jump buttons are replaced by `innerHTML` in `renderDetail`. No focus is restored to the step heading or replacement control. Keyboard users lose their location on every step; Escape/close also lacks return-to-trigger focus. Move focus deliberately after tutorial navigation, and restore it when closing details. Do not steal search-input focus during unrelated search rendering. Test focus positions, not only `aria-current`.

### I5 — Medium: restored local state is not validated

Only action/tutorial/control IDs are checked. A persisted `step` that is nonnumeric produces NaN in `activeAction` and indexes an undefined step; a non-string query crashes normalization-dependent operations; an invalid category hides every result. A previous build or corrupted local value can break startup. Parse a schema/allowlist, coerce only finite integer step indices, and reset invalid fields. When no active action exists, force details closed so stale empty panels cannot persist.

### I6 — Medium: physical symbol searches disappear

Observed through a Node-only call to `normalize`/`rankActions`: `+` and `-` normalize to empty and return Play/Stop/Tempo. `Shift + +` becomes `shift`, losing the actual Plus target. Preserve standalone printed control symbols as Plus/Minus tokens while treating an intervening plus as a combination separator. Add tests for both symbol and word forms and ensure Ctrl/Shift punctuation cannot silently broaden a query.

### I7 — Medium: selected-control zoom can undo touch sizing

The touch guard zooms to approximately 44px buttons, but immediately selecting a control invokes `reveal`, capped at 3×. At a 320px viewport, base is below 300px, so a 49-unit target becomes under 44px again. This causes repeated zoom-then-second-tap interactions after every selection, even when the user had already zoomed for accessibility. Preserve current adequate zoom if the selection is already visible, or compute a single-target minimum based on rendered control dimensions. Volume and side controls have different dimensions and must use their actual target size.

### I8 — Medium: mobile target-size exceptions

`.chip` is 32px minimum, map-toolbar/map-footer buttons become 40px, and narrow side-control height is only 20 model units. A reference intended for reliable touch should use 44px for interface buttons and an accessible picker/focus path for tightly packed hardware. Verify no overlap after enlarging targets. The hardware's full-device overview is intentionally below minimum, but selection zoom should reliably resolve this.

### I9 — Medium: persistent sticky hardware can obstruct short screens

Mobile hardware is sticky at top:0; the detail sheet reserves up to 48dvh, while the map has a fixed 155px stage plus heading/toolbars/footer. On short-height portrait or landscape screens these can overlap substantially and hide highlighted controls behind the sheet. Include short-height rules or dynamically available-stage height; show a collapse/expand detail affordance. This is a source-level layout risk, not a reproduced screenshot failure.

## Offline and build status

At review time `scripts/` is empty and package build points to `scripts/build.mjs`; `sw.js`, manifest and icon referenced by the app are not yet present in source. Parent is implementing packaging. Offline operation cannot be certified before those outputs exist. Registration only occurs on HTTPS; the test correctly skips offline on HTTP despite a misleading comment suggesting localhost covers it. The UI checks a cache name hardcoded to `opxy-atlas-v1`; keep that aligned with the generated worker/cache manifest and handle check promise rejection. Avoid treating only a cached index as proof that every module is cached.

## Existing test coverage limits

Browser tests are explicitly unexecuted. They use picker selection rather than actual hardware hit-testing, never dispatch pinch or drag gestures, never test screen-reader click/focus restoration, and do not verify retained query/tutorial progress. These are meaningful missing assertions corresponding to I1–I7. Screenshot generation alone does not compare visual output to official imagery. Unit/source assertions can support fixes but cannot close those browser/device gaps.

## Positive checks within source-review scope

Action text is escaped before HTML interpolation; source links use noopener. Pointer capture, drag movement threshold and suppression after multi-pointer release exist. Interaction order is rendered explicitly; hold controls have distinct visual treatment. Mobile safe-area padding and reduced-motion CSS exist. Empty-search reset and all control picker options exist. These observations do not certify rendered behaviour.

## Retest gate

Resolve I1–I8, assess I9 with actual viewport rendering, and finish the build/offline pipeline. Then run browser tests for the specific paths above on narrow widths and a short-height viewport. Real iPhone Safari, VoiceOver and actual OP–XY testing remain separate limitations.
