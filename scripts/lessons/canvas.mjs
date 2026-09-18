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

/**
 * The node's on-screen box, fitting the graph first if it has been culled.
 *
 * React Flow drops nodes outside the viewport from the DOM, so panning from one
 * end of a wide graph to the other cannot start from the node's box — there is
 * no box. Fitting brings every node back before we measure.
 */
export const nodeBox = async (page, nodeId) => {
  if ((await page.locator(NODE(nodeId)).count()) === 0) {
    await fitView(page);
  }
  const box = await page.locator(NODE(nodeId)).first().boundingBox({ timeout: 8000 });
  if (!box) throw new Error(`node ${nodeId} is not on screen`);
  return box;
};

/**
 * Fit the whole graph via the toolbar's own FIT control.
 *
 * The `f` hotkey works too, but only when focus is not inside a field or a
 * media element — and a lesson that has just pressed play on a clip has focus
 * in exactly such a place. The button has no such condition.
 */
export const fitView = async (page) => {
  await page.getByRole('button', { name: /^fit$/i }).first().click();
  await page.waitForTimeout(550);
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

/**
 * Select a node by its title bar.
 *
 * Not the centre: once a generate node holds a result, its middle is the
 * preview thumbnail, and clicking that opens a full-screen lightbox which then
 * swallows every later click in the recording. The header is inert.
 */
export const selectNode = async (page, nodeId) => {
  await hoverNode(page, nodeId);
  const box = await nodeBox(page, nodeId);
  await page.mouse.click(box.x + 70, box.y + 14);
  await page.waitForTimeout(450);
};

/** Open a generated result full-screen — the deliberate version of the click
 *  that selectNode avoids. */
export const openPreview = async (page, nodeId) => {
  const box = await nodeBox(page, nodeId);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height * 0.6, { steps: 12 });
  await page.mouse.click(box.x + box.width / 2, box.y + box.height * 0.6);
  await page.waitForSelector('[role="dialog"][aria-modal="true"]', { timeout: 4000 }).catch(() => {});
  await page.waitForTimeout(400);
};

export const closePreview = async (page) => {
  const dialog = page.locator('[role="dialog"][aria-modal="true"]');
  if ((await dialog.count()) === 0) return;
  await page.keyboard.press('Escape');
  await dialog.first().waitFor({ state: 'detached', timeout: 4000 }).catch(() => {});
  await page.waitForTimeout(250);
};

/** Press a video node's own PLAY control so the clip runs inside the graph. */
export const playNode = async (page, nodeId) => {
  await page.locator(NODE(nodeId)).first().getByRole('button', { name: /play/i }).first().click();
  await page.waitForTimeout(300);
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
