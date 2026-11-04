# Peltier Cloud Chamber — Design Twin

A separate browser-based design study inspired by the interaction style of
[digitalTwin](https://github.com/tharinduudu/digitalTwin). It does not modify or
reuse the detector application's code or CAD. Three.js retains its MIT license.

## Run

From this directory, run `python3 -m http.server 8792 --bind 127.0.0.1` and open
http://127.0.0.1:8792/. No npm installation, account or network connection is needed
after download. Opening index.html directly as a file may prevent module loading.

## Explore

- Drag to orbit; scroll to zoom. Click a component to inspect it.
- Top view looks straight through the clear roof at the cold floor.
- Explode separates the layers; Acrylic shell toggles the outer housing.
- Assembly provides seven stages with a parts sequence and checks.
- Parts contains Amazon searches and sourcing status.
- Design contains dimensions, material choices and thermal assumptions.
- Particle tracks are illustrative; there is no predicted event rate or live feed.

## Four-Peltier water-cooled design

Four TEC2-25408 two-stage modules are arranged in a 2 × 2 array on 76 mm centers.
Each nominal module is 40 × 40 × 6.4 mm; two modules sit on each of two
40 × 120 × 12 mm aluminum water blocks. A 150 × 150 × 6 mm copper plate
spans their cold faces. The copper plate is outside the coolant loop.

The 200 × 200 × 260 mm custom acrylic housing surrounds a removable glass vapor
hood, 140 × 140 × 90 mm outside. Concentrated IPA can craze acrylic, so the
acrylic remains outside the vapor volume. The wet loop uses aluminum blocks
and an aluminum radiator with compatible inhibited coolant and fittings.
Never put IPA in the cooling loop. Confirm the wetted metallurgy of fittings,
pump and radiator; avoid adding copper/brass PC cooling parts to this loop
without supplier approval of the complete material/coolant combination.

### Clear roof for viewing from above

The ceiling felt pad has been replaced by four vertical felt strips on the upper
inside glass walls: two 134 × 15 × 3 mm strips and two 128 × 15 × 3 mm strips.
This leaves a 128 × 128 mm clear aperture beneath the transparent roof. Keep
mechanical retaining clips at the perimeter; clip details and material
compatibility still require verification. The reservoir surface area is smaller
than the former ceiling pad; alcohol distribution and track performance need
requalification. Do not block the center with a heater or retaining plate.
The Top view button resets the exploded layout and stops automatic rotation,
then points the camera down into the assembled chamber. The glass remains fitted.

### Larger area

The clear viewing floor is now 130 × 130 mm (169 cm²), up from 70 × 70 mm
(49 cm²): 3.45 times the geometric area. The 150 mm plate uses 6 mm copper to
help spread heat from four TECs at (±38, ±38) mm. This increases plate thermal
mass by 4.5 times relative to the previous 100 × 100 × 3 mm plate. Cooldown
time and actual uniform cold area require measurement. Each 40 mm module has
2 mm end margin on its 120 mm water block; verify the entire flat face and
edge condition before assembly. Block row centers are also ±38 mm.

### Identifiable parts

| Qty | Part | Body dimensions, mm | Evidence status |
| --- | --- | --- | --- |
| 4 | TEC2-25408 | 40 × 40 × 6.4 nominal | Supplier variants; verify exact unit |
| 2 | CLYXGS-class water block / ABRA HS-WCB-40X120 envelope | 40 × 120 × 12 | Supplier-sized; barbs approximate |
| 1 | Syscooling AS240 aluminum radiator | 269 × 120 × 36 | Manufacturer dimensions |
| 2 | ARCTIC P12 PWM PST ACFAN00120A | 120 × 120 × 25 | Manufacturer dimensions |
| 1 | Syscooling SC-300T pump/reservoir | 66 × 56 × 86 nominal | Retail variant, excluding ports/base |
| 4 | Jesverty SPS-3010 class current-limited supply | Not modeled | One independent supply channel per TEC |

`sources.json` records source URLs and limits. These are dimension-based
procedural models, not exact supplier CAD. Fan blades, radiator fins,
reservoir internals, fitting locations and hose routes are approximations.
The housing is open at the top with broad lower openings; nominal blank cut
sizes omit openings, tube exits, holes, bond lines and tolerances.

The series loop is pump → block A → block B → radiator → reservoir. Match hose
ID to actual barb OD and qualify clamps and adapters. The reference blocks
have 10 mm barbs; pump variants and radiator G1/4 ports require compatible
adapters. Model paths do not validate bend radii, fitting torque access or
hose length. Support the loop so hoses do not load the TEC ceramic. Keep the
radiator airflow outside the housing. Use only pump power for initial filling,
bleeding and leak testing; never run the pump dry.

### Thermal and electrical sizing

At the illustrative 8 V / 4 A per module, total electrical input is 128 W.
Assuming 10–25 W total chamber cold load and about 4 W pump heat gives roughly
142–157 W rejected to room air. To keep the TEC hot interfaces near 30 °C
at 22 °C room temperature requires an overall effective resistance of about
8/150 = 0.053 K/W, including block interfaces. AS240 capacity at that small
temperature difference has not been validated. Larger radiators or lower
TEC input may be required after testing.

At 150 W, approximate coolant rise is 4.3 °C at 0.5 L/min and 2.2 °C at
1 L/min. Pump free flow is not installed flow. Measure real flow, coolant
in/out temperatures, all hot-side interfaces and the active floor.
Across a 58 K lift, each TEC's loaded curve must support its actual cold load.
Four single-stage TECs in parallel are not equivalent to this four two-stage
module arrangement.

Use four independent current-limited channels, one per TEC, beginning at low
voltage and conservative current. 8 V / 4 A is an experimental reference, not
a prescribed setpoint. Observe the chosen module's voltage/current limits.
Power the pump and fans from a separate regulated, fused 12 V supply rated
for their measured combined load. Fan/pump/overtemperature interlocks must
remove TEC power on cooling failure. Four modules draw about 16 A combined
at the illustrative operating point; one 10 A supply cannot power all four.

`cad/cloud-chamber.scad` is the editable concept assembly in mm. Set
`exploded=0` for assembled view. Coplanar block support and even spring
clamping remain mechanical engineering tasks; clamping fasteners are not
modeled. Four mismatched heights can fracture ceramic or leave poor contact.
The glass fabricator must qualify joints, edge finish and dimensional tolerance
for IPA and thermal cycling. The nominal hood panels are not a fabrication release.

### Qualification and budget

The target is −25 to −30 °C over the active floor at 22 °C ambient. Require
stable ≤ −25 °C operation at the center, four quadrant centers and four
near-corner points of the enlarged viewing floor for 15 minutes with alcohol present after leak and
dry cooling tests. This has not been built or thermally validated. Tracks are
illustrative; the model does not compute supersaturation, nucleation or event rates.

Amazon links are searches, not verified stock or prices. Genuine TEC2-25408
availability on Amazon US remains unresolved. Budget allowance: approximately
$450–800 including four supply channels, with custom glass cost uncertain.
The parts tab is a sourcing starting point; complete fittings, wiring, fusing,
interlocks, probes, mounts, gasket, foam and coolant must be specified before build.
Operate ventilated, away from ignition sources. Fill IPA with electrical power
off. Natural background radiation is sufficient for initial tests.

## References

- [Syscooling AS240 manufacturer](https://www.syscooling.com/?list_50/273.html=): radiator dimensions and material.
- [ARCTIC P12 manufacturer](https://www.arctic.de/en/P12-PWM-PST/ACFAN00120A): fan envelope.
- [ABRA water block](https://abra-electronics.com/thermal-management/heat-sinks/hs-wcb-40x120-40x120mm-aluminum-water-cooling-block.html): reference block size and barbs.
- [Barrett, Physics Education 59 (2024)](https://www.liverpool.ac.uk/~sdb/CloudChamber/Phys-Educ-59-(2024)-043010.pdf): Peltier diffusion-chamber precedent.
- [Mountain of Code build](https://mountainofcode.co.uk/peltier-cloud-chamber): TEC2-25408 and adjustable-supply precedent; not validation of this cooler.
- [ACRYLITE manufacturer guidance](https://www.acrylite.co/resources/fabrication-manuals/painting-and-printing-on-acrylite-acrylic-sheet): concentrated alcohol and acrylic compatibility.

## Hosting

This is a static site. For GitHub Pages, select **Deploy from a branch**, branch
`main`, folder `/ (root)` in the repository's Settings → Pages. No build is needed.
Uploading the repository does not by itself enable Pages. There is no telemetry,
remote service or hardware control in the application.
