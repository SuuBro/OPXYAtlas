# Final independent documentation re-review — 2026-10-17

**Scoped verdict:** no remaining shortcut or tutorial-order correction identified in the 305 included action records after the fixes below. **This is not full specification acceptance:** D2 (whole-manual coverage) remains outstanding, explicitly disclosed by `coverage.status = partial`. Sampling release-to-finish remains inferred. Browser, visual hardware comparison and physical-device operation were not tested by this reviewer.

The reviewer reopened the current source, examined every action-generating family, checked the expanded mappings against the live official Project, Players, Auxiliary, Step components, Mix, Instrument, Sequencer and Get started chapters, and reran the Node suite (14 passing tests at this checkpoint). Unit success is not documentation evidence by itself.

| Finding | Re-review outcome |
|---|---|
| D1 priority inversion | Resolved: Common threshold, descending priority and category order now agree with data. |
| D2 incomplete coverage | Open as an explicit product completeness gap. Added operations improve coverage; `coverage.knownGaps` inventories the main omissions and manual ambiguities. No exhaustive-manual certification. |
| D3 scene entry | Resolved: concrete scene 12 events include Shift, gateway, both digits and release. |
| D4 song insertion | Resolved: action describes insertion at cursor; tutorial requires empty order and capacity. |
| D5 preset toggle | Resolved: both tutorial instruction and interaction text conditionally switch to engine view. |
| D6 schema/evidence | Runtime remediation present: pressure/switch types, derived related actions, tutorial evidence, and separately identified context records preserve exact prerequisite text. TypeScript declarations now include contextId, tutorial sources/verification and source verification/notes. |
| D7 last accidental | Resolved: upper D-sharp/printed 0 wording agrees with physical label. |
| D8 encoder inverse coverage | Resolved for locking/automation: all four encoders have explicit variants for all sixteen steps and live automation. |

Expanded project commands, player activation/arpeggio controls, auxiliary track entry/FX selection, master mixer parameters, conventional filter/value-LFO parameters, Multiply example/removal, note extension/copy/nudge, transpose, scale and length were reviewed. No new contradictory shortcut was identified. Examples remain examples, not exhaustive variants for every track/key. Ambiguous Project browser M2 history/duplicate wording is deliberately excluded and disclosed.

Eight tutorial chains were rechecked after remediation. Prerequisites and ordered hold/release events remain explicit. Destructive edits continue to have warnings. The sampling inference is surfaced in both action and tutorial metadata. The reports and user-facing claims must retain the distinction between documented mappings, inferred release behaviour, partial coverage and unexecuted device tests.

## Historical first-pass findings and evidence

# Independent adversarial documentation review

Reviewed 2026-10-17. Reviewer did not author `src/data.mjs`. Live official guide identifies itself as v1.2.0. Scope: all action-generating loops, individual actions and eight tutorial definitions present in the reviewed file; cross-check of interaction schema, inverse mapping and discovery ordering. No browser, physical OP–XY or physical iPhone was available. This is not a visual/hardware or device-behaviour certification.

## Initial verdict: actionable findings remain

### D1 — High: Common discovery priority is inverted

Data uses larger numbers for common actions (Play 100, Stop 99, tempo 96), while `search.mjs` excludes priority >40 in Common and sorts ascending. Thus basic actions are suppressed and obscure/destructive operations lead. Align the ranking contract and add regression assertions that initial Common includes Play/Stop/tempo and excludes song-clear. Category order additionally must follow the specification, not simply mixed priority.

### D2 — High: incomplete mapping coverage

The data is a useful documented subset, not all documented actions involving each control. Generated repeated track/step/note actions inflate count without providing completeness. Known missing families include auxiliary track-specific functions, players, project operations, COM settings/routing, step components, envelope/LFO parameters and many per-encoder contexts. Add an explicit chapter/control coverage inventory and implement missing mappings. Until complete, label the guide's coverage as partial; do not certify the all-documented-actions requirement.

Concrete examples: [sequencer §7](https://teenage.engineering/guides/op-xy/sequencer) also documents note extension/nudge, step copy, track sequence shift, transpose, step-recording and bar scale/length/quantisation; none are mapped. [instrument §14](https://teenage.engineering/guides/op-xy/instrument) documents envelope switching and ADSR, filter resonance/envelope/key tracking, LFO destinations, preset settings, and track-held sound operations. [mix §17](https://teenage.engineering/guides/op-xy/mix) includes auxiliary quick mute, pan reset, white-encoder mute, EQ, saturator and master contexts absent here. These are actionable omissions, not merely speculative extras.

### D3 — High: scene-more has an incomplete interaction model

`scene-more` puts Shift in prose context only; its sole event highlights accidental-10. The numeric input is embedded in that event's text and no release exists. This violates ordered-event and complete-control highlighting requirements. Replace with a concrete example (e.g. scene 12): hold Shift, press last accidental, press 1, press 2, release Shift; or build a typed numeric-input group that resolves actual controls. [Arrange §16.3](https://teenage.engineering/guides/op-xy/arrange) supplies the scene entry mechanism.

### D4 — Medium: song append claim lacks cursor prerequisite

`song-append` and scenes tutorial promise appending while allowing existing order. The same [Arrange §16.4](https://teenage.engineering/guides/op-xy/arrange) supports insertion at a navigated position. Require an empty selected song order for this concrete tutorial, or explicitly navigate to its end before claiming append. Rename generic action to insert scenes if no end-position step is provided. Also require room within the 96-entry song limit.

### D5 — Medium: preset tutorial assumes toggle state

`preset-view` toggles category/engine view. The tutorial promises browsing by engine but unconditionally invokes the toggle, which could instead return an already-engine browser to categories. Make the step conditional on visible current view, with a tutorial-specific instruction override. [Instrument §14.6](https://teenage.engineering/guides/op-xy/instrument) confirms the toggle. No shortcut correction is otherwise needed in this workflow.

### D6 — Medium: model and evidence gaps

`InteractionType` excludes `switch` and `pressure`, both used by data. Add them and validate the runtime data against the schema. `context` is an unstructured string, all related-action arrays are empty, and tutorials lack explicit source aggregation fields. Implement typed context fields (mode, bank, module, transport, prerequisites), useful related links and derived tutorial sources. These are specification gaps even though the present arrays can render. Multi-control holds currently encode simultaneous holding implicitly; document and test that meaning.

### D7 — Medium: incidental keyboard labels are ambiguous

The last black key is labelled Accidental 0 by geometry but its note action says accidental key 10. Prefer note names plus printed scene digits consistently (e.g. upper D-sharp, scene-entry 0). This is an interaction-label problem, not an assertion about measured geometry. New low/high labels should distinguish physical keyboard halves from absolute pitches after octave shifts.

### D8 — Medium: example-only parameter mappings need honest scope

`lock-1`…`lock-16` and automation only map encoder 1, although the underlying operation works with other eligible encoders. This leaves encoder 2/3/4 inverse lookup without their lock/record roles. Either add explicit variants for all four, or model a parameter-control choice that resolves the selected encoder. [Sequencer §7.1–7.2](https://teenage.engineering/guides/op-xy/sequencer) supports parameter locking and automation for the four instrument modules but excludes players from locks.

## Shortcut and tutorial audit outcome

The reviewed combinations for Shift+Record undo, Record+Stop clear, Bar+M1/M2/M4 clearing, Bar+Shift+Plus duplication, Shift+track preset/mute (distinct modes), Instrument+track quick mute, module selection, Shift+M1/M3/M4 instrument selection, pattern M1–M4 editing and scene Shift+M1–M4 editing match their cited chapter text. Destructive pattern and scene actions have warnings; undo appropriately disclaims universal coverage. Sources are chapter URLs with section labels, sufficient to trace evidence, though deep anchors would improve lookup.

| Tutorial | Finding |
|---|---|
| Drums | Ordered kick/snare procedure matches [Get started §4.1](https://teenage.engineering/guides/op-xy/get-started); held snare is retained through both added steps. New-project/default-kit prerequisite is explicit. |
| Melody | Default bass track and arm/play/stop ordering agree with [Get started §4.2](https://teenage.engineering/guides/op-xy/get-started) and sequencer instructions. Empty pattern and stopped transport are explicit. |
| Preset | D5 conditional view required; browser selection/load controls otherwise documented. |
| Duplicate | Copy/new/paste/edit sequence is a reasonable composition of documented actions. Track-1 source/free-slot prerequisite is explicit; bank choice must be obeyed. |
| Scenes | D4 required. Empty scene 2 prerequisite correctly prevents treating an existing scene as an automatic clone. |
| Mix | Levels/send/pan encoders match §17.1; preconfigured effects and instrument bank are explicitly required. |
| Sample | Destination key precedes capture; source/gain/threshold/exit align with [Sample §18](https://teenage.engineering/guides/op-xy/sample). Release-to-finish is correctly marked inferred, not hardware-verified. Keep that limitation visible in tutorial and action. |
| Automation | Instrument/filter/play/hold-record/rotate/release/bar-smoothing/stop sequence matches documented procedure; conventional-filter prerequisite prevents misdescribing the dynamic filter. |

Other basic actions — power, volume, pressure pitchbend, COM battery meter, playback/restart, stop/all-notes stop and keyboard octave — agree with [Hardware overview](https://teenage.engineering/guides/op-xy/hardware-overview) and [Layout](https://teenage.engineering/guides/op-xy/layout). Tempo's encoder assignments and metronome click agree with [Tempo §11](https://teenage.engineering/guides/op-xy/tempo).

## Retest requirements

Resolve D1 and D3–D8, then independently re-review changed records and assert control participation in generated variants. D2 needs a bounded chapter inventory and remains an explicit product completeness limitation until completed. Retest all eight tutorial chains for prerequisites after modifications. Sampling finish remains a disclosed unverified behaviour. A clean unit suite cannot close hardware fidelity, physical device testing, offline installation, or whole-manual completeness.
