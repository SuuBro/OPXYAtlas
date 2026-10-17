# Final mobile polish source-review result — 2026-10-17

**No outstanding actionable source-review findings remain within P1–P8.** This conclusion covers the reviewed accessibility labels, reading contrast, search-selection event order, mobile verification entry, sheet completion/reset, canceled pointer handling, expansion focus and explicit compact-search exit. It is not whole-product acceptance or evidence of browser/device correctness.

The reviewer reopened the final changes. Badge text now uses #89532b; legend text uses the tested #5d6258 muted token. Enter/Escape, native empty search and the empty-results reset explicitly clear compact search mode, while ordinary blur still avoids immediate layout movement. Sheet swipe click suppression expires after 250ms and exempts keyboard/assistive detail-zero clicks. Earlier remediation for P1–P7 remains present.

The reviewer reran `node --check src/app.mjs` successfully and `npm test`: **17 tests passed, zero failures**. No new startup or handler hard failure was identified during source inspection. These checks do not execute the DOM event pipeline or render CSS.

**Remaining verification limitations:** browser tests and screenshots were not run; actual iPhone Safari/Android behaviour, VoiceOver, keyboard viewport animation, touch hit-testing, safe areas, sheet drag sequencing, clipping at narrow/short sizes and offline installation remain unverified. The separate manual-coverage limitation also remains. Historical findings below are retained as an audit trail and are superseded by this final status.

---

# Mobile polish re-review — 2026-10-17

Source was reopened after remediation. **P1, P2 and P4–P7 are resolved at source-review scope.** P3 had two small residual colour cases identified below. No new app-startup hard failure was identified. `node --check src/app.mjs` succeeds and the reviewer reran the Node suite: **17 tests passed**. Browser regression definitions remain unexecuted; no screenshot, Safari, VoiceOver or device pass is implied.

| Finding | Re-review |
|---|---|
| P1 search name | Explicit accessible label now present. |
| P2 blur movement | Compact layout persists through blur and is released on deliberate selection, avoiding the immediate blur-triggered map expansion. Actual keyboard viewport animation still needs browser testing. |
| P3 small text contrast | Main text roles now use #5d6258 and pass the supplied five-surface contrast gate. Residual badge #a26634 on #f8f7f2 computes 4.36:1; legend #696b60 on #e3e2db computes 4.17:1. Darken both. |
| P4 mobile verification access | Accessible 44px mobile header button invokes About. |
| P5 Finish state | Terminal tutorial branch collapses expanded sheet. |
| P6 canceled pointers | Pointer-up exits for IDs absent from the active pointer map. |
| P7 expansion focus | Only an active input is blurred; invoking keyboard button retains focus. |

Follow-up usability finding P8: retained `.searching` currently has no explicit exit through clear-search/Enter/Escape. Filters remain hidden after search keyboard dismissal until selecting an action or another layout-changing control. Restore normal search/filter layout on explicit clear or Escape (not raw blur) to preserve the tap fix while providing a deliberate exit. This is not an app crash.

Startup review covered imports, queried element IDs, dynamic control handlers, function initialization order, restored state and new mobile About handler. No missing-static-element or temporal-initialization failure was found. Hidden panels, sheet swipe suppression and viewport behaviour retain the previously stated browser-verification limitations.

## Historical first-pass review

# Independent mobile polish source review

Reviewed 2026-10-17 after the fixed-viewport/mobile-sheet rewrite. Scope: current `app.mjs`, `index.html`, `style.css`, control geometry and pointer/focus sequencing. No browser, screenshot, physical iPhone, VoiceOver or OP–XY test was performed. The reviewer did not author the rewrite. No app files were edited in this review.

## Findings requiring changes

### P1 — High: search has no meaningful accessible name

The input's wrapping label contains an aria-hidden search icon and a `kbd` slash. Its accessible name is consequently a slash on desktop and may be empty when the keyboard hint is hidden on mobile. The placeholder is not a robust substitute for a proper label. Give `#search` an explicit `aria-label="Search actions and controls"` or a visually hidden label span.

### P2 — High: blur-triggered reflow can invalidate result taps

Focusing search adds `.searching`, shrinking/hiding map content; blur immediately removes it. A pointer activation of a result can transfer focus at pointerdown, blur the search, and move that result vertically before pointerup/click. That can swallow activation or target a different element. `selectAction` blurring after click does not prevent the earlier default focus transition. Keep the compact search layout until the selection has completed, or defer blur cleanup until after click dispatch; preserve intentional keyboard navigation. This is a concrete event-order risk requiring browser reproduction, not a claimed observed Safari failure.

### P3 — High: small essential text lacks contrast

Computed sRGB contrast from stylesheet values (Node/browser rendering not required):

| Text role | Foreground / background | Ratio |
|---|---|---:|
| Interaction verb chips | #959d85 / #fafaf4 | 2.69:1 |
| Action descriptions | #777c6e / #f8f7f2 | 4.00:1 |
| Result metadata | #84887b / #f8f7f2 | 3.38:1 |
| Category headings | #989c8c / #f8f7f2 | 2.62:1 |
| Restart / Exit text | #919b81 / #f8f7f2 | 2.72:1 |

These roles are 8–13px normal text, so use at least 4.5:1. Preserve the quiet visual tone with fewer borders/weights rather than fading instructions and action verbs below legibility thresholds. Audit other muted text tokens as part of the same correction.

### P4 — Medium: mobile loses Sources & verification access

The sole `#about` entry is in a footer hidden by the mobile media query. This removes in-app access to the verification reports/source download on the primary target. Add a reachable mobile entry in header/discovery, or retain an unobtrusive footer access control.

### P5 — Medium: Finish leaves expanded-sheet state active

`changeStep` on the terminal step clears tutorial/details state but never calls `setSheetExpanded(false)`. The `.sheet-expanded` class continues dimming hardware and affects the next opened detail. Collapse the sheet on Finish, as already done for close/exit, and test Finish from both normal and expanded states.

### P6 — Medium: canceled pointers may later become a tap

`pointercancel` now clears every tracked pointer. A later pointerup for another contact still enters `pointerEnd` without checking membership or an active gesture. If `moved` is false, it can select a control or zoom despite the interaction having been canceled. Return immediately for untracked pointer IDs and mark canceled gestures non-tappable. Test cancel-one-of-two followed by pointerup, as well as ordinary one-to-two-to-one transitions.

### P7 — Low: expanded map deliberately discards keyboard focus

`setMapExpanded(true)` unconditionally blurs the active element and does not focus a map control. Keyboard users invoking the expand button lose their position. Retain focus on that still-visible button (or move to a named map region), and return focus on collapse. Blur only a text input if keyboard dismissal is needed. This is a navigation polish issue rather than a keyboard trap.

## Hidden panel and viewport observations

- Discovery and other covered panels use `visibility:hidden` and `pointer-events:none`; hidden visibility excludes descendant focusability in ordinary browser behaviour. Missing `inert` alone is therefore not logged as a defect here. Actual assistive-technology behaviour is still untested.
- The expanded instruction sheet intentionally leaves a strip of hardware accessible. It is not presented as a modal dialog, so no modal focus trap should be claimed or added automatically.
- Stage ResizeObserver recomputes scale/clamps pan, and visualViewport height drives the mobile root height. These are appropriate source mechanisms, but keyboard closing, orientation timing and safe-area values need real browser execution.
- Sheet drag suppresses the subsequent click in capture phase. That avoids a swipe immediately toggling the state back; verify cancellation and mouse/touch event sequences in browser tests.
- New fixed-region scroll containers use `min-height:0` and dedicated overflow. The map/list arrangement is structurally clearer, but no narrow-viewport clipping, content reachability or screenshot pass is certified.

## Required regression checks

Add checks for meaningful search name, result activation after input blur, contrast tokens, mobile About entry, expanded tutorial Finish, canceled pointer sequences and expansion focus. Run actual mobile/touch tests when browser access is available. Keep browser, physical-device and offline claims unchanged until those checks are executed.
