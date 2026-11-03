/**
 * The MK monogram — an M and a K sharing one stem.
 * Defined once as a polygon (y-up, roughly -1.2..1.2 wide, -1..1 tall)
 * and reused by the 3D intro (extruded), the SVG intro, the nav logo and the favicon.
 */
export const MONOGRAM_POINTS = [
  [-1.2, -1],
  [-1.2, 1],
  [-0.94, 1],
  [-0.55, 0.05],
  [-0.16, 1],
  [0.1, 1],
  [0.1, 0.36],
  [0.8, 1],
  [1.17, 1],
  [0.538, 0.421],
  [1.12, -1],
  [0.83, -1],
  [0.327, 0.228],
  [0.1, 0.02],
  [0.1, -1],
  [-0.14, -1],
  [-0.14, 0.45],
  [-0.55, -0.6],
  [-0.96, 0.45],
  [-0.96, -1],
]

/** SVG path (y flipped for screen space). Use with viewBox MONOGRAM_VIEWBOX. */
export const MONOGRAM_PATH =
  MONOGRAM_POINTS.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${-y}`).join(' ') + ' Z'

export const MONOGRAM_VIEWBOX = '-1.32 -1.12 2.62 2.24'
