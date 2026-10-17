# Independent hardware reference review

Reviewer scope: physical control inventory and geometry, inspected official product photography and official manual layout page. This is a source-reference review, not a rendered application or physical-device test.

## Evidence

- https://teenage.engineering/guides/op-xy/layout — downloaded `layout.html`; official labelled groups and control descriptions.
- https://teenage.engineering/products/op-xy — downloaded `product.html`; pressure-sensitive pitchbend is on bottom left side.
- https://assets.teenage.engineering/_img/67362c261db2feb0839f9185_1024.webp — downloaded `hardware.webp`, product with packaging, front view.
- https://assets.teenage.engineering/_img/67350d8fb0f88c1a719d5c4e_2048.webp — downloaded `top-device.webp`, upright product. Cropped and rotated only for inspection as `official-photo-crop.png`.
- `top.webp` was an image of artists, not hardware, and was rejected as a geometry reference.

## Control inventory

68 buttons: 4 main modes + 4 modules + 8 tracks + 16 sequencer steps + 6 transport/octave/shift + 24 musical keys + 2 project/tempo + 4 right-column controls. Plus four large encoders, one smaller volume knob, a side pitchbend control, and side power switch. Do not fabricate front-panel positions for side controls.

## Layout confirmed from photographs

- Four large encoders above eight tracks, centered over each pair of track buttons. Knob center fills progress dark gray, middle gray, light gray, white. These are grayscale, not the colorful OP-1 knobs.
- Volume knob above Projects, immediately right of speaker. Projects and Tempo share the row directly beneath this knob (Tempo at its right), left of the display.
- Display sits above module buttons 1, 2, 3, 4. Visible module labels are digits, while accessible names may say M1–M4.
- Mode controls occupy four columns left of the modules: Instrument, Auxiliary, Arrange, Mix. Mode and module row aligns with tracks and Players.
- Rightmost column vertically Sample, COM, Players, BAR. BAR aligns with 16-step sequencer row. BAR has printed 1–4 above its outlined BAR label.
- 16 sequencer keys run beneath modes/modules/tracks. Their caps visibly progress through shades of gray towards white; these are not the musical keyboard.
- Record, Play, Stop occupy left three columns beneath step row. Minus, Plus, Shift below them. Record has red dot, Play right triangle, Stop hatched square.
- Musical keyboard occupies bottom two rows to the right of transport. 14 lower keys and 10 upper keys. Upper row uses a **3–2–3–2** grouping, not conventional C-start 2–3–2–3. Corresponding note layout is F through E over two octaves (note-name inference from gap structure; verify tuning/base octave separately).
- If lower-row indices are 0–13, upper key center positions are 0.5, 1.5, 2.5, 4.5, 5.5, 7.5, 8.5, 9.5, 11.5, 12.5. Each upper cap sits between lower key centers, with gaps between upper keys 3/4, 5/6, and 8/9.
- Upper musical keys carry digits 1,2,3,4,5,6,7,8,9,0 and a small NUM annotation near the start. Do not print musical note names as if present on the actual caps.
- Lower musical key caps carry step-component symbols: dots, hand, division-like dots/bar, ramp, ascending steps, descending steps, `rnd`, linked note/ramp, curved shape, fan/flower, arrow/dot, segmented circle, radial/starburst, central dot/rays. These should use vector approximations or exact official glyphs, not decorative emoji.
- Bottom side at left contains pitchbend according to product prose. Right-edge protruding tab is visible; power exact side location should be verified with connections/get-started documentation if represented.

## Acceptance constraints for implementation review

- Assert 68 individually selectable buttons, 4 encoders, volume, pitchbend, power.
- Assert accidental group geometry 3–2–3–2 and 14 lower natural keys.
- Assert all sixteen sequencer buttons in one row above keyboard, distinct from keyboard.
- Assert modules and tracks have independent IDs (M1–4 and Track1–8).
- Compare implementation render directly with `official-photo-crop.png`; source-code coordinate checks alone cannot confirm visual fidelity.
- Browser screenshots, actual touch behavior, and real iPhone/hardware validation have not been performed by this reviewer. Do not describe this report as a passing UI visual review.

## Implementation review, first pass

Reviewed `src/geometry.mjs` and standalone SVG rendered through Sharp to `implemented-hardware.png`, directly beside `official-photo-crop.png`. This is an SVG geometry render, not a browser screenshot.

Confirmed: counts and main row topology; independent controls; 3–2–3–2 accidental positions; four grayscale encoders and paired-track alignment; correct transport positions; separate side-control strip.

Actionable findings sent to implementer:
1. Bottom keyboard component symbols shifted after fourth key because `ramp` omitted and `velocity` appended. Correct sequence: pulse, hold, multiply, ramp, rampup, rampdown, random, portamento, bend, tonality, jump, skiplock, skipcomponent, skiptrigger.
2. Wedge ramp and ascending/descending staircase symbols distinct; current rampup/down triangles do not reproduce the latter.
3. Tonality actual symbol is a four-lobed fan/flower, not a musical natural sign.
4. Sequencer numbers 1–16 printed in render but absent in photo. Accessible numbering should remain; remove invented cap labels.
5. Track auxiliary glyphs are omitted, reducing correspondence to real controls (especially CV and FX I/II labels).
6. NUM annotation absent near first accidental key.
7. Encoder colored inner disks too large relative to outer knob circles; reduce radius from 0.34 × control width to approximately 0.23 × width.

No claim of zero outstanding findings at this stage. Simplified glyph treatment is explicitly disclosed but the wrong key-to-symbol assignment must be corrected.

## Implementation review, second pass

Re-rendered updated SVG to `reports/hardware-vector.png` using Sharp and inspected beside the official crop. Previous control-order, invented sequencer numbering, NUM annotation, and knob-disk proportion findings are fixed. Track glyphs added as approximations.

Remaining requests: distinguish Track 7 FX I from Track 8 FX II; use four-lobed tonality symbol; replace penultimate concentric-ring symbol with a radial burst; change Jump endpoint bar to a dot. These are glyph-recognition issues, not coordinate/topology failures.

## Final pass — scoped result

Final SVG was rendered again through Sharp and visually compared with the same official product crop. All actionable findings raised in this review have been fixed: corrected 14-key component order, distinct wedge and staircase glyphs, removed invented step numerals, NUM label, grayscale knob disks, Track 7/8 boxed FX I/II, four-lobed tonality, radial skip-component and jump dot.

Static inventory assertion: **75 unique control IDs**, including **68 buttons**, **4 encoders**, volume, pitchbend and power. The two keyboard rows retain 14 naturals and 10 accidentals in the photographed 3–2–3–2 grouping. Each mode, module, track, step, transport and note is independently represented.

**No outstanding actionable findings in the defined inventory, coordinate-topology and glyph-recognition review scope.** This conclusion does not mean pixel-perfect hardware reproduction or full product acceptance. Symbols are simplified vectors; edge-mounted controls are separately labelled below the instrument, rather than rendered as a 3D view. The display is an explicitly labelled reference graphic. Photo perspective, surface material, cap sculpting, minute lettering and port geometry are outside this scoped review.

Evidence files:
- `hardware-vector.png`: final static SVG rasterization at 1600 px width.
- `hardware-comparison.png`: labelled official photo / final SVG comparison.

Testing limitation: **no browser screenshot, responsive viewport run, real iPhone Safari test, gesture test, or physical OP–XY hardware test was performed by this reviewer**. Side-control model hit regions were increased, but actual CSS-pixel hit sizes and touch disambiguation require browser/device validation. This evidence cannot close those acceptance criteria.
