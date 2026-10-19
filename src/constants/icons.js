// 24x24 outline icons, path data adapted from Lucide (ISC license).
// `body` paths get filled when an icon is drawn `filled`; `detail` paths sit
// inside the body and are filled and stroked in a cutout color so they stay visible.
// Icons with `fillable: false` only get a heavier stroke when active.

const circle = (cx, cy, r) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

const rect = (x, y, w, h, r) =>
  `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}` +
  `a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}` +
  `v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}z`;

export const ICONS = {
  home: {
    body: [
      'M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    ],
    detail: ['M15 21v-8a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v8'],
  },
  explore: {
    body: [circle(12, 12, 10)],
    detail: [
      'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z',
    ],
  },
  folder: {
    body: [
      'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
    ],
  },
  bookmark: {
    body: ['m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z'],
  },
  user: {
    body: [circle(12, 7, 4), 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'],
  },
  bell: {
    body: [
      'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326',
      'M10.268 21a2 2 0 0 0 3.464 0',
    ],
  },
  message: {
    body: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  },
  grid: {
    body: [rect(3, 3, 7, 7, 1.5), rect(14, 3, 7, 7, 1.5), rect(14, 14, 7, 7, 1.5), rect(3, 14, 7, 7, 1.5)],
  },
  plusCircle: {
    body: [circle(12, 12, 10)],
    detail: ['M8 12h8', 'M12 8v8'],
  },
  search: {
    body: [circle(11, 11, 8), 'm21 21-4.34-4.34'],
    fillable: false,
  },
  plus: {
    body: ['M5 12h14', 'M12 5v14'],
    fillable: false,
  },
  chart: {
    body: ['M3 3v16a2 2 0 0 0 2 2h16', 'M18 17V9', 'M13 17V5', 'M8 17v-3'],
    fillable: false,
  },
  briefcase: {
    body: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', rect(2, 6, 20, 14, 2)],
    fillable: false,
  },
  library: {
    body: ['m16 6 4 14', 'M12 6v14', 'M8 8v12', 'M4 4v16'],
    fillable: false,
  },
  chevronLeft: {
    body: ['m15 18-6-6 6-6'],
    fillable: false,
  },
  chevronRight: {
    body: ['m9 18 6-6-6-6'],
    fillable: false,
  },
  calendar: {
    body: ['M8 2v4', 'M16 2v4', rect(3, 4, 18, 18, 2), 'M3 10h18'],
    fillable: false,
  },
  pen: {
    body: [
      'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
    ],
    fillable: false,
  },
  check: {
    body: ['M20 6 9 17l-5-5'],
    fillable: false,
  },
  lightbulb: {
    body: [
      'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5',
      'M9 18h6',
      'M10 22h4',
    ],
    fillable: false,
  },
};
