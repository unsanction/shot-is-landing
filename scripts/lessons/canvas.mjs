/**
 * Canvas primitives for lesson choreography.
 *
 * The studio canvas is React Flow, so its DOM contract is stable and worth
 * leaning on: every node is `.react-flow__node[data-id="<graph node id>"]` and
 * the pane is `.react-flow__pane`. Node ids come from the API when the run is
 * prepared, which makes every cue below deterministic — no text matching
 * against generated titles, no guessing at positions.
 *
 * Camera moves are real gestures (a pane drag, the app's own hotkeys) rather
 * than instant jumps, because a screencast that teleports is hard to follow.
 */

const NODE = (id) => `.react-flow__node[data-id="${id}"]`;

export const waitForCanvas = async (page, { timeout = 45000 } = {}) => {
  await page.waitForSelector('.react-flow__pane', { timeout });
  await page.waitForSelector('.react-flow__node', { timeout });
  // React Flow runs an entry fitView; let it settle before the clock starts.
  await page.waitForTimeout(1200);
};

export const nodeBox = async (page, nodeId) => {
  const box = await page.locator(NODE(nodeId)).first().boundingBox();
  if (!box) throw new Error(`node ${nodeId} is not on screen`);
  return box;
};

/** Fit the whole graph — the app's own `F` hotkey, so it animates as designed. */
export const fitView = async (page) => {
  await page.locator('.react-flow__pane').first().click({ position: { x: 4, y: 4 } });
  await page.keyboard.press('f');
  await page.waitForTimeout(400);
};

export const zoomIn = async (page, times = 1) => {
  for (let i = 0; i < times; i += 1) {
    await page.keyboard.press('=');
    await page.waitForTimeout(180);
  }
};

export const zoomOut = async (page, times = 1) => {
  for (let i = 0; i < times; i += 1) {
    await page.keyboard.press('-');
    await page.waitForTimeout(180);
  }
};

/**
 * Pan the graph so a node sits in the middle of the frame, as a hand-held drag.
 * React Flow transforms the pane, so scrollIntoView does nothing here — moving
 * the camera means dragging it.
 */
export const panToNode = async (page, nodeId, { steps = 22, centerBias = 0.5 } = {}) => {
  const viewport = page.viewportSize();
  const box = await nodeBox(page, nodeId);

  const targetX = viewport.width * centerBias;
  const targetY = viewport.height * 0.45;
  const dx = targetX - (box.x + box.width / 2);
  const dy = targetY - (box.y + box.height / 2);
  if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;

  // Grab empty pane, not a node — dragging a node would move it in the graph.
  const grabX = viewport.width - 60;
  const grabY = viewport.height - 120;

  await page.mouse.move(grabX, grabY);
  await page.mouse.down();
  await page.mouse.move(grabX + dx, grabY + dy, { steps });
  await page.mouse.up();
  await page.waitForTimeout(250);
};

/** Move the pointer onto a node without clicking — shows hover affordances. */
export const hoverNode = async (page, nodeId) => {
  const box = await nodeBox(page, nodeId);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 14 });
  await page.waitForTimeout(200);
};

/** Select a node, which is what opens its params in the studio. */
export const selectNode = async (page, nodeId) => {
  await hoverNode(page, nodeId);
  await page.locator(NODE(nodeId)).first().click();
  await page.waitForTimeout(500);
};

export const openAddNodePalette = async (page) => {
  await page.getByRole('button', { name: /add node/i }).click();
  await page.waitForTimeout(400);
};

export const closeMenus = async (page) => {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
};

/**
 * Walk the pointer along a path of nodes so the viewer's eye follows the graph
 * in execution order instead of hunting for what changed.
 */
export const traceGraph = async (page, nodeIds, { dwell = 450 } = {}) => {
  for (const id of nodeIds) {
    await hoverNode(page, id);
    await page.waitForTimeout(dwell);
  }
};
