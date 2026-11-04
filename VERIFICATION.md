# Verification

Checked 4 November 2026.

- JavaScript syntax check passed with Node.
- Four automated checks passed: enlarged four-module footprint support; hood/plate/housing clearance and area ratio; radiator/fan
  envelope consistency; local module import resolution.
- HTTP preview returned 200 and rendered the WebGL assembly.
- Browser checks: assembly navigation reached the four-Peltier step; show-complete
  returned to inspection; the explode slider changed the view; reset restored
  the view. The preview was inspected at the narrow in-app panel size.
- No bench thermal, hydraulic, leak, material compatibility or electrical tests
  have been performed. No exact supplier CAD, fastener torque, clamp pressure,
  stress calculation, hose bend-radius or fabrication clearance validation.
- No live measurements or realistic particle transport are claimed.

Re-run automated checks: `node --test tests/design.test.mjs`

Larger-area revision: 150 × 150 × 6 mm plate, 130 × 130 mm geometric viewing
floor, 76 mm TEC center spacing. This area is not a validated cold-area claim.
Browser preview refreshed and visually checked for the larger hood, plate and
housing; the inspection panel reports 130 × 130 mm floor and 200 × 200 × 260 mm
housing. HTTP preview returns 200. Geometry/asset checks: 4/4 passed.

Top-view revision: replaced the ceiling pad with four vertical perimeter strips,
leaving a 128 × 128 mm roof aperture. Reservoir evaporation has not been tested.
Top-view button was checked in the browser: the assembled camera looks through
the fitted roof and the perimeter felt leaves the cold floor visible. Five
automated checks pass, including the clear aperture calculation.
