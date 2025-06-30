/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by spec
  const headerRow = ['Cards'];

  // Get all card links (direct children)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Each card: [image, content]
  const rows = cardLinks.map((card) => {
    // Find the only grid layout child (holds img + content)
    // Card structure: <a><div><img/><div>...</div></div></a>
    const grid = card.querySelector(':scope > div');
    if (!grid) return [null, null]; // Defensive: if grid missing, leave empty cells
    const img = grid.querySelector('img');
    // Find the first non-img direct child of the grid
    let contentCol = null;
    for (const child of grid.children) {
      if (child !== img) {
        contentCol = child;
        break;
      }
    }
    // Defensive: Handle missing image/content
    return [img || '', contentCol || ''];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
