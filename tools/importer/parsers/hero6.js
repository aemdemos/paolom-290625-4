/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active tab pane (or fallback to first if none marked active)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  let activePane = Array.from(tabPanes).find((pane) => pane.classList.contains('w--tab-active'));
  if (!activePane && tabPanes.length > 0) activePane = tabPanes[0];
  if (!activePane) return;

  // Find the grid container inside the active pane
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Collect all direct children of the grid (preserve order)
  const gridChildren = Array.from(grid.children);
  // Identify the first image (background image)
  const imgEl = gridChildren.find(el => el.tagName && el.tagName.toLowerCase() === 'img');
  // Collect all other elements as text/content elements -- preserve ALL text content in order
  const contentEls = gridChildren.filter(el => !(el.tagName && el.tagName.toLowerCase() === 'img'));

  // Always combine all text/content elements into a fragment so nothing is missed
  let textCell;
  if (contentEls.length === 1) {
    textCell = contentEls[0];
  } else if (contentEls.length > 1) {
    const fragment = document.createDocumentFragment();
    contentEls.forEach(el => fragment.appendChild(el));
    textCell = fragment;
  } else {
    textCell = '';
  }

  const cells = [
    ['Hero'],
    [imgEl || ''],
    [textCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
