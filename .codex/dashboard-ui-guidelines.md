# Dashboard UI Guidelines

- Animate dashboard content when it enters the viewport. Use slow, restrained motion: approximately 0.65–0.9 seconds for card reveals and 1.2–1.4 seconds for graph strokes.
- Prefer opacity plus a small upward translation for cards. Stagger related tiles by about 60–90ms.
- Animate data visualizations progressively where practical: line paths draw, bars grow from zero, and donut/chart content gently scales in. Respect `viewport: { once: true }` to avoid distracting repeated motion while scrolling.
- Apply this visualization-level motion consistently to supporting analytics cards as well: ranked bars, stacked segments, demographic columns, funnels, comparison bars, and budget donuts should animate their data while their shell remains visually stable.
- On Brand project overview desktop layouts, keep the right-rail “What to do next” card sticky with a `24px` top offset while the main project content scrolls. Leave it in normal document flow below the desktop breakpoint.
