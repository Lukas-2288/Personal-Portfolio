---
title: AGV Fleet Expansion
kind: Work project
role: Lead systems engineer and customer test manager
dates: Aug–Sep 2026
sortDate: 2026-09-30
duration: 8 weeks on site
team: Me and 1 systems technician
summary: A major U.S. automotive plant expanded its automated guided vehicle (AGV) system with new stations, charging stations and aisles. I configured how vehicles move through the new area, joined it with the existing fleet so both run as one system, and led the customer's formal sign-off test, which the system passed.
blurb: Led an 8-week on-site expansion at a major U.S. automotive plant, joining a legacy vehicle fleet with 38 new stations. Passed the customer's acceptance test.
metrics:
  - value: "38 + 5"
    label: new stations + charging stations
  - value: "100–150"
    label: jobs per shift in the new area
  - value: Passed
    label: customer site acceptance test
tags:
  - AGV systems
  - AutoCAD path logic
  - Commissioning
  - Fleet monitoring
  - Wireless call stations
  - Site acceptance testing
featured: true
confidential: true
diagram: fleet-loop
---

### Scope

- 38 new stations, 5 charging stations, 3 new aisles, and an extended main aisle.
- The existing area handles 700–900 jobs per shift. The new area adds 100–150 per shift on top of that.
- 8 weeks on site with one systems technician.

### Joining the old fleet with the new area

The plant already had a working AGV fleet. I integrated that legacy fleet into the expanded layout so the old and new areas run as one system.

### Path logic

I configured the vehicle path logic in AutoCAD. The drawing defines what every vehicle does at every point on the floor:

- **Routing:** which paths vehicles take between stations.
- **Speed zones:** where vehicles slow down.
- **Traffic control:** which vehicle yields at each intersection, so two vehicles never claim the same space.
- **Lift heights and function codes:** what the vehicle does when it reaches a point, such as raising a load to a set height.

I tuned all of this during live testing, as real vehicles ran the new routes.

### Floor guidance

The vehicles stay on path by reading magnets set into the floor. I led the layout and survey of 200–300 guidance magnets for the new area and coordinated the crew that installed them.

### Troubleshooting a vehicle that loses guidance

<figure>
<div class="diagram-wrap">
<svg class="diagram" viewBox="0 0 620 190" role="img" aria-labelledby="flow-title">
<title id="flow-title">Troubleshooting flow: when a vehicle loses guidance, pull its onboard logs. If it was not reading the magnets, recalibrate the sensors. If it was, the path is off: re-survey the magnets or adjust the path lines and function codes.</title>
<defs><marker id="flow-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path class="dg-muted" d="M0 0 L8 4 L0 8 z"/></marker></defs>
<rect class="dg-box-accent" x="8" y="70" width="136" height="50" rx="6"/>
<text class="dg-text" x="76" y="92" text-anchor="middle">Vehicle loses</text>
<text class="dg-text" x="76" y="109" text-anchor="middle">guidance</text>
<line class="dg-arrow" x1="144" y1="95" x2="180" y2="95" marker-end="url(#flow-arrow)"/>
<rect class="dg-box" x="182" y="70" width="156" height="50" rx="6"/>
<text class="dg-text" x="260" y="91" text-anchor="middle">Pull onboard logs</text>
<text class="dg-small" x="260" y="108" text-anchor="middle">Reading the magnets?</text>
<path class="dg-arrow" d="M338 86 C 360 86, 364 40, 392 40" marker-end="url(#flow-arrow)"/>
<text class="dg-label" x="356" y="54">NO</text>
<path class="dg-arrow" d="M338 104 C 360 104, 364 150, 392 150" marker-end="url(#flow-arrow)"/>
<text class="dg-label" x="354" y="142">YES</text>
<rect class="dg-box" x="394" y="15" width="218" height="50" rx="6"/>
<text class="dg-text" x="503" y="36" text-anchor="middle">Recalibrate the sensors</text>
<text class="dg-small" x="503" y="53" text-anchor="middle">The vehicle side is the problem</text>
<rect class="dg-box" x="394" y="125" width="218" height="50" rx="6"/>
<text class="dg-text" x="503" y="146" text-anchor="middle">The path itself is off</text>
<text class="dg-small" x="503" y="163" text-anchor="middle">Re-survey magnets or edit the path</text>
</svg>
</div>
<figcaption>How I narrowed down guidance faults during commissioning. Generic diagram.</figcaption>
</figure>

1. **Check the vehicle first.** I pulled the vehicle's onboard logs to see whether it was reading the floor magnets. If it wasn't, I recalibrated its sensors.
2. **Then check the path.** If the vehicle was reading the magnets and still went off course, the path itself was wrong. Depending on the cause, I either had the magnets re-surveyed or adjusted the path lines and function codes in AutoCAD.
### Monitoring and escalation

During testing I watched the fleet-control software's live vehicle map, diagnosed faults as they came up, and escalated firmware or software issues to the right engineering teams.

### Operator call stations

I installed and configured wireless call stations that operators use to request a vehicle, and mapped each one to its network gateway and control registers.

### Customer acceptance test

I was the test manager for the site acceptance test (SAT), the formal test a customer runs before signing off on a system. The expansion passed, and the customer and operators said they were pleased with it.
