/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid-layout container for the columns block
  const grid = element.querySelector('.grid-layout');
  let rows = [];

  if (grid) {
    // Get all direct children of the grid (column wrappers)
    const colDivs = Array.from(grid.children);

    // Determine the number of logical rows by inspecting unique y-positions
    // For Webflow/modern layout, often layout is by row then column visually, but the DOM is flat
    // We'll try to split into rows if possible, but if all in one row, keep as one
    // Fallback: two columns only, as per the provided HTML
    rows = [colDivs];
  } else {
    // fallback: treat all direct children of element as a single row
    rows = [Array.from(element.children)];
  }

  // Construct the table rows: header (one column), then all rows with correct number of columns
  const cells = [
    ['Columns (columns8)'],
    ...rows
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
