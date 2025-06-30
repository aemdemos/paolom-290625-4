/* global WebImporter */
export default function parse(element, { document }) {
  // Get all tab links (direct children that are <a>)
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows: header, then one row per tab
  const rows = [];
  // Header row: one cell (block name), one empty for alignment
  rows.push(['Tabs', '']);

  // Data rows: [tab label element, empty cell]
  tabLinks.forEach(tab => {
    let labelElement = tab.querySelector('div');
    if (!labelElement) labelElement = tab;
    rows.push([labelElement, '']);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Fix header row: merge the two cells to ensure colspan=2
  const headerRow = table.querySelector('tr');
  if (headerRow && headerRow.children.length === 2) {
    headerRow.children[0].setAttribute('colspan', '2');
    headerRow.removeChild(headerRow.children[1]);
  }

  // Replace the original element with the properly structured table
  element.replaceWith(table);
}
